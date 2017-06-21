// Describes the "Diagnosis" tabbed section of the 'Visit Details' pop-up modal

import { ColumnHeader } from "../../elements/columnHeader";
import { ElementFinder } from "protractor";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";
import {ModalTab} from "../../global/class_ModalTab";
import {NavigationMethods} from "../../../../utils/navigationUtilities";
import {GeneralUtilities} from "../../../../utils/generalUtilities";

export class TabDiagnosis extends ModalTab{

    contentContainer: ElementFinder;

    diagnosisHeader: ColumnHeader;
    codeHeader: ColumnHeader;
    startDateHeader: ColumnHeader;
    endDateHeader: ColumnHeader;
    commentHeader: ColumnHeader;

    diagnoses: DiagnosisRow[];

    private diagnosisColumnHeaderCSSstring: string;

    constructor(tab: ElementFinder) {
        // console.log("  In constructor for 'TabDiagnosis'");
        super(tab);
        this.diagnosisColumnHeaderCSSstring = 'th.visitModal-diagnosisTab-tableHeader-DiagnosisId';
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'TabDiagnosis'");

        if(!this.initializePromise) {

            await super.baseInitialize();
            // await GeneralUtilities.initializationMessage(this.actualTab, 'TabDiagnosis');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.diagnosisHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$(this.diagnosisColumnHeaderCSSstring));
                this.codeHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('th.visitModal-diagnosisTab-tableHeader-Code'));
                this.startDateHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('th.visitModal-diagnosisTab-tableHeader-StartDate'));
                this.endDateHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('th.visitModal-diagnosisTab-tableHeader-EndDate'));
                this.commentHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('th.visitModal-diagnosisTab-tableHeader-Comment'));

                return this.setDiagnosisArray().then(async() => {
                    // console.log("\tNow initializing all elements just defined for 'TabDiagnosis'");

                    await this.diagnosisHeader.initialize();
                    await this.codeHeader.initialize();
                    await this.startDateHeader.initialize();
                    await this.endDateHeader.initialize();
                    await this.commentHeader.initialize();

                    return resolve();
                });
            });
        }

        return this.initializePromise;
    }

    // This will get the diagnosis rows and put them into the 'diagnosis' array
    async setDiagnosisArray(): Promise<any> {
        // console.log("   In 'setDiagnosisArray()' for 'TabDiagnosis'");
        return ElementMethods.getCustomElementArray('tr.visitModal-diagnosisTab-tableRow', DiagnosisRow).then(async (diagnosisArray)=> {
            let resolvingPromise;
            this.diagnoses = await diagnosisArray;

            for (let i = 0; i < this.diagnoses.length; i++) {
                // console.log("\t\tInitializing diagnosis row " + i);
                resolvingPromise = await this.diagnoses[i].initialize();
            }

            return resolvingPromise;
        });
    }

    async clickTab(): Promise<void> {
        // console.log("   In 'clickTab()' for 'TabDiagnosis'");
        return super.baseClickTab().then(async ()=> {
            await NavigationMethods.waitForLoadCompletion(this.diagnosisColumnHeaderCSSstring);
            return this.initialize();
        })
    }
}

export class DiagnosisRow {
    private initializePromise: Promise<void>;

    diagnosis: ElementFinder;
    code: ElementFinder;
    startDate: ElementFinder;
    endDate: ElementFinder;
    comment: ElementFinder;

    constructor(private element:ElementFinder) {
        // console.log("  In constructor for 'DiagnosisRow'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'DiagnosisRow'");

        if(!this.initializePromise) {

            // await GeneralUtilities.initializationMessage(this.element, 'DiagnosisRow');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.diagnosis = await this.element.$('td.visitModal-diagnosisTab-tableRow-Diagnosis');
                this.code = await this.element.$('td.visitModal-diagnosisTab-tableRow-code');
                this.startDate = await this.element.$('td.visitModal-diagnosisTab-tableRow-startDate');
                this.endDate = await this.element.$('td.visitModal-diagnosisTab-tableRow-endDate');
                this.comment = await this.element.$('td.visitModal-diagnosisTab-tableRow-comments');

                return resolve();
            });
        }

        return this.initializePromise;
    }
}
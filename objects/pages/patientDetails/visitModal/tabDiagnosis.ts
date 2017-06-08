// Describes the "Diagnosis" tabbed section of the 'Visit Details' pop-up modal

import { ColumnHeader } from "../../elements/columnHeader";
import { ElementFinder, $ } from "protractor";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";
import {ModalTab} from "../../global/class_ModalTab";

export class TabDiagnosis extends ModalTab{

    contentContainer: ElementFinder;

    diagnosisHeader: ColumnHeader;
    codeHeader: ColumnHeader;
    startDateHeader: ColumnHeader;
    endDateHeader: ColumnHeader;
    commentHeader: ColumnHeader;

    diagnoses: DiagnosisRow[];

    constructor(tab: ElementFinder) {
        // console.log("  In constructor for 'TabDiagnosis'");
        super(tab);
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'TabDiagnosis'");

        if(!this.initializePromise) {
            await ElementMethods.initializationMessage(this.actualTab, 'TabDiagnosis');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                await super.initialize();

                this.diagnosisHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('th.visitModal-diagnosisTab-tableHeader-DiagnosisId'));
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
        return ElementMethods.getCustomElementArray('tr.visitModal-diagnosisTab-tableRow', 'DiagnosisRow').then(async (diagnosisArray)=> {
            // console.log(`     ${diagnosisArray.length} diagnoses shown in the table`);
            let resolvingPromise;
            this.diagnoses = await diagnosisArray;

            for (let i = 0; i < this.diagnoses.length; i++) {
                // console.log("\t\tInitializing diagnosis row " + i);
                resolvingPromise = await this.diagnoses[i].initialize();
            }

            return resolvingPromise;
        });
    }

    // async clickTab(): Promise<{}> {
    //     console.log("  In 'clickTab()' for abstract class 'ModalTab'");
    //     return this.actualTab.click().then(()=> {
    //         this.initializePromise = null;
    //         return new Promise(()=> { return this.initialize(); });
    //     });
    // }
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

            // await ElementMethods.initializationMessage(this.element, 'DiagnosisRow');

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
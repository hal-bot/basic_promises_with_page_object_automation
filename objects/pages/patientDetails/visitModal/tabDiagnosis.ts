// Describes the "Diagnosis" tabbed section of the 'Visit Details' pop-up modal

import { ColumnHeader } from "../../elements/columnHeader";
import { ElementFinder, $ } from "protractor";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";

export class TabDiagnosis {

    private initializePromise: Promise<void>;

    diagnosisHeader: ColumnHeader;
    codeHeader: ColumnHeader;
    startDateHeader: ColumnHeader;
    endDateHeader: ColumnHeader;
    commentHeader: ColumnHeader;

    diagnoses: DiagnosisRow[];

    constructor(private element:ElementFinder) {
        // console.log("  In constructor for 'TabDiagnosis'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'TabDiagnosis'");

        if(!this.initializePromise) {

            // await ElementMethods.initializationMessage(element, 'TabDiagnosis');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.diagnosisHeader = await ElementFactory.make(ColumnHeader, this.element.$(''));
                this.codeHeader = await ElementFactory.make(ColumnHeader, this.element.$(''));
                this.startDateHeader = await ElementFactory.make(ColumnHeader, this.element.$(''));
                this.endDateHeader = await ElementFactory.make(ColumnHeader, this.element.$(''));
                this.commentHeader = await ElementFactory.make(ColumnHeader, this.element.$(''));

                this.setDiagnosisArray();
                return resolve();
            });
        }

        return this.initializePromise;
    }

    // This will get the diagnosis rows and put them into the 'diagnosis' array
    async setDiagnosisArray(): Promise<any> {
        return ElementMethods.getCustomElementArray('tr.diagnosis-tableRow', 'DiagnosisRow').then(function(diagnosisArray) {
            return this.diagnoses = diagnosisArray;
        });
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
        // console.log("   In 'initialize' for 'TabDiagnosis'");

        if(!this.initializePromise) {

            // await ElementMethods.initializationMessage(element, 'TabDiagnosis');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.diagnosis = await this.element.$('');
                this.code = await this.element.$('');
                this.startDate = await this.element.$('');
                this.endDate = await this.element.$('');
                this.comment = await this.element.$('');

                return resolve();
            });
        }

        return this.initializePromise;
    }
}
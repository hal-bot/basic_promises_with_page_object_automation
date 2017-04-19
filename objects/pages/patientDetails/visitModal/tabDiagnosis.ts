// Describes the "Diagnosis" tabbed section of the 'Visit Details' pop-up modal

import { ColumnHeader } from "../../elements/columnHeader";
import { ElementFinder } from "protractor";
import {ElementMethods} from "../../../../utils/elementUtilities";

export class TabDiagnosis {

    diagnosisHeader: ColumnHeader;
    codeHeader: ColumnHeader;
    startDateHeader: ColumnHeader;
    endDateHeader: ColumnHeader;
    commentHeader: ColumnHeader;

    diagnoses: DiagnosisRow[];

    constructor(element) {
        this.diagnosisHeader = new ColumnHeader(element);
        this.codeHeader = new ColumnHeader(element);
        this.startDateHeader = new ColumnHeader(element);
        this.endDateHeader = new ColumnHeader(element);
        this.commentHeader = new ColumnHeader(element);

        this.setDiagnosisArray();
    }

    // This will get the diagnosis rows and put them into the 'diagnosis' array
    setDiagnosisArray(): Promise<any> {
        return ElementMethods.getCustomElementArray('tr.diagnosis-tableRow', 'DiagnosisRow').then(function(diagnosisArray) {
            return this.diagnoses = diagnosisArray;
        });
    }
}

export class DiagnosisRow {
    diagnosis: ElementFinder;
    code: ElementFinder;
    startDate: ElementFinder;
    endDate: ElementFinder;
    comment: ElementFinder;

    constructor(element) {
        this.diagnosis = element.$('');
        this.code = element.$('');
        this.startDate = element.$('');
        this.endDate = element.$('');
        this.comment = element.$('');
    }
}
// Describes the "Diagnosis" tabbed section of the 'Visit Details' pop-up modal

import {TitleValueElement} from "../../titleValueElement";
import {ColumnHeader} from "../../columnHeader";
import {ElementFinder, $, $$, element} from "protractor";

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

    // This will clear out the current 'visits' array and then get the array rows
    setDiagnosisArray() {
        this.diagnoses = [];
        // TODO: FINISH THE CODE HERE
        // $$('').each.do(function(diagnosis) {
        //     this.diagnoses.push(new DiagnosisRow(diagnosis));
        // });
    }
}

class DiagnosisRow {
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
// Describes the section below the Patient Detail header and the tabs section


// import {InfoButton} from "./class_infoButton";
import {TitleValueElement} from "../elements/titleValueElement";
import {ElementFinder, $, protractor } from "protractor";
// import Promise = promise.Promise;

export class PatientInformation {

    private container = $('div.patient-information');

    title: ElementFinder;
    arrowButton: DetailAccordionSection;

    mrn: TitleValueElement;
    patientID: TitleValueElement;
    lastName: TitleValueElement;
    firstName: TitleValueElement;
    middleName: TitleValueElement;
    dateOfBirth: TitleValueElement;

    gender: TitleValueElement;
    status: TitleValueElement;
    weight: TitleValueElement;
    ssn: TitleValueElement;
    ethnicity: TitleValueElement;
    prefix: TitleValueElement;
    suffix: TitleValueElement;
    enterpriseId: TitleValueElement;
    mothersPid: TitleValueElement;
    numberOfPregnancies: TitleValueElement;
    converted: TitleValueElement;
    mergedToId: TitleValueElement;

    // THESE HAVE NOT YET BEEN IMPLEMENTED
    // specialNeeds_Button: InfoButton;
    // notes_Button: InfoButton;
    // txRx_Button: InfoButton;
    // adr_Button: InfoButton;
    // aby_Button: InfoButton;
    // bloodType_Button: InfoButton;
    // electronicXM_Button: InfoButton;
    // specimenExpiration_Button: InfoButton;
    // labs_Button: InfoButton;
    // issuedProducts_Button: InfoButton;
    // history_Button: InfoButton;

    // element will be the section of the site dedicated to the Patient Information section
    constructor() {
        console.log("In constructor for 'PatientInformation'");

        // this.title = this.container.$('h4');
        // this.arrowButton = new DetailAccordionSection();
        //
        // this.mrn = new TitleValueElement(this.container.$('div.patient-information-mrn'));
        // this.patientID = new TitleValueElement(this.container.$('div.patient-information-patientId'));
        // this.lastName = new TitleValueElement(this.container.$('div.patient-information-lastName'));
        // this.firstName = new TitleValueElement(this.container.$('div.patient-information-firstName'));
        // this.middleName = new TitleValueElement(this.container.$('div.patient-information-middleName'));
        // this.dateOfBirth = new TitleValueElement(this.container.$('div.patient-information-dateOfBirth'));

        // THESE HAVE NOT YET BEEN IMPLEMENTED
        // this.specialNeeds_Button = new InfoButton(element.$(''));
        // this.notes_Button = new InfoButton(element.$(''));
        // this.txRx_Button = new InfoButton(element.$(''));
        // this.adr_Button = new InfoButton(element.$(''));
        // this.aby_Button = new InfoButton(element.$(''));
        // this.bloodType_Button = new InfoButton(element.$(''));
        // this.electronicXM_Button = new InfoButton(element.$(''));
        // this.specimenExpiration_Button = new InfoButton(element.$(''));
        // this.labs_Button = new InfoButton(element.$(''));
        // this.issuedProducts_Button = new InfoButton(element.$(''));
        // this.history_Button = new InfoButton(element.$(''));
    }

    private async initialize() {
        return new Promise<void>( () => {
            this.title = this.container.$('h4');
            this.arrowButton = new DetailAccordionSection();

            this.mrn = new TitleValueElement(this.container.$('div.patient-information-mrn'));
            this.patientID = new TitleValueElement(this.container.$('div.patient-information-patientId'));
            this.lastName = new TitleValueElement(this.container.$('div.patient-information-lastName'));
            this.firstName = new TitleValueElement(this.container.$('div.patient-information-firstName'));
            this.middleName = new TitleValueElement(this.container.$('div.patient-information-middleName'));
            this.dateOfBirth = new TitleValueElement(this.container.$('div.patient-information-dateOfBirth'));
        });
    }

    private async initializeExtraDetails() {
        console.log("   In 'initializeExtraDetails()'");
        await this.initialize();

        this.gender = new TitleValueElement(this.container.$('div.patient-information-'));
        this.status = new TitleValueElement(this.container.$('div.patient-information-'));
        this.weight = new TitleValueElement(this.container.$('div.patient-information-'));
        this.ssn = new TitleValueElement(this.container.$('div.patient-information-'));
        this.ethnicity = new TitleValueElement(this.container.$('div.patient-information-'));
        this.prefix = new TitleValueElement(this.container.$('div.patient-information-'));
        this.suffix = new TitleValueElement(this.container.$('div.patient-information-'));
        this.enterpriseId = new TitleValueElement(this.container.$('div.patient-information-'));
        this.mothersPid = new TitleValueElement(this.container.$('div.patient-information-'));
        this.numberOfPregnancies = new TitleValueElement(this.container.$('div.patient-information-'));
        this.converted = new TitleValueElement(this.container.$('div.patient-information-'));
        this.mergedToId = new TitleValueElement(this.container.$('div.patient-information-'));
    }

    getMRN(): Promise<string> {
        return this.mrn.getTitle();
    }

    getPatientNumber(): Promise<string> {
        return this.patientID.getTitle();
    }

    getLastName(): Promise<string> {
        return this.lastName.getTitle();
    }

    getFirstName(): Promise<string> {
        return this.firstName.getTitle();
    }

    getMiddleName(): Promise<string> {
        return this.middleName.getTitle();
    }

    getFullName(): Promise<string> {
        return this.getFirstName().then(function(firstName) {
            return this.getMiddleName().then(function(middleName) {
                return this.getLastName().then(function(lastName) {
                    return firstName +' '+ middleName +' '+ lastName;
                });
            });
        });
    }

    getDateOfBirth(): Promise<string> {
        return this.dateOfBirth.getTitle();
    }

    isPresent(): Promise<boolean> {
        return new Promise(()=> { return this.title.isPresent(); });
    }

    expand(): Promise<any> {
        console.log("   In 'expand'");
        // return this.isExpanded().then(function(isOpen) {
        //     console.log("     Is it expanded?  " + isOpen);
        //     if (isOpen) {
        //         let deferred = protractor.promise.defer();
        //         deferred.fulfill(true);
        //         return deferred.promise;
        //     } else {
        //         console.log("       EXPANDING click!");
        //         return this.arrowButton.click();
        //     }
        // });
        return this.arrowButton.click().then( () => {
            return this.initializeExtraDetails();
        });

    }

    contract(): Promise<boolean> {
        return this.isExpanded().then( (isOpen) => {
            if (isOpen) {
                return this.arrowButton.click();
            } else {
                let deferred = protractor.promise.defer();
                deferred.fulfill(true);
                return deferred.promise;
            }
        });
    }

    isExpanded(): Promise<boolean> {
        return this.arrowButton.isExpanded();
    }

}


class DetailAccordionSection {

    label: ElementFinder;
    private directionalButton: ElementFinder;

    constructor() {
        // console.log("   In 'DetailAccordionSection' constructor");
        let container = $('div.titlebar div.detail-menu');
        this.label = container.$('div.accordion-label');
        this.directionalButton = container.$('span.glyphicon');
    }

    click(): Promise<boolean> {
        // console.log("  Gonna click the button");
        return new Promise(()=> { this.directionalButton.click(); });
}

    isExpanded(): Promise<boolean> {
        return new Promise(()=> {
            return this.directionalButton.getAttribute('class').then(function (directionalButtonClass) {
                console.log("  class of the 'directionalButton' = " + directionalButtonClass);
                return directionalButtonClass.indexOf('up') >= 0;
            });
        });
    }

    getText():Promise<string> {
        return new Promise(()=> { return this.label.getText(); });
    }

}
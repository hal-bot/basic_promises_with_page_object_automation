// Describes the section below the Patient Detail header and the tabs section


import {TitleValueElement} from "../elements/titleValueElement";
import {ElementFinder, $, browser} from "protractor";
import {ElementFactory, ElementMethods} from "../../../utils/elementUtilities";
import {async} from "q";


export class PatientInformation {

    private container: ElementFinder;

    private initializePromise: Promise<void>;
    private initializeExtraPromise: Promise<void>;

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
        // console.log("  In constructor for 'PatientInformation'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'PatientInformation'");

        if(!this.initializePromise) {
            ElementMethods.initializationMessage(null, 'PatientInformation');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.container = await $('div.patient-information');
                this.title = await this.container.$('h4');
                this.arrowButton = await new DetailAccordionSection();

                this.mrn = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-mrn'));
                this.patientID = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-patientId'));
                this.lastName = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-lastName'));
                this.firstName = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-firstName'));
                this.middleName = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-middleName'));
                this.dateOfBirth = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-dateOfBirth'));

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

                return resolve();
            }).then(async (resolve)=> {
                console.log("\tNow initializing all elements just defined for 'PatientInformation'");
                await this.arrowButton.initialize();
                await this.mrn.initialize();
                await this.patientID.initialize();
                await this.lastName.initialize();
                await this.firstName.initialize();
                await this.middleName.initialize();
                await this.dateOfBirth.initialize();
                return resolve;
            });
        }

        return this.initializePromise;
    }

    async initializeExtraDetails(): Promise<void> {
        // console.log("   In 'initializeExtraDetails()'");
        if(!this.initializeExtraPromise) {
            // console.log("     ... Initializing extra details of 'PatientInformation'");

            return this.initializeExtraPromise = new Promise<void>(async (resolve) => {
                this.gender = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-gender'));
                this.status = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-status'));
                this.weight = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-weight'));
                this.ssn = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-ssn'));
                this.ethnicity = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-ethnicity'));
                this.prefix = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-prefix'));
                this.suffix = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-suffix'));
                this.enterpriseId = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-enterpriseId'));
                this.mothersPid = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-motherPid'));
                this.numberOfPregnancies = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-numPregnancies'));
                this.converted = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-converted'));
                this.mergedToId = await ElementFactory.make(TitleValueElement, this.container.$('div.patient-information-mergedToId'));

                return resolve();
            }).then(async (resolve)=> {
                console.log("\tNow initializing all extra elements just defined for 'PatientInformation'");
                await this.gender.initialize();
                await this.status.initialize();
                await this.weight.initialize();
                await this.ssn.initialize();
                await this.ethnicity.initialize();
                await this.prefix.initialize();
                await this.suffix.initialize();
                await this.enterpriseId.initialize();
                await this.mothersPid.initialize();
                await this.numberOfPregnancies.initialize();
                await this.converted.initialize();
                await this.mergedToId.initialize();
                return resolve;
            });
        }
        return this.initializeExtraPromise;
    }

    async isPresent(): Promise<boolean> {
        console.log("   In 'isPresent' for 'PatientInformation'");
        await this.initialize();
        return this.title.isPresent();
    }

    async expand(): Promise<void> {
        console.log("   In 'expand' for 'PatientInformation'");

        await this.initialize();
        return this.arrowButton.isExpanded().then((isOpen) => {
            if (!isOpen) {
                return this.arrowButton.click().then((promise)=> {
                    console.log("almost done");
                    return this.initializeExtraDetails().then(()=> {
                        console.log("DONE!");
                        return promise;
                    });
                });
            } else {
              return new Promise<void>((resolve)=> resolve());
            }
        });
    }

    async contract(): Promise<void> {
        console.log("   In 'contract' for 'PatientInformation'");
        await this.initialize();
        return this.arrowButton.isExpanded().then( (isOpen) => {
            if (isOpen) {
                return this.arrowButton.click();
            } else {
                return new Promise<void>((resolve)=> resolve());
            }
        });
    }

    async isExpanded(): Promise<boolean> {
        console.log("   In 'isExpanded' for 'PatientInformation'");
        await this.initialize();
        return this.arrowButton.isExpanded();
    }

    async getMRN(): Promise<string> {
        await this.initialize();
        return this.mrn.getTitle();
    }

    async getPatientNumber(): Promise<string> {
        await this.initialize();
        return this.patientID.getTitle();
    }

    async getLastName(): Promise<string> {
        await this.initialize();
        return this.lastName.getTitle();
    }

    async getFirstName(): Promise<string> {
        await this.initialize();
        return this.firstName.getTitle();
    }

    async getMiddleName(): Promise<string> {
        await this.initialize();
        return this.middleName.getTitle();
    }

    async getFullName(): Promise<string> {
        await this.initialize();

        return this.getFirstName().then(function(firstName) {
            return this.getMiddleName().then(function(middleName) {
                return this.getLastName().then(function(lastName) {
                    return firstName +' '+ middleName +' '+ lastName;
                });
            });
        });
    }

    async getDateOfBirth(): Promise<string> {
        await this.initialize();
        return this.dateOfBirth.getTitle();
    }
}


class DetailAccordionSection {

    private container: ElementFinder;
    private directionalButton: ElementFinder;
    label: ElementFinder;

    private initializePromise: Promise<void>;

    constructor() {
        // console.log("     In 'DetailAccordionSection' constructor");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'DetailAccordionSection'");

        if(!this.initializePromise) {
            ElementMethods.initializationMessage(null, 'DetailAccordionSection');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.container = await $('div.titlebar div.detail-menu');
                this.label = await this.container.$('div.accordion-label');
                this.directionalButton = await this.container.$('span.glyphicon');

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async click(): Promise<void> {
        console.log("  Gonna click the arrow button");
        await this.initialize();
        return this.directionalButton.click().then((promise)=> {
            console.log("    BUTTON CLICKED!");
            return promise;
        });
    }

    async isExpanded(): Promise<boolean> {
        console.log("     In 'isExpanded' for 'DetailAccordionSection'");
        await this.initialize();
        return new Promise<boolean>((resolve) => {
            return this.directionalButton.getAttribute('class').then(function (directionalButtonClass) {
                // console.log("  class of the 'directionalButton' = " + directionalButtonClass);
                return resolve(directionalButtonClass.indexOf('up') >= 0);
            });
        });
    }

    async getText():Promise<string> {
        await this.initialize();
        return this.label.getText();
    }

}
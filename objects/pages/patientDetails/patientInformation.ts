// Describes the section below the Patient Detail header and the tabs section

import {InfoButton} from "./class_infoButton";
import {TitleValueElement} from "../elements/titleValueElement";
import {ElementFinder, $} from "protractor";

export class PatientInformation {

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
    constructor(element) {
        this.title = element.$('h4');
        this.arrowButton = new DetailAccordionSection();

        this.mrn = new TitleValueElement(element.$('div.patient-information-mrn'));
        this.patientID = new TitleValueElement(element.$('div.patient-information-patientId'));
        this.lastName = new TitleValueElement(element.$('div.patient-information-lastName'));
        this.firstName = new TitleValueElement(element.$('div.patient-information-firstName'));
        this.middleName = new TitleValueElement(element.$('div.patient-information-middleName'));
        this.dateOfBirth = new TitleValueElement(element.$('div.patient-information-dateOfBirth'));

        this.gender = new TitleValueElement(element.$('div.patient-information-'));
        this.status = new TitleValueElement(element.$('div.patient-information-'));
        this.weight = new TitleValueElement(element.$('div.patient-information-'));
        this.ssn = new TitleValueElement(element.$('div.patient-information-'));
        this.ethnicity = new TitleValueElement(element.$('div.patient-information-'));
        this.prefix = new TitleValueElement(element.$('div.patient-information-'));
        this.suffix = new TitleValueElement(element.$('div.patient-information-'));
        this.enterpriseId = new TitleValueElement(element.$('div.patient-information-'));
        this.mothersPid = new TitleValueElement(element.$('div.patient-information-'));
        this.numberOfPregnancies = new TitleValueElement(element.$('div.patient-information-'));
        this.converted = new TitleValueElement(element.$('div.patient-information-'));
        this.mergedToId = new TitleValueElement(element.$('div.patient-information-'));

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
                })
            })
        })
    }

    getDateOfBirth(): Promise<string> {
        return this.dateOfBirth.getTitle();
    }

    showMoreDetails() {
        if (this.arrowButton.isExpanded()) {
            return true;
        } else {
            return this.arrowButton.click();
        }
    }

    showLessDetails() {
        if (this.arrowButton.isExpanded()) {
            return this.arrowButton.click();
        } else {
            return true;
        }
    }

    isPresent(): Promise<boolean> {
        return this.title.isPresent();
    }

    expand(): Promise<any> {
        return this.isExpanded().then(function(isOpen) {
            if (isOpen) {
                return true;
            } else {
                return this.arrowButton.click();
            }
        })
    }

    contract(): Promise<any> {
        return this.isExpanded().then(function(isOpen) {
            if (isOpen) {
                return this.arrowButton.click();
            } else {
                return true;
            }
        })
    }

    isExpanded(): Promise<boolean> {
        return this.arrowButton.isExpanded();
    }

}


class DetailAccordionSection {

    private container: ElementFinder;
    label: ElementFinder;
    private arrowButton: ElementFinder;

    constructor() {
        this.container = $('div.titlebar div.detail-menu');
        this.label = this.container.$('div.accordion-label');
        this.arrowButton = this.container.$('span.glyphicon');
    }

    click(): Promise<any> {
        return this.arrowButton.click();
    }

    isExpanded(): Promise<boolean> {
        return this.arrowButton.getAttribute('class').then(function(arrowButtonClass) {
            return arrowButtonClass.indexOf('up') >= 0;
        });
    }

}
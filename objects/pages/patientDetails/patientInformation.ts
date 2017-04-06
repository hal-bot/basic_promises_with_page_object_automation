// Describes the section below the Patient Detail header and the tabs section

import {InfoButton} from "./class_infoButton";
import {TitleValueElement} from "../titleValueElement";
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

    specialNeeds_Button: InfoButton;
    notes_Button: InfoButton;
    txRx_Button: InfoButton;
    adr_Button: InfoButton;
    aby_Button: InfoButton;
    bloodType_Button: InfoButton;
    electronicXM_Button: InfoButton;
    specimenExpiration_Button: InfoButton;
    labs_Button: InfoButton;
    issuedProducts_Button: InfoButton;
    history_Button: InfoButton;

    // element will be the section of the site dedicated to the Patient Information section
    constructor(element) {
        this.title = element.$('h4');
        this.arrowButton = new DetailAccordionSection();

        this.mrn = new TitleValueElement(element.$(''));
        this.patientID = new TitleValueElement(element.$(''));
        this.lastName = new TitleValueElement(element.$(''));
        this.firstName = new TitleValueElement(element.$(''));
        this.middleName = new TitleValueElement(element.$(''));
        this.dateOfBirth = new TitleValueElement(element.$(''));

        this.gender = new TitleValueElement(element.$(''));
        this.status = new TitleValueElement(element.$(''));
        this.weight = new TitleValueElement(element.$(''));
        this.ssn = new TitleValueElement(element.$(''));
        this.ethnicity = new TitleValueElement(element.$(''));
        this.prefix = new TitleValueElement(element.$(''));
        this.suffix = new TitleValueElement(element.$(''));
        this.enterpriseId = new TitleValueElement(element.$(''));
        this.mothersPid = new TitleValueElement(element.$(''));
        this.numberOfPregnancies = new TitleValueElement(element.$(''));
        this.converted = new TitleValueElement(element.$(''));
        this.mergedToId = new TitleValueElement(element.$(''));

        this.specialNeeds_Button = new InfoButton(element.$(''));
        this.notes_Button = new InfoButton(element.$(''));
        this.txRx_Button = new InfoButton(element.$(''));
        this.adr_Button = new InfoButton(element.$(''));
        this.aby_Button = new InfoButton(element.$(''));
        this.bloodType_Button = new InfoButton(element.$(''));
        this.electronicXM_Button = new InfoButton(element.$(''));
        this.specimenExpiration_Button = new InfoButton(element.$(''));
        this.labs_Button = new InfoButton(element.$(''));
        this.issuedProducts_Button = new InfoButton(element.$(''));
        this.history_Button = new InfoButton(element.$(''));

    }

    getMRN(): Promise<string> {
        return this.mrn.getTitle();
    }

    getPatientNumber(): Promise<number> {
        return this.patientID.getTitle().then(function(value) {
            return Number(value);
        });
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

    }

    showLessDetails() {

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
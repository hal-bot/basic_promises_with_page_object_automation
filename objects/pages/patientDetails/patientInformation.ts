// Describes the section below the Patient Detail header and the tabs section

import {InfoButton} from "./class_infoButton";
import {TitleValueElement} from "../titleValueElement";

class PatientInformation {
    mrn: TitleValueElement;
    patientID: TitleValueElement;
    lastName: TitleValueElement;
    firstName: TitleValueElement;
    middleName: TitleValueElement;
    dateOfBirth: TitleValueElement;
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
        this.mrn = new TitleValueElement(element.$(''));
        this.patientID = new TitleValueElement(element.$(''));
        this.lastName = new TitleValueElement(element.$(''));
        this.firstName = new TitleValueElement(element.$(''));
        this.middleName = new TitleValueElement(element.$(''));
        this.dateOfBirth = new TitleValueElement(element.$(''));
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



}

import { ElementFinder, $ } from 'protractor';
import {PageHeader} from "./elements/pageHeader";
import {TitleValueElement} from "./elements/titleValueElement";
import {ArrowIcon} from "./elements/arrowIcon";
import {ElementFactory} from "../../utils/elementUtilities";
import {ColumnHeader} from "./elements/columnHeader";

export class PatientSearch {

    private initializePromise: Promise<void>;

    // the whole dashboard page, minus global header and footer
    private container: ElementFinder;

    header: PageHeader;
    searchInfoSection: PatientSearchInfoSection;
    searchResults: PatientSearchResults;

    constructor() {
        // console.log("  In constructor for 'PatientSearch'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'PatientSearch'");

        if(!this.initializePromise) {
            // console.log("     ... Initializing 'PatientSearch'");
            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.container = await $('div.dashboard-content');

                this.header = await ElementFactory.make(PageHeader, null);
                this.searchInfoSection = await ElementFactory.make(PatientSearchInfoSection,
                    this.container.$('div.patient-search-criteria'));
                this.searchResults = await ElementFactory.make(PatientSearchResults,
                    this.container.$('div.patient-search-results'));

                return resolve();
            }).then(async (resolve)=> {
                await this.header.initialize();
                await this.searchInfoSection.initialize();
                // not initializing searchResults now b/c there shouldn't be any results

                return resolve;
            });
        }

        return this.initializePromise;
    }

    async isPresent(): Promise<boolean> {
        await this.initialize();
        return this.container.isPresent();
    }

    // NOTE: this is kinda hacky.  Gotta find a better way to do this w/out having to initialize everything twice
    async enterPatientId(text: string): Promise<void|boolean> {
        await this.initialize();
        return this.searchInfoSection.isPresent().then(async (result)=> {
            return result
                ? this.searchInfoSection.patientID.input(text)
                : false;
        });
    }

}

//TODO: add ability to expand patient search to Advanced section
//TODO: add expanded search options
class PatientSearchInfoSection {

    private initializePromise: Promise<void>;

    headerTitle: ElementFinder;
    searchType: ElementFinder;
    arrowButton: ArrowIcon;

    mrn: TitleValueElement;
    patientID: TitleValueElement;
    lastName: TitleValueElement;
    firstName: TitleValueElement;
    middleName: TitleValueElement;
    dateOfBirth: TitleValueElement;     //will probably have to change this to something that handles dates
    specimenID: TitleValueElement;
    gender: TitleValueElement;          //will probably have to change this to something that handles dropdowns
    status: TitleValueElement;          //will probably have to change this to something that handles dropdowns
    orderID: TitleValueElement;
    enterpriseID: TitleValueElement;

    searchButton: ElementFinder;


    constructor(private container: ElementFinder) {
        // console.log("  In constructor for 'PatientSearchInfoSection'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'PatientSearchInfoSection'");

        if(!this.initializePromise) {
            console.log("     ... Initializing 'PatientSearchInfoSection'");
            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.headerTitle = await this.container.$('div.titlebar h4');
                this.searchType = await this.container.$('div.titlebar div.accordion-label');
                this.arrowButton = await ElementFactory.make(ArrowIcon, $('div.titlebar div.accordion-btn'));

                this.mrn = await ElementFactory.make(TitleValueElement, this.container.$('div.patientSearch-form-mrn'));
                this.patientID = await ElementFactory.make(TitleValueElement, this.container.$('div.patientSearch-form-patientId'));
                this.lastName = await ElementFactory.make(TitleValueElement, this.container.$('div.patientSearch-form-lastName'));
                this.firstName = await ElementFactory.make(TitleValueElement, this.container.$('div.patientSearch-form-firstName'));
                this.middleName = await ElementFactory.make(TitleValueElement, this.container.$('div.patientSearch-form-middleName'));
                this.dateOfBirth = await ElementFactory.make(TitleValueElement, this.container.$('div.patientSearch-form-dateOfBirth'));
                this.specimenID = await ElementFactory.make(TitleValueElement, this.container.$('div.patientSearch-form-specimenId'));
                this.gender = await ElementFactory.make(TitleValueElement, this.container.$('div.patientSearch-form-gender'));
                this.status = await ElementFactory.make(TitleValueElement, this.container.$('div.patientSearch-form-status'));
                this.orderID = await ElementFactory.make(TitleValueElement, this.container.$('div.patientSearch-form-orderId'));
                this.enterpriseID = await ElementFactory.make(TitleValueElement, this.container.$('div.patientSearch-form-enterpriseId'));

                this.searchButton = await this.container.$('button.search-button');

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async isPresent(): Promise<boolean> {
        await this.initialize();
        return this.container.isPresent();
    }

}

// TODO: Get the rows of results
class PatientSearchResults {

    private initializePromise: Promise<void>;

    title: ElementFinder;
    resultsCount: ElementFinder;

    mrn: ColumnHeader;
    patientID: ColumnHeader;
    lastName: ColumnHeader;
    firstName: ColumnHeader;
    middleName: ColumnHeader;
    cp: ColumnHeader;
    dob: ColumnHeader;
    gender: ColumnHeader;

    firstSelectButton: ElementFinder;   // THIS IS A HACK!!  ONCE ROWS OF RESULTS ARE RETURNED, GET RID OF THIS SHAMEFUL THING

    //results: PatientSearchResultRow[];

    constructor(private container: ElementFinder) {
        // console.log("  In constructor for 'PatientSearchResults'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'PatientSearchResults'");

        if(!this.initializePromise) {
            console.log("     ... Initializing 'PatientSearchResults'");
            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.title = await this.container.$('div.titlebar span.title');
                this.resultsCount = await this.container.$('div.titlebar span.subtitle');

                this.mrn = await ElementFactory.make(ColumnHeader, this.container.$('div.patientSearch-results-header-mrn'));
                this.patientID = await ElementFactory.make(ColumnHeader, this.container.$('div.patientSearch-results-header-patientId'));
                this.lastName = await ElementFactory.make(ColumnHeader, this.container.$('div.patientSearch-results-header-lastName'));
                this.firstName = await ElementFactory.make(ColumnHeader, this.container.$('div.patientSearch-results-header-firstName'));
                this.middleName = await ElementFactory.make(ColumnHeader, this.container.$('div.patientSearch-results-header-middleName'));
                this.cp = await ElementFactory.make(ColumnHeader, this.container.$('div.patientSearch-results-header-cp'));
                this.dob = await ElementFactory.make(ColumnHeader, this.container.$('div.patientSearch-results-header-dob'));
                this.gender = await ElementFactory.make(ColumnHeader, this.container.$('div.patientSearch-results-header-gender'));

                // this.results: PatientSearchResultRow[];
                this.firstSelectButton = await this.container.$('td.patientSearch-results-row-selectButton a.button');

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async isPresent(): Promise<boolean> {
        await this.initialize();
        return this.container.isPresent();
    }

}
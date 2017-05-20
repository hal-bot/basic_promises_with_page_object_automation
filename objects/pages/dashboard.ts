import { ElementFinder, $ } from 'protractor';
import {ElementFactory, ElementMethods} from "../../utils/elementUtilities";
import {PageHeader} from "./elements/pageHeader";
import {async} from "q";

export class Dashboard {

    private initializePromise: Promise<void>;

    // the whole dashboard page, minus global header and footer
    private container: ElementFinder;

    header: PageHeader;
    patientSearchButton: DashboardButton;
    specimenButton: DashboardButton;
    selectVisitButton: DashboardButton;

    constructor() {
        // console.log("  In constructor for 'Dashboard'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'Dashboard'");

        if(!this.initializePromise) {
            ElementMethods.initializationMessage(null, 'Dashboard');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.container = await $('div.dashboard-content');

                this.header = await ElementFactory.make(PageHeader, null);
                this.patientSearchButton = await ElementFactory.make(DashboardButton,
                    this.container.$('app-dashboard-button.dashboardButton-patientSearch'));
                this.specimenButton = await ElementFactory.make(DashboardButton,
                    this.container.$('app-dashboard-button.dashboardButton-specimen'));
                this.selectVisitButton = await ElementFactory.make(DashboardButton,
                    this.container.$('app-dashboard-button.dashboardButton-selectVisit'));

                return resolve();
            }).then(async (resolve)=> {
                await this.header.initialize();
                this.patientSearchButton.initialize();
                this.specimenButton = await ElementFactory.make(DashboardButton,
                    this.container.$('app-dashboard-button.dashboardButton-specimen'));
                this.selectVisitButton

                return resolve;
            });
        }

        return this.initializePromise;
    }

    // creating this so I don't have to create a new Dashboard instance just to click the Patient Search button
    static async clickPatientSearch(): Promise<void> {
        return ElementFactory.make(DashboardButton, $('app-dashboard-button.dashboardButton-patientSearch')).then((patientSearchButton)=> {
            return patientSearchButton.click();
        });
    }
}

class DashboardButton {

    private initializePromise: Promise<void>;

    icon: ElementFinder;
    title: ElementFinder;

    constructor(private container: ElementFinder) {
        // console.log("  In constructor for 'DashboardButton'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'DashboardButton'");

        if(!this.initializePromise) {
            ElementMethods.initializationMessage(null, 'DashboardButton');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.icon = await this.container.$('img');
                this.icon = await this.container.$('span.button-title');

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async isPresent(): Promise<boolean> {
        await this.initialize();
        return this.container.isPresent();
    }

    async click(): Promise<void> {
        await this.initialize();
        return this.title.click();
    }

}
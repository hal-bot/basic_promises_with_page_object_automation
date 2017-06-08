// Describes the Visit Details modal that appears when a user has clicked the 'Details' button
// (which is seen on a Patient Information page's "Visit" tab section in the data grid

import {ElementFinder, $} from "protractor";
import {TabVisitInformation} from "./tabVisitInformation";
import {TabDiagnosis} from "./tabDiagnosis";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";
import {Modal} from "../../global/class_Modal";

export class VisitDetailsModal extends Modal {

    visitDate: ElementFinder;
    editVisit: ElementFinder;

    private actionMessage: ElementFinder;      // occurs once an action has been performed

    visitInformationSection: TabVisitInformation;
    diagnosisSection: TabDiagnosis;

    constructor() {
        // console.log("  In constructor for 'VisitDetailsModal'");
        super('span.detailsModal-header-title', );
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'VisitDetailsModal'");

        if(!this.initializePromise) {
            ElementMethods.initializationMessage(null, 'VisitDetailsModal');

            await this.waitUntilModalIsLoaded();

            return this.initializePromise = new Promise<void>(async (resolve) => {
                await super.initialize();
                this.visitDate = await this.container.$('span.detailsModal-header-date');

                this.visitInformationSection = await ElementFactory.make(TabVisitInformation, this.container.$('li.visitModal-tab-info'));
                this.diagnosisSection = await ElementFactory.make(TabDiagnosis, this.container.$('li.visitModal-tab-diagnosis'));

                return resolve();
            }).then(async (resolve)=> {
                console.log("\tNow initializing all elements just defined for 'VisitDetailsModal'");
                await this.visitInformationSection.initialize();
                console.log("HERE 7");
                return resolve;
            });
        }

        return this.initializePromise;
    }
}

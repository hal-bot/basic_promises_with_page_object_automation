// Describes the Visit Details modal that appears when a user has clicked the 'Details' button
// (which is seen on a Patient Information page's "Visit" tab section in the data grid

import {ElementFinder, $} from "protractor";
import {TabVisitInformation} from "./tabVisitInformation";
import {TabDiagnosis} from "./tabDiagnosis";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";
import {async} from "q";
import {NavigationMethods} from "../../../../utils/navigationUtilities";

export class VisitDetailsModal {

    private initializePromise: Promise<void>;

    container: ElementFinder;

    title: ElementFinder;
    visitDate: ElementFinder;
    editVisit: ElementFinder;
    closeButton: ElementFinder;

    private actionMessage: ElementFinder;      // occurs once an action has been performed

    visitInformationSection: TabVisitInformation;
    diagnosisSection: TabDiagnosis;

    constructor() {
        // console.log("  In constructor for 'VisitDetailsModal'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'VisitDetailsModal'");

        if(!this.initializePromise) {
            ElementMethods.initializationMessage(null, 'VisitDetailsModal');

            await NavigationMethods.waitForLoadCompletion('div.modal-content');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.container = await $('modal-content');     // use this to ensure the elements found below are only in the container

                this.title = await this.container.$('span.detailsModal-header-title');
                this.visitDate = await this.container.$('span.detailsModal-header-date');
                // this.editVisit = await this.container.$('');                               // Not yet instantiated
                this.closeButton = await this.container.$('div.close-button');

                this.visitInformationSection = await ElementFactory.make(TabVisitInformation, this.container.$('tab-content'));

                return resolve();
            }).then(async (resolve)=> {
                console.log("\tNow initializing all elements just defined for 'VisitDetailsModal'");
                await this.visitInformationSection.initialize();
                return resolve;
            });
        }

        return this.initializePromise;
    }


    async setDiagnosisInfo() {
        await this.initialize();
        return ElementFactory.make(TabDiagnosis, this.container.$('tab-content')).then((element)=> {
            return this.diagnosisSection = element;
        });
    }

    // TODO - bring back code below in when needed
    // async editTheVisit() {
    //     await this.initialize();
    //
    //     let cancelButton = await this.container.$('');
    //     let saveButton = await this.container.$('');
    //
    //     this.editVisit.click().then(()=> {
    //         this.setActionMessage();
    //         expect<any>(this.getEditResultText()).toBe("Editing Visit");
    //
    //         /** TODO: Add the code here to edit the visit
    //          *      - update the above to accept an array of arguments
    //          *      - for each argument
    //          *          - determine what it is that they want to edit
    //          *          - input that into the proper input field
    //          */
    //
    //         saveButton.click();
    //
    //         this.setActionMessage();
    //         expect<any>(this.getEditResultText()).toBe("Visit Changes Saved");
    //     });
    // }
    //
    // setActionMessage() {
    //     this.actionMessage = $('');
    // }
    //
    // getEditResultText(): Promise<string> {
    //     // if (this.actionMessage.isPresent()) {
    //     //     // return this.actionMessage.getText();
    //     //     return new Promise(()=> { this.actionMessage.getText(); });
    //     // } else {
    //     //     return new Promise(()=> { return 'No result set' });
    //     // }
    //     return new Promise(()=> {
    //         if (this.actionMessage.isPresent()) {
    //             return this.actionMessage.getText();
    //         } else {
    //             return 'No result set';
    //         }
    //     });
    // }

    isPresent(): Promise<boolean> {
        return new Promise(()=> { this.container.isPresent(); });
        // return this.container.isPresent();
    }
}

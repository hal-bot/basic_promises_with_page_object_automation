// Describes the Order Details modal that appears when a user has clicked a linked Order ID
// (which is seen on a Patient Information page's "Orders" tab section in the data grid

import {ElementFinder} from "protractor";
import {ElementFactory} from "../../../../utils/elementUtilities";
import {Modal} from "../../global/class_Modal";
import {GeneralUtilities} from "../../../../utils/generalUtilities";
import {OrderDetailsModalTabProfile} from "./orderDetailsModal_tabProfile";
import {OrderDetailsModalTabItems} from "./orderDetailsModal_tabItems";

export class OrderDetailsModal extends Modal {

    orderIdNumber: ElementFinder;

    profileTabSection: OrderDetailsModalTabProfile;
    itemsTabSection: OrderDetailsModalTabItems;

    constructor() {
        // console.log("  In constructor for 'OrderDetailsModal'");
        super('div.modal-header-content span.title');
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'OrderDetailsModal'");

        if(!this.initializePromise) {
            await GeneralUtilities.initializationMessage(null, 'OrderDetailsModal');

            await this.waitUntilModalIsLoaded();

            return this.initializePromise = new Promise<void>(async (resolve) => {
                await super.baseInitialize();

                this.orderIdNumber = await this.container.$('span.subtitle');
                this.profileTabSection = await ElementFactory.make(OrderDetailsModalTabProfile, this.container.$('li.orderModal-tab-profile'));
                this.itemsTabSection = await ElementFactory.make(OrderDetailsModalTabItems, this.container.$('li.orderModal-tab-items'));

                return resolve();
            }).then(async (resolve)=> {
                // console.log("\tNow initializing all elements just defined for 'OrderDetailsModal'");
                await this.profileTabSection.initialize();
                await this.itemsTabSection.baseInitialize();
                return resolve;
            });
        }

        return this.initializePromise;
    }
}
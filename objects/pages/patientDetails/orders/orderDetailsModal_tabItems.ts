// Describes the "Items" tabbed section of the 'Orders Details' pop-up modal

import { ColumnHeader } from "../../elements/columnHeader";
import { ElementFinder } from "protractor";
import {ElementFactory, ElementMethods} from "../../../../utils/elementUtilities";
import {ModalTab} from "../../global/class_ModalTab";
import {NavigationMethods} from "../../../../utils/navigationUtilities";
import {GeneralUtilities} from "../../../../utils/generalUtilities";

export class OrderDetailsModalTabItems extends ModalTab{

    contentContainer: ElementFinder;

    itemHeader: ColumnHeader;
    statusHeader: ColumnHeader;
    typeHeader: ColumnHeader;
    itemIdHeader: ColumnHeader;
    quantityHeader: ColumnHeader;
    dueDateAndTimeHeader: ColumnHeader;
    referenceItemHeader: ColumnHeader;
    completionDateAndTimeHeader: ColumnHeader;

    items: ItemRow[];

    private itemColumnHeaderCSSstring: string;

    constructor(tab: ElementFinder) {
        // console.log("  In constructor for 'OrderDetailsModalTabItems'");
        super(tab);
        this.itemColumnHeaderCSSstring = 'th.orderitem-tableHeader-itemNumber';
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'OrderDetailsModalTabItems'");

        if(!this.initializePromise) {

            await super.baseInitialize();
            // await GeneralUtilities.initializationMessage(this.actualTab, 'OrderDetailsModalTabItems');

            return this.initializePromise = new Promise<void>(async (resolve) => {

                this.itemHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('div.orderitem-tableHeader-itemNumber'));
                this.statusHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('div.orderitem-tableHeader-status'));
                this.typeHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('div.orderitem-tableHeader-type'));
                this.itemIdHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('div.orderitem-tableHeader-itemId'));
                this.quantityHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('div.orderitem-tableHeader-quantity'));
                this.dueDateAndTimeHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('div.orderitem-tableHeader-dueDateTime'));
                this.referenceItemHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('div.orderitem-tableHeader-referenceItem'));
                this.completionDateAndTimeHeader = await ElementFactory.make(ColumnHeader, this.contentContainer.$('div.orderitem-tableHeader-completionDateTime'));

                return this.setItemsArray().then(async() => {
                    // console.log("\tNow initializing all elements just defined for 'OrderDetailsModalTabItems'");

                    await this.itemHeader.initialize();
                    await this.statusHeader.initialize();
                    await this.typeHeader.initialize();
                    await this.itemIdHeader.initialize();
                    await this.quantityHeader.initialize();
                    await this.dueDateAndTimeHeader.initialize();
                    await this.referenceItemHeader.initialize();
                    await this.completionDateAndTimeHeader.initialize();

                    return resolve();
                });
            });
        }

        return this.initializePromise;
    }

    // This will get the item rows and put them into the 'items' array
    async setItemsArray(): Promise<any> {
        // console.log("   In 'setItemsArray()' for 'OrderDetailsModalTabItems'");
        return ElementMethods.getCustomElementArray('tr.orderitem-tableRow', ItemRow).then(async (itemArray)=> {
            let resolvingPromise;
            this.items = await itemArray;

            for (let i = 0; i < this.items.length; i++) {
                // console.log("\t\tInitializing item row " + i);
                resolvingPromise = await this.items[i].initialize();
            }

            return resolvingPromise;
        });
    }

    async clickTab(): Promise<void> {
        // console.log("   In 'clickTab()' for 'OrderDetailsModalTabItems'");
        return super.baseClickTab().then(async ()=> {
            await NavigationMethods.waitForLoadCompletion(this.itemColumnHeaderCSSstring);
            return this.initialize();
        })
    }
}

export class ItemRow {
    private initializePromise: Promise<void>;

    item: ElementFinder;
    status: ElementFinder;
    type: ElementFinder;
    itemId: ElementFinder;
    quantity: ElementFinder;
    dueDateAndTime: ElementFinder;
    referenceItem: ElementFinder;
    completionDateAndTime: ElementFinder;

    constructor(private element:ElementFinder) {
        // console.log("  In constructor for 'ItemsRow'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'ItemsRow'");

        if(!this.initializePromise) {

            // await GeneralUtilities.initializationMessage(this.element, 'ItemsRow');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.item = await this.element.$('td.orderitem-tableRow-itemNumber');
                this.status = await this.element.$('td.orderitem-tableRow-statusCode');
                this.type = await this.element.$('td.orderitem-tableRow-itemTypeCode');
                this.itemId = await this.element.$('td.orderitem-tableRow-itemId');
                this.quantity = await this.element.$('td.orderitem-tableRow-quantity');
                this.dueDateAndTime = await this.element.$('td.orderitem-tableRow-dueDateTime');
                this.referenceItem = await this.element.$('td.orderitem-tableRow-referenceItem');
                this.completionDateAndTime = await this.element.$('td.orderitem-tableRow-completionDateTime');

                return resolve();
            });
        }

        return this.initializePromise;
    }
}
import {ElementFinder} from 'protractor';
import {ElementMethods} from "../../../utils/elementUtilities";

export class TitleValueElement {

    title: ElementFinder;
    private value: ElementFinder;

    private initializePromise: Promise<void>;

    constructor(private element: ElementFinder) {
        // console.log("   In constructor for 'TitleValueElement'");
    }

    async initialize() {
        // console.log("    In 'initialize' for 'TitleValueElement'");

        if(!this.initializePromise) {
            // await ElementMethods.initializationMessage(this.element, 'TitleValueElement');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.title = await this.element.$('label');
                this.value = await this.element.$('input');

                return resolve();
            });
        }

        return this.initializePromise;
    }

    async getTitle(): Promise<string> {
        await this.initialize();
        return this.title.getText();
    }

    async getValue(): Promise<string> {
        await this.initialize();
        return this.value.getAttribute('value');
    }

    async isPresent(): Promise<boolean> {
        await this.initialize();
        return this.title.isPresent();
    }

    async getTitleElement(): Promise<ElementFinder> {
        await this.initialize();
        return this.title;
    }

    async getValueElement(): Promise<ElementFinder> {
        await this.initialize();
        return this.value;
    }

    async input(text: string): Promise<void> {
        // console.log("   In 'input(text)' ... text = " + text);
        await this.initialize();
        return this.value.sendKeys(text);
    }
}

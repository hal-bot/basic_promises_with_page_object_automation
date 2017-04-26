import {ElementFinder} from 'protractor';

export class TitleValueElement {
    private title: ElementFinder;
    private value: ElementFinder;

    private initializePromise: Promise<void>;

    constructor(private element: ElementFinder) {
        // console.log("   In constructor for 'TitleValueElement'");
    }

    private async initialize() {
        // console.log("    In 'initialize' for 'TitleValueElement'");

        if(!this.initializePromise) {
            console.log("     ... Initializing 'TitleValueElement'");
            this.initializePromise = new Promise<void>(async (resolve) => {
                console.log(this.element);
                this.element.$('label').getText().then((text) => {
                    console.log(`  the element's text = ${text}`);
                });

                this.title = await this.element.$('label');
                this.value = await this.element.$('input');

                return resolve();
            });
        }
    }

    async getTitle(): Promise<string> {
        await this.initialize();
        return this.title.getText();
    }

    async getValue(): Promise<string> {
        await this.initialize();
        return this.value.getTitle();
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
}

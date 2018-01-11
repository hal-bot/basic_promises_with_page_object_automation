import {ElementFinder} from 'protractor';

export class ListGridItem {

    private image: ElementFinder;
    private title: ElementFinder;

    private initializePromise: Promise<void>;

    constructor(private itemContainer: ElementFinder) {
    }

    async initialize(): Promise<void> {
        if(!this.initializePromise) {
            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.image = await this.itemContainer.$('div.content-item__primary-inner');
                this.title = await this.itemContainer.$('h3.content-item__title');

                return resolve();
            });
        }
        return this.initializePromise;
    }

    async isPresent(): Promise<boolean> {
        await this.initialize();
        return this.image.isPresent();
    }

    async getTitle(): Promise<string> {
        await this.initialize();
        return this.title.getText();
    }

    async click(): Promise<void> {
        await this.initialize();
        return this.itemContainer.$('a').click();
    }
}


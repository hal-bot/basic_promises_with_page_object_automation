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
                this.image = this.itemContainer.$('div.content-item__primary-inner');
                this.title = this.itemContainer.$('h3.content-item__title');

                return resolve();
            });
        }
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


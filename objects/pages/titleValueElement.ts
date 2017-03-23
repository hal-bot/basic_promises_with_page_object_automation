import { ElementFinder, browser, by, element, $ } from 'protractor';

export class TitleValueElement {
    title: ElementFinder;
    value: ElementFinder;

    constructor(element: ElementFinder) {
        this.title = element.$('');
        this.value = element.$('');
    }

    getTitle(): Promise<string> {
        return this.title.getText();
    }

    getValue(): Promise<number> {
        return this.value.getTitle().then(function(valueNumber) {
            return Number(valueNumber);
        });
    }
}

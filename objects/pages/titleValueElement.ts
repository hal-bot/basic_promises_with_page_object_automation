import { ElementFinder } from 'protractor';

export class TitleValueElement {
    title: ElementFinder;
    value: ElementFinder;

    constructor(element: ElementFinder) {
        this.title = element.$('label.content-label');
        this.value = element.$('input.content-input');
    }

    getTitle(): Promise<string> {
        return this.title.getText();
    }

    getValue(): Promise<string> {
        return this.value.getTitle();
    }
}

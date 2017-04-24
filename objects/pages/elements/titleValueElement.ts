import { ElementFinder } from 'protractor';

export class TitleValueElement {
    title: ElementFinder;
    value: ElementFinder;

    constructor(element: ElementFinder) {
        this.title = element.$('label.content-label');
        this.value = element.$('input.content-input');
    }

    getTitle(): Promise<string> {
        return new Promise(()=> { this.title.getText(); });
    }

    getValue(): Promise<string> {
        return this.value.getTitle();
    }

    isPresent(): Promise<boolean> {
        return new Promise(()=> { this.title.isPresent(); });
    }
}

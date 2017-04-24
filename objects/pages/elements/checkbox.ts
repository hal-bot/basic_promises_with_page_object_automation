import {ElementFinder} from 'protractor';

export class Checkbox {
    label: ElementFinder;
    private box: ElementFinder;

    constructor(container) {
        this.label = container.$('label');
        this.box = container.$('input');
    }

    isPresent(): Promise<boolean> {
        return new Promise(()=> { this.box.isPresent(); });
    }

    select() {
        return this.box.isSelected()
            ? true
            : this.box.click();
    }

    deselect() {
        return this.box.isSelected()
            ? this.box.click()
            : true;
    }

    getLocation(): Promise<any> {
        return new Promise(()=> { this.box.getLocation(); });
    }

    attr(value: string): Promise<boolean> {
        return this.box.attr(value);
    }
}
import {ElementFinder} from 'protractor';

export class Checkbox {
    label: ElementFinder;
    private box: ElementFinder;

    constructor(container) {
        this.label = container.$('label');
        this.box = container.$('input');
    }

    isPresent(): Promise<boolean> {
        return this.box.isPresent();
    }

    select() {
        if (this.box.isSelected()) {
            return true;
        } else {
            return this.box.click();
        }
    }

    deselect() {
        if (this.box.isSelected()) {
            return this.box.click();
        } else {
            return true;
        }
    }

    getLocation(): Promise<any> {
        return this.box.getLocation();
    }

    attr(value: string): Promise<boolean> {
        return this.box.attr(value);
    }
}
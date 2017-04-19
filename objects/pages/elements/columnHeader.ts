import { ElementFinder } from 'protractor';
import { arrowIcon } from "./arrowIcon";


export class ColumnHeader {
    headerElement: ElementFinder;
    arrow: arrowIcon;

    constructor(element: ElementFinder) {
        this.headerElement = element;
        this.arrow = new arrowIcon(element);
    }

    getHeaderTitle(): Promise<string> {
        return this.headerElement.getText();
    }

    isPresent(): Promise<boolean> {
        return this.headerElement.isPresent();
    }

    click(): Promise<void> {
        return this.headerElement.click();
    }
}
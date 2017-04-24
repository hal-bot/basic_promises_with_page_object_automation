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
        return new Promise(()=> { this.headerElement.getText(); });
    }

    isPresent(): Promise<boolean> {
        return new Promise(()=> { this.headerElement.isPresent(); });
    }

    click(): Promise<any> {
        return new Promise(()=> { this.headerElement.click(); });
    }
}
import { ElementFinder, browser, by, element, $ } from 'protractor';
import {arrowIcon} from "./arrowIcon";


export class ColumnHeader {
    headerElement: ElementFinder;
    arrow: arrowIcon;

    constructor(element: ElementFinder) {
        this.headerElement = element;
        this.arrow = new arrowIcon(element);
    }

    getHeaderTitle(): object {
        return this.headerElement.getText();
    }
}
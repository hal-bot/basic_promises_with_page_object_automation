import {arrowIcon} from "./arrowIcon";

export class ColumnHeader {
    headerElement: object;
    arrow: arrowIcon;

    constructor(element: object) {
        this.headerElement = element;
        this.arrow = new arrowIcon(element);
    }

    getHeaderTitle(): object {
        return this.headerElement.getText();
    }
}
import { $ } from 'protractor';

export class arrowIcon {
    icon: object;

    constructor(headerElement) {
        this.icon = headerElement.$('');
    }

    arrowDirection(): string {
        // TODO: Add code here
        /**
         * Determine what denotes the arrow's direction
         * Return the direction
         */
    }
}
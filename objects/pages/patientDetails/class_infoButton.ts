import { ElementFinder } from 'protractor';

export class InfoButton{
    buttonElement: ElementFinder;

    constructor(element: ElementFinder) {
        this.buttonElement = element;
    }

    getButtonText(): Promise<string> {
        return this.buttonElement.getText();
    }

    isItActivated(): boolean {
        // TODO: find out how to determine if the button has been colored

        return false;
    }

    getButtonColor(): string {
        // TODO: figure out how to determine the color of the button

        return "PUT CODE HERE";
    }
}
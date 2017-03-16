

class InfoButton{
    buttonElement: object;

    constructor(element) {
        this.buttonElement = element;
    }

    getButtonText(): string {
        return this.buttonElement.getText();
    }

    isItActivated(): boolean {
        // TODO: find out how to determine if the button has been colored
    }

    getButtonColor(): string {
        // TODO: figure out how to determine the color of the button
    }
}
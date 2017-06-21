
import {ElementFinder} from "protractor";

export class GeneralUtilities {

    // This will output the CSS class of the element passed in, along with the class type that's being initialized
    static initializationMessage(element: ElementFinder, classBeingInitialized: string = "NEEDS INFO"): Promise<void> {
        return new Promise<void>((resolve) => {
            if (element === null) {
                return resolve(console.log(`     ... Initializing basic details of '${classBeingInitialized}'`));
            } else {
                return element.getAttribute('class').then((elementClass) => {
                    return resolve(console.log(`     ... Initializing basic details of '${classBeingInitialized}' for element "${elementClass}"`));
                });
            }
        });
    }

}
import {$, browser, ElementFinder} from "protractor";
import {GeneralUtilities} from "../../utils/generalUtilities";

export class LoginPage {
    private initializePromise: Promise<void>;

    title: ElementFinder;
    loginTitle: ElementFinder;
    loginIcon: ElementFinder;
    usernameTitle: ElementFinder;
    usernameInputBox: ElementFinder;
    passwordTitle: ElementFinder;
    passwordInputBox: ElementFinder;
    loginButton: ElementFinder;

    constructor() {
        // console.log("  In constructor for 'LoginPage'");
    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for 'LoginPage'");

        if(!this.initializePromise) {
            // await GeneralUtilities.initializationMessage(null, 'LoginPage');

            return this.initializePromise = new Promise<void>(async (resolve) => {
                this.title = await $('div.login img');
                this.loginTitle = await $('div.login-header');
                this.loginIcon = await $('div.login-icon img');
                this.usernameTitle = await $('label.login-username');
                this.usernameInputBox = await $("#username");
                this.passwordTitle = await $('label.login-password');
                this.passwordInputBox = await $("#password");
                this.loginButton = await $('div.login-footer button');

                return resolve();
            });
        }
        return this.initializePromise;
    }

    // This will log into the site
    async login(username: string = "", password: string = ""): Promise<void> {
        if ((username === "") || (password === "") ) {
            await browser.getCurrentUrl().then((url)=> {
                // console.log("  URL = " + url);
                if (url.includes("dev.sttx40")) {
                    username = "dev.automation";
                    password = "dI,h/p_2vx3N";
                } else if (url.includes("qc.sttx40")) {
                    username = "qc.automation";
                    password = "3Ppd0ae3uHir";
                } else {
                    throw `Sorry - don't have login info for '${url}'`;
                }
            });
        }
        // console.log(`   In 'login(${username}, ${password})'`);
        await this.usernameInputBox.sendKeys(username);
        await this.passwordInputBox.sendKeys(password);
        return this.loginButton.click().then(()=> {
            return $('div.error-message').isPresent().then((errorMessagePresent)=> {
                if (errorMessagePresent) {
                    throw "Credentials for login didn't work - CANNOT PROCEED!";
                } else {
                    // return console.log("Done logging in...");
                }
            });
        });
    }

}

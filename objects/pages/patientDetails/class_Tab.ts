import {$, browser, ElementFinder} from 'protractor';
import {ElementMethods} from "../../../utils/elementUtilities";

export abstract class Tab {

    actualTab: ElementFinder;           // the actual tab that is selected      Ex: Visit
    tabContentContainer: ElementFinder; // the container for the tab content
    title: ElementFinder;               // the title of the tab                 Ex: Visit Information
    pages: ElementFinder[];             // the pages at the bottom of the container
    leftArrow: ElementFinder;
    rightArrow: ElementFinder;


    constructor(private tabElement: ElementFinder) {

    }

    async initialize(): Promise<void> {
        // console.log("   In 'initialize' for abstract class 'Tab'");

        return new Promise<void>(async (resolve) => {

            this.actualTab = await this.tabElement;
            this.tabContentContainer = await $('div.tab-content');
            this.title = await this.tabContentContainer.$('span.tab-title');

            return this.setPages().then(()=> {
                return resolve();
            });
        });
    }

    // This will clear out the current 'pages' array and then get the array rows
    async setPages(): Promise<any[]> {
        // console.log("   In 'setPages()'");
        return ElementMethods.getCustomElementArray('tab.active li.page-item', 'ElementFinder').then((pagesArray)=> {
            // console.log(`     Found ${pagesArray.length} pagination elements`);
            this.leftArrow = pagesArray[0];
            this.rightArrow = pagesArray[-1];
            return this.pages = pagesArray.slice(1, -1);
        });
    }

    async getTabTitle(): Promise<string> {
        return this.actualTab.getText();
    }

    // Some tabs have a number next to the title.  Return only that.  If there is no number, return -1
    // getTabCount() {
    // // getTabCount(): Promise<number> {
    //     // TODO: SET UP PROMISE STUFF HERE
    //     if (!this.pages.isPresent()) {
    //         // let deferred = promise.defer();
    //         // deferred.promise = -1;
    //         // return deferred.promise;
    //     } else {
    //         return this.pages.getText().then(function(count) {
    //             return Number(count);
    //         });
    //     }
    // }

    async getSectionTitle(): Promise<string> {
        return this.title.getText();
    }

    // async getCurrentPageNumber(): number {
    //     /**
    //      * TODO - Figure out how to determine the current page number
    //      * Return it
    //      */
    //     return -1;
    // }

    async getNumberOfTotalPages(): Promise<number> {
        /**
         * TODO - Figure out how to determine the total number of pages
         * Return it
         */
        return new Promise<number>((resolve)=> {
            return resolve(this.pages.length);
        });
    }

    // async goToNextPage() {
    //     // TODO: write this code
    //     /**
    //      * If the current page is not the last page
    //      * Click the next page
    //      */
    // }

    // async goToPreviousPage() {
    //     // TODO: write this code
    //     /**
    //      * If the current page is not the first page
    //      * Click the previous page
    //      */
    // }

    // async gotToPageNumber(pageNumber: number) {
    //     // TODO: write this code
    //     /**
    //      * If page to go to is not the current page
    //      * and that page number is viable
    //      * go to that page
    //      */
    // }

    async isSelected(): Promise<boolean> {
        return this.actualTab.getAttribute('class').then( function(tabClass) {
            return tabClass.indexOf('active') >= 0;
        });
    }
}
import {$, ElementFinder} from 'protractor';
import {ElementMethods} from "../../../utils/elementUtilities";

export abstract class PageTab {

    protected initializePromise: Promise<void>;

    actualTab: ElementFinder;           // the actual tab that is selected      Ex: Visit
    tabContentContainer: ElementFinder; // the container for the tab content
    title: ElementFinder;               // the title of the tab                 Ex: Visit Information

    pages: ElementFinder[];             // the pages at the bottom of the container
    leftArrow: ElementFinder;
    rightArrow: ElementFinder;

    constructor(private tabElement: ElementFinder) {
        // console.log("   In constructor for abstract class 'PageTab'");
    }

    async baseInitialize(): Promise<void> {
        // console.log("   In 'baseInitialize()' for abstract class 'PageTab'");

        return new Promise<void>(async (resolve) => {

            this.actualTab = await this.tabElement;
            this.tabContentContainer = await $('div.tab-content tab.active');
            this.title = await this.tabContentContainer.$('span.tab-title');

            await this.setPages();
            return resolve();
        });
    }

    // This will clear out the current 'pages' array and then get the array rows
    async setPages(): Promise<any[]> {
        // console.log("   In 'setPages()' for abstract class 'PageTab'");
        return ElementMethods.getCustomElementArray('tab.active li.page-item', 'ElementFinder').then(async (pagesArray)=> {
            // console.log(`     Found ${pagesArray.length} pagination elements`);
            this.leftArrow = await pagesArray[0];
            this.rightArrow = await pagesArray[pagesArray.length-1];
            return this.pages = await pagesArray.slice(1, pagesArray.length-1);
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
    //         return this.pages.getText().then((count)=> {
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
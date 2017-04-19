import { $, $$, ElementFinder } from 'protractor';

export abstract class Tab {

    actualTab: ElementFinder;           // the actual tab that is selected      Ex: Visit
    tabContentContainer: ElementFinder; // the container for the tab content
    title: ElementFinder;               // the title of the tab                 Ex: Visit Information
    pages: ElementFinder[];             // the pages at the bottom of the container
    leftArrow: ElementFinder;
    rightArrow: ElementFinder;

    constructor(tabElement: ElementFinder) {
        this.actualTab = tabElement;
        this.tabContentContainer = $('div.tab-content');
        this.title = this.tabContentContainer.$('a.nav-link');
        this.leftArrow = this.tabContentContainer.$('li.pages-prev');
        this.rightArrow = this.tabContentContainer.$('li.pages-next');

        this.setPages();
    }

    // This will clear out the current 'pages' array and then get the array rows
    setPages(): Promise<any> {
        return this.tabContentContainer.$$('li.page-item').map(function(pages) {
            return this.pages = pages;
        });
    }

    getTabTitle(): Promise<string> {
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

    getSectionTitle(): Promise<string> {
        return this.title.getText();
    }

    getCurrentPageNumber(): number {
        /**
         * TODO - Figure out how to determine the current page number
         * Return it
         */
        return -1;
    }

    getNumberOfTotalPages(): number {
        /**
         * TODO - Figure out how to determine the total number of pages
         * Return it
         */
        return -1;
    }

    goToNextPage() {
        // TODO: write this code
        /**
         * If the current page is not the last page
         * Click the next page
         */
    }

    goToPreviousPage() {
        // TODO: write this code
        /**
         * If the current page is not the first page
         * Click the previous page
         */
    }

    gotToPageNumber(pageNumber: number) {
        // TODO: write this code
        /**
         * If page to go to is not the current page
         * and that page number is viable
         * go to that page
         */
    }

    isSelected(): Promise<boolean> {
        return this.actualTab.getAttribute('class').then( function(tabClass) {
            return tabClass.indexOf('active') >= 0;
        });
    }
}
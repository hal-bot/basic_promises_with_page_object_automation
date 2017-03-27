import { $, ElementFinder, promise } from 'protractor';

export abstract class Tab {

    actualTab: ElementFinder;           // the actual tab that is selected      Ex: Visit
    tabContentContainer: ElementFinder; // the container for the tab content
    title: ElementFinder;               // the title of the tab                 Ex: Visit Information
    pagination: ElementFinder;          // the page count at the bottom of the container

    constructor(element: ElementFinder) {
        this.tabContentContainer = $('');     // TODO - CODE THIS
        this.actualTab = element;
        this.title = element.$('a.nav-link');
        this.pagination = element.$('span.tab-counter');
    }

    getTabTitle(): Promise<string> {
        return this.actualTab.getText();
    }

    // Some tabs have a number next to the title.  Return only that.  If there is no number, return -1
    getTabCount() {
    // getTabCount(): Promise<number> {
        // TODO: SET UP PROMISE STUFF HERE
        if (!this.pagination.isPresent()) {
            // let deferred = promise.defer();
            // deferred.promise = -1;
            // return deferred.promise;
        } else {
            return this.pagination.getText().then(function(count) {
                return Number(count);
            });
        }
    }

    getTitle(): Promise<string> {
        return this.title.getText();
    }

    getCurentPageNumber(): number {
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
}
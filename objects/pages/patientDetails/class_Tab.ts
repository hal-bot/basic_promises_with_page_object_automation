import { $, ElementFinder } from 'protractor';

export abstract class Tab {
    tabRowWrapper: ElementFinder;
    title: ElementFinder;
    pagination: ElementFinder;

    constructor(element: ElementFinder) {
        this.tabRowWrapper = element;
        this.title = element.$('a.nav-link');
        this.pagination = element.$('span.tab-counter');
    }

    getTabTitle(): Promise<string> {
        // TODO: Look at how to return only the title if there is a number next to it
        //  if there's a number
        //      see if there's a way to find the title separate from the number via page elements
        //      if not, do a regex
        //  else ...
        return this.tabRowWrapper.getText();
    }

    // Some tabs have a number next to the title.  Return only that.  If there is no number, return -1
    // getTabCount(): Promise<number> {
    //     // TODO: SET UP PROMISE STUFF HERE
    //     if (!this.pagination.isPresent()) { return -1 };
    //     return this.pagination.getText().then(function(count) {
    //         return Number(count);
    //     });
    // }

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
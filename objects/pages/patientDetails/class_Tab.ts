import { $ } from 'protractor';

export abstract class Tab {
    tabRowWrapper: object;
    title: object;
    pagination: object;

    constructor(element: object) {
        this.tabRowWrapper = element;
        this.title = $('');
        this.pagination = $('');
    }

    getTabTitle(): string {
        // TODO: Look at how to return only the title if there is a number next to it
        //  if there's a number
        //      see if there's a way to find the title separate from the number via page elements
        //      if not, do a regex
        //  else ...
        return this.tabRowWrapper.getText();
    }

    // Some tabs have a number next to the title.  Return only that.  If there is no number, return -1
    getTabCount(): number {
        // TODO: see if there's a number next to the title.  If so, return that.  If not, return -1
    }

    getTitle() {
        return this.title.getText();
    }

    getCurentPageNumber(): number {
        /**
         * Figure out how to determine the current page number
         * Return it
         */
    }

    getNumberOfTotalPages(): number {
        /**
         * Figure out how to determine the total number of pages
         * Return it
         */
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
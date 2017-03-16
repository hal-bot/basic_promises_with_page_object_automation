import { ElementFinder, browser, by, element, $ } from 'protractor';


describe('The global header from a P1 level', () => {

    beforeEach(() => {
        browser.get('https://dev.sttx40.com/#/');
    });

    it('should be present', () => {
        // the header is visible
    });

    it('should have all expected elements', () => {
        // expect Dashboard to be present
        // expect Patents to be present and have a downward facing arrow
        // expect Orders to be present and have a downward facing arrow
        // expect Inventory to be present and have a downward facing arrow
        // expect Statistics to be present and have a downward facing arrow
        // expect Quality Control to be present and have a downward facing arrow
        // expect Activity to be present and have a downward facing arrow
        // expect Interfaces to be present and have a downward facing arrow
        // expect Administraction to be present and have a downward facing arrow
        // expect the Settings gear icon to be present
        // expect the Logout icon to be present
    });

    it('should be on every page and not change', () => {
        /**
         *  get an array of all pages
         *  set a limiter to limit the number of pages checked.  If 0, all pages will be checked
         *  For each page until the limiter is reached...
         *      verify it's on the current page
         */
    });

});

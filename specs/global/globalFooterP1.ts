/**
 *  Description: This will test P1 tests for the global footer
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-114
 */


import { browser } from 'protractor';
import { GlobalFooter } from "../../objects/pages/global/footer";

describe('The global footer from a P1 level', () => {

    let footer: GlobalFooter;
    let fs = require('fs');

    beforeEach( () => {
        browser.get('/');
        footer = new GlobalFooter();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/54 **/
    it('should be present', () => {
        expect(footer.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/54 - Result #3 **/
    it('should have all expected elements', () => {
        expect(footer.name.isPresent()).toBe(true);
        expect(footer.location.isPresent()).toBe(true);
        expect(footer.copyright.isPresent()).toBe(true);
        expect(footer.safetraceLogo.isPresent()).toBe(true);
        expect(footer.haemoneticsLogo.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/54 - Result #1 **/
    it('should be on every page and not change', () => {

        let pageLimiter = 0;        // limits the number of pages checked.  If 0, all pages will be checked
        let pageCount = 0;          // keeps track of how many pages we've tested
        let pages = fs.readFileSync('objects/pages/listOfPages.txt','utf8').split("\n");    // the pages we'll test against

        for (let page of pages) {
            // console.log("\n  Testing page: " + page + ",  test #" + pageCount);
            if ((pageLimiter !== 0) && (pageCount >= pageLimiter)) {
                break;
            } else {
                browser.get(page);
                expect(footer.isPresent()).toBe(true);
            }
            ++pageCount;
        }

    });

});

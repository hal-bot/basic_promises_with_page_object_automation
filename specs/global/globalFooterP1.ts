/**
 *  Description: This will test P1 tests for the global footer
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-114
 */


import { browser } from 'protractor';
import { GlobalFooter } from "../../objects/pages/global/footer";

describe('The global footer from a P1 level', () => {

    let footer: GlobalFooter;
    let fs = require('fs');

    beforeAll(async (done) => {
        // console.log("In 'beforeEach' for GlobalHeader");
        footer = await new GlobalFooter();
        await footer.initialize();
        return done();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/54 **/
    it('should be present', () => {
        console.log("The Global Footer should be present");
        return expect<any>(footer.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/54 - Result #3 **/
    it('should have all expected elements', () => {
        console.log("The Global Footer should have all expected elements");
        return footer.initialize().then(()=> {
            expect<any>(footer.name.isPresent()).toBe(true);
            expect<any>(footer.location.isPresent()).toBe(true);
            expect<any>(footer.copyright.isPresent()).toBe(true);
            expect<any>(footer.safetraceLogo.isPresent()).toBe(true);
            return expect<any>(footer.haemoneticsLogo.isPresent()).toBe(true);
        });
    });

    // /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/54 - Result #1 **/
    // // TODO: Get this working for each page.
    // xit('should be on every page and not change', (done) => {
    //     console.log("The Global Footer should be on every page and not change");
    //
    //     let pageLimiter = 0;        // limits the number of pages checked.  If 0, all pages will be checked
    //     let pageCount = 0;          // keeps track of how many pages we've tested
    //     let pages = fs.readFileSync('objects/pages/listOfPages.txt','utf8').split("\n");    // the pages we'll test against
    //
    //     for (let page of pages) {
    //         // console.log("\n  Testing page: " + page + ",  test #" + pageCount);
    //         if ((pageLimiter !== 0) && (pageCount >= pageLimiter)) {
    //             break;
    //         } else {
    //             browser.get(page).then(()=> {
    //                 expect<any>(footer.isPresent()).toBe(true);
    //             });
    //         }
    //         ++pageCount;
    //     }
    //
    //     return done();
    // });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/67 **/
    it('should match the current year', ()=> {
        console.log("The Global Footer should match the current year");
        let currentYear = new Date().getFullYear();
        return footer.copyright.getText().then((elementText)=> {
            return expect<any>(elementText.includes(currentYear.toString())).toBe(true);
        });

    });

});

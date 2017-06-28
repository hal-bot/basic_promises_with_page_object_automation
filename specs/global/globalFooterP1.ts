/**
 *  Description: This will test P1 tests for the global footer
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-114
 */


import { GlobalFooter } from "../../objects/pages/global/footer";
import {browser} from "protractor";

describe('The global footer from a P1 level', () => {

    let footer: GlobalFooter;
    let fs = require('fs');

    beforeAll(async (done) => {
        // console.log("In 'beforeEach' for GlobalHeader");
        footer = await new GlobalFooter();
        await footer.initialize();
        return done();
    });

    // /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/54 **/
    it('should be on every page and not change and have all expected elements - Case 54', async (done) => {
        console.log("The Global Footer should be on every page and not change and have all expected elements");

        let pageLimiter = 0;        // limits the number of pages checked.  If 0, all pages will be checked
        let pageCount = 0;          // keeps track of how many pages we've tested
        let pages = await fs.readFileSync('objects/pages/listOfPages.txt','utf8').split("\n");    // the pages we'll test against

        for (let page of pages) {
            // console.log("\n  Testing page: " + page + ",  test #" + pageCount);
            if ((pageLimiter !== 0) && (pageCount >= pageLimiter)) {
                break;
            } else {
                await browser.get(page);
                await footer.initialize();
                //TODO - get rid of this hacky 'sleep' and make sure the page has loaded first.  Have to move on for now
                await browser.sleep(1000);
                expect<any>(footer.isPresent()).toBe(true);
                expect<any>(footer.name.isPresent()).toBe(true);
                expect<any>(footer.location.isPresent()).toBe(true);
                expect<any>(footer.copyright.isPresent()).toBe(true);
                expect<any>(footer.safetraceLogo.isPresent()).toBe(true);
                expect<any>(footer.haemoneticsLogo.isPresent()).toBe(true);
            }
            ++pageCount;
        }

        return done();
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/67 **/
    it('should match the current year - Case 67', ()=> {
        console.log("The Global Footer should match the current year");
        let currentYear = new Date().getFullYear();
        return footer.copyright.getText().then((elementText)=> {
            return expect<any>(elementText.includes(currentYear.toString())).toBe(true);
        });

    });

});

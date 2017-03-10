import { ElementFinder, browser, by, element, $ } from 'protractor';
import * as env from '../environment';

describe('slow calculator', () => {

    beforeEach(() => {
        browser.get(env.url + '/ng1/calculator/');
    });

    it('should have a title', () => {
        let pageTitle = $('div.container div h3');

        pageTitle.getText().then(function(title) {
            // console.log("  Title = " + title);
            expect(title).toEqual('Super Calculator');
        });
    });

});

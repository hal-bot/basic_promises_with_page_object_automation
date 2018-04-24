import { $, browser } from 'protractor';
import { ListGridItem } from "../../objects/elements/listGridItem";

describe('Tests on the Lego.com homepage', () => {

    let item: ListGridItem;

    beforeAll( async(done) => {
        await browser.navigate().refresh();    // a new 'survey' pop-up is present.  This removes it.
        item = await new ListGridItem($('li.list-grid__item'));

        return done();
    });

    it('Test ListGridItem class functionality', async (done) => {
        expect<any>(await item.isPresent()).toBe(true);
        expect<any>(await item.getTitle()).not.toBeNull();

        let url = await browser.getCurrentUrl();
        await item.click();
        expect<any>(await browser.getCurrentUrl()).not.toBe(url);

        return done();
    });

});


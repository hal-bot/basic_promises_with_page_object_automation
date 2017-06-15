import {$, ElementFinder} from 'protractor';
import {ElementMethods} from "../../../utils/elementUtilities";

export abstract class PageTab {

    protected initializePromise: Promise<void>;

    actualTab: ElementFinder;           // the actual tab that is selected      Ex: Visit
    tabContentContainer: ElementFinder; // the container for the tab content
    title: ElementFinder;               // the title of the tab                 Ex: Visit Information

    pages: ElementFinder[];             // the pages at the bottom of the container
    leftArrow: ElementFinder;
    rightArrow: ElementFinder;

    constructor(private tabElement: ElementFinder) {
        // console.log("   In constructor for abstract class 'PageTab'");
    }

    async baseInitialize(): Promise<void> {
        // console.log("   In 'baseInitialize()' for abstract class 'PageTab'");

        return new Promise<void>(async (resolve) => {

            this.actualTab = await this.tabElement;
            this.tabContentContainer = await $('div.tab-content tab.active');
            this.title = await this.tabContentContainer.$('span.tab-title');

            this.leftArrow = await $('li.pagination-prev');
            this.rightArrow = await $('li.pagination-next');

            await this.setPages();
            return resolve();
        });
    }

    // This will clear out the current 'pages' array and then get the array rows
    async setPages(): Promise<void[]> {
        return ElementMethods.getCustomElementArray('tab.active li.pagination-page', 'ElementFinder').then(async (pagesArray)=> {
            // console.log(`     Found ${pagesArray.length} pagination elements`);
            return this.pages = await pagesArray;
        });
    }

    async getTabTitle(): Promise<string> {
        return this.actualTab.getText();
    }

    async getSectionTitle(): Promise<string> {
        return this.title.getText();
    }

    async getCurrentPageNumber(): Promise<number> {
        for (let i = 0; i < this.pages.length; i++) {
            // console.log("Examining page " + i);
            await this.pages[i].getAttribute('class').then((pageClass)=> {
               if (pageClass.includes('active')) {
                   return i;
               }
            });
        }
        return -1;
    }

    async getNumberOfTotalPages(): Promise<number> {
        return new Promise<number>((resolve)=> {
            return resolve(this.pages.length);
        });
    }

    async goToNextPage(): Promise<void> {
        this.rightArrow.getAttribute('class').then((arrowClass)=> {
            if (arrowClass.includes('disabled')) {
                return new Promise((resolve)=> {
                    return resolve();
                });
            }
        });
        return this.rightArrow.click();
    }

    async goToPreviousPage(): Promise<void> {
        this.leftArrow.getAttribute('class').then((arrowClass)=> {
            if (arrowClass.includes('disabled')) {
                return new Promise((resolve)=> {
                    return resolve();
                });
            }
        });
        return this.leftArrow.click();
    }

    async goToPageNumber(pageNumber: number): Promise<void> {
        if (pageNumber > this.pages.length) {
            throw `Attempting to click page ${pageNumber} when there are only ${this.pages.length} pages`
        } else {
            return this.pages[pageNumber-1].click();
        }
    }

    async isSelected(): Promise<boolean> {
        return this.actualTab.getAttribute('class').then( function(tabClass) {
            return tabClass.indexOf('active') >= 0;
        });
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
    //         return this.pages.getText().then((count)=> {
    //             return Number(count);
    //         });
    //     }
    // }
}
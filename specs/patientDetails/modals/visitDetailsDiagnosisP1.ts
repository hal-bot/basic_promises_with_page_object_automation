/**
 *  Description: This will test P1 tests for the contents of the Visit modal's "Diagnosis" tab
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-77
 */

import { browser } from 'protractor';
import {VisitTab} from "../../../objects/pages/patientDetails/tabCollection/tabVisit";
import {NavigationMethods} from "../../../utils/navigationUtilities";


xdescribe('The "Visit" tab on the Patient\'s Details page (from a P1 level)', () => {

    let visitTab: VisitTab;

    beforeAll( () => {
        return NavigationMethods.navigateToAPatientPageQuickly().then(()=> {
            visitTab = new VisitTab();
        });
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/62 **/
    it('should be present, selected, and have the title "Visit"', () => {

    });
});

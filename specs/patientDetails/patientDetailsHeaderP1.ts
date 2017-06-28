/**
 *  Description: This will test P1 tests for the Patient Details header
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-114
 */

import {PatientPageHeader} from "../../objects/pages/patientDetails/header";
import {GlobalHeader} from "../../objects/pages/global/header";
import {NavigationMethods} from "../../utils/navigationUtilities";
import {browser} from "protractor";

describe('The Patient Details header from a P1 level', () => {

    let patientHeader: PatientPageHeader;
    let globalHeader: GlobalHeader;

    beforeAll(async (done) => {
        return NavigationMethods.navigateToAPatientPageLikeAUser().then(()=> {
            return NavigationMethods.waitForLoadCompletion('div.primary-content').then(async ()=> {
                patientHeader = await new PatientPageHeader();
                return globalHeader = await new GlobalHeader();
            }).then(async ()=> {
                await patientHeader.initialize();
                return globalHeader.initialize();
            });
        }).then(()=> {
            return done();
        });
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/53 **/
    it('should be present and below the global header - Case 53', () => {
        console.log("The header of the Patients Details page should be present and below the global header");
        expect<any>(patientHeader.isPresent()).toBe(true);
        // TODO - figure out why the code below is throwing an error, then reintroduce the 'case' in the description above
        return globalHeader.container.getLocation().then((globalHeaderLocation)=>  {
            return patientHeader.container.getLocation().then((patientHeaderLocation)=> {
                return expect(globalHeaderLocation.y).toBeLessThan(patientHeaderLocation.y);
            });
        });
    });

});

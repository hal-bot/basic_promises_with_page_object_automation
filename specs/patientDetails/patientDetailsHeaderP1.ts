/**
 *  Description: This will test P1 tests for the Patient Details header
 *  Reference: https://haemoslalom.atlassian.net/browse/TX-114
 */

import {PatientPageHeader} from "../../objects/pages/patientDetails/header";
import {GlobalHeader} from "../../objects/pages/global/header";
import {NavigationMethods} from "../../utils/navigationUtilities";


describe('The global footer from a P1 level', () => {

    let patientHeader: PatientPageHeader;
    let globalHeader: GlobalHeader;

    beforeAll((done) => {
        return NavigationMethods.navigateToAPatientPageLikeAUser().then(()=> {
            return NavigationMethods.waitForLoadCompletion('div.primary-content').then(()=> {
                patientHeader = new PatientPageHeader();
                globalHeader = new GlobalHeader();
                return done();
            }).then(async (done)=> {
                await patientHeader.initialize();
                await globalHeader.initialize();
                return done;
            });
        });
    });


    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/53 **/
    it('should be present', () => {
        console.log("The header of the Patients Details page should be present");
        expect<any>(patientHeader.isPresent()).toBe(true);
    });

    /** Ref: https://haemoslalom.testrail.net//index.php?/cases/view/53 **/
    it('should be below the global header', () => {
        console.log("The header of the Patients Details page should be present below the global header");
        return globalHeader.patients.link.getLocation().then((globalHeaderLocation)=>  {
            return patientHeader.container.getLocation().then((patientHeaderLocation)=> {
                return expect(globalHeaderLocation.y).toBeLessThan(patientHeaderLocation.y);
            });
        });
    });

});

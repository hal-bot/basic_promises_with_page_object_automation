// //  This will integrate the automated test cases into the Test Rail test cases
// //  https://haemoslalom.testrail.net
//
// import {ElementMethods} from "./elementUtilities";
// import {GeneralUtilities} from "./generalUtilities";
// import * as TestRailAPI from 'testrail-api';
//
// export class TestRailWidget{
//
//     private initializePromise: Promise<void>;
//     private host: string;
//     private username: string;
//     private password: string;
//     private projectID: string;
//     private testRailInterface;
//
//     constructor() {
//         // console.log("  In constructor for 'TestRailWidget'");
//
//         this.host = 'https://haemoslalom.testrail.net';
//         this.username = 'slalom.automated.tester@gmail.com';
//         this.password = 'Password1234';
//         this.projectID = '1';
//     }
//
//     async initialize(): Promise<void> {
//         // console.log("   In 'initialize' for 'TestRailWidget'");
//         if(!this.initializePromise) {
//             await GeneralUtilities.initializationMessage(null, 'TestRailWidget');
//
//             return this.initializePromise = new Promise<void>(async (resolve) => {
//
//                 this.testRailInterface = await new TestRailAPI({
//                     host: this.host,
//                     user: this.username,
//                     password: this.password
//                 });
//
//                 return resolve(console.log("DONE INITIALIZING"));
//
//                 // return this.testRailInterface.getPlans(/*PROJECT_ID=*/1, /*FILTERS=*/{'milestone_id':'9'}, (err, plans)=> {
//                 //     console.log("HEREE!!!! X");
//                 //     console.log(plans);
//                 //     return resolve(console.log("DONE INITIALIZING"));
//                 // });
//             });
//         }
//
//         return this.initializePromise;
//     }
//
//     async testPlans(): Promise<string[]> {
//         // console.log("   In 'testPlans()' for 'TestRailWidget'");
//
//         await this.initialize();
//
//         console.log("HEREE!!!! 1  ...  this.testRailInterface.host = " + this.testRailInterface.host);
//
//         return this.testRailInterface.getPlans(/*PROJECT_ID=*/1, /*FILTERS=*/{'milestone_id':'9'}, (err, plans)=> {
//             console.log("HEREE!!!! X");
//             // console.log(plans);
//             return plans;
//         }, (err)=> {
//             console.log("HEREE!!!! Y");
//             console.log(err);
//             return err;
//         });
//     }
//
// }


















//  This will integrate the automated test cases into the Test Rail test cases
//  https://haemoslalom.testrail.net

import {GeneralUtilities} from "./generalUtilities";
import {ElementMethods} from "./elementUtilities";
import * as TestRailAPI from 'testrail-promise';

export class TestRailWidget{

    private host: string;
    private username: string;
    private password: string;

    private projectID: number;
    private currentRunID: number;

    TestRail;
    trInterface;

    constructor() {
        // console.log("  In constructor for 'TestRailWidget'");

        this.host = 'https://haemoslalom.testrail.net';
        this.username = 'slalom.automated.tester@gmail.com';
        this.password = 'Password1234';
        this.projectID = 1;

        this.TestRail = require("testrail-promise");
    }

    async initialize(): Promise<void> {
        console.log("   In 'initialize' for 'TestRailWidget'");

        return new Promise<void>(async resolve => {
            this.trInterface = await new this.TestRail(this.host, this.username, this.password);

            this.currentRunID = await this.getCurrentRunId();


            return resolve();
        });
    }

    /** Returns the first Milestone ID number that:
     *      - has been started (value 'is_started' === true)
     *      - is not completed (value 'is_completed' === false)
     *  If these conditions are not met, an error will be thrown
     */
    async getCurrentMilestoneId(): Promise<number> {
        // console.log("   In 'getCurrentMilestoneId()' for 'TestRailWidget'");
        return this.trInterface.getMilestones({"project_id": this.projectID}).then(async (milestones)=> {
            for (let i=0; i <= milestones.length; i++) {
                let milestone = await milestones[i];
                // console.log("\n\n\nMILESTONE!");
                // console.log(milestone);
                if (milestone.is_completed === false && milestone.is_started === true) {
                    console.log(`\tFound a current Milestone: ${milestone.id}`);
                    return milestone.id;
                }
            }
            throw "Didn't find a milestone that (A) has been started and (B) hasn't been completed";
        });
    }


    /** Returns the first Test Plan ID number that:
     *      - matches the current Milestone ID (which is passed in)
     *      - is not completed (value 'is_completed' === false)
     *  If these conditions are not met, an error will be thrown
     */
    async getCurrentTestPlanId(milestoneID: number): Promise<number> {
        // console.log(`   In 'getCurrentTestPlanId(milestoneID)' for 'TestRailWidget'   ...  milestoneID = ${milestoneID}`);
        return this.trInterface.getPlans({"project_id": this.projectID}).then(async plans=> {
            for (let i=0; i <= plans.length; i++) {
                let plan = await plans[i];
                // console.log("\n\nPLAN!");
                // console.log(`plan.milestone_id = ${plan.milestone_id};  this.currentMilestone = ${this.currentMilestoneID}`);
                if (plan.milestone_id === milestoneID && plan.is_completed === false) {
                    console.log(`\tFound a current Plan: ${plan.id}`);
                    return plan.id;
                }
            }
            throw "Didn't find a plan that (A) has a milestone ID that matches the current milestone ID and (B) hasn't been completed";
        });
    }

    /** Returns the first Run ID number that has the name 'FE - Regression Tests'
     *  If this condition is not met, an error will be thrown
     */
    async getCurrentRunId(): Promise<number> {
        // console.log("   In 'getCurrentRunId()' for 'TestRailWidget'");

        return this.getCurrentMilestoneId().then(milestoneID => {
            return this.getCurrentTestPlanId(milestoneID).then(testPlanID => {
                return this.trInterface.getPlan({"plan_id": testPlanID}).then(async plan => {
                    let entries = await plan.entries;

                    for (let i=0; i <= entries.length; i++) {
                        let entry = await entries[i];
                        // console.log("\n\nRUN!");
                        // console.log(`entry.name = ${entry.name}`);
                        if (entry.name === 'FE - Regression Tests') {
                            console.log(`\tFound a current Run: ${entry.runs[0].id}`);
                            return entry.runs[0].id;
                        }
                    }
                    throw "Didn't find a run with the name 'FE - Regression Tests'";
                });
            });
        });
    }

}
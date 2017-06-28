//  This will integrate the automated test cases into the Test Rail test cases
//  Haemonetics TestRails site -> https://haemoslalom.testrail.net

import fs = require('fs');

export class TestRailWidget{

    private host: string;
    private username: string;
    private password: string;

    private projectID: number;

    private TestRail;
    private trInterface;

    constructor() {
        // console.log("  In constructor for 'TestRailWidget'");

        this.host = 'https://haemoslalom.testrail.net';
        this.username = 'slalom.automated.tester+1@gmail.com';
        this.password = 'hjaZ54xdypVJzXgS';
        this.projectID = 1;

        this.TestRail = require("testrail-promise");
    }

    /** This method does all the heavy lifting...
     *      - gets the automated test cases from TestRail
     *      - parses the automated test results JSON file
     *      - compares the two arrays and updates the TestRail test cases as is appropriate
     */
    async update(): Promise<void> {
        console.log("   In 'initialize' for 'TestRailWidget'");

        return new Promise<void>(async resolve => {
            this.trInterface = await new this.TestRail(this.host, this.username, this.password);

            let testCases = await this.getTestCasesThatShouldBeAutomated();
            let jsonResults = await this.getParsedJsonFile();

            // We want to look for results that took some time to run (0 means it was skipped) that has 'Case' in it
            for (let result of jsonResults) {
                if (result.duration > 0 && result.description.includes(" - Case ")) {
                    let testCaseNumber = await result.description.match(/\d+$/);
                    for (let testCase of testCases) {
                        if (testCase.case_id == testCaseNumber) {
                            console.log(`\tFound matching test cases - ${testCaseNumber} ... updating TC ${testCase.id}`);

                            let comments: string = "";
                            let assignee: number = null;
                            let status: number = this.getStatusId(result.assertions[0].passed);
                            console.log(`status = ${status}`);

                            if (status === 5) {
                                console.log("FAILURE!!!");
                                assignee = 1;       // Hal Deranek
                                comments = this.getErrorMessages(result);
                                console.log(`comments = ...\n${comments}`);
                            } else {
                                comments = "Tested on QC via test automation (not a human)";
                            }

                            let resultData = {
                                // "test_id": 11323,
                                // "status_id": 1,
                                "test_id": testCase.id,
                                "status_id": status,
                                "comment": comments,
                                "assignedto_id": assignee
                            };
                            await this.trInterface.addResult(resultData);
                        }
                    }
                }
            }

            return resolve();
        });
    }

    /** Tests can have multiple error messages.  This will return them all as one string
     */
    private getErrorMessages(element): string {
        // console.log("   In 'getErrorMessages()' for 'TestRailWidget'");

        let masterMessage: string;

        for(let message of element.assertions) {
            masterMessage += message.errorMsg + "\n\n";
        }

        return masterMessage;
    }

    /** Returns the first Milestone ID number that:
     *      - has been started (value 'is_started' === true)
     *      - is not completed (value 'is_completed' === false)
     *  If these conditions are not met, an error will be thrown
     */
    private async getCurrentMilestoneId(): Promise<number> {
        // console.log("   In 'getCurrentMilestoneId()' for 'TestRailWidget'");
        return this.trInterface.getMilestones({"project_id": this.projectID}).then(async (milestones)=> {
            for (let i=0; i <= milestones.length-1; i++) {
                let milestone = await milestones[i];
                if (milestone.is_completed === false && milestone.is_started === true) {
                    // console.log(`\tFound a current Milestone: ${milestone.id}`);
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
    private async getCurrentTestPlanId(milestoneID: number): Promise<number> {
        // console.log(`   In 'getCurrentTestPlanId(milestoneID)' for 'TestRailWidget'   ...  milestoneID = ${milestoneID}`);
        return this.trInterface.getPlans({"project_id": this.projectID}).then(async plans=> {
            for (let i=0; i <= plans.length-1; i++) {
                let plan = await plans[i];
                if (plan.milestone_id === milestoneID && plan.is_completed === false) {
                    // console.log(`\tFound a current Plan: ${plan.id}`);
                    return plan.id;
                }
            }
            throw "Didn't find a plan that (A) has a milestone ID that matches the current milestone ID and (B) hasn't been completed";
        });
    }

    /** Returns the first Run ID number that has the name 'FE - Regression Tests'
     *  If this condition is not met, an error will be thrown
     */
    private async getCurrentRunId(): Promise<number> {
        // console.log("   In 'getCurrentRunId()' for 'TestRailWidget'");

        return this.getCurrentMilestoneId().then(milestoneID => {
            return this.getCurrentTestPlanId(milestoneID).then(testPlanID => {
                return this.trInterface.getPlan({"plan_id": testPlanID}).then(async plan => {
                    let entries = await plan.entries;

                    for (let i=0; i <= entries.length-1; i++) {
                        let entry = await entries[i];
                        if (entry.name === 'FE - Regression Tests') {
                            // console.log(`\tFound a current Run: ${entry.runs[0].id}`);
                            return entry.runs[0].id;
                        }
                    }
                    throw "Didn't find a run with the name 'FE - Regression Tests'";
                });
            });
        });
    }

    /** Returns the test cases based on the Current Run ID (which should be based off a run named like 'FE - regression')
     *  If no test cases are found, an error will be thrown
     */
    private async getCurrentRegressionTestCases(): Promise<any> {
        // console.log("   In 'getCurrentRegressionTestCases()' for 'TestRailWidget'");

        return this.getCurrentRunId().then(async runID => {
            await runID;
            return this.trInterface.getTests({"run_id": runID}).then(async testCases => {
                await testCases;

                if (testCases.length === 0) {
                    throw "Didn't find any test cases in the current FE regression run";
                } else {
                    console.log(`\t${testCases.length} total test cases found in the current FE regression run`);
                }

                return testCases;
            });
        });
    }

    /** Returns the test cases that are marked as 'automated' in Test Rail
     *  If no test cases are found, an error will be thrown
     */
    private async getTestCasesThatShouldBeAutomated(): Promise<any> {
        // console.log("   In 'getTestCasesThatShouldBeAutomated()' for 'TestRailWidget'");
        let parsedCases = [];

        return this.getCurrentRegressionTestCases().then(async testCases => {
            for (let i=0; i <= testCases.length-1; i++) {
                let testCase = await testCases[i];
                // if (testCase.custom_automated === true && testCase.status_id === 3) { // Untested
                if (testCase.custom_automated) {
                    // console.log(`\tFound a test case that should be automated ... \n${testCase}`);
                    parsedCases.push(testCase);
                }
            }
            console.log(`\t${parsedCases.length} total test cases found that should be automated`);

            return parsedCases;
        });
    }

    /** Finds the 'report.json' results file that is generated by the test run
     *  Returns a parsed JSON file for use
     */
    private async getParsedJsonFile(): Promise<any> {
        // console.log("   In 'getParsedJsonFile()' for 'TestRailWidget'");
        return JSON.parse(fs.readFileSync('report.json','utf8'));
    }

    /** Takes in a result from the JSON file.
     *   - If the result is TRUE, then it passed and 1 is returned
     *   - If the result is FALSE, then it failed and 5 is returned
     *   - If somehow it's neither, a 3 is returned (untested)
     */
    private getStatusId(result: boolean): number {
        // console.log("   In 'getStatusId(result)' for 'TestRailWidget' ... result = " + result);
        if (result === true) {
            return 1;
        } else if (result === false) {
            return 5;
        } else {
            return 3;
        }
    }
}
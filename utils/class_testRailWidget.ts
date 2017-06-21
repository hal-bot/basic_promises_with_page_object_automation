// //  This will integrate the automated test cases into the Test Rail test cases
// //  https://haemoslalom.testrail.net
//
// import {ElementMethods} from "./elementUtilities";
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
//             ElementMethods.initializationMessage(null, 'TestRailWidget');
//
//             return this.initializePromise = new Promise<void>(async (resolve) => {
//
//                 this.testRailInterface = new TestRailAPI({
//                     host: this.host,
//                     user: this.username,
//                     password: this.password
//                 });
//
//                 return resolve(console.log("DONE INITIALIZING"));
//                 // return this.testRailInterface.getPlans(/*PROJECT_ID=*/1, /*FILTERS=*/{}, (err, plans)=> {
//                 //     console.log("HEREE!!!! X");
//                 //     return console.log(plans);
//                 // }).then(()=> {
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
//         return this.initialize().then(()=> {
//             console.log("HEREE!!!! 1");
//
//             return this.testRailInterface.getPlans(/*PROJECT_ID=*/1, /*FILTERS=*/{}, (err, plans)=> {
//                 console.log("HEREE!!!! 2");
//                 return plans;
//             });
//         })
//     }
//
// }
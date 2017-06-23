// var request = require('request');
// var qs = require('querystring');
//
// var requestArguments = {
//     uri: '',
//     headers: {
//         'content-type': 'application/json',
//         'accept': 'application/json'
//     },
//     rejectUnauthorized: false
// };
//
//
//
// // //import * as mocha from 'mocha';
// // import * as chai from 'chai';
// // import chaiHttp = require('chai-http');
// //
// // chai.use(chaiHttp);
// // const expect = chai.expect;
// //
// // let app: string = 'https://haemoslalom.testrail.com/index.php?';
// //
// // fdescribe('GET api/v1/heroes', () => {
// //
// //     fit('responds with JSON array', () => {
// //         console.log("HERE!1 ");
// //         return chai.request(app).get('/api/v2/get_plans/1&milestone_id=9')
// //             .then(res => {
// //                 expect(res.status).to.equal(200);
// //                 expect(res).to.be.json;
// //                 expect(res.body).to.be.an('array');
// //             });
// //     });
// //
// //     xit('should include Wolverine', () => {
// //         return chai.request(app).get('/api/v1/heroes')
// //             .then(res => {
// //                 let Wolverine = res.body.find(hero => hero.name === 'Wolverine');
// //                 expect(Wolverine).to.exist;
// //                 expect(Wolverine).to.have.all.keys([
// //                     'id',
// //                     'name',
// //                     'aliases',
// //                     'occupation',
// //                     'gender',
// //                     'height',
// //                     'hair',
// //                     'eyes',
// //                     'powers'
// //                 ]);
// //             });
// //     });
// //
// // });
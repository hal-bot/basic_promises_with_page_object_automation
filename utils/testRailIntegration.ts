

let url: string = 'https://haemoslalom.testrail.com/index.php?/api/v2/get_plans/1&milestone_id=9';

fetch(url, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic c2xhbG9tLmF1dG9tYXRlZC50ZXN0ZXJAZ21haWwuY29tOlBhc3N3b3JkMTIzNA=="
    },
    credentials: "same-origin"
}).then((response)=> {
    // response.status,     //=> number 100–599
    // response.statusText, //=> String
    // response.headers    //=> Headers
    // response.url        //=> String

    return response.text()
}, (error)=> {
    error.message //=> String
});
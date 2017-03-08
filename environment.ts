export let baseUrl = 'https://angular.github.io';
export let url = baseUrl;

// console.log("   baseUrl = " + baseUrl + "\n  url = " + url);

url = baseUrl;
if (url !== 'http://localhost:8080') {
  url += '/protractor-cookbook';
}

// console.log("   ... now url = " + url);
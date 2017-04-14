### This folder contains the API tests.

#### Usage

#### Tools

- Download [postman](https://www.getpostman.com/)
- You may request Hal for Pro license

#### Writing tests

- Please request access to be part of the haemoenetics team in postman
- Update API's in postman
- Export the API
- Update the code in git
- If making changes to environment, update environments/*.json files
 
#### Executing the tests from commandline

- Install newman
```sh
npm install -g newman
newman run https://www.getpostman.com/collections/4a159b77157920654ba0 -e environments/developEnvironment.json
```

#### Collection links

- Patients
  - https://www.getpostman.com/collections/4a159b77157920654ba0
- Orders 
  - https://www.getpostman.com/collections/5c651d85e6d879952dae
- Products
  - https://www.getpostman.com/collections/5b72305d3ac5b90a2e2d
- Specimens 
  - https://www.getpostman.com/collections/21ab3a322ba648444ded
- Visits 
  - https://www.getpostman.com/collections/40b4b61805e94d90ce48
- Lookup Data 
  - https://www.getpostman.com/collections/801f411c83a4e0de605e
- Components 
  - https://www.getpostman.com/collections/10600f49baf415993cea
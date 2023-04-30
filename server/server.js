//Setting up axios/express
const axios = require('axios');
const express = require('express');
const cors = require('cors')

const app = express();
//setting up express to use/parse JSON - altering limit object to allow
// for the larger data being sent/used when doing multi-searching
app.use(express.json({limit: '50mb'}));
app.use(cors("http://localhost:3000"))

//We us post request because we are accessing a data object that was given by front end
app.post("/results", async (req,res) =>{
    console.log(req.body)
    let response = {results:[]}
    let searchField = req.body
     // NPI Version - REQUIRED    
    let apiVersion =  'https://npiregistry.cms.hhs.gov/api/?version=2.1';
    // //we start count at 0 so that the first call gets results 0-200
    let results = 200;
    let count = 0;
    // //Has to stay on one line - if indent it adds numerous %20%20 lines to parse respenting the indents/spaces since its a string literal  
    let apiCall =  `${apiVersion}${searchField.npiNumber.value && `&number=${searchField.npiNumber.value}*`}${searchField.taxonomyDescription.value && `&taxonomy_description=${searchField.taxonomyDescription.value}*`}${searchField.firstName.value && `&first_name=${searchField.firstName.value}*`}${searchField.lastName.value && `&last_name=${searchField.lastName.value}*`}${searchField.city.value && `&city=${searchField.city.value}*`}${searchField.state.value && `&state=${searchField.state.value}`}${searchField.zip.value && `&postal_code=${searchField.zip.value}*`}${`&limit=200`}`    
    // //While we haven't called 6 times (under 1200 results which is max) - and our set is stil returning the max (200)
    while( count < 6 && results === 200){
       await axios.get((`${apiCall}&skip=${200*count}`))
         .then( res => {
           response = {results:[...response.results.concat(res.data.results)]}
           results = res.data.result_count
        })
        .then(count++)
         //TO DO - More indepth error handling.
       .catch( error => console.log(error.message))
    }
    res.json(response);

})

app.listen(8080,() => {console.log("Running on Port 8080")})
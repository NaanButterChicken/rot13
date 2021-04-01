const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
//const dao = require('./mysqlDao.js');
const  { response } = require('express');
//const dao = require('./sqliteDao.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.get('/encrypt', (request, response)  => {
    
    var plaintext = request.query.plaintext;
    var ciphertext = "";

    for(var n=0; n < plaintext.length; n++) {
        
        var beans = plaintext.charCodeAt(n) - 97;
        //technically i would rather subtract 96 to make a=1. doing this gets me actual characters though so this is what we do


        console.log(beans);
        var shift = 13;
        //was 13. now it makes the first half of the alphabet shift 13 but the later half has the fUnKy cHarAcTeRs
        var shiftedBeans = (beans + shift)%26;


        console.log(shiftedBeans);
        ciphertext += String.fromCharCode(shiftedBeans+97);
        //** a=97 z=122
        //console.log(ciphertext);
        console.log(" ");
    }

    response.status(200).send(ciphertext);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

    //list of entire alphabet with a apce at the beginning/zero-value
    //iterate through string and find which letters go where in the list; ex: a = 1, b = 2, " " = 0
    //add shift-number to letter number, then use modulus 26, (% 26), to get the value of the new letter
    //get that number's corresponding value from list
    //add that to some variable that holds the entire finished product
    //enjoy!

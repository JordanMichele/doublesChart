const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
//var cors = require('cors');
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(limiter);
//app.use(cors());

//app.use(express.static(path.join(__dirname,'./public')));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './charting-frontend/build')));

// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//     app.use(express.static(path.resolve(__dirname, './charting-frontend/build', 'index.html')));
// });


app.post('/chart', async function(req,res){
    try{
        console.log(req.body);
        let fnum = parseInt(req.body.fNum);
        numberOfHorses = fnum + 1;
        let snum = parseInt(req.body.sNum);
        numberOfHorsesNext = snum + 2;
        let numbers = await scrapeProduct(req.body.url);
        res.json(numbers);

    } catch(e){
        console.log(e);
    }
    
    
});

// Need to plug in 1 more than the actual
//const numberOfHorses = 7;
let numberOfHorses;
// Need to plug in 2 more than the actual
//const numberOfHorsesNext = 8;
let numberOfHorsesNext;

async function scrapeProduct(url){
    const rows = {
        1 :  [],
        2 :  [],
        3 :  [],
        4 :  [],
        5 :  [],
        6 :  [],
        7 :  [],
        8 :  [],
        9 :  [],
        10 : [],
        11:  [],
        12 : [],
        13 : [],
        14:  [],
        15 : [],
        16 : [],
        17 : []
    };

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);

    for(let i = 1; i < numberOfHorsesNext; i++){
        for(let j = 1; j < numberOfHorses; j++){ 
        try{
            if(i === 1){
                const [el] = await page.$x(`//*[@id="maincontainer"]/section/ng-view/raceprogram/div/div[2]/main/div[3]/div/probables/div[3]/div/div[${i}]/span[${j}]/span/span`);
                const txt =  await el.getProperty('textContent');
                const rawTxt = await txt.jsonValue();
                rows[i].push(rawTxt);
            } else if(i > 1){          
            const [el] = await page.$x(`//*[@id="maincontainer"]/section/ng-view/raceprogram/div/div[2]/main/div[3]/div/probables/div[3]/div/div[${i}]/span[${j}]/span`);
            const txt =  await el.getProperty('textContent');
            const rawTxt = await txt.jsonValue();
            rows[i].push(rawTxt);
            }
        }catch(e){
            console.log(e);
        }
      }
    }
    browser.close();
    let jsonRows = JSON.stringify(rows);
    let newJson = JSON.parse( jsonRows );
    return newJson;                   
}
// Uncomment the below function call to get the numbers for whatever race you need
//scrapeProduct('https://www.tvg.com/racetracks/WO/woodbine?race=7');

app.listen(PORT, () => {
    console.log(`ON PORT ${PORT}`);
})

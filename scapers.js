// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const path = require('path');
var cors = require('cors');
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './charting-frontend/build')));

// All other GET requests not handled before will return our React app
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, './charting-frontend/build'));
});

const throng = require('throng');
const WORKERS = process.env.WEB_CONCURRENCY || 1;

throng({
  workers: WORKERS,
  lifetime: Infinity
}, start);

function start() {

  app
    .post('/api/chart', chart)
    .listen(PORT, onListen)
	
// app.post('/api/chart', async function(req,res){
//     try{
//         console.log(req.body);
//         let fnum = parseInt(req.body.fNum);
//         numberOfHorses = fnum + 1;
//         let snum = parseInt(req.body.sNum);
//         numberOfHorsesNext = snum + 2;
	
// 	res.json(await scrapeProduct(req.body.url));

//     } catch(e){
//         console.log("ERRORRRR, Inside server Post method");
//         console.log(e);
//     } 
// });
	
async function chart(req,res){
    try{
        console.log(req.body);
        let fnum = parseInt(req.body.fNum);
        numberOfHorses = fnum + 1;
        let snum = parseInt(req.body.sNum);
        numberOfHorsesNext = snum + 2;
	
	res.json(await scrapeProduct(req.body.url));

    } catch(e){
        console.log("ERRORRRR, Inside server Post method");
        console.log(e);
    } 
};

// Need to plug in 1 more than the actual
//const numberOfHorses = 7;
let numberOfHorses;
// Need to plug in 2 more than the actual
//const numberOfHorsesNext = 8;
let numberOfHorsesNext;

async function scrapeProduct(url){
  try{
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

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);

    for(let i = 1; i < numberOfHorsesNext; i++){
        for(let j = 1; j < numberOfHorses; j++){ 
        try{
            if(i < 2){
                const [el] = await page.$x(`//*[@id="maincontainer"]/section/ng-view/raceprogram/div/div[2]/main/div[3]/div/probables/div[3]/div/div[${i}]/span[${j}]/span/span`);
                const txt =  await el.getProperty('textContent');
                const rawTxt = await txt.jsonValue();
                rows[i].push(rawTxt);
            }
	    if(i > 1){          
	        const [el] = await page.$x(`//*[@id="maincontainer"]/section/ng-view/raceprogram/div/div[2]/main/div[3]/div/probables/div[3]/div/div[${i}]/span[${j}]/span`);
	        const txt =  await el.getProperty('textContent');
	        const rawTxt = await txt.jsonValue();
       	        rows[i].push(rawTxt);
            }
        }catch(e){
	    console.log("ERROR INSIDE SCRAPE FUNCTION");	
            console.log(e);
	    return;
        }
      }
    }
    if(rows[2].length > 1){
        browser.close();
        let jsonRows = JSON.stringify(rows);
        let newJson = JSON.parse( jsonRows );
        return newJson;
    } else{
        console.log('ERROR');
	return;
    } } catch(e){	
            console.log(e);
	    return;
   }          
}


// app.listen(PORT, () => {
//     console.log(`ON PORT ${PORT}`);
// })
  function onListen() {
    console.log('Listening on', PORT);
  }
	
}

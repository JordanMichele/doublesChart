// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer     = require('puppeteer-extra');
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const bodyParser    = require('body-parser');
const express       = require('express');
const rateLimit     = require('express-rate-limit');
const path          = require('path');
const cors          = require('cors');
const PORT          = process.env.PORT || 3001;
// const cluster       = require("cluster");
// const totalCPUs     = require("os").cpus().length;

// if (cluster.isMaster) {
//     console.log(`Number of CPUs is ${totalCPUs}`);
//     console.log(`Master ${process.pid} is running`);
//     // Fork workers.
// for (let i = 0; i < totalCPUs; i++) {
//     cluster.fork();
// }
      
// cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     console.log("Let's fork another worker!");
//     cluster.fork();
//     });
// } else { 

const app = express();
puppeteer.use(StealthPlugin());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './charting-frontend/build')));

// All other GET requests not handled before will return our React app
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, './charting-frontend/build'));
});

app.post('/api/chart1', async function(req,res){
    try{
	console.log('/chart1');
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
});
app.post('/api/chart2', async function(req,res){
    try{
        console.log('/chart2');
        console.log(req.body);
        let fnum = parseInt(req.body.fNum);
        numberOfHorses = fnum + 1;
        let snum = parseInt(req.body.sNum);
        numberOfHorsesNext = snum + 2;
        res.json(await scrapeProduct(req.body.url));

    } catch(e){
        console.log(e);
    }    
});
app.post('/api/chart3', async function(req,res){
    try{
        console.log('/chart3');
        console.log(req.body);
        let fnum = parseInt(req.body.fNum);
        numberOfHorses = fnum + 1;
        let snum = parseInt(req.body.sNum);
        numberOfHorsesNext = snum + 2;
        res.json(await scrapeProduct(req.body.url));

    } catch(e){
        console.log(e);
    }    
});
app.post('/api/chart4', async function(req,res){
    try{
        console.log('/chart4');
        console.log(req.body);
        let fnum = parseInt(req.body.fNum);
        numberOfHorses = fnum + 1;
        let snum = parseInt(req.body.sNum);
        numberOfHorsesNext = snum + 2;
        res.json(await scrapeProduct(req.body.url));

    } catch(e){
        console.log(e);
    }    
});
app.post('/api/chart5', async function(req,res){
    try{
        console.log('/chart5');
        console.log(req.body);
        let fnum = parseInt(req.body.fNum);
        numberOfHorses = fnum + 1;
        let snum = parseInt(req.body.sNum);
        numberOfHorsesNext = snum + 2;
        res.json(await scrapeProduct(req.body.url));

    } catch(e){
        console.log(e);
    }    
});
app.post('/api/chart6', async function(req,res){
    try{
        console.log('/chart6');
        console.log(req.body);
        let fnum = parseInt(req.body.fNum);
        numberOfHorses = fnum + 1;
        let snum = parseInt(req.body.sNum);
        numberOfHorsesNext = snum + 2;
        res.json(await scrapeProduct(req.body.url));

    } catch(e){
        console.log(e);
    }    
});
app.post('/api/chart7', async function(req,res){
    try{
        console.log('/chart7');
        console.log(req.body);
        let fnum = parseInt(req.body.fNum);
        numberOfHorses = fnum + 1;
        let snum = parseInt(req.body.sNum);
        numberOfHorsesNext = snum + 2;
        res.json(await scrapeProduct(req.body.url));

    } catch(e){
        console.log(e);
    }    
});
app.post('/api/chart8', async function(req,res){
    try{
        console.log('/chart8');
        console.log(req.body);
        let fnum = parseInt(req.body.fNum);
        numberOfHorses = fnum + 1;
        let snum = parseInt(req.body.sNum);
        numberOfHorsesNext = snum + 2;
        res.json(await scrapeProduct(req.body.url));

    } catch(e){
        console.log(e);
    }    
});
app.post('/api/chart9', async function(req,res){
    try{
        console.log('/chart9');
        console.log(req.body);
        let fnum = parseInt(req.body.fNum);
        numberOfHorses = fnum + 1;
        let snum = parseInt(req.body.sNum);
        numberOfHorsesNext = snum + 2;
        res.json(await scrapeProduct(req.body.url));

    } catch(e){
        console.log(e);
    }    
});
app.post('/api/chart10', async function(req,res){
    try{
        console.log('/chart10');
        console.log(req.body);
        let fnum = parseInt(req.body.fNum);
        numberOfHorses = fnum + 1;
        let snum = parseInt(req.body.sNum);
        numberOfHorsesNext = snum + 2;
        res.json(await scrapeProduct(req.body.url));

    } catch(e){
        console.log(e);
    }    
});

// Need to plug in 1 more than the actual
let numberOfHorses;
// Need to plug in 2 more than the actual
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

    const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: false });
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'load',
        timeout: 0
    });

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
	    browser.close();
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
	browser.close();
        console.log('ERROR');
	return;
    }  
               
}


app.listen(PORT, () => {
    console.log(`ON PORT ${PORT}`);
});
	
// }

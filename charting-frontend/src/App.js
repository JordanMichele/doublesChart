import React, {Component} from "react";
import "./App.css";
import ChartRow from "./chartRow";
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      loading: undefined,
      firstRace: "",
      secondRace: "",
      cssCol: "",
      horseNumbers: [],
      firstNums: [],
      secondNums: [],
      thirdNums: [],
      fourthNums: [],
      fifthNums: [],
      sixthNums: [],
      seventhNums: [],
      eighthNums: [],
      colNumObj: {}
    };
    this.callApi = this.callApi.bind(this);
    this.changeText = this.changeText.bind(this);
    this.changeCss = this.changeCss.bind(this);
    this.comboSheetCols = this.comboSheetCols.bind(this);
    this.percentChange = this.percentChange.bind(this);
    this.percentChangeInc = this.percentChangeInc.bind(this);
  }

  changeCss(num){
    let styleCol = '';
    for(let i = 0; i <= num; i++){
      styleCol += '1fr ';
    }
    this.setState({
      cssCol: styleCol
    });
  }

  changeText(event) {
  if(event.target.id === 'name'){
    this.setState({
      url: event.target.value
    });
  }
  if(event.target.id === 'firstRace'){
    this.setState({
      firstRace: event.target.value
    });
    let colNum = parseInt(event.target.value);
    this.changeCss(colNum);
  }
  if(event.target.id === 'secondRace'){
    this.setState({
      secondRace: event.target.value
    });
  }
}
// Call to Node Server to get numbers
  callApi(){
    this.setState({
      loading: true
    });
     let urlEncoded = 'url='+this.state.url+'&fNum='+this.state.firstRace+'&sNum='+this.state.secondRace;
     fetch('/api/chart', {
      method: 'POST',
      mode: 'cors', // this cannot be 'no-cors'
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlEncoded
      })
    .then(res => { 
      this.setState({
        loading: false
      });
       try{
         const data = res.json();
         console.log('Response data ?: ' + data);
         return data;
       }catch(error) {
         console.log('Error happened here!')
         console.error(error)
       }
    })
    .then(data => {
      let arrData = Object.values(data);
      const nums = [];
      for (const element of arrData) {
        if(element.length > 0){
          nums.push(element);
        }
      }
     if(nums.length <= 0){
        console.log("Calling API AGAIN");
        this.callApi();
     }else{  
   
       if(this.state.firstNums.length === 0){
        this.setState({ firstNums : nums});
       }else if(this.state.secondNums.length === 0){
        this.setState({ secondNums : nums});
        this.comboSheetCols(this.state.firstNums, this.state.secondNums, 0.1);
       }else if(this.state.thirdNums.length === 0){
        this.setState({ thirdNums : nums});
        this.comboSheetCols(this.state.secondNums, this.state.thirdNums, 0.1);
       }else if(this.state.fourthNums.length === 0){
        this.setState({ fourthNums : nums});
        this.comboSheetCols(this.state.thirdNums, this.state.fourthNums, 0.15);
       }else if(this.state.fifthNums.length === 0){
        this.setState({ fifthNums : nums});
        this.comboSheetCols(this.state.fourthNums, this.state.fifthNums, 0.15);
       }else if(this.state.sixthNums.length === 0){
        this.setState({ sixthNums : nums});
        this.comboSheetCols(this.state.fifthNums, this.state.sixthNums, 0.2);
       }else if(this.state.seventhNums.length === 0){
        this.setState({ seventhNums : nums});
        this.comboSheetCols(this.state.sixthNums, this.state.seventhNums, 0.2);
       }else if(this.state.eighthNums.length === 0){
        this.setState({ eighthNums : nums});
       }else{
        this.setState({ eighthNums : nums});
       }

       if(this.state.horseNumbers.length === 0){
        this.setState({ horseNumbers : this.state.firstNums[0]});
       }
       
     }

    })
    .catch(err => console.log('INSIDE Fetch Method REACT ERROR: ' + err)) 
}
// Percent Change Helpers
percentChange(oldNum, newNum) {
  let minus = oldNum - newNum;
  let divide = minus / oldNum;
  let answer = divide * 100;
  return answer;
}
percentChangeInc(newNum, oldNum) {
  let minus = newNum - oldNum;
  let divide = minus / oldNum;
  let answer = divide * 100;
  return answer;
}
// Combo sheet
comboSheetCols(arr1, arr2, deci){
  if(arr1.length > 0 && arr2.length > 0){
    let colNumObj = {};
    for(let i = 0; i < arr1.length; i++){
      for(let j = 0; j < arr1[i].length; j++){
      let firstNum = isNaN(arr1[i][j]) === true ? 0 : parseInt(arr1[i][j]);
      let secondNum = isNaN(arr2[i][j]) === true ? 0 : parseInt(arr2[i][j]);      
      let perChange = 0;
      // 1st to 2nd
      if(firstNum > secondNum && firstNum !== 0 && secondNum !== 0){
        let pChange = this.percentChange(firstNum,secondNum);
        perChange = pChange * deci;
          if(colNumObj[j] === undefined || colNumObj[j] === null){
            colNumObj[j] = perChange;
          } else {
              colNumObj[j] += perChange;
          }
       
      } else if(secondNum >= firstNum && firstNum !== 0 && secondNum !== 0){
        let pChangeInc = this.percentChangeInc(secondNum, firstNum);
        perChange = pChangeInc * deci;
          if(colNumObj[j] === undefined || colNumObj[j] === null){
            colNumObj[j] = perChange;       
          } else {
            colNumObj[j] -= perChange;
          }
        
      }
    //End of inner loop
    }
    // End of outer loop
  }
      if(this.state.colNumObj[0] === undefined || this.state.colNumObj[0] === null){
        this.setState({ colNumObj : colNumObj});      
      }
      let nObj = {};
      for (var key in this.state.colNumObj) {
        let method = colNumObj[key];
        let stat = this.state.colNumObj[key];
        if(method !== stat){
          let addMethState = method + stat;
          let newPerChange = addMethState / 2;
          nObj[key] = newPerChange;
        }else{
          nObj[key] = colNumObj[key];
        }
    }
    this.setState({ colNumObj : nObj});


    }
    //End of Method
  }



 

render() {
  return (
    <div>
      <div id="outer">
      
        <label htmlFor="name">Enter Race URL</label>
        <br></br>
        <input type="text" id="name" onChange={this.changeText} />
        <br></br>
        <div>
          <label htmlFor="firstRace">Horses In First Race</label>
          <br></br>
          <input type="text" className="horsesAmountInput" id="firstRace" onChange={this.changeText} />
          <br></br>
          <label htmlFor="secondRace">Horses In Second Race</label>
          <br></br>
          <input type="text" className="horsesAmountInput" id="secondRace" onChange={this.changeText} />
        </div>
        <br></br>
        {this.state.loading === true ? (<Spinner animation="border" variant="primary" /> ) : <button className="button_slide slide_left" onClick={this.callApi}>Call API</button>}

      </div>
      <div >
      
      <div className="currentRaceCombo">
        <h1>Current Race Combo Sheet</h1>
        <div className="comboRow" style={{ gridTemplateColumns: this.state.cssCol }}>
          {this.state.horseNumbers.map((n, index) => (
             <div className={isNaN(this.state.colNumObj[index]) === false && this.state.colNumObj[index] > 0 ? 'comboBoxHit' : 'comboBox'}>
                <p>{this.state.horseNumbers[index]}</p>
                <p >{isNaN(this.state.colNumObj[index]) === true ? 0 : Math.round(this.state.colNumObj[index] * 100) / 100}</p>
              </div>
    
            ))}
        </div>
      </div>
        <div className="chartContainer">
          {this.state.firstNums.map((n, index) => (
            <ChartRow
              key={index}
              id={index}
              number={n}
              cssProp={this.state.cssCol}
              firstNum={this.state.firstNums[index]}
              secondNum={typeof this.state.secondNums[index] === 'object' ? this.state.secondNums[index] : ''}
              thirdNum={typeof this.state.thirdNums[index] === 'object' ? this.state.thirdNums[index] : ''}
              fourthNum={typeof this.state.fourthNums[index] === 'object' ? this.state.fourthNums[index] : ''}
              fifthNum={typeof this.state.fifthNums[index] === 'object' ? this.state.fifthNums[index] : ''}
              sixthNum={typeof this.state.sixthNums[index] === 'object' ? this.state.sixthNums[index] : ''}
              seventhNum={typeof this.state.seventhNums[index] === 'object' ? this.state.seventhNums[index] : ''}
              eighthNum={typeof this.state.eighthNums[index] === 'object' ? this.state.eighthNums[index] : ''}
            />
            
          ))}
           </div>
        </div>
      
    </div>
  );
}
}

export default App;

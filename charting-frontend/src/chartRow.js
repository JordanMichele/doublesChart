import React, { Component } from "react";
import ChartBox from "./chartBox";
import "./chartRow.css";

class ChartRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // numbers: this.props.number
        numbers: [],
        secondNumbers: [],
        thirdNumbers: [],
        fourthNumbers: [],
        fifthNumbers: [],
        sixthNumbers: [],
        seventhNumbers: [],
        eighthNumbers: []
    };
    this.main = this.main.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.main(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  main() {
    let newNumbers = [];
    if(this.props.id === 0){
      newNumbers.push('X');
    }else{
      newNumbers.push(this.props.id);
    }
    for(let i = 0; i < this.props.number.length; i++){
      newNumbers.push(this.props.number[i]);
    }
    this.setState({
      numbers: newNumbers
    });
    // Second Numbers
    if(typeof this.props.secondNum === 'object'){
      let newNumbers = [];
      newNumbers.push(this.props.id);
      for(let i = 0; i < this.props.secondNum.length; i++){
        newNumbers.push(this.props.secondNum[i]);
      }
      this.setState({
        secondNumbers: newNumbers
      });
    }
    // Third Numbers
     if(typeof this.props.thirdNum === 'object'){
          let newNumbers = [];
          newNumbers.push(this.props.id);
          for(let i = 0; i < this.props.thirdNum.length; i++){
            newNumbers.push(this.props.thirdNum[i]);
          }
          this.setState({
            thirdNumbers: newNumbers
          });
    }
    // Fourth Numbers
      if(typeof this.props.fourthNum === 'object'){
          let newNumbers = [];
          newNumbers.push(this.props.id);
          for(let i = 0; i < this.props.fourthNum.length; i++){
            newNumbers.push(this.props.fourthNum[i]);
          }
          this.setState({
            fourthNumbers: newNumbers
          });
    }
    // Fifth Numbers
    if(typeof this.props.fifthNum === 'object'){
      let newNumbers = [];
      newNumbers.push(this.props.id);
      for(let i = 0; i < this.props.fifthNum.length; i++){
        newNumbers.push(this.props.fifthNum[i]);
      }
      this.setState({
        fifthNumbers: newNumbers
      });
}
    // sixth Numbers
    if(typeof this.props.sixthNum === 'object'){
      let newNumbers = [];
      newNumbers.push(this.props.id);
      for(let i = 0; i < this.props.sixthNum.length; i++){
        newNumbers.push(this.props.sixthNum[i]);
      }
      this.setState({
        sixthNumbers: newNumbers
      });
}
    // seventh Numbers
    if(typeof this.props.seventhNum === 'object'){
      let newNumbers = [];
      newNumbers.push(this.props.id);
      for(let i = 0; i < this.props.seventhNum.length; i++){
        newNumbers.push(this.props.seventhNum[i]);
      }
      this.setState({
        seventhNumbers: newNumbers
      });
}
    // eighth Numbers
    if(typeof this.props.eighthNum === 'object'){
      let newNumbers = [];
      newNumbers.push(this.props.id);
      for(let i = 0; i < this.props.eighthNum.length; i++){
        newNumbers.push(this.props.eighthNum[i]);
      }
      this.setState({
        eighthNumbers: newNumbers
      });
}
// END OF MAIN

  }
  render() {
    
    const { cssProp } = this.props;
    return (
      <div className="grid-container" style={{ gridTemplateColumns: cssProp }}>
        {this.state.numbers.map((n, index) => (
            <ChartBox
            key={index}
            rowKey={this.props.id}
            id={index + 1}
            num={n}
            secondNum={this.state.secondNumbers[index]}
            thirdNum={this.state.thirdNumbers[index]}
            fourthNum={this.state.fourthNumbers[index]}
            fifthNum={this.state.fifthNumbers[index]}
            sixthNum={this.state.sixthNumbers[index]}
            seventhNum={this.state.seventhNumbers[index]}
            eighthNum={this.state.eighthNumbers[index]}
            />
        ))}
      
      </div>
    );
  }
}

export default ChartRow;
import React, { Component } from "react";
import "./chartBox.css";

class ChartBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        percentChange10: 0,
        percentChange5: 0,
        percentChange2: 0,
        percentChange: 0,
        //new Below
        percentChangePost:0,
        percentChangeSix:0,

        numbers15: "numbers15",
        numbers10: "numbers10",
        numbers5: "numbers5",
        numbers2: "numbers2",
        numbersPost: "numbersPost",
        //new Below
        numbersSix: "numbersSix",
        numbersSeven: "numbersSeven",
    };
    this.percentChange = this.percentChange.bind(this);
    this.percentChangeInc = this.percentChangeInc.bind(this);
    this.fifteenToTen = this.fifteenToTen.bind(this);
    this.tenToFive = this.tenToFive.bind(this);
    this.fiveToTwo = this.fiveToTwo.bind(this);
    this.twoToPost = this.twoToPost.bind(this);
    this.main = this.main.bind(this);
    this.fifthToSixth = this.fifthToSixth.bind(this);
    this.SixthToSeventh = this.SixthToSeventh.bind(this);
  }
  main() {
    this.fifteenToTen();
    this.tenToFive();
    this.fiveToTwo();
    this.twoToPost();
    this.fifthToSixth();
    this.SixthToSeventh();
    this.setState({ calledMain: true });
  }
  componentDidMount() {
    this.interval = setInterval(() => this.main(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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

  fifteenToTen() {
  //    console.log('INSIDE fifteen to ten');
    let firstNum = this.props.num;
    let secondNum = this.props.secondNum;
    let numbers10;
    if (parseInt(firstNum) > parseInt(secondNum)) {
      let perChange = this.percentChange(
        parseInt(firstNum),
        parseInt(secondNum)
      );

      if (perChange > 23.0) {
        numbers10 = "numbers10BigHit";
        this.setState({ numbers10: numbers10 });
      } else {
        numbers10 = "numbers10Hit";
        this.setState({ numbers10: numbers10 });
      }
      this.setState({ percentChange: perChange });
    } else if (parseInt(firstNum) <= parseInt(secondNum)) {
      let perChangeIn10 = this.percentChangeInc(
        parseInt(secondNum),
        parseInt(firstNum)
      );
      this.setState({ numbers10: "numbers10" });
      let newPerChange10 = this.state.percentChange - perChangeIn10;
      if(this.state.percentChange === 0){
        this.setState({ percentChange: newPerChange10 });
      }
      
    }
  }

  tenToFive() {
    //console.log('INSIDE ten to five');
    let secondNum = this.props.secondNum;
    let thirdNum = this.props.thirdNum;
    let numbers5;
    if (parseInt(secondNum) > parseInt(thirdNum)) {
      let perChange = this.percentChange(
        parseInt(secondNum),
        parseInt(thirdNum)
      );
      
      if (perChange > 23.0) {
        numbers5 = "numbers5BigHit";
        this.setState({ numbers5: numbers5 });
      } else {
        numbers5 = "numbers5Hit";
        this.setState({ numbers5: numbers5 });
      }
      this.setState({ percentChange10: perChange });
    } else if (parseInt(secondNum) <= parseInt(thirdNum)) {
      let perChangeIn5 = this.percentChangeInc(
        parseInt(thirdNum),
        parseInt(secondNum)
      );
      this.setState({ numbers5: "numbers5" });
      let newPerChange5 = this.state.percentChange10 - perChangeIn5;
      if(this.state.percentChange10 === 0){
        this.setState({ percentChange10: newPerChange5 });
      }
    }
  }

  fiveToTwo() {
    let thirdNum = this.props.thirdNum;
    let fourthNum = this.props.fourthNum;
    let numbers2;
    if (parseInt(thirdNum) > parseInt(fourthNum)) {
      let perChange = this.percentChange(
        parseInt(thirdNum),
        parseInt(fourthNum)
      );

      if (perChange > 23.0) {
        numbers2 = "numbers2BigHit";
        this.setState({ numbers2: numbers2 });
      } else {
        numbers2 = "numbers2Hit";
        this.setState({ numbers2: numbers2 });
      }
      this.setState({ percentChange5: perChange });
    } else if (parseInt(thirdNum) <= parseInt(fourthNum)) {
      let perChangeIn2 = this.percentChangeInc(
        parseInt(fourthNum),
        parseInt(thirdNum)
      );
      this.setState({ numbers2: "numbers2" });
      let newPerChange2 = this.state.percentChange5 - perChangeIn2;
      if(this.state.percentChange5 === 0){
        this.setState({ percentChange5: newPerChange2 });
      }
    }
  }

  twoToPost() {
    //console.log('INSIDE 2 to post');
    let fourthNum = this.props.fourthNum;
    let fifthNum = this.props.fifthNum;
    let numbersPost;
    // let newPerChangeCss;
    if (parseInt(fourthNum) > parseInt(fifthNum)) {
      let perChange = this.percentChange(
        parseInt(fourthNum),
        parseInt(fifthNum)
      );
      // let newPerChange = this.state.percentChange5 + perChange;
      if (perChange > 23.0) {
        numbersPost = "numbersPostBigHit";
        this.setState({ numbersPost: numbersPost });
      } else {
        numbersPost = "numbersPostHit";
        this.setState({ numbersPost: numbersPost });
      }
      this.setState({ percentChange2: perChange });
    } else if (parseInt(fourthNum) <= parseInt(fifthNum)) {
      let perChangeInPost = this.percentChangeInc(
        parseInt(fifthNum),
        parseInt(fourthNum)
      );
      this.setState({ numbersPost: "numbersPost" });
      let newPerChangePost = this.state.percentChange2 - perChangeInPost;
      if(this.state.percentChange2 === 0){
        this.setState({ percentChange2: newPerChangePost });
      }
    }
}

fifthToSixth() {
    //console.log('INSIDE 5th to 6th');
    let sixthNum = this.props.sixthNum;
    let fifthNum = this.props.fifthNum;
    let numbersSix;
    // let newPerChangeCss;
    if (parseInt(fifthNum) > parseInt(sixthNum)) {
      let perChange = this.percentChange(
        parseInt(fifthNum),
        parseInt(sixthNum)
      );
      // let newPerChange = this.state.percentChange5 + perChange;
      if (perChange > 23.0) {
        numbersSix = "numbersSixBigHit";
        this.setState({ numbersSix: numbersSix });
      } else {
        numbersSix = "numbersSixHit";
        this.setState({ numbersSix: numbersSix });
      }
      this.setState({ percentChangePost: perChange });
    } else if (parseInt(fifthNum) <= parseInt(sixthNum)) {
      let perChangeInPost = this.percentChangeInc(
        parseInt(sixthNum),
        parseInt(fifthNum)
      );
      this.setState({ numbersSix: "numbersSix" });
      let newPerChangePost = this.state.percentChangePost - perChangeInPost;
      
      if(this.state.percentChangePost === 0){
        this.setState({ percentChangePost: newPerChangePost });
      }
    }
}

SixthToSeventh() {
    //console.log('INSIDE  6th to 7th');
    let sixthNum = this.props.sixthNum;
    let seventhNum = this.props.seventhNum;
    let numbersSeven;
    // let newPerChangeCss;
    if (parseInt(sixthNum) > parseInt(seventhNum)) {
      let perChange = this.percentChange(
        parseInt(sixthNum),
        parseInt(seventhNum)
      );
      // let newPerChange = this.state.percentChange5 + perChange;
      if (perChange > 23.0) {
        numbersSeven = "numbersSevenBigHit";
        this.setState({ numbersSeven: numbersSeven });
      } else {
        numbersSeven = "numbersSevenHit";
        this.setState({ numbersSeven: numbersSeven });
      }
      this.setState({ percentChangeSix: perChange });
    } else if (parseInt(sixthNum) <= parseInt(seventhNum)) {
      let perChangeInPost = this.percentChangeInc(
        parseInt(seventhNum),
        parseInt(sixthNum)
      );
      this.setState({ numbersSeven: "numbersSeven" });
      let newPerChangePost = this.state.percentChangeSix - perChangeInPost;
      if(this.state.percentChangeSix === 0){
        this.setState({ percentChangeSix: newPerChangePost });
      }
    }
}


  render() {
    return (
      <div className={this.props.rowKey === 0 || this.props.id === 1 ? 'grid-item-border' : "grid-item"}>
          <ul className="box">
            <li className={this.props.rowKey === 0 || this.props.id === 1 ? 'numbers15-border' : this.state.numbers15}>{this.props.num}</li>
            <li className={this.state.numbers10}>{this.props.rowKey === 0 || this.props.id === 1 ? '' : this.props.secondNum}</li>
            <li className={this.state.numbers5}>{this.props.rowKey === 0 || this.props.id === 1 ? '' : this.props.thirdNum}</li>
            <li className={this.state.numbers2}>{this.props.rowKey === 0 || this.props.id === 1 ? '' : this.props.fourthNum}</li>
            <li className={this.state.numbersPost}>{this.props.rowKey === 0 || this.props.id === 1 ? '' : this.props.fifthNum}</li>
            <li className={this.state.numbersSix}>{this.props.rowKey === 0 || this.props.id === 1 ? '' : this.props.sixthNum}</li>
            <li className={this.state.numbersSeven}>{this.props.rowKey === 0 || this.props.id === 1 ? '' : this.props.seventhNum}</li>
            <li className="box">{this.props.rowKey === 0 || this.props.id === 1 ? '' : this.props.eighthNum}</li>
          </ul>
      </div>
    );
  }
}

export default ChartBox;
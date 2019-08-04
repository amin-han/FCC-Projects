//here we go

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputStr: "",
      inputs: [],
      answer: null,
      fullAnswer: null
    }
    this.handleDigits = this.handleDigits.bind(this);
    this.handleArithmetic = this.handleArithmetic.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  
  //what happens when you press buttons
  handleDigits(e) {
    if(this.state.answer === 'I AM ERROR.') { return null; }
    if(this.state.answer) {
      this.setState({
        answer: null,
        fullAnswer: null,
        inputs: []
      });
    }
    switch(e.target.id) {
      case "decimal":
        if(this.state.inputStr.indexOf(".") === -1) {
          let inputStr = this.state.inputStr === "" ? "0." : this.state.inputStr + ".";
          this.setState({
            inputStr
          });
        }
        break;
      case "zero":
        if(this.state.inputStr === "") { break; }
        this.setState({ inputStr: this.state.inputStr + "0" });
        break;
      case "one":
        this.setState({ inputStr: this.state.inputStr + "1" });
        break;
      case "two":
        this.setState({ inputStr: this.state.inputStr + "2" });
        break;
      case "three":
        this.setState({ inputStr: this.state.inputStr + "3" });
        break;
      case "four":
        this.setState({ inputStr: this.state.inputStr + "4" });
        break;
      case "five":
        this.setState({ inputStr: this.state.inputStr + "5" });
        break;
      case "six":
        this.setState({ inputStr: this.state.inputStr + "6" });
        break;
      case "seven":
        this.setState({ inputStr: this.state.inputStr + "7" });
        break;
      case "eight":
        this.setState({ inputStr: this.state.inputStr + "8" });
        break;
      case "nine":
        this.setState({ inputStr: this.state.inputStr + "9" });
        break;
    }
  }
  
  //here is where the math takes place
  handleArithmetic(e) {
    if(this.state.answer === 'I AM ERROR.') { return null; }
    if(this.state.answer) {
      this.setState({
        inputs: [],
        inputStr: ""
      });
      switch(e.target.id) {
        case "add":
          this.setState({
            inputs: [this.state.answer, "+"],
            answer: null
          });
          break;
        case "subtract":
          this.setState({
            inputs: [this.state.answer, "-"],
            answer: null
          });
          break;
        case "divide":
          this.setState({
            inputs: [this.state.answer, "/"],
            answer: null
          });
          break;
        case "multiply":
          this.setState({
            inputs: [this.state.answer, "x"],
            answer: null
          });
          break;
      }
    } else {
      if(this.state.inputStr === "") {
        if(this.state.inputs.length === 0) { return null; }
        if(this.state.inputs[this.state.inputs.length - 1].match(/[/x+-]/) !== null) {
          let inputs = [...this.state.inputs];
          inputs.pop();
          switch(e.target.id) {
            case "add":
              this.setState({ inputs: [...inputs, "+"] });
              break;
            case "subtract":
              this.setState({ inputs: [...inputs, "-"] });
              break;
            case "divide":
              this.setState({ inputs: [...inputs, "/"] });
              break;
            case "multiply":
              this.setState({ inputs: [...inputs, "x"] });
              break;
          }
        } else {
          switch(e.target.id) {
            case "add":
              this.setState({ inputs: [...this.state.inputs, "+"] });
              break;
            case "subtract":
              this.setState({ inputs: [...this.state.inputs, "-"] });
              break;
            case "divide":
              this.setState({ inputs: [...this.state.inputs, "/"] });
              break;
            case "multiply":
              this.setState({ inputs: [...this.state.inputs, "x"] });
              break;
          }
        }
      } else {
        switch(e.target.id) {
          case "add":
            this.setState({
              inputs: [...this.state.inputs, this.state.inputStr, "+"],
              inputStr: ""
            });
            break;
          case "subtract":
            this.setState({
              inputs: [...this.state.inputs, this.state.inputStr, "-"],
              inputStr: ""
            });
            break;
          case "divide":
            this.setState({
              inputs: [...this.state.inputs, this.state.inputStr, "/"],
              inputStr: ""
            });
            break;
          case "multiply":
            this.setState({
              inputs: [...this.state.inputs, this.state.inputStr, "x"],
              inputStr: ""
            });
            break;
        }
      } 
    }
  }
  
  //when you hit equals
  
  handleEquals() {
    if(this.state.answer === 'I AM ERROR.' || this.state.inputStr === "") { return null; }
    let inputs = [...this.state.inputs, this.state.inputStr];
    if(inputs.length < 3) {
      this.setState({
        inputs: ["I AM ERROR."],
        inputStr: "Press AC!",
        answer: "I AM ERROR."
      });
    } else {
      try {
        let answer;
        if(this.state.fullAnswer) {
          let copyInputs = [...inputs];
          copyInputs[0] = this.state.fullAnswer;
          answer = eval(copyInputs.join("").replace("x", "*"));
        } else {
          answer = eval(inputs.join("").replace("x", "*"));
        }
        if(answer === Infinity) {
          this.setState({
            inputs: ["I AM ERROR."],
            inputStr: "Press AC!",
            answer: "I AM ERROR."
          });
        } else {
          this.setState({
            inputs: [...inputs, "="],
            inputStr: "",
            answer: Math.round(answer * 10000000) / 10000000,
            fullAnswer: answer
          });
        }
      } catch(err) {
        this.setState({
          inputs: ["I AM ERROR."],
          inputStr: "Press AC!",
          answer: "I AM ERROR."
        });
      }
    }
  }
  
  //using the AC/CE buttons
  
  handleClear(e) {
    switch(e.target.id) {
      case "clear-element":
        if(this.state.answer) { break; }
        if(this.state.inputStr.length > 1) {
          this.setState({ inputStr: this.state.inputStr.substr(0, this.state.inputStr.length - 1) });
        } else if(this.state.inputStr.length === 1) {
          this.setState({ inputStr: "" });
        } else {
          if(this.state.inputs.length > 0) {
            let inputs = [...this.state.inputs];
            inputs.pop();
            this.setState({ inputs });
          } else {
            this.setState({
              inputStr: "",
              inputs: [],
              answer: null,
              fullAnswer: null
            });
          }
        }
        break;
      default:
        this.setState({
          inputStr: "",
          inputs: [],
          answer: null,
          fullAnswer: null
        });
    }
  }
  
  //HTML time
  
    render() {
    return (
        <div>
        <div className="calculator">
          <div className="screen">
            <h4 id="inputs">{this.state.inputs.length > 0 ? this.state.inputs.join("") : " "}</h4>
            <h3 id="display">{this.state.inputStr === "" ? this.state.answer !== null ? this.state.answer : "0" : this.state.inputStr}</h3>
          </div>
          
          <div className="dpad">
            <button id= "multiply" type="button" className="d-left" onClick={this.handleArithmetic}>x</button>
            <button id= "add" type="button" className="d-up" onClick={this.handleArithmetic}>+</button>
            <button id= "divide" type="button" className="d-right" onClick={this.handleArithmetic}>&#247;</button>
            <button id= "subtract" type="button" className="d-down" onClick={this.handleArithmetic}>-</button>
          </div>
          
          <div className="circlebuttons">
            <button id= "clear" type="button" className="greenbutton" onClick={this.handleClear}>AC</button>
            <button id= "clear-element" type="button" className="redbutton" onClick={this.handleClear}>CE</button>
          </div>
          
          <div className="startselect">
              <button id= "zero" type="button" className="startselectbutton" onClick={this.handleDigits}>0</button>
              <button id= "decimal" type="button" className="startselectbutton" onClick={this.handleDigits}>.</button>
            </div>
          
          <button id= "equals" type="button" className="equals" onClick={this.handleEquals}>=</button>
               
          <div className="keys">
            <button id= "one" type="button" className="singlekey" onClick={this.handleDigits}>1</button>
            <button id= "two" type="button" className="singlekey" onClick={this.handleDigits}>2</button>
            <button id= "three" type="button" className="singlekey" onClick={this.handleDigits}>3</button>
            <button id= "four" type="button" className="singlekey" onClick={this.handleDigits}>4</button>
            <button id= "five" type="button" className="singlekey" onClick={this.handleDigits}>5</button>
            <button id= "six" type="button" className="singlekey" onClick={this.handleDigits}>6</button>
            <button id= "seven" type="button" className="singlekey" onClick={this.handleDigits}>7</button>
              <button id= "eight" type="button" className="singlekey" onClick={this.handleDigits}>8</button>
              <button id= "nine" type="button" className="singlekey" onClick={this.handleDigits}>9</button>
          </div>
        </div>
      </div>
    );
  }
}

//where it all comes together
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Calculator />
      </div>
    );
  }
  
}


ReactDOM.render(<App />, document.getElementById('app'));

import React from 'react';
import './App.css';
import  data from './data.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      regions: data,
      questions: null,
      result: null,
      canVote: null,
      questionsToShow: 1
    };
  }

  handleRegionChange = (e) => {
    let regionCopy = data.slice();
    let selected = e.target.value;

    let regions = regionCopy.map(region => {
      region.isSelected = region.name === selected;
      return region;
    });
    
    this.setState({ 
      regions: regions,
      questionsToShow: 1,
      questions:  this.selectedRegion().questions,
      result: null
    })
  }

  handleQuestionChange = (e) => {
    var stateCopy = Object.assign({}, this.state);
    let questionsCopy = stateCopy.questions.slice();
    let selected = e.target.value;
    let selectedQuestion = e.target.name;


    let questions = questionsCopy.map(question => {
      if (question.value === selectedQuestion) {
        question.selectedOption = selected;
      }
      return question;
    });

    let selectedQuestionObject = questionsCopy.filter(question => question.value === selectedQuestion)[0].options.filter(option => option.value === selected)[0]
    let increment = selectedQuestionObject.result ? 0 : 1;
    let questionsToShow = questions.filter(questions => questions.selectedOption).length + increment;

    this.setState({ questions: questions,
      questionsToShow: questionsToShow,
      result: selectedQuestionObject.result, 
      canVote: selectedQuestionObject.canVote
    })
  }

  renderOptions = (question) => (
    question.options ? 
      (question.options.map(option => (
        <span className="radio-wrapper">
          <input 
            type="radio" 
            className="btn-check"
            key={option.value}
            name={question.value}
            value={option.value}
            checked={question.selectedOption == option.value}
            onChange={(e) => this.handleQuestionChange(e)}
          />
          <label className="btn" htmlFor={question.value}>{option.value}</label>
        </span>
      )))
      : null
  )

  selectedRegion = () => this.state.regions.filter(region => region.isSelected)[0]

  render() {
    const { regions, questions, result, questionsToShow, canVote} = this.state;
    
    let regionField = (
      <div className="form-group">
        <label>State</label>
        <select name="regions" id="regions" onChange={(e) => this.handleRegionChange(e)} className="form-control">
          {regions.map(region => (
            <option key={region.id} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
      </div>
    );

    let questionFields = (questions ? questions.map((question, i) => 
      (i < questionsToShow) ? (
        <div className="form-group">
          <label>{question.value}</label>
          <p>{question.extra}</p>
          {this.renderOptions(question)}
        </div>
      ) : null

    ) : null);

    let resultWrapper = (<div className={`result-wrapper ${canVote ? 'result-wrapper-green' : 'result-wrapper-red'}`} role="alert">
      <h2>{canVote ? 'You can vote!' : 'You can\'t vote.'}</h2>
      <p dangerouslySetInnerHTML={{__html: result}}></p>
    </div>)

    return (
      <div className="App">
        <h1>Can I vote?</h1>
        <h2 className="lead">Voting laws are pretty complex. Check if you are eligible to vote in your state today. Just complete the form below.</h2>
        
        {regionField}
        {questionFields}

        {result && resultWrapper}
        
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import Select from 'react-select';
import data from './data.json';

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
    let selected = e.value;

    let regions = regionCopy.map(region => {
      region.isSelected = region.value === selected;
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
    let questionValue = e.target.name;
    let clickedQuestion = questionsCopy.filter(question => question.value === questionValue)[0]
    let prevQuestionChanged = clickedQuestion.id < this.state.questionsToShow;

    if (prevQuestionChanged) {
      this.clearProceedingQuestions(clickedQuestion.id);
    }

    let questions = questionsCopy.map(question => {
      if (question.value === questionValue) {
        question.selectedOption = selected;
      }
      return question;
    });

    let selectedOption = clickedQuestion.options.filter(option => option.value === selected)[0]
    let increment = selectedOption.result ? 0 : 1;
    let questionsToShow = questions.filter(questions => questions.selectedOption).length + increment;

    this.setState({ questions: questions,
      questionsToShow: questionsToShow,
      result: selectedOption.result, 
      canVote: selectedOption.canVote
    })
  }

  clearProceedingQuestions = (id) => {
    var stateCopy = Object.assign({}, this.state);
    let questionsCopy = stateCopy.questions.slice();

    questionsCopy.map(question => {
      if (id < question.id) {
        question.selectedOption = null;
      }
      return question
    })
    this.setState({ questions: questionsCopy })
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
            checked={question.selectedOption === option.value}
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
    let noAnswer = typeof canVote != "boolean";
    let resultHeading = noAnswer ?
      'You might be able to vote...' : canVote ?
      'You can vote!' : 'You can\'t vote.';
    let resultClass = noAnswer ?
      'result-wrapper-blue' : canVote ?
      'result-wrapper-green' : 'result-wrapper-red';

    const selectStyles = {
      control: (base, state) => ({
        ...base,
        height: '46px',
        'min-height': '46px',
      }),
    };
    let regionField = (
      <div className="form-group">
        <label>Where do you live?</label>
        <Select
          styles={selectStyles}
          options={regions}
          name="regions"
          id="regions"
          onChange={(e) => this.handleRegionChange(e)}
          theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#f3f6ff',
              primary: '#3466ff',
            },
          })}
        />
      </div>
    );

    let questionFields = (questions ? questions.map((question, i) =>
        <div className={(i < questionsToShow) ? 'form-group' : 'form-group hide'}>
          <label>{question.value}</label>
          {question.extra ? `<p>${question.extra}</p>` : null }
          {this.renderOptions(question)}
        </div>

    ) : null);

    let resultWrapper = (<div className={`result-wrapper ${resultClass}`} role="alert">
      <div className="result-text">
        <span>
          <h2>{resultHeading}</h2>
          <p dangerouslySetInnerHTML={{__html: result}}></p>
        </span>
      </div>
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

import React from 'react';
import './App.css';
import Select from 'react-select';
import data from './data.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    this.state = {
      regions: data,
      questions: null,
      result: null,
      canVote: null,
      questionsToShow: 1,
      src: params.src
    };
  }

  handleRegionChange = (e) => {
    let regionCopy = data.slice();
    let selected = e.value;
    let prevSelectedRegion = regionCopy.filter(region => region.isSelected)[0]

    let regions = regionCopy.map(region => {
      region.isSelected = region.value === selected;
      return region;
    });

    let selectedRegion = this.selectedRegion();
    let noQuestions = selectedRegion.questions === null;
    let regionHasntChanged = prevSelectedRegion && selected === prevSelectedRegion.label;

    if (regionHasntChanged) return;

    this.setState({ 
      regions: regions,
      questionsToShow: 1,
      questions: selectedRegion.questions,
      result: noQuestions ? selectedRegion.result : null,
      canVote: noQuestions ? true : null
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
        minHeight: '46px',
      }),
    };

    let regionField = (
      <div className="form-group">
        <label>Where do you live?</label>
        <Select
          styles={selectStyles}
          classNamePrefix='reactSelect'
          options={regions}
          name="regions"
          id="regions"
          onChange={(e) => this.handleRegionChange(e)}
          theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors
            },
          })}
        />
      </div>
    );

    let questionFields = (questions ? questions.map((question, i) =>
      <div className={(i < questionsToShow) ? 'form-group' : 'form-group hide'}>
        <label>{question.value}</label>
        <p dangerouslySetInnerHTML={{__html: question.extra}}></p>
        {this.renderOptions(question)}
      </div>
    ) : null);

    let resultWrapper = (<div className={`result-wrapper ${resultClass}`} role="alert">
      <div className="result-text">
        <span>
          <span className="row">
            <h2>{resultHeading}</h2>
          </span>
          <p dangerouslySetInnerHTML={{__html: result}}></p>
        </span>
      </div>
    </div>)

    return (
      <div className={`App ${this.state.src}`}>
        <h1>Can I vote?</h1>
        <h2 className="lead">Check if you are eligible to vote in your state today. Just complete the form below.
            {" "}<a href="https://loopdash.notion.site/Hip-Hop-Caucus-Voting-Questionnaire-States-3e1b43d1bb164b30b7bc7e4993467fb1" target="_lblank">See all completed states</a>
            </h2>
        {regionField}
        {questionFields}
        {result && resultWrapper}
      </div>
    );
  }
}

export default App;

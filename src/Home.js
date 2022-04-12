
import React from 'react';
import './App.css';
import Select from 'react-select';
import data from './data.json';
import { Link } from "react-router-dom";

class Home extends React.Component {
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
        <h1>Where do you live?</h1>
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
        <p className="float-right small">Data provided by Hip Hop Caucus' <a href="http://respectmyvote.com" target="_blank" rel="noreferrer">Respect My Vote!</a> campaign.</p>
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
      <div className={`Home ${this.state.src}`}>
        <p><Link to="/about">About this project</Link></p>
        {regionField}
        {questionFields}
        {result && resultWrapper}
      </div>
    );
  }
}

export default Home;

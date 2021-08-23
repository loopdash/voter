import React from 'react';
import './App.css';
import  data from './data.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: data,
      selectedRegion: null,
      questions: null
    };
  }

  handleRegionChange = (e) => {
    let selected = e.target.value;
    let questions = this.state.regions.find(x => x.name === selected).questions
    
    this.setState({ selectedRegion: selected, questions: questions })
  }


  render() {
    const { regions, questions } = this.state;

    return (
      <div className="App">
        <h1>Can I vote?</h1>
        <h2 className="lead">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.</h2>
        <label>State</label>

        <select name="regions" id="regions" value={this.state.selectedRegion} onChange={(e) => this.handleRegionChange(e)}>
          {regions.map(region => (
            <option key={region.id} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>


        {questions ? questions.map(question => (
          <label>{question.label}</label>
            // {
            //   question.options.map(option => (
            //     <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off">
            //     <label class="btn btn-secondary" for={option.label}>{option.label}</label>
            //   ))
            // }
        )) : null}
      </div>
    );
  }
}

export default App;

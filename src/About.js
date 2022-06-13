import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';



class About extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`https://u1tl8hn7.directus.app/items/pages?filter[title][_eq]=About`, {
      crossDomain:true,
      method: 'GET',
      mode: 'cors',
      headers: {'Content-Type':'application/json' }
    }).then(res => res.json())
      .then(json => {
        let body = json.data[0].body;
        console.log(body)
        return this.setState({ data: body });
      });
  }

  render() {
    return (
      <div className={`About`}>
        <p><Link to="/">Back to questionnaire</Link></p>
          <div dangerouslySetInnerHTML={{__html: this.state.data}}></div>
      </div>
    );
  }
}
export default About;
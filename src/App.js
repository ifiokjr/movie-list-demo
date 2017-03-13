import React, { Component } from 'react';
import { Card, Container, Segment } from 'semantic-ui-react'
import Select from 'react-select';
import { map, prop, compose, uniq } from 'ramda';
import films from './films';
import './App.css';


/**
 * Using Functional Composition to transform data into a unique list of 
 * company names. 
 * 
 * @param  {Array<Object>} films - list of film objects
 * @return {Array<Object>} 
 */

const transformFilmsToCompanyName = compose(
  map(name => ({ label: name, value: name })),
  uniq,
  map(prop('company')),
)


/**
 * Our main React Component
 * 
 * @class App
 * @extends {Component}
 */

class App extends Component {
  state = {
    selectedCompany: ''
  }


  /**
   * Used to manage the selected company in the select box
   * 
   * @memberOf App
   * @param {Object|Null} obj 
   */
  
  changeCompany = (obj) => {
    if (!obj) {
      this.setState({
        selectedCompany: ''
      })
    } else {
      this.setState({
        selectedCompany: obj.value
      })
    }
  }

  /**
   * React Component render method. Manages what is displayed in the View.
   */

  render() {
    const companies = transformFilmsToCompanyName(films) // [{label: 'company', value: 'company' }]
    const { selectedCompany } = this.state
    return (
      <Container className="App">
        <Segment className='attribution'>
          Built with love by <strong>Ifiok Jr.</strong>
        </Segment>
        <Select 
          name='companies'
          placeholder='Select your company' 
          options={companies}
          onChange={this.changeCompany}
          value={this.state.selectedCompany}
        />
        {
          films
          .sort((a, b) => {

            if(a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }

            // Names must be equal
            return 0;
          })
          .filter(film => selectedCompany ? film.company === selectedCompany : true)
          .map(film => (
            <Card
              key={film.url}
              image={film.image}
              header={film.name}
              meta={film.company}
              as='a'
              href={film.url}
            />
          ))
        }
      </Container>
    );
  }
}

export default App;

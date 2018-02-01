import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addResults } from '../actions';
const BASE_URL = "https://api.yelp.com"

class Landing extends Component {
  constructor(props) {
    super(props);
    this.findLocation = this.findLocation.bind(this);
    this.state = {
      location: "",
      token: "",
      results: {
        thingsToDo: [],
        foodNearMe: []
      }
    };
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
    this.authorizeYelp = this.authorizeYelp.bind(this);
  }

  authorizeYelp() {

    var authorizationData = {
      client_id: '',
      client_secret: '',
      grant_type: 'client_credentials'
    }

    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    var config = {
      url: `${BASE_URL}/oauth2/token`,
      method: "post",
      headers: headers,
      data: Object.keys(authorizationData).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(authorizationData[k])}`).join('&')
    }

    return axios(config)
      .then(data => {
        return data.data.access_token
      });
  }

  findLocation(e) {
    e.preventDefault();
    let location = this.state.location;

    this.authorizeYelp()
      .then(token => {
        this.makeRequest(token, location, "tourist attractions").then(this.resolveData.bind(this, "thingsToDo"))
        this.makeRequest(token, location, "tourist restaurants").then(this.resolveData.bind(this, "foodNearMe"))
      }).then(this.submitLocation.bind(this));
    this.setState({
      location: ""
    })
  }

  resolveData(searchTerm, data) {
    let results = {};
    results[searchTerm] = data;
    this.props.addResults(results)
  }

  makeRequest(token, location, searchTerm) {
    let config = {
      url: `${BASE_URL}/v3/businesses/search?`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'get',
      params: {
        location: location,
        term: searchTerm
      }
    }
    return axios(config)
      .then(data => data.data.businesses)
  }

  handleSearchTerm(e) {
    this.setState({
      location: e.target.value
    });
  }

  submitLocation() {
    this.props.history.push('/results');
  }

  render() {
    return (
      <div>
        <div id="landing">
          <h1>Where do you wanna go?</h1>
          <form onSubmit={this.findLocation}>
            <input type="text" onChange={this.handleSearchTerm} placeholder="Enter location"
            value={this.state.searchTerm} />
          </form>
        </div>
        <div>
          <ul className="slideshow">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(null, { addResults })(Landing)

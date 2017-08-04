import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

const BASE_URL = "https://api.yelp.com"

export default class Landing extends Component {
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
      client_id: '_x93JominAE4md1BNp7Zmw',
      client_secret: '2Wkgfn01nsKpTJJ9Vx7bKXIA3NZ5gRp4svrh6CH1OIUinhb5pFsqEN42pa4FQgy4',
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
        this.makeRequest(token, location, "things to do").then(this.resolveData.bind(this, "thingsToDo"))
        this.makeRequest(token, location, "food near me").then(this.resolveData.bind(this, "foodNearMe"))
      });
    this.setState({
      location: ""
    })
  }

  resolveData(searchTerm, data) {
    console.log(searchTerm, data);
    let results = this.state.results;
    results[searchTerm] = data;
    this.setState({
      results: results
    })

    console.log(this.state.results)
    this.props.history.push('/results');
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
    console.log(this.state.location);
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

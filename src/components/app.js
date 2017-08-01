import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.findLocation = this.findLocation.bind(this);
    this.state = {
      searchTerm: ""
    };
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
  }

  findLocation(e) {
    e.preventDefault();
    this.setState({
      searchTerm: ""
    })
  }

  handleSearchTerm(e) {
    this.setState({
      searchTerm: e.target.value
    });
    console.log(this.state.searchTerm);
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

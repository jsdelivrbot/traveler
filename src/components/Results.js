import React, { Component } from 'react';
import { connect } from 'react-redux';

class Results extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.results)
    this.renderResults = this.renderResults.bind(this);
  }

  componentDidUpdate() {
    console.log(this.props.results)
  }

  renderResults(results) {
    return results.map(result => {
      return <li className="list-group-item">
        <ul><h4>{result.name}</h4></ul>
        <ul>&#9734; {result.rating}/5</ul>
        <ul>{result.price}</ul>
        <ul>
          <a href={result.url}>
            <img src={result.image_url} className="img-thumbnail" />
          </a>
        </ul>
      </li>
    });
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group" className="pull-left">
          <h2><strong>Food Near Me</strong></h2>
            { this.renderResults(this.props.results.foodNearMe) }
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="list-group" className="pull-right">
          <h2><strong>Things To Do</strong></h2>
            { this.renderResults(this.props.results.thingsToDo) }
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results
  }
}

export default connect(mapStateToProps, {})(Results);

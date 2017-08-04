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
      return <tr>
        <td>
          <p>{result.name}</p>
          <p>{result.rating}</p>
          <p>{result.price}</p>
          <a href={result.url} className="pullRight">
            <img src={result.image_url} className="imgThumbnail" />
          </a>
        </td>
      </tr>
    });
  }

  render() {
    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th>
                Food Near me
              </th>
            </tr>
            { this.renderResults(this.props.results.foodNearMe) }
          </tbody>
        </table>
        <table className="table">
          <tbody>
            <tr>
              <th>
                Things To Do
              </th>
            </tr>
            { this.renderResults(this.props.results.thingsToDo) }
          </tbody>
        </table>
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

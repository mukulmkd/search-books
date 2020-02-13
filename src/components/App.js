import React from 'react';
import ListDetails from './ListDetails';
import AutoSuggest from './AutoSuggest';
import utility from '../utility/util';
import { dataObj } from '../data.js'; // Loading Data
import './App.css';

export default class App extends React.Component {
  state = {
    numberOfRecordsToDisplay: 0,
    suggestions: [],
    setText: "",
    finalData: []
  }
  showAutoSuggest = (event) => {
    event.preventDefault();
    let searchtext = event.target.value;
    if (searchtext.trim() === "") {
      this.setState({
        setText: searchtext,
        suggestions: [],
        finalData: []
      });
    }
    else {
      new utility(searchtext, 0, dataObj).getAutoSuggestion().then(data => {
        this.setState({
          setText: searchtext,
          suggestions: data
        });
      });
    }
  }
  setTextBox = (event) => {
    event.preventDefault();
    this.setState({
      setText: event.target.innerHTML,
      suggestions: []
    });
  }
  setQueryNum = (event) => {
    event.preventDefault();
    let numRecord = parseInt(event.target.value);
    if (!isNaN(numRecord)) {
      this.setState({
        numberOfRecordsToDisplay: parseInt(event.target.value)
      });
    }
    else {
      this.setState({
        numberOfRecordsToDisplay: 0
      });
      event.target.value = "";
    }
  }
  searchData = (event) => {
    event.preventDefault();
    if (this.state.setText && this.state.numberOfRecordsToDisplay > 0) {
      new utility(this.state.setText, this.state.numberOfRecordsToDisplay, dataObj).searchSummary().then(data => {
        let titles = data.map(dat => {
          let newObj = Object.assign({}, dat);
          newObj.title = dataObj.titles[dat.id];
          newObj.author = dataObj.authors.find(element => element.book_id === dat.id).author;
          return newObj;
        });
        this.setState({
          finalData: titles,
          setText: "",
          numberOfRecordsToDisplay: 0
        });
      });
    }
    else {
      alert("Enter Valid query.");
    }
  }
  render() {
    return (
      <React.Fragment>
        <h3 className="title-page">Search Books</h3>
        <div className="search-container">
          <form>
            <input type="text" required={true} placeholder="Start typing something to search..." autoComplete="off" onChange={this.showAutoSuggest} value={this.state.setText} />
            <div className="vertical-menu">
              <AutoSuggest setTextBox={this.setTextBox} suggestions={this.state.suggestions} />
            </div>
            <input type="text" required={true} onChange={this.setQueryNum} placeholder="Give number of suggestions to display..." autoComplete="off" value={this.state.numberOfRecordsToDisplay === 0 ? "" : this.state.numberOfRecordsToDisplay} />
            <input type="submit" value="Submit" onClick={this.searchData} />
          </form>
        </div>
        <div className="list-details">
          <ListDetails details={this.state.finalData} />
        </div>
      </React.Fragment>
    );
  }
}


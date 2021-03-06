var React = require('react');
var MovieStore = require('../stores/MovieStore');
var ApiUtil = require('../util/ApiUtil.js');


var Search = React.createClass({
	getInitialState: function () {
		return { inputVal: "" };
	},

	executeSearch: function () {
		ApiUtil.resetStore();
		MovieStore.searchMode();
		ApiUtil.fetchFromIMDB(this.state.inputVal);
	},

	updateInput: function (event) {
		this.setState({ inputVal: event.currentTarget.value });
	},

	handleKeyPress: function (event) {
		if (event.charCode === 13) {
			this.executeSearch();
		}
	},

	render: function() {
		return (
			<div className="ui action input" id="search-box">
				<input onChange={this.updateInput} 
				type="text" 
				placeholder="Search Movies..."
				onKeyPress={this.handleKeyPress}
				/>
			</div>
		);
	}
});

module.exports = Search;
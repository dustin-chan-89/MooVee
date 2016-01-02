var React = require('react');

var MovieListSearchbar = React.createClass({
	componentDidMount: function () {
		$('.ui.fluid.search.selection.dropdown')
		  .dropdown({
		    apiSettings: {
		      url: "https://www.omdbapi.com/?s=star+wars&plot=full&r=json&tomatoes=true"
		    }
		  });
	},

	render: function () {
		return (
				<div className="ui fluid search selection dropdown">
				  <input type="hidden" name="country"/>
				  <i className="dropdown icon"></i>
				  <div className="default text">Add a movie (ex. "star wars 2015")</div>
				</div>
		);
	}
});

module.exports = MovieListSearchbar;
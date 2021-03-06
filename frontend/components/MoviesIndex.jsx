var React = require('react');
var MovieStore = require('../stores/MovieStore');
var UserStore = require('../stores/UserStore');
var ApiUtil = require('../util/ApiUtil');
var MovieIndexItem = require('./MoviesIndexItem');
var Search = require('./MoviesSearch');
var Sidebar = require('./filters/FilterSidebar');
var Pagination = require('./Pagination');

var MoviesIndex = React.createClass({

  getInitialState: function () {
    return { movies: MovieStore.all() };
  },

  _onChange: function () {
    this.setState({ movies: MovieStore.all() });
  },

  componentWillMount: function () {
    ApiUtil.getMasterList();
  },

  componentDidMount: function () {
    this.movieListener = MovieStore.addListener(this._onChange);
    setTimeout(function() { $('#movies-loading-dimmer').hide(); }.bind(this), 2000);  
  },

  componentWillUnmount: function () {
    this.movieListener.remove();
  },

  render: function () {
    return (
      <div id="movies-index-container" className="ui grid">
        <div id="MoviesIndex-and-Sidebar" className="two column row">
          <Sidebar className="four wide column"/>
          <div className="twelve wide column" id="medium-images">

              <div id="movies-loading-dimmer"> className="ui segment">
                <div className="ui active dimmer">
                  <div className="ui text large loader">Loading</div>
                </div>
              </div>

            <ul className="ui right floated medium images" id="grid-images">
              <br/><br/>
              {this.state.movies.map(function (movie) {
                return (
                  <MovieIndexItem 
                  movie={movie} 
                  key={movie["imdbID"]}
                  plot={movie["Plot"].length > 697 ? movie["Plot"].slice(0,697) + "..." : movie["Plot"]}
                  posterLink={"http://img.omdbapi.com/?i=" + movie["imdbID"] + "&apikey=32fa0dab&h=1000"}
                  />
                  )
              })}
            </ul>
              <Pagination/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MoviesIndex;

var React = require('react');
var ReactRouter = require('react-router');
var Route = require('react-router').Route;
var Navigation = require('react-router').Navigation;
var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/userActions');
var ApiUtil = require('../util/ApiUtil');
var LoginModal = require('./users/LogIn');

var NavBar = React.createClass({
  getInitialState: function () {
    return {currentUser: UserStore.currentUser()}
  },

  componentDidMount: function () {
    $('.ui.basic.modal.login').modal();
    this.userListener = UserStore.addListener(this._userChanged);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  openLoginModal: function () {
    $('.ui.basic.modal.login').modal('show');
  },

  _userChanged: function () {
    this.setState({currentUser: UserStore.currentUser()})
  },

  render: function () {
    if (UserStore.currentUser() === "") {
      return(
        <div className="ui inverted large menu">
          <a href="#" className="ui active item">Browse Movies</a>
          <a href="#/lists/" className="item">Browse Movie Lists</a>
          <a href="#/lists/new" className="ui inverted blue button"><i className="ui plus icon"/>Create a Movie List</a>
          <a href="#/users/new" className="right floated item">Sign up!</a>
          <a onClick={this.openLoginModal} className="item">Log In</a>
          <div className="ui basic modal login">
            <i className="close icon login"/>
            <LoginModal/>
          </div>
        </div>
        );
    } else {
      return (
        <div className="ui inverted large menu">
          <a href="#" className="ui active item">Browse Movies</a>
          <a href="#/lists/" className="item">Browse Movie Lists</a>
          <a href="#/lists/new" className="ui inverted blue button"><i className="ui plus icon"/>Create a Movie List</a>
          <div className="right floated inactive item">{this.state.currentUser}</div>
          <a className="item">Log Out</a>
        </div>  
      );
    }
  }
});

module.exports = NavBar;
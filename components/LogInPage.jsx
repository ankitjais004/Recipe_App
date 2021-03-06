import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Router , { Link , Route , RouteHandler , Redirect } from "react-router";

import {logIn} from "../actions/actions.js";

class LogInPage extends React.Component {
    constructor(props, context){
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLocalStorage = this.handleLocalStorage.bind(this);
    };

    handleLocalStorage(info){
        localStorage.setItem("id", info.id);
        localStorage.setItem("userName", info.first_name);
        localStorage.setItem("email", info.email);

    }

    handleSubmit(e){
        e.preventDefault();
        var email = ReactDOM.findDOMNode(this.refs.mailAddress).value.trim();
        var password = ReactDOM.findDOMNode(this.refs.password).value.trim();
        var data = {
            email,
            password
        }

        this.props.dispatch(logIn(data))
            .then((d) => {this.handleLocalStorage(d.payload)})
            .then(() => this.context.history.pushState(null, '/UserPage'))

    };

    render() {
        return (
            <div>
              <div className="homeLoginSignUpHeader">
                <nav className="headerLinkOptions">
                  <Link to="/home"> <b> Home </b> </Link> &nbsp; &nbsp;
                  <Link to="/SignUpPage"> <b> Sign Up </b> </Link> &nbsp; &nbsp;
                  <a href='#'><b> About </b> </a>
                </nav>
              </div>
              <div className="logInFormHolder">
                <form className='LoginForm' onSubmit= { this.handleSubmit }>
                  <label> *Email address: </label>
                  &nbsp;
                  <input type='email' placeholder='a@b.xyz' ref='mailAddress' /> <br/>
                  <label> *Password: </label>
                  &nbsp;
                  <input type='password' placeholder="***********" ref='password' /> <br/>
                  <label className="forgotPassword">  <Link to="/ForgetPassword"> Forgot password? </Link> </label> <br/>
                  <label className="loginButton"> <input type='submit' value= 'LogIn' /></label>
                </form>
              </div>
            </div>
        );
    }
}

LogInPage.contextTypes = {
    history: React.PropTypes.object
};

function select(state) {
    return {
        user: state.user
    }
}
export default connect(select)(LogInPage)

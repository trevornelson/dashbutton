import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { firebase, helpers } from "redux-react-firebase";
import { Field, reduxForm } from "redux-form";
import { TextField } from 'redux-form-material-ui';
import RaisedButton from "material-ui/RaisedButton";

import styles from "../styles/forms.css";

const { isLoaded, isEmpty, dataToJS, pathToJS } = helpers;

class Login extends Component {
  constructor() {
    super();
    this.state = { loading: false };
  }

  handleLogin(data) {
    this.props.firebase.login(data);
    this.state.loading = true;
    this.setState(this.state);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.handleLogin.bind(this)) } className={ styles.dashButtonForm }>
        <div>
          <Field name="email" component={ TextField } floatingLabelText="Email" />
        </div>
        <div>
          <Field name="password" component={ TextField } floatingLabelText="Password" type="password" />
        </div>
        <RaisedButton label="Save" type="submit" />
      </form>
    );
  }
}

Login = firebase()(Login);

Login = reduxForm({
  form: 'login'
})(Login);

export default Login;
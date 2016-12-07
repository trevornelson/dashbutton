import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import styles from '../styles/forms.css';

class Authentication extends Component {
  render() {
    const { errorMessage, onSubmit, handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div>
          <Field name="email" component={ TextField } floatingLabelText="Email" />
        </div>
        <div>
          <Field name="password" component={ TextField } floatingLabelText="Password" type="password" />
        </div>
        <RaisedButton label="Save" type="submit" />
        { errorMessage ? <div className={ styles.error }>{ errorMessage }</div> : null }
      </form>
    );
  }
}

React.propTypes = {
  onSubmit: PropTypes.func
};

Authentication = reduxForm({
  form: 'authentication'
})(Authentication);

export default Authentication;

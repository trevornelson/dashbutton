import React, { Component, PropTypes } from 'react';
import { firebase } from "redux-react-firebase";
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import { encryptPayload } from '../actions';
import styles from '../styles/forms.css';

const formName = 'amazonlogin';

class AmazonLoginForm extends Component {
  onSubmit(data) {
    const { button_id, firebase } = this.props;
    const { email, password } = data;

    encryptPayload(data, (encrypted) => {
      firebase.set(`/buttons/${button_id}/amazoncreds`, encrypted);
      this.props.resetForm(formName);
      alert('Amazon credentials encrypted and saved.');
    });
  }

  render() {
    const { handleSubmit, button_id } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) } className={ styles.dashButtonForm }>
        <div>
          <Field name="email" component={ TextField } floatingLabelText="Amazon Email" />
        </div>
        <div>
          <Field name="password" type="password" component={ TextField } floatingLabelText="Amazon Password" />
        </div>
        <RaisedButton label="Save" type="submit" />
      </form>
    );
  }
}

AmazonLoginForm.propTypes = {
  auth: PropTypes.object,
  button_id: PropTypes.string,
  resetForm: PropTypes.func
};

AmazonLoginForm = firebase()(AmazonLoginForm);

AmazonLoginForm = reduxForm({
  form: formName
})(AmazonLoginForm);

export default AmazonLoginForm;

import React, { Component, PropTypes } from 'react';
import { firebase } from "redux-react-firebase";
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import { encryptPayload } from '../actions';
import styles from '../styles/forms.css';

const formName = 'billing';

class BillingForm extends Component {
  onSubmit(data) {
    const { button_id, firebase } = this.props;
    const { name, numb, cvv, month, year } = data;

    encryptPayload(data, (encrypted) => {
      firebase.set(`/buttons/${button_id}/billing`, encrypted);
      this.props.resetForm(formName);
      alert('Billing information encrypted and saved.');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) } className={ styles.dashButtonForm }>
        <div>
          <Field name="name" component={ TextField } floatingLabelText="Name on Card" />
        </div>
        <div>
          <Field name="numb" component={ TextField } floatingLabelText="Card #" hintText="123456789" />
        </div>
        <div>
          <Field name="cvv" component={ TextField } floatingLabelText="CVV" hintText="123" />
        </div>
        <div>
          <Field name="month" component={ TextField } floatingLabelText="Exp. Month" hintText="3" />
        </div>
        <div>
          <Field name="year" component={ TextField } floatingLabelText="Exp. Year" hintText="2016" />
        </div>
        <RaisedButton label="Save" type="submit" />
      </form>
    );
  }
}

BillingForm.propTypes = {
  auth: PropTypes.object,
  button_id: PropTypes.string
};

BillingForm = firebase()(BillingForm);

BillingForm = reduxForm({
  form: formName
})(BillingForm);

export default BillingForm;
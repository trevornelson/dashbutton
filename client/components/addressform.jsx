import React, { Component, PropTypes } from 'react';
import { firebase } from "redux-react-firebase";
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import styles from '../styles/forms.css';

const formName = 'address';

class AddressForm extends Component {
  onSubmit(data) {
    const { button_id } = this.props;
    this.props.firebase.set(`/buttons/${button_id}/address`, data);
    this.props.resetForm(formName);
    alert('Billing/shipping address saved.');
  }

  render() {
    const { handleSubmit, button_id } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) } className={ styles.dashButtonForm }>
        <p>Treating billing and shipping address as same. Let me know if that doesn't work.</p>
        <div>
          <Field name="first_name" component={ TextField } floatingLabelText="First Name" />
        </div>
        <div>
          <Field name="last_name" component={ TextField } floatingLabelText="Last Name" />
        </div>
        <div>
          <Field name="line_1" component={ TextField } floatingLabelText="Address Line 1" />
        </div>
        <div>
          <Field name="line_2" component={ TextField } floatingLabelText="Address Line 2" />
        </div>
        <div>
          <Field name="state" component={ TextField } floatingLabelText="State" hintText="TX" />
        </div>
        <div>
          <Field name="city" component={ TextField } floatingLabelText="City" />
        </div>
        <div>
          <Field name="zip" component={ TextField } floatingLabelText="Zip Code" hintText="77494" />
        </div>
        <div>
          <Field name="country" component={ TextField } floatingLabelText="Country" hintText="US" />
        </div>
        <div>
          <Field name="phone" component={ TextField } floatingLabelText="Phone Number" hintText="3477018258" />
        </div>
        <RaisedButton label="Save" type="submit" />
      </form>
    );
  }
}

AddressForm.propTypes = {
  auth: PropTypes.object,
  button_id: PropTypes.string
};

AddressForm = firebase()(AddressForm);

AddressForm = reduxForm({
  form: formName
})(AddressForm);

export default AddressForm;
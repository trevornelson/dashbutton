import React, { Component, PropTypes } from 'react';
import _ from "lodash";
import { connect } from "react-redux";
import { firebase, helpers } from "redux-react-firebase";
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

const { isLoaded, isEmpty, dataToJS, pathToJS } = helpers;

class ButtonSelector extends Component {
  render() {
    const { buttons, handleSubmit, onSubmit } = this.props;
    const selectOptions = buttons ? _.map(buttons, (button, id) => {
      return <MenuItem value={ id } primaryText={ button.name } />
    }) : null;

    return (
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div>
          <Field name="button_id" component={ SelectField } hintText="Select Dash Button">
            { selectOptions }
          </Field>
        </div>
        <RaisedButton label="Change Button" type="submit" />
      </form>
    );
  }
}

ButtonSelector.propTypes = {
  onSubmit: PropTypes.func
};

ButtonSelector.propTypes = {
  auth: PropTypes.object
};

ButtonSelector = firebase(['/buttons'])(ButtonSelector);

ButtonSelector = connect(
  ({ firebase }) => ({
    buttons: dataToJS(firebase, '/buttons')
  })
)(ButtonSelector);

ButtonSelector = reduxForm({
  form: 'buttons'
})(ButtonSelector);

export default ButtonSelector;
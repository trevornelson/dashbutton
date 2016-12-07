import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux";
import { firebase, helpers } from "redux-react-firebase";
import { Field, FieldArray, reduxForm } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

import styles from '../styles/forms.css';

const { isLoaded, isEmpty, dataToJS, pathToJS } = helpers;
const formName = 'orders';

class OrderForm extends Component {
  onSubmit(data) {
    const { button_id } = this.props;
    const { type, products } = data;
    // TODO: handle persisting this array better. This is icky.
    this.props.firebase.remove(`/buttons/${button_id}/orders/${type}`);
    products.forEach((product) => {
      if (product.product_id && product.product_quantity) {
        this.props.firebase.push(`/buttons/${button_id}/orders/${type}`, product);
        this.props.resetForm(formName);
        alert('Button order event saved.');
      }
    });
  }

  render() {
    const { handleSubmit, button_id, orders } = this.props;

    // TODO: Add dynamic product fields. The add product button was causing an infinite loop for some reason currently.
    // const renderProducts = ({ fields }) => (
    //   <ul>
    //     <li>
    //       <RaisedButton label="Add Product to Order" onClick={() => fields.push({})} />
    //     </li>
    //     {fields.map((product, index) => {
    //       console.log(product);
    //       return (
    //         <li key={ index }>
    //           <RaisedButton type="button" title="Remove Product" onClick={() => fields.remove(index)} />
    //           <h4>Product #{ index + 1 }</h4>
    //           <Field name={`${product}.product_id`} component={ TextField } floatingLabelText="Amazon Product ID" />
    //           <Field name={`${product}.product_quantity`} component={ TextField } floatingLabelText="Quantity" defaultValue="1" />
    //         </li>
    //       );
    //     })}
    //   </ul>
    // );

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) } className={ styles.dashButtonForm }>
        <div>
          <Field name="type" component={ SelectField } hintText="Button Press Type">
            <MenuItem value="single" primaryText="Single Press" />
            <MenuItem value="double" primaryText="Double Press" />
            <MenuItem value="long" primaryText="Long Press" />
          </Field>
        </div>
        <div>
          <h4>Product #1</h4>
          <Field name="products[0].product_id" component={ TextField } floatingLabelText="Amazon Product ID" />
          <Field name="products[0].product_quantity" component={ TextField } floatingLabelText="Quantity" className={ styles.quantity } />
        </div>
        <div>
          <h4>Product #2</h4>
          <Field name="products[1].product_id" component={ TextField } floatingLabelText="Amazon Product ID" />
          <Field name="products[1].product_quantity" component={ TextField } floatingLabelText="Quantity" className={ styles.quantity } />
        </div>
        <div>
          <h4>Product #3</h4>
          <Field name="products[2].product_id" component={ TextField } floatingLabelText="Amazon Product ID" />
          <Field name="products[2].product_quantity" component={ TextField } floatingLabelText="Quantity" className={ styles.quantity } />
        </div>
        <RaisedButton label="Save" type="submit" />
      </form>
    );
  }
}

OrderForm.propTypes = {
  auth: PropTypes.object,
  button_id: PropTypes.string
};

OrderForm = firebase(
  props => ([
    `buttons/${props.button_id}/orders`
  ])
)(OrderForm);

OrderForm = connect(
  (state, props) => ({
    orders: dataToJS(state.firebase, `buttons/${props.button_id}/orders`)
  })
)(OrderForm);

OrderForm = reduxForm({
  form: formName
})(OrderForm);

export default OrderForm;
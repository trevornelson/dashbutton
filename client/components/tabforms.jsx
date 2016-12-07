import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { reset } from "redux-form";
import { Tabs, Tab } from "material-ui/Tabs";

import AmazonLoginForm from "./amazonloginform";
import BillingForm from "./billingform";
import AddressForm from "./addressform";
import OrderForm from "./orderform";

import styles from "../styles/main.css";

class TabForms extends Component {
  render() {
    const { auth, button_id, resetForm } = this.props;

    return (
      <Tabs className={ styles.tabForms }>
        <Tab label="Amazon Login">
          <AmazonLoginForm auth={ auth } button_id={ button_id } resetForm={ resetForm } />
        </Tab>
        <Tab label="Billing Info">
          <BillingForm auth={ auth } button_id={ button_id } resetForm={ resetForm } />
        </Tab>
        <Tab label="Address">
          <AddressForm auth={ auth } button_id={ button_id } resetForm={ resetForm } />
        </Tab>
        <Tab label="Orders">
          <OrderForm auth={ auth } button_id={ button_id } resetForm={ resetForm } />
        </Tab>
      </Tabs>
    );
  }
}

TabForms.propTypes = {
  auth: PropTypes.object,
  button_id: PropTypes.string
};

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetForm: (formName) => {
      dispatch(reset(formName));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabForms);
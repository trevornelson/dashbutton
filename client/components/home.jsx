import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { firebase, helpers } from "redux-react-firebase";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Card, CardHeader, CardTitle, CardText} from "material-ui/Card";

import Login from "./login";
import ButtonSelector from "./buttonselector";
import TabForms from "./tabforms";
import { setButton } from "../actions";
import styles from "../styles/main.css";

const { isLoaded, isEmpty, dataToJS, pathToJS } = helpers;

class Home extends React.Component {
  onButtonSelect(button) {
    this.props.setButton(button.button_id);
  }

  renderButtonSelector() {
    const { auth, button_id } = this.props;
    return (
      <div className={ button_id ? styles.buttonSelected : styles.buttonUnselected }>
        <ButtonSelector auth={ auth } onSubmit={ this.onButtonSelect.bind(this) } />
      </div>
    );
  }

  render() {
    const props = this.props;
    const { auth, button_id } = props;

    return (
      <MuiThemeProvider>
        <Card className={ styles.container }>
          <CardHeader title="Amazon Dash Button Settings" subtitle="Trevor's Dash Button" />
          <CardTitle title="Card Title" subtitle="Card subtitle" />
          <CardText>
            { auth ? <div>
              { this.renderButtonSelector() }
              { button_id ? <TabForms auth={ auth } button_id={ button_id } /> : null }
            </div> : <Login /> }
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  button_id: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    button_id: state.app.button_id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setButton: (button_id) => {
      dispatch(setButton(button_id));
    }
  };
};

Home = connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth')
  })
)(Home);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

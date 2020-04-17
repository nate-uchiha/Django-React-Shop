import React from 'react';
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
import BaseRouter from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

class App extends React.Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  
  componentDidUpdate(){
    this.props.onTryAutoSignup();
  }

  render(){
    return (
      <div className="App">
        <Router>        
          <CustomLayout {...this.props}>
            <BaseRouter /> 
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
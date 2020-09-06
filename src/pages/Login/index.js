import React, { Component } from "react";
import css from "./style.module.css";
import Button from "../../components/General/Button/index";
import { connect } from "react-redux";
import Spinner from "../../components/General/Spinner/index";
import * as actions from "../../redux/actions/loginActions";
import { Redirect } from "react-router-dom";
class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  changeEmail = event => {
    this.setState({ email: event.target.value });
  };
  changePassword = event => {
    this.setState({ password: event.target.value });
  };
  login = props => {
    // alert("Login ...");
    this.props.login(this.state.email, this.state.password);
  };
  render() {
    return (
      <div className={css.Login}>
        {this.props.userId && <Redirect to="/orders" />}
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="Имэйл хаяг"
        />
        <input
          onChange={this.changePassword}
          type="password"
          placeholder="Нууц үг"
        />
        {this.props.logginIn && <Spinner />}
        {this.props.firebaseError && (
          <div style={{ color: "red" }}>{this.props.firebaseError}</div>
        )}
        <Button btnType="Success" daragdsan={this.login} text="Нэвтрэх" />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    logginIn: state.signupReducer.logginIn,
    firebaseError: state.signupReducer.firebaseError,
    userId: state.signupReducer.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

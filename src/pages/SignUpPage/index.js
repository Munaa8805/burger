import React, { Component } from "react";
import css from "./style.module.css";
import { connect } from "react-redux";
import Button from "../../components/General/Button/index";
import Spinner from "../../components/General/Spinner/index";
import * as actions from "../../redux/actions/signupActions";
import { Redirect } from "react-router-dom";
class SignUp extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    error: null
  };
  changeEmail = event => {
    this.setState({ email: event.target.value });
  };
  changePassword1 = event => {
    this.setState({ password1: event.target.value });
  };
  changePassword2 = event => {
    this.setState({ password2: event.target.value });
  };
  signup = () => {
    if (this.state.password1 === this.state.password2) {
      this.props.signupUser(this.state.email, this.state.password1);
    } else {
      this.setState({ error: "Нууц үг таарахгүй байна." });
    }
  };
  render() {
    return (
      <div className={css.Signup}>
        {this.props.userId && <Redirect to="/" />}
        <h1>Бүртгэлийн форм</h1>
        <div>Та өөрийн мэдээллээ оруулна уу</div>
        <input
          onChange={this.changeEmail}
          type="text"
          placeholder="Имэйл хаяг"
        />
        <input
          onChange={this.changePassword1}
          type="password"
          placeholder="Нууц үг"
        />
        <input
          onChange={this.changePassword2}
          type="password"
          placeholder="Нууц үгээ давтан оруулна уу"
        />
        {this.state.error && (
          <div style={{ color: "red" }}>{this.state.error}</div>
        )}
        {this.props.firebaseError && (
          <div style={{ color: "red" }}>{this.props.firebaseError}</div>
        )}
        {this.props.saving && <Spinner />}
        <Button btnType="Success" daragdsan={this.signup} text="Бүртгүүлэх" />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    saving: state.signupReducer.saving,
    firebaseError: state.signupReducer.firebaseError,
    userId: state.signupReducer.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signupUser: (email, password) =>
      dispatch(actions.signupUser(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

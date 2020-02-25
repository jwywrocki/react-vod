import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/user_actions'

class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        errors: [],
    };

    displayErrors = errors =>
        errors.map((error, i) => <p key={i}> {error}</p >)

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = { messsage: "Wypełnij wszystkie pola" };
            this.state({ errors: errors.concat(error) });
        } else if (!this.isPasswordValid(this.state)) {
            error = { messsage: "Wpisane hasła są różne" };
            this.state({ errors: errors.concat(error) });
        } else {
            return true;
        }
    }

    isPasswordValid = ({ password, passwordConfirm }) => {
        if (password.length < 6 || passwordConfirm.length < 6) {
            return false;
        } else if (password !== passwordConfirm) {
            return false;
        } else {
            return true;
        }
    }

    isFormEmpty = ({ name, email, password, passwordConfirm }) => {
        return (
            !name.length ||
            !email.length ||
            !password.length ||
            !passwordConfirm.length
        );
    }

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
        }

        if (this.isFormValid()) {
            this.setState({ errors: [] })
            this.props.dispatch(registerUser(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        this.props.history.push('/login')
                    } else {
                        this.setState({
                            errors: this.state.errors.concat("Rejestracja niepowiodła się")
                        })
                    }
                })
                .catch(err => {
                    this.setState({
                        errors: this.state.errors.concat(err)
                    });
                })
        } else {
            console.error("Form is not valid");
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2 className="col s12 offset-s3">Zarejestruj się</h2>
                </div>
                <div className="row">
                    {this.state.errors.length > 0 && (
                        <div className="col s12 offset-s3">
                            {this.displayErrors(this.state.errors)}
                        </div>
                    )}
                </div>
                <div className="row">
                    <form className="col s6 offset-s3" onSubmit={event => this.submitForm(event)}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="name"
                                    type="text"
                                    className="validate"
                                    name="name"
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                />
                                <label className="active" htmlFor="name">Name</label>
                                <span
                                    className="helper-txt"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="email"
                                    type="email"
                                    className="validate"
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                />
                                <label className="active" htmlFor="email">Email</label>
                                <span
                                    className="helper-txt"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="password"
                                    type="password"
                                    className="validate"
                                    name="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                />
                                <label className="active" htmlFor="password">Password</label>
                                <span
                                    className="helper-txt"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="passwordConfirm"
                                    type="password"
                                    className="validate"
                                    name="passwordConfirm"
                                    value={this.state.passwordConfirm}
                                    onChange={e => this.handleChange(e)}
                                />
                                <label className="active" htmlFor="passwordConfirm">Password Confirmation</label>
                                <span
                                    className="helper-txt"
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button
                                    className="btn waves-effect dark-green lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >
                                    Create an account
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(Register);
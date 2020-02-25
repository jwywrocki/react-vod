import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions'
import { Link } from 'react-router-dom';

class RegisterLogin extends Component {
    state = {
        email: "",
        password: "",
        errors: [],
    };

    displayErrors = errors =>
        errors.map((error, i) => <p key={i}> {error}</p >)

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitForm = event => {
        event.preventDefault();

        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password,
        };

        if (this.isFormvalid(this.state)) {
            this.setState({ errors: [] })
            this.props.dispatch(loginUser(dataToSubmit))
                .then(response => {
                    if (response.payload.loginSuccess) {
                        this.props.history.push('/')
                    } else {
                        this.setState({
                            errors: this.state.errors.concat(
                                "Przepraszamy, nie udało nam się znaleźć takiej kombinacji adresu email i hasła."
                            )
                        })
                    }
                })

        } else {
            this.setState({
                errors: this.state.errors.concat("Uzupełnij brakujące pola.")
            })
        }
    }

    isFormvalid = ({ email, password }) => email && password;

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2 className="col s12 offset-s3">Zaloguj się</h2>
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
                            <div className="col s12">
                                <button
                                    className="btn waves-effect dark-green lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >
                                    Log in
                                </button>&nbsp;&nbsp;
                                <Link to="/register">
                                    <button
                                        className="btn waves-effect dark-green lighten-2"
                                        type="submit"
                                        name="action"
                                    >
                                        Sign up
                                </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(RegisterLogin);
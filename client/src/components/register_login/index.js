import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions'

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
                <h2>Zaloguj się</h2>
                {this.state.errors.length > 0 && (
                    <div>
                        {this.displayErrors(this.state.errors)}
                    </div>
                )}
                <div className="row">
                    <form className="col s6" onSubmit={event => this.submitForm(event)}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    id="email"
                                    type="email"
                                    className="validate"
                                />
                                <label htmlFor="email">Email</label>
                                <span
                                    className="helper-txt"
                                    data-error="Type a right email"
                                    data-success="Correct"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    name="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    id="password"
                                    type="password"
                                    className="validate"
                                />
                                <label htmlFor="email">Password</label>
                                <span
                                    className="helper-txt"
                                    data-error="Wrong"
                                    data-success="Correct"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <button
                                    className="btn waves-effect blue lighten-2"
                                    type="submit"
                                    name="action"
                                    onClick={this.submitForm}
                                >
                                    Login
                                </button>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../../actions';

class SignIn extends Component {
	handleFormSubmit({ username, password }) {
		this.props.signinUser({ username, password });
	}

	renderInput(field) {
		return (
			<TextField
				{...field.input}
				type={field.type}
				floatingLabelText={field.label} />
		);
	}

	render() {
		const { handleSubmit } = this.props;

		const actions = [
			<RaisedButton
				label="OK"
				primary={true}
				onTouchTap={this.props.resetError} />
		];

		return (
			<div>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<Field
						name="username"
						label="Username"
						type="text"
					 	component={this.renderInput} />
					<br />
					<Field
						name="password"
						label="Password"
						type="password"
						component={this.renderInput} />
					<br />
					<RaisedButton
						type="submit"
						label="Sign In"
						primary={true} />
				</form>

				<Dialog
					actions={actions}
					modal={false}
					open={!!this.props.errorMessage}
					onRequestClose={this.props.resetError} >
					{this.props.errorMessage}
				</Dialog>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
	form: 'SignIn'
})(SignIn));

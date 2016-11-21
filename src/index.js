import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { AUTH_USER } from './actions/types';

import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RequireAuth from './components/auth/RequireAuth';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import SignUp from './components/auth/SignUp';
import Welcome from './components/Welcome';
import Feature from './components/Feature';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
	store.dispatch({
		type: AUTH_USER
	});
}

injectTapEventPlugin();

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Welcome} />

					<Route path="feature" component={RequireAuth(Feature)} />

					<Route path="signin" component={SignIn} />
					<Route path="signout" component={SignOut} />
					<Route path="signup" component={SignUp} />
				</Route>
			</Router>
		</Provider>
	</MuiThemeProvider>
, document.querySelector('.container'));

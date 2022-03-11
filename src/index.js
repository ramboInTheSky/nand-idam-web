import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import makeMainRoutes from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root'),
);


// /* global document */
//
// /*
// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
// */
//
//
// import React from 'react';
// import { Route, BrowserRouter } from 'react-router-dom';
// import App from './App';
// import Home from './Home/Home';
// import Login from './Login/Login';
// import Callback from './Callback/Callback';
// import Auth from './Auth/Auth';
// import history from './history';
//
// const auth = new Auth();
//
// const handleAuthentication = (nextState) => {
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     auth.handleAuthentication();
//   }
// };
//
// const makeMainRoutes = () => (
//   <BrowserRouter history={history} component={App}>
//     <div>
//       <Route path="/" render={props => <App auth={auth} {...props} />} />
//       <Route path="/home" render={props => <Home auth={auth} {...props} />} />
//       <Route path="/login" render={props => <Login auth={auth} {...props} />} />
//       <Route
//         path="/callback"
//         render={(props) => {
//           handleAuthentication(props);
//           return <Callback {...props} />;
//         }}
//       />
//     </div>
//   </BrowserRouter>
// );
//
// export default makeMainRoutes;
//

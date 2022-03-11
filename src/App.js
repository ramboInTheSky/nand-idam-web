import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

class App extends Component {
  constructor() {
    super();
    this.goTo = this.goTo.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.history.replace('/login');
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <div>
          {

            !isAuthenticated() && this.props.history.location.pathname === '/' && (
              <Button
                className="btn-margin"
                onClick={this.login}
              >
                Log In
              </Button>
            )
          }
          {
            isAuthenticated() && (
              <Button
                className="btn-margin"
                onClick={this.logout}
              >
                Log Out
              </Button>
            )
          }
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  history: {},
  auth: {},
  children: null,
};

App.propTypes = {
  history: PropTypes.obj,
  auth: PropTypes.obj,
  children: PropTypes.node,
};

export default App;


// import React, { Component } from 'react';
// import { Container, Row, Col, FormGroup, Label, Input, ButtonToolbar, Button } from 'reactstrap';
//
// import styled from 'styled-components';
// import logo from './images/logo.svg';
// import Auth from './Auth/Auth';
//
// const Header = styled.div`
//   height: 80px;
//   padding: 20px;
//   color: white;
// `;
//
// const Title = styled.h1`font-size: 1.5em;`;
//
// const Required = styled.span`color: #FF2350;`;
//
// const SpinImage = styled.img`
//   width: 114px;
//   height: 38px;
// `;
//
// const PrimaryButton = styled(Button)`
//   background: #000;
//   outline: 0!important;
//   box-shadow: none!important;
//   border: none!important;
//   border-radius: 0;
//   color: #FF0;
//   &:hover, &:active, &:focus{
//     background: #FF0!important;
//     color: #000!important;
//   }
// `;
//
// const InputLogin = styled(Input)`
//   border-radius: 0;
// `;
//
// class App extends Component {
//   constructor() {
//     super();
//     this.auth = new Auth();
//     this.login = this.login.bind(this);
//     this.signup = this.signup.bind(this);
//     this.loginWithGoogle = this.loginWithGoogle.bind(this);
//     this.loginWithFacebook = this.loginWithFacebook.bind(this);
//     this.handleFieldChange = this.handleFieldChange.bind(this);
//   }
//
//   state = {
//     email: '',
//     password: '',
//   };
//
//   handleFieldChange = (e) => {
//     this.setState({ [e.target.id]: e.target.value });
//   };
//
//   login(event) {
//     event.preventDefault();
//     const user = this.state;
//     this.auth.login(user.email, user.password);
//   }
//
//   signup() {
//     const user = this.state;
//     this.auth.signup(user.email, user.password);
//   }
//
//   loginWithGoogle() {
//     this.auth.loginWithGoogle();
//   }
//
//   loginWithFacebook() {
//     this.auth.loginWithFacebook();
//   }
//
//   render() {
//     this.auth.handleAuthentication();
//     return (
//       <div>
//
//         <Header>
//           <Container>
//             <SpinImage src={logo} alt="logo" />
//             <Title>{"Login to your Nando's account"}</Title>
//           </Container>
//         </Header>
//
//         <Container>
//           <Row>
//             <Col sm={6}>
//               <h5>Username/Password Authentication</h5>
//               <form>
//                 <FormGroup>
//                   <Label>EMAIL <Required>*</Required></Label>
//                   <InputLogin
//                     type="email"
//                     id="email"
//                     onChange={this.handleFieldChange}
//                     placeholder="you@example.com"
//                   />
//                 </FormGroup>
//                 <FormGroup>
//                   <Label>PASSWORD <Required>*</Required></Label>
//                   <InputLogin
//                     type="password"
//                     id="password"
//                     onChange={this.handleFieldChange}
//                     placeholder="Enter your password"
//                   />
//                 </FormGroup>
//                 <ButtonToolbar>
//                   <PrimaryButton
//                     type="submit"
//                     color="primary"
//                     onClick={this.login}
//                   >
//                     Log In
//                   </PrimaryButton>
//                   {
//                     /*
//                       <Button color="primary" onClick={this.signup}>
//                         Sign Up
//                       </Button>
//                      */
//                   }
//                 </ButtonToolbar>
//               </form>
//             </Col>
//             <Col sm={6}>
//               <h5>Social Authentication</h5>
//               {
//                 /*
//                 <Button color="danger" onClick={this.loginWithGoogle}>
//                   Log In with Google
//                 </Button>
//                 <br /><br />
//                  */
//               }
//               <PrimaryButton color="primary" onClick={this.loginWithFacebook}>
//                 Log In with Facebook
//               </PrimaryButton>
//             </Col>
//           </Row>
//         </Container>
//
//       </div>
//     );
//   }
// }
//
//
// export default App;

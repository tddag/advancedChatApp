import React, { Component } from 'react'
import './Login.styles.css'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

let uri = process.env.NODE_ENV === 'production'
            ? ''
            : 'http://localhost:4000'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      open: false,
      error: '',
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevState.loggedIn !== this.state.loggedIn){
      window.location.replace('/')
    }
  }
  handleEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = (event) => {
    let { email, password } = this.state
    axios.post(`${uri}/user/login`, {
      email: email,
      password: password
    }).then(res => {
      localStorage.setItem('jwtToken', res.data)
      this.setState({
        loggedIn: true
      })
    }).catch(err => {
      let msg = err.response.data.msg
      console.log(msg)
      this.setState({
        error: msg,
        open: true
      })
    })
    event.preventDefault()
  }
  render(){
    return(
      <div class="text-center loginContainer">
        <form class="form-signin" onSubmit={this.handleSubmit}>
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" onChange={this.handleEmail} required autofocus/>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" onChange={this.handlePassword} required/>
          <br/>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
        { this.state.error !== '' && (
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Sorry! ${this.state.error}`}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        ) }
      </div>
    )
  }
}

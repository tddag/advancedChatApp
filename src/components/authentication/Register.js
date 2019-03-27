import React, { Component } from 'react'
import './Login.styles.css'

export default class Register extends Component {
  render(){
    return(
      <div class="text-center loginContainer">
        <form class="form-signin">
          <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
          <label for="inputPassword" class="sr-only">Confirm Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Confirm Password" required/>
          <br/>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
    )
  }
}

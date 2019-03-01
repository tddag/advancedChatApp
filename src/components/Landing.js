import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
      <div class="landing">
        <div class="dark-overlay landing-inner">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <h1 class="display-3 mb-4">Chat App</h1>
                <p class="lead">
                  Welcome to a Chat App using React and Socket.IO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing

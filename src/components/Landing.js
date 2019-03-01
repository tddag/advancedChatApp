import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Chat App</h1>
                <p className="lead">
                  {' '}
                  Create a Chat App using React and Socket.IO
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

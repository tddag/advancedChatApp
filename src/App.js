import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Rooms from './components/Rooms'
import Landing from './components/Landing'
import Users from './components/Users'
import ChatWindow from './components/ChatWindow'
import { Route, Switch } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import EventHistory from './components/EventHistory'
import ChatHistory from './components/ChatHistory'

class App extends Component {
  constructor() {
    super()
    this.state = {
      socket: socketIOClient('/'),
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            path="/rooms"
            render={() => <Rooms socket={this.state.socket} />}
          />
          <Route
            path="/users"
            render={() => <Users socket={this.state.socket} />}
          />
          <Route
            path="/chat/:name&:username"
            render={props => (
              <ChatWindow {...props} socket={this.state.socket} />
            )}
          />
          <Route path="/eventHistory" component={EventHistory} />
          <Route path="/chatHistory" component={ChatHistory} />
        </Switch>
      </div>
    )
  }
}

export default App

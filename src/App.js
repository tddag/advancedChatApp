import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Rooms from './components/lists/Rooms'
import Landing from './components/Landing'
import Users from './components/lists/Users'
import ChatWindow from './components/ChatWindow'
import { Route, Switch } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import EventHistory from './components/history/EventHistory'
import ChatHistory from './components/history/ChatHistory'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import AlertUnauthorized from './components/AlertUnauthorized'
let uri = process.env.NODE_ENV === 'production'
            ? 'https://taha-app-chat.herokuapp.com/'
            : 'http://localhost:4000'
class App extends Component {
  constructor() {
    super()
    this.state = {
      socket: socketIOClient(`${uri}`),
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" 
            render = {() => <Landing socket={this.state.socket}/>}
          />
          <Route
            path="/rooms"
            render={() => <Rooms socket={this.state.socket} />}
          />
          <Route
            path="/users"
            render={() => <Users socket={this.state.socket} />}
          />
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          {!localStorage.getItem('jwtToken') ? (
            <AlertUnauthorized/>
          ) : (
            <div>
              <Route
                path="/chat/:name&:username"
                render={props => (
                  <ChatWindow {...props} socket={this.state.socket} />
                )}
              />
              <Route path="/eventHistory" component={EventHistory} />
              <Route path="/chatHistory" component={ChatHistory} />
            </div>
          )}
        </Switch>
        
      </div>
    )
  }
}

export default App

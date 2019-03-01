import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import RoomChat from './components/RoomChat'
import Landing from './components/Landing'
import Users from './components/Users'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/room_chat" component={RoomChat} />
          <Route path="/users" component={Users} />
        </Switch>
      </div>
    )
  }
}

export default App

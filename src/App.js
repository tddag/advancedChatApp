import React, { Component } from 'react'
import './App.css'
import { NavBar } from './components/NavBar'
import Rooms from './components/Rooms'
import Landing from './components/Landing'
import Users from './components/Users'
import ChatWindow from './components/ChatWindow'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/users" component={Users} />
          <Route path="/chat/:name" component={ChatWindow} />
        </Switch>
      </div>
    )
  }
}

export default App

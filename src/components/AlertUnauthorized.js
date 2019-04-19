import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { Redirect } from 'react-router-dom'

class AlertUnauthorized extends Component {
  state = {
    open: true,
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You haven't logged in. Please log in to continue to use our
              service
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Continue
            </Button>
            {!this.state.open && <Redirect to="/login"/>}
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default AlertUnauthorized

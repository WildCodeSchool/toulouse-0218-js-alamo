/* global moment */
import React from 'react'
import { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import Collapse from '@material-ui/core/Collapse'
import PlusOne from '@material-ui/icons/PlusOne'
import Delete from '@material-ui/icons/Delete'
import Timer from '@material-ui/icons/Timer'
import { TimePicker as TimePickerBase } from 'material-ui-pickers'
import { DatePicker } from 'material-ui-pickers'
import withUtils from 'material-ui-pickers/_shared/WithUtils'
import FnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import moment from 'moment'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
// import Resource from 'fullcalendar-scheduler/src/models/Resource';

const TimePicker = withUtils(new FnsUtils())(TimePickerBase)

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '40%', // theme.spacing.unit * 50,
    left: '30%',
    top: '20%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: theme.spacing.unit * 4,
    textAlign: 'center'
  },
  input: {
    width: '100%'
  },
  logo: {
    paddingRight: theme.spacing.unit
  },
  mb: {
    marginBottom: theme.spacing.unit * 4
  }
})

class NewResourceModal extends React.Component {
  constructor (props) {
    super(props)
    const resource = this.props.resource
    this.state = resource ? {   
      resourceId: resource.id, title: resource.title
    } :
    {
      resourceId: 0
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleResourceSubmit = e => {
    e.preventDefault()
    this.props.handleResourceSubmit(this.state)
  }

  render () {
    const { classes, handleOpenResource, handleCloseResource, handleResourceSubmit, open} = this.props
    const { title } = this.state

    return (
  <div>
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleCloseResource}
    >
      <div className={classes.paper}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="title" id="modal-title" className={classes.mb}>
              Renommer la ressource
            </Typography>
          <FormControl className={classes.mb}>
            <TextField
            value={title}
            name='title'
            className={classes.textField}
            onChange={this.handleInputChange}
            />
          </FormControl>
            <Button
              variant="contained"
              color="primary"
              className={classes.mb}
              onClick={this.handleResourceSubmit}>
              <PlusOne className={classes.logo}/> Modifier
            </Button>
            {this.props.event !== null && <Button
              variant="contained"
              color="secondary"
              className={classes.mb}
              onClick={()=>this.props.handleResourceDelete(this.state.resourceId)}>
              <Delete className={classes.logo} /> Effacer
            </Button>}
          </Grid>
        </Grid>
      </div>
    </Modal>
  </div>
    )
  }
}

NewResourceModal.propTypes = {
  classes: PropTypes.object.isRequired
}

// We need an intermediary variable for handling the recursive nesting.
const NewResourceModalWrapped = withStyles(styles)(NewResourceModal)

export default NewResourceModalWrapped

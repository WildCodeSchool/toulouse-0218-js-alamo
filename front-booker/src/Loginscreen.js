
import React from 'react'
import { withStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import { createMuiTheme } from '@material-ui/core/styles'



const styles = {
  form: {
    padding: 40
  },
  margin: {
    width: '100%',
    marginBottom: 30
  }
}

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pseudo: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit (e) {
    console.log('submit login', e)
    e.preventDefault()
    // Submit to login URL
    fetch('/path/to/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(result => {
        // do something
      })
  }
  render () {
    const { classes } = this.props
    return (

            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="pseudo">Pseudo</InputLabel>
                <Input
                  className={classes.input}
                  id="pseudo"
                  type="pseudo"
                  name="pseudo"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputLabel htmlFor="password">Password</InputLabel>          
                <Input
                  className={classes.input}
                  id="password"
                  label="Password"
                  className={classes.textField}
                  name="password"
                  type="password"
                  margin="normal"
                  onChange={this.onChange}
                />
              </FormControl>
              <div>
              <Button type="submit" variant="raised" style={{backgroundColor: '#66FF33'}}>  
                  Login
              </Button>
              </div>
              <br/>
              <div>
              <Button type="submit" variant="raised" onClick={this.handleOpen} style={{backgroundColor: '#66FF33', wight: '200%', boxShadow: 'none'}}>  
              créer un compte
              </Button>
              </div>
            </form>

    )
  }
}

export default withStyles(styles)
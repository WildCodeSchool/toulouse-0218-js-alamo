const initialState = {
  user : {
    id: 1, email: `alexandre.morazin@live.fr`, password: 'Lisa'
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNED_IN':
    const {user} = state
    const userCopy = [...user]
    this.state.email === userCopy.email && this.state.password === userCopy.password ? <Login /> : <Register />
  }
  return 
}

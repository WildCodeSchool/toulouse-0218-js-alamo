const initialState = {
  user : null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNED_IN':
      const {user} = action
      return {user}
    default:
      return state
  }
}

export default reducer

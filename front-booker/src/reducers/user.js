const initialState = {
  user : null
  // city: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNED_IN':
      const {user} = action
      return {user}
    case 'SIGNED_OUT':
      return {user: null}
    default:
      return state
    }
}

export default reducer

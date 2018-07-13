const initialState = {
  markerId: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INFOWINDOW_OPEN': 
      return {markerId: action.markerId}
    case 'INFOWINDOW_CLOSE':
      return {markerId: null}
    default:
      return state
    }
}

export default reducer

export const SIGNED_IN = 'SIGNED_IN'

export function signedIn(user) {
  return {
    type: SIGNED_IN,
    user
  }
}

export const SIGNED_OUT = 'SIGNED_OUT'

export function signedOut() {
  return {
    type: SIGNED_OUT
  }
}

export const INFOWINDOW_OPEN = 'INFOWINDOW_OPEN'

export function infoWindowOpen(markerId) {
  return {
    type: INFOWINDOW_OPEN,
    markerId: markerId
  }
}

export const INFOWINDOW_CLOSE = 'INFOWINDOW_CLOSE'

export function infoWindowClose() {
  return {
    type: INFOWINDOW_CLOSE
  }
}

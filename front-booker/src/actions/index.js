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

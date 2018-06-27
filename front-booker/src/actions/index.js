export const SIGNED_IN = 'SIGNED_IN'

export function signedIn(user) {
  return {
    type: SIGNED_IN,
    user
  }
}

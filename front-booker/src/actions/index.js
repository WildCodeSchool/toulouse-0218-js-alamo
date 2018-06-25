export const SIGNED_IN = 'SIGNED_IN'

export function signedIn(userId) {
  return {
    type: SIGNED_IN,
    id: userId
  }
}

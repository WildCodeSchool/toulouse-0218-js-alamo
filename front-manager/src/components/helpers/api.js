/* global fetch */

const get = (url) =>
  fetch(url, {
    credentials: 'include'
  })
    .then(res => res.json())

const post = (url, data) =>
  fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())

const put = (url, data) =>
  fetch(url, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())

const _delete = (url) =>
  fetch(url, {
    method: 'DELETE',
    credentials: 'include'
  })
    .then(res => res.json())

export default {
  get,
  post,
  put,
  delete: _delete
}

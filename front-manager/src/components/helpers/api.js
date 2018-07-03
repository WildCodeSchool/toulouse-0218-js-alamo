const get = (url) =>
  fetch(url, {
    credentials: 'include'
  })
    .then(res => res.json())

export default {get}

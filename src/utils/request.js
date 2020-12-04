const headers = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})

function handleResponse (response, url) {
  const { status } = response
  if (status === 200) {
    return response.json()
  } else {
    console.error(`Request failed. url: ${url}`)
    return Promise.reject({ error: { message: 'Request failed, due to server error.' } })
  }
}

function handleError (error, url) {
  console.error(`Request failed. url: ${url}. Message: ${error}`)
  return Promise.reject({ error: { message: 'Request failed.' } })
}

export function get (url) {
  return fetch(url, {
    method: 'GET',
    headers
  }).then(response => {
    handleResponse(response, url)
  }).catch(error => {
    handleError()
  })
}

export function post (url, data) {
  return fetch(url, {
    method: 'POST',
    body: data,
    headers
  }).then(response => {
    handleResponse(response, url)
  }).catch(error => {
    handleError()
  })
}
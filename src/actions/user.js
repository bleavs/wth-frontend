export function loginUser(username, password, latitude, longitude) {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ user: {username, password, latitude, longitude} })
    })
    .then(response => response.json())
    .then(userData => dispatch(setCurrentUser(userData)))
  }
}


export function setCurrentUser(userData) {
  return {
    type: "SET_CURRENT_USER",
    payload: userData
  }
}

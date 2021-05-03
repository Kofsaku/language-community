const initialState = {}

const reducer = () => {
  switch (action.type) {
    case "login":
      return action.payload.user
    case "logout":
      return initialState
    default:
      return state
  }
}

export default {
  initialState,
  reducer,
}
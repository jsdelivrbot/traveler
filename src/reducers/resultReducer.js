const initialState = {
  thingsToDo: [],
  foodNearMe: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "RESULTS":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

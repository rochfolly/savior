

export const logger = store => next => action => {
  console.log('dispatching ' + action.type, action.payload)
  let result = next(action)
  console.table('next state', store.getState())
  return result
}
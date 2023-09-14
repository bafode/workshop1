import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  eventListReducer,
  eventDetailsReducer,
  eventDestroyReducer,
  eventImportReducer,
  eventDeleteReducer
} from './reducers/eventReducers'

const reducer = combineReducers({
  eventList: eventListReducer,
  eventDetails: eventDetailsReducer,
  eventDestroy: eventDestroyReducer,
  eventImport: eventImportReducer,
  eventDelete:eventDeleteReducer
 
})



const initialState = { }

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

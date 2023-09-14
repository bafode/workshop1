
  
import{EVENT_LIST_REQUEST,EVENT_LIST_SUCCESS, EVENT_LIST_FAIL,EVENT_DETAILS_REQUEST,EVENT_DETAILS_SUCCESS,EVENT_DETAILS_FAIL, EVENT_DESTROY_REQUEST, EVENT_DESTROY_SUCCESS, EVENT_DESTROY_FAIL, EVENT_IMPORT_REQUEST, EVENT_IMPORT_SUCCESS, EVENT_IMPORT_FAIL, EVENT_IMPORT_RESET,EVENT_DELETE_FAIL,EVENT_DELETE_REQUEST,EVENT_DELETE_SUCCESS} from '../constants/eventConstants'
  
  export const eventListReducer = (state = { events: [] }, action) => {
    switch (action.type) {
      case EVENT_LIST_REQUEST:
        return { loading: true, events: [] }
      case EVENT_LIST_SUCCESS:
        return {
          loading: false,
          events: action.payload.events,
          pages: action.payload.pages,
          page: action.payload.page,
        }
      case EVENT_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const eventDetailsReducer = (
    state = { event: {} },
    action
  ) => {
    switch (action.type) {
      case EVENT_DETAILS_REQUEST:
        return { ...state, loading: true }
      case EVENT_DETAILS_SUCCESS:
        return { loading: false, event: action.payload }
      case EVENT_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }


  export const eventDestroyReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENT_DESTROY_REQUEST:
        return { loading: true }
      case EVENT_DESTROY_SUCCESS:
        return { loading: false, success: true }
      case EVENT_DESTROY_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

    export const eventImportReducer = (state = { events: [] }, action) => {
    switch (action.type) {
      case EVENT_IMPORT_REQUEST:
        return { loading: true }
      case EVENT_IMPORT_SUCCESS:
        return { loading: false, success: true, events: action.payload }
      case EVENT_IMPORT_FAIL:
        return { loading: false, error: action.payload }
      case EVENT_IMPORT_RESET:
        return {}
      default:
        return state
    }
  }
  

  export const eventDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENT_DELETE_REQUEST:
        return { loading: true }
      case EVENT_DELETE_SUCCESS:
        return { loading: false, success: true }
      case EVENT_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  

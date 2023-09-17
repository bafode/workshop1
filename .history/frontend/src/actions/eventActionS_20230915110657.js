import axios from 'axios'
import {
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_IMPORT_FAIL,
  EVENT_IMPORT_REQUEST,
  EVENT_IMPORT_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DESTROY_FAIL,
  EVENT_DESTROY_REQUEST,EVENT_DESTROY_SUCCESS
} from '../constants/eventConstants'


export const listEvents = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: EVENT_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/v1/evenements?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: EVENT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EVENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listEventDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/v1/evenements/${id}`)

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const destroyEvent = () => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_DESTROY_REQUEST,
    })

    // const {
    //   userLogin: { userInfo },
    // } = getState()

    const config = {
      headers: {
        Authorization: `Bearer {userInfo.token}`,
      },
    }

    await axios.delete(`/api/v1/data`, config)

    dispatch({
      type: EVENT_DESTROY_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
     /// dispatch(logout())
    }
    dispatch({
      type: EVENT_DESTROY_FAIL,
      payload: message,
    })
  }
}

export const importEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_IMPORT_REQUEST,
    })

    // const {
    //   userLogin: { userInfo },
    // } = getState()

    const config = {
      headers: {
        Authorization: `Bearer {userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/v1/data`, {}, config)

    dispatch({
      type: EVENT_IMPORT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      //dispatch(logout())
    }
    dispatch({
      type: EVENT_IMPORT_FAIL,
      payload: message,
    })
  }
}

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_DELETE_REQUEST,
    })

    // const {
    //   userLogin: { userInfo },
    // } = getState()

    const config = {
      headers: {
        Authorization: `Bearer {userInfo.token}`,
      },
    }

    await axios.delete(`/api/v1/evenements/${id}`, config)

    dispatch({
      type: EVENT_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      //dispatch(logout())
    }
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload: message,
    })
  }
}

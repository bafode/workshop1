import React, {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button,Table,Row,Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listEventDetails
} from '../actions/eventActionS'
const EventScreen = ({ match }) => {
 
  const dispatch = useDispatch()

  const eventDetails = useSelector((state) => state.eventDetails)
  const { loading, error, event} = eventDetails

 



  useEffect(() => {
      dispatch(listEventDetails(match.params.id))

  }, [dispatch, match])




  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
            <h1>LIST DES PARTICIPANTS</h1>
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOM</th>
                <th>ADRESSE</th>
              </tr>
            </thead>
            <tbody>
              {event?.attendees?.map((at) => (
                <tr key={at._id}>
                  <td>{at._id}</td>
                  <td>{at.name}</td>
                  <td>{at.address}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
        </>
      )}
      <a className='btn btn-light my-2' href={event.joinUrl}>
      <Button className='btn-sm' variant='info'>
          Join
      </Button>
      </a>
    </>
  )
}

export default EventScreen

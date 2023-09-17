import React, { useEffect,useState } from 'react'
import moment from "moment"
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col,Button,Table, Form} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listEvents,destroyEvent,importEvents,deleteEvent } from '../actions/eventActionS'
import FormContainer from '../components/FormContainer'

const HomeScreen = ({ match }) => {
  const [csvFile, setCsvFile] = useState('')
  const [uploading, setUploading] = useState(false)
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const eventList = useSelector((state) => state.eventList)
  const { loading, error, events, page, pages } = eventList

  const eventDestroy = useSelector((state) => state.eventDestroy)
  const {
    loading: loadingDestroy,
    error: errorDestroy,
    success: successDestroy,
  } = eventDestroy

  const eventImport = useSelector((state) => state.eventImport)
  const {
    loading: loadingImport,
    error: errorImport,
    success: successImport,
  } = eventImport

  const eventDelete = useSelector((state) => state.eventDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete

  useEffect(() => {
   dispatch(listEvents(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber,successDestroy,successImport,successDelete])
 
  const importEventHandler = () => {
    dispatch(importEvents())
  }

  const destroyHandler = () => {
    if (window.confirm('Are you sure')) {
      dispatch(destroyEvent())
    }
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteEvent(id))
    }
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('csvfile', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/v1/upload', formData, config)

      setCsvFile(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }


  return (
    <>
     
    
       <Row className='align-items-center'>
       
        <Col>
           
      <FormContainer>
      <Form>
      <Form.Group controlId='image'>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={csvFile}
                onChange={(e) => setCsvFile(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
      </Form>
      </FormContainer>
        </Col>
        <Col className='text-right'>
          <Button variant='light' className='btn-sm' onClick={importEventHandler}>
            <i className='fas fa-plus'></i> Importer les Evenements
          </Button>
          <Button variant='danger' className='btn-sm' onClick={destroyHandler}>
            <i className='fas fa-minus'></i> Supprimer les Evenements
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingImport && <Loader />}
      {errorImport && <Message variant='danger'>{errorImport}</Message>}
      {loadingDestroy && <Loader />}
      {errorDestroy && <Message variant='danger'>{errorDestroy}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
        ) : (
          <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>SUJET</th>
                <th>ORGANISATEUR</th>
                <th>DEBUT</th>
                <th>FIN</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev._id}>
                  <td>{ev.subject}</td>
                  <td>{ev.organizer.name}</td>
                  <td>{moment(ev.start.dateTime).format('LLLL')}</td>
                  <td>{moment(ev.end.dateTime).format('LLLL')}</td>
                 
                  <td>
                    <LinkContainer to={`/events/${ev._id}`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                        Details
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                     onClick={() => deleteHandler(ev._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={false} />
        </>
      )}
      
    </>
  )
}

export default HomeScreen

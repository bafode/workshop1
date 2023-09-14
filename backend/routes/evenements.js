import express from 'express'
const router = express.Router()
import {
 getEvents,
 getEventById,
 deleteEvent
} from '../controllers/evenements.js'

router.route('/').get(getEvents);
router
  .route('/:id')
  .get(getEventById)
  .delete(deleteEvent)

export default router
import express from 'express'
const router = express.Router()
import {
 getEvents,
 createEvent,
 
} from '../controllers/evenements.js'

router.route('/').get(getEvents).post(createEvent);

export default router
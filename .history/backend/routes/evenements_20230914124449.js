import express from 'express'
const router = express.Router()
import {
 getEvents,
    createEvent,
    importData,
   destroyData
 
} from '../controllers/evenements.js'

router.route('/').get(getEvents).post(createEvent);

export default router
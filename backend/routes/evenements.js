import express from 'express'
const router = express.Router()
import {
 getEvents,
 createEvent,
 createEventOnGraphAPI
} from '../controllers/evenements.js'

router.route('/').get(getEvents).post(createEvent);
router.route("/graph").post(createEventOnGraphAPI)

export default router
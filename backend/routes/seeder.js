import express from 'express'
const router = express.Router()
import {
 importEventsFromSeeder,
    destroyEventFromSeeder 
 
} from '../controllers/evenements.js'

router.route('/').post(importEventsFromSeeder).delete(destroyEventFromSeeder);

export default router
import express from 'express'
const router = express.Router()
import {
 importEventsFromSeeder,
    destroyEventFromSeeder,
    exportSavedData 
 
} from '../controllers/evenements.js'

router.route('/').post(importEventsFromSeeder).delete(destroyEventFromSeeder).put(exportSavedData);

export default router
import express from 'express'
const router = express.Router()
import {
 importData,
 destroyData,
 
} from '../controllers/evenements.js'

router.route('/').post(importData).delete(destroyData);

export default router
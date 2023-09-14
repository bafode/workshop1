import asyncHandler from 'express-async-handler'
import Evenement from '../models/Evenement.js'
import {importData,destroyData} from "../data/seeder.js"

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        nom: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Evenement.countDocuments({ ...keyword })
  const events = await Evenement.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ events, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const event = new Evenement(req.body)

  const createdEvent = await event.save()
  res.status(201).json(createdEvent)
})

export {
  getEvents,
  createEvent
 
}
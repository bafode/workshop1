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

// @desc    Import Data
// @route   POST /api/import
// @access  Private/Admin
const importEventsFromSeeder = asyncHandler(async (req, res) => {
 importData()
  res.status(201).json({message:"Data Imported"})
})

// @desc    Destroy Data
// @route   POST /api/import
// @access  Private/Admin
const destroyEventFromSeeder = asyncHandler(async (req, res) => {
  destroyData()
   res.status(200).json({message:"Data Destroyed"})
 })

export {
  getEvents,
  createEvent,
  destroyDataFromSeeder,
  importD
 
}
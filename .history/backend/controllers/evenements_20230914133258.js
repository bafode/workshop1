import asyncHandler from 'express-async-handler'
import Evenement from '../models/Evenement.js'
import fs from "fs"
import {parse} from "csv-parse"
import axios from "axios"
import colors from 'colors'

const filepath = "./backend/data/eventList.csv"
const createReadStream=()=>{
  var csvData = [];
  return new Promise(resolve => {
  fs.createReadStream(filepath)
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on('data', (data) => csvData.push(data))
  .on('end', () => {
  resolve(csvData)
  });
  })
  }


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
// importData()
const config = {
  headers: {
    Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
  },
}
  const finalData = await createReadStream()
  res.status(201).json({message:"Data Imported",data:finalData})
})

// @desc    Destroy Data
// @route   POST /api/import
// @access  Private/Admin
const destroyEventFromSeeder = asyncHandler(async (req, res) => {
 // destroyData()
   res.status(200).json({message:"Data Destroyed"})
 })

export {
  getEvents,
  importEventsFromSeeder,
  destroyEventFromSeeder
 
}
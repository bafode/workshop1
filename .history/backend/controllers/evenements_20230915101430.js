import asyncHandler from 'express-async-handler'
import Evenement from '../models/Evenement.js'
import fs from "fs"
import {parse} from "csv-parse"
import axios from "axios"
import colors from 'colors'

const filepath = "./data/eventList.csv"
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
const config = {
  headers: {
    Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
  },
}
  const finalData = await createReadStream()
  const sampleData = finalData.map((row) => {
    return  {
      subject: row[0],
      body: {
       contentType: "HTML",
       content: row[1]
      },
      start: {
                dateTime: row[4],
                timeZone: row[5]
        },
      end: {
                dateTime: row[6],
                timeZone: row[7]
        },
      attendees: row[3].split(",").map((r) => {
        return {
          emailAddress: {
            address: r
            },
         // type: "required"
          }
        }),
      isOnlineMeeting: true     
         
    }
  })

  try {
      
    // const promises = sampleData.map(event => axios.post(`${process.env.GRAPH_API_HOST}/v1.0/me/calendar/events`, event, config));
    // const values = await Promise.all(promises)
    console.log(process.env.GRAPH_API_TOKEN)
    // const dataToSave=values.map(response => {
    //   return{
    //     subject: response.data.subject,
    //     start: {
    //       dateTime:response.data.start.dateTime ,
    //       timeZone: response.data.start.timeZone 
    //    },
    //    end: {
    //     dateTime:response.data.end.dateTime ,
    //     timeZone: response.data.end.timeZone 
    //     },
    //     location: response.data.location.displayName,
    //     attendees: response.data.attendees.map((at) => {
    //       return {
    //         name: at.emailAddress.name,
    //         address: at.emailAddress.address
    //       }
    //     }) ,
    //     organizer:{
    //       name: response.data.organizer.emailAddress.name,
    //       address: response.data.organizer.emailAddress.address
    //     },
    //     joinUrl: response.data.onlineMeeting.joinUrl
    //   }
    // })
    
    // await Evenement.deleteMany()
    

    // await Evenement.insertMany(dataToSave)
    console.log('Data Imported!'.green.inverse)
    res.status(201).json({message:"Data Imported",data:values})
  } catch (error) {
    console.error(`${error}`.red.inverse)
  }
  //res.status(201).json({message:"Data Imported",data:sampleData})
})

// @desc    Destroy Data
// @route   POST /api/import
// @access  Private/Admin
const destroyEventFromSeeder = asyncHandler(async (req, res) => {   
    await Evenement.deleteMany()
    console.log('Data Destroyed!'.red.inverse)
    res.status(200).json({message:"Data Destroyed"})
})
 
// @desc    Fetch single event
// @route   GET /api/v1/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Evenement.findById(req.params.id)

  if (event) {
    res.json(event)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete an event
// @route   DELETE /api/v1/events/:id
// @access  Private/Admin
const deleteEvent= asyncHandler(async (req, res) => {
  const event = await Evenement.findById(req.params.id)
  if (!event) {
    res.status(404)
    throw new Error('Event not found')
  } 
  await Evenement.findOneAndDelete({ _id: req.params.id })
  res.json({ message: 'Event removed' })
})

export {
  getEvents,
  importEventsFromSeeder,
  destroyEventFromSeeder,
  getEventById,
  deleteEvent
 
}
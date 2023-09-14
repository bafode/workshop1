import fs from "fs"
import {parse} from "csv-parse"
import dotenv from 'dotenv'
import axios from "axios"
import connectDB from '../config/db.js'
import Evenement from "../models/Evenement.js";
import colors from 'colors'
import asyncHandler from "express-async-handler"

const filepath = "./backend/data/eventList.csv"

dotenv.config({path:"/../../.env"})

connectDB()


function createReadStream(){
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
  





export const importData = async () => {
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
      
      const promises = sampleData.map(event => axios.post(`${process.env.GRAPH_API_HOST}/v1.0/me/calendar/events`, event, config));
      const values = await Promise.all(promises)
      const dataToSave=values.map(response => {
        console.log(response.data)
        return{
          subject: response.data.subject,
          start: {
            dateTime:response.data.start.dateTime ,
            timeZone: response.data.start.timeZone 
         },
         end: {
          dateTime:response.data.end.dateTime ,
          timeZone: response.data.end.timeZone 
          },
          location: response.data.location.displayName,
          attendees: response.data.attendees.map((at) => {
            return {
              name: at.emailAddress.name,
              address: at.emailAddress.address
            }
          }) ,
          organizer:{
            name: response.data.organizer.emailAddress.name,
            address: response.data.organizer.emailAddress.address
          },
          joinUrl: response.data.onlineMeeting.joinUrl
        }
      })
      
      await Evenement.deleteMany()
      
  
      await Evenement.insertMany(dataToSave)
      console.log('Data Imported!'.green.inverse)
     // process.exit()
    } catch (error) {
      console.error(`${error}`.red.inverse)
     // process.exit(1)
    }
   
  }


  export const destroyData = async () => {
    try {
    
      await Evenement.deleteMany()
      console.log('Data Destroyed!'.red.inverse)
      process.exit()
    } catch (error) {
      console.error(`${error}`.red.inverse)
    //  process.exit(1)
    }
  }
  
  // if (process.argv[2] === '-d') {
  //   destroyData()
  // } else {
  //   importData()
  // }
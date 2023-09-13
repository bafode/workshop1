import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import fs from "fs"
import {parse} from "csv-parse"
import connectDB from '../config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {

    const eventList=[];

    fs.createReadStream("./eventList.csv")
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", function (row) {
      let eventItem={
          nom: row[0],
          organizateurs:row[1].split(","),
          invites: row[2].split(","),
          debut:{
            date:row[3],
            heure:row[4]
          },
          fin: {
            date:row[5],
            heure:row[6]
          },   
      }
  
      console.log(eventItem)
      eventList.push(eventItem)
    })
    .on("end", function () {
      console.log(eventList);
    })
    .on("error", function (error) {
      console.log(error.message);
    });
    
    console.log()
    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
   

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
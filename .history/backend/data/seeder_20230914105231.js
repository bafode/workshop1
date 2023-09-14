import fs from "fs"
import {parse} from "csv-parse"
import dotenv from 'dotenv'
import axios from "axios"
import connectDB from '../config/db.js'
import Evenement from "../models/Evenement.js";
import colors from 'colors'
import asyncHandler from "express-async-handler"

const filepath = "./backend/data/eventList.csv"

dotenv.config()

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
  

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
    },
  }


  const importData=async()=>{
    const finalData = await createReadStream()
    const sampleData=finalData.map((row)=>{
      return {
        nom: row[0],
        organizateurs:row[1].split(","),
        invites: row[2].split(","),
        heureDeDebut:{
          dateHeure:row[3],
          fuseauHoraire:row[4]
        },
        heureDeFin: {
          dateHeure:row[5],
          fuseauHoraire:row[6]
        },   
    }
    })
    
    try {
      await Evenement.deleteMany()
      await Evenement.insertMany(sampleData)
  
      console.log('Data Imported!'.green.inverse)
      process.exit()
    } catch (error) {
      console.error(`${error}`.red.inverse)
      process.exit(1)
    }
   
  }


  const destroyData = async () => {
    try {
    
      await Evenement.deleteMany()
  
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
import mongoose from 'mongoose'


const evenementSchema = mongoose.Schema(
  {
    start: {
      dateTime: String,
      timeZone: String
   },
   end: {
      dateTime: String,
      timeZone: String
    },
    location: String,
    attendees: [{ name: String, address: String }],
    organizer:String
  },
  {
    timestamps: true,
  }
)

const Evenement = mongoose.model('Evenement', evenementSchema);

export default Evenement;
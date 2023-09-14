import mongoose from 'mongoose'


const evenementSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    start: {
      dateTime: {
        type: String,
        required: true,
      },
      timeZone: {
        type: String,
        required: true,
      }
   },
   end: {
      dateTime: {
        type: String,
        required: true,
      },
      timeZone:{
        type: String,
        required: true,
      }
    },
    location: {
      type: String,
      required: true,
    },
    attendees: [{ name: {
      type: String,
      required: true,
    }, address: {
      type: String,
      required: true,
    } }],
    organizer: {
      name: {
          type: String,
          required: true,
      },
      address: {
          type: String,
          required: true,
    } },
    joinUrl: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

const Evenement = mongoose.model('Evenement', evenementSchema);

export default Evenement;
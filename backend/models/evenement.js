import mongoose from 'mongoose'


const evenementSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    organizateurs: [{
      type: String,
      required: true,
    }],
    invites: [{
      type: String,
      required: true,
    }],
    debut:{
        date:{
            type: Date,
             required: true, 
        },
        heure:{
            type: Date,
             required: true, 
        }
    },
    fin:{
        date:{
            type: Date,
             required: true, 
        },
        heure:{
            type: Date,
             required: true, 
        }
    },
    description: {
      type: String,
    },
   
  },
  {
    timestamps: true,
  }
)

const Evenement = mongoose.model('Evenement', evenementSchema)

export default Evenement
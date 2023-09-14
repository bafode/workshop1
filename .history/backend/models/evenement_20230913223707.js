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
            type: String,
             required: true, 
        },
        heure:{
            type: String,
             required: true, 
        }
    },
    fin:{
        date:{
            type: String,
             required: true, 
        },
        heure:{
            type: String,
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

const Evenement = mongoose.model('Evenement', evenementSchema);

export default Evenement;
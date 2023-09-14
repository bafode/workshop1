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
    heureDeDebut:{
        dateHeure:{
            type: String,
             required: true, 
        },
        fuseauHoraire:{
            type: String,
             required: true, 
        }
    },
    heureDeFin:{
      dateHeure:{
        type: String,
         required: true, 
    },
    fuseauHoraire:{
        type: String,
         required: true, 
    }
    },
    description: String,
    availabilityViewInterval:Number,
   
  },
  {
    timestamps: true,
  }
)

const Evenement = mongoose.model('Evenement', evenementSchema);

export default Evenement;
import mongoose, { Schema } from 'mongoose';

const PetSchema: Schema = new Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['available', 'pending', 'sold'],
    required: true
  },
  ownerId: { type: String, required: true },
  auction: {
    bids: {
      type: Array, required: false
    },
    winners: {
      type: Array, required: false
    },
    exDate: {
      type: Date, required: false
    }, required: false
  }
});

export default mongoose.model('Pet', PetSchema);
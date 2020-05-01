import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
 
});

export default mongoose.model('User', UserSchema);
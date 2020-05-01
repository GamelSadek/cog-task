import mongoose from 'mongoose';

export const connection = async () => {
  try {
    await mongoose.connect("mongodb+srv://roma:1234@cluster0-vovbl.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
    
    console.log('Database Connected Successfully');
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export const isValidObjectId = (id : any ) => {
  return mongoose.Types.ObjectId.isValid(id);
}
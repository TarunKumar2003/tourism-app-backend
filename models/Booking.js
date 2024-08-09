import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    userEmail: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: true,
    },
    tourName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
   phone:{
    type:Number,
    required:true
   },
   bookAt: {
    type: Date,
    required: false,
   }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

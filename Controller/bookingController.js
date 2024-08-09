import Booking from "../models/Booking.js";
export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
    try {
        const savedBooking = await newBooking.save();
        // if (res.headersSent) {
        //     console.error("Headers already sent.");
        //     return;
        // }
         res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: savedBooking
        });
      
    } catch (error) {
       return  res.status(500).json({
            success: false,
            message: "Failed to create booking try again ",
        });
    }
}

export const getBooking = async (req, res) => {
    try {
        const id=req.params.id;
        const bookings = await Booking.find({_id:id});
        return res.status(200).json({
            success: true,
            message: "Bookings fetched successfully",
            data: bookings
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Failed to fetch bookings try again ",
        });
    }
    
}

//get all bookings

export const getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find();
        return res.status(200).json({
            success: true,
            message: "Bookings fetched successfully",
            data: bookings
        });
    } catch (error) {
       return  res.status(404).json({
            success: false,
            message: "Failed to fetch bookings try again ",
        });
    }
    
}
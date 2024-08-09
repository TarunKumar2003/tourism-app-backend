import Tour from "../models/Tour.js";

//create tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    try {
        const savedTour = await newTour.save();
       return  res.status(200).json({
            success: true,
            message: "Tour created successfully",
            data: savedTour
        });
    } catch (error) {
       return  res.status(500).json({
            success: false,
            message: "Failed to create tour try again ",
        });
    }
}
// update tour 
export  const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });
        // set the fields from body to new value , new: true send update one, mongo by deafult send original one 
        return res.status(200).json({
            success: true,
            message: "Tour updated successfully",
            data: updatedTour
        });
    } catch (error) {
       return  res.status(500).json({
            success: false,
            message: "Failed to update tour try again ",
        });
    }
}


// delete tour 
export  const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
      await Tour.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Tour deleted successfully"
        });
    } catch (error) {
       return  res.status(404).json({
            success: false,
            message: "Failed to delete tour try again ",
        });
    }
}

// get single tour 
export  const getTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id).populate("reviews");
        return res.status(200).json({
            success: true,
            message: "Tour fetched successfully",
            data: tour
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "not found tour with this id , Failed to fetch tour try again ",
        });
    }
}

// get all tour
export  const getAllTour = async (req, res) => {

    // implementing pagination in result of api 
    const page = parseInt(req.query.page);
    console.log(page);
    // const limit = parseInt(req.query.limit);
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;


    try {
        const tours = await Tour.find({}).populate("reviews").skip(page*8).limit(8);
        //const tours = await Tour.find({});
        return res.status(200).json({
            success: true,
            message: "Tours fetched successfully",
            count: tours?.length,
            data: tours
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Failed to fetch tours try again ",
        });
    }
}


// get tour by search
export  const getToursBySearch = async (req, res) => {
    // const city = req.query.city;
    // const distance = req.query.distance;
    // const maxGroupSize = req.query.maxGroupSize;
    const city=new RegExp(req.query.city,"i"); // i means case insensitive 
    // const city=req.query.city;
    // const city='Bali';
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);
    try {
        const tours = await Tour.find({
            city,
            distance: { $gte: distance },
            maxGroupSize: { $gte: maxGroupSize },
        }).populate("reviews");
        return  res.status(200).json({
            success: true,
            message: "Tours fetched successfully by search",
            data: tours
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Failed to fetch tours try again by search  ",
        });
    }
}

// get featured tour
export  const getFeaturedTour = async (req, res) => {
    try {
        //const tours = await Tour.find({ featured: true}).populate("reviews").limit(8);
        const tours= await Tour.find({featured:true});
        return res.status(200).json({
            success: true,
            message: "Tours fetched successfully by Featured",
            data: tours
        });
    } catch (error) {
       return  res.status(404).json({
            success: false,
            message: "Failed to fetch tours try again by search  ",
        });
    }
}

//get tour count
export  const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        return res.status(200).json({
            success: true,
            message: "Tours count fetched successfully",
            data: tourCount
        });
    } catch (error) {
       return  res.status(404).json({
            success: false,
            message: "Failed to fetch tours count try again ",
        });
    }
}
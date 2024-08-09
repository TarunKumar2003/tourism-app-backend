import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
    const tourId = req.params.tourId;
    const newReview = new Review({ ...req.body });

    try {
        // Save the new review
        const savedReview = await newReview.save();

        // Update the corresponding tour with the new review
        const updatedTour = await Tour.findByIdAndUpdate(
            tourId,
            { $push: { reviews: savedReview._id } },
            { new: true, useFindAndModify: false }
        );

        if (!updatedTour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found",
            });
        }

        // Send success response
        console.log("Review saved and tour updated successfully:", savedReview);

        return res.status(200).json({
            success: true,
            message: "Review created successfully",
            data: savedReview,
        });
    } catch (error) {
        // Log the error for debugging
        console.error("Error creating review:", error);

        // Send error response
        return res.status(500).json({
            success: false,
            message: "Failed to create review. Please try again.",
        });
    }
};

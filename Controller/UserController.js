import User from "../models/User.js";

//create User
export const createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: savedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create User try again ",
        });
    }
}
// update User 
export  const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });
        // set the fields from body to new value , new: true send update one, mongo by deafult send original one 
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update User try again ",
        });
    }
}


// delete User 
export  const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to delete User try again ",
        });
    }
}

// get single User 
export  const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "not found User with this id , Failed to fetch User try again ",
        });
    }
}

// get all User
export  const getAllUser = async (req, res) => {

    // implementing pagination in result of api 
    // const page = parseInt(req.query.page);
    console.log(page);
    // const limit = parseInt(req.query.limit);
    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;


    try {
        const users = await User.find({});
        //const Users = await User.find({});
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to fetch Users try again ",
        });
    }
}
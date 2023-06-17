const User = require("../models/user.model");
const { userStatus } = require("../constants");

const getAllUsers = async (req, res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Internal server error."});
    }
}

const getUserById = async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.send(user);
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Internal server error."});
    }
}

const updateUserById = async (req, res)=>{
    try{
        const updateUser = await User.findById(req.params.id);
        if(!updateUser){
            res.status(404).send({message: "ID passed is invalid."});
        }
        if(req.body.userStatus === userStatus.approved){
            updateUser.userStatus = userStatus.approved;
        }else if(req.body.userStatus === userStatus.pending){
            updateUser.userStatus = userStatus.pending;
        }else{
            updateUser.userStatus = userStatus.rejected;
        }
        await updateUser.save();
        res.send(updateUser); 
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Internal server error."});
    }
}

module.exports = {getAllUsers, getUserById, updateUserById};
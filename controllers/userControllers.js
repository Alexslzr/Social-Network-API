const {Thought, User} = require('../models')

module.exports = {
    async getAllUsers(req,res){ 
        try{
        const users =  await User.find()
        res.json(users)
        } catch (err){
            res.status(500).json(err);
        }
    },

    async getUserbyId(req, res){
        try{
            const singleUser = await User.findOne({_id: req.params.id})
                .select('-__v');
            if(!singleUser){
                return res.status(404).json({message: "no user found under this id"})
            }
            res.json(singleUser)
        } catch(err){
            res.status(500).json(err);
        }
    },

    async postNewUser(req,res){
        try{
            const newUser = await User.create(req.body)
            res.json(newUser)
        } catch (err){
            res.status(500).json(err)
        } 
    },

    async updateUser(req,res){
        try{
            const updatedUser = await User.findOneandUpdate(
                {_id: req.params.id},
                {$set: req.body},
                {runValidators: true, new: true}
            )

        if(!updatedUser){
            return res.status(404).json({message: "No user found with this Id"})
        }
        res.json(updatedUser)
        } catch(err){
            res.status(500).json(err)
        }
    },

    async deleteUser(req,user){
        try{
            const deletedUser = await User.findOneandDelete({
                _id: req.params.id
            })

            if(!deletedUser){
                return res.status(404).json({message: "no user found under this id to delete"})
            }
            await User.deleteMany({ _id: { $in: deletedUser.thoughts}})

            res.json(deletedUser)
        } catch (err){
            res.status(500).json(err)
        }
    }


}
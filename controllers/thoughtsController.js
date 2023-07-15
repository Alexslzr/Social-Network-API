const {Thought, User} = require('../models')
const { updateUser } = require('./userControllers')

module.exports = {
    async  getThoughts(req,res){
        try{
            const thoughts = await Thought.find({})
                .select('-__v')
            res.json(thoughts)
        } catch(err){
            res.status(500).json(err)
        }
    },

    async  getThoughtsbyId(req,res){
        try{
            const thoughts = await Thought.findOne({_id: req.params.thoughtId})
                .select('-__v')

            if(!thoughts){
                return res.status(404).json({message: "No thought found under this id"})
            }

            res.json(thoughts)
        } catch(err){
            res.status(500).json(err)
        }
    },

    async  postThoughts(req,res){
        try{
            const postedThought = await Thought.create(req.body);
            const updateUser = await User.findandUpdate(
                {_id: req.body.userId},
                {$addtoSet: {thoughts: postedThought._id}},
                {new: true}
            )

            if (!updateUser){
                return res.status(404).json({message: "though updated but no user found under this id"})
            }

            res.json('Created though')
        } catch(err){
            res.status(500).json(err)
        }
    },

    async  updateThoughts(req,res){
        try{
            const updatedThought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true})
            if(!updatedThought){
                return res.status(404).json({message: "No thought found with this id"})
            }

            res.json(updatedThought)
        } catch(err){
            res.status(500).json(err)
        }
    },

    async  deleteThoughts(req,res){
        try{
            const deletedThough = await Thought.findOneAndDelete({_id: req.params.thoughtId})
            
            if(!deletedThough){
                return res.status(404).json({message: "no thought found under this id"})
            }

            res.json(deletedThough)
        } catch(err){
            res.status(500).json(err)
        }
    },

    async  PostReaction(req,res){
        try{
            
        } catch(err){
            
        }
    },

    async  deleteReaction(req,res){
        try{

        } catch(err){
            
        }
    }






    
}
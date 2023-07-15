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
            const updateUser = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: postedThought._id}},
                {new: true}
            )

            if (!updateUser){
                return res.status(404).json({message: "though updated but no user found under this id"})
            }

            res.json(updateUser)
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

    async  postReaction(req,res){
        try{
            const addReaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet : {reactions: req.body}},
                {runValidators: true, new: true})

            if(!addReaction){
                return res.status(404).json({message: 'There is no though to React'})
            }

            res.json(addReaction)
        } catch(err){
            res.status(500).json(err)
        }
    },

    async  deleteReaction(req,res){
        try{
            const deleteReaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.body.reactionId}}},
                {new: true})

            if(!deleteReaction){
                res.status(404).json({message: "couldnt find any reaction or though"})
            }
            res.json(deleteReaction)
        } catch(err){
            res.status(500).json(err)
        }
    }
}
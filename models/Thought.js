const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
})

thoughtSchema.methods.reactionCount = function(){
    return this.reactions.length
}

const Thought = model('though', thoughtSchema)

module.exports = Thought


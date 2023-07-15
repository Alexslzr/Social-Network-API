const { Schema } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatTime
    }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)

function formatTime(time){
    let formattedTime = new Date(time)
    return formattedTime.toLocaleString()
}

module.exports = reactionSchema

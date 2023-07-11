const {Schema, model} = require('mongoose')


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: '//'
    },
    thoughts: [thoughtsSchema],
    friends: [userSchema]
}
)

userSchema.methods.friendCount = function(){
    return this.friends.length
}

const User = model('user', userSchema)

module.exports = User
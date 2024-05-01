const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// const formattedDate = require('../utils/helper')
// console.log(formattedDate)

function formattedDate(today) {
    console.log("this is today = ". today)
    return "aAAAAAAAAAAA"
}
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => formattedDate(timestamp)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
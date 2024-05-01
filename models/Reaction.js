const { Schema } = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const formattedDate = require('../utils/helper')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectId,
            default: new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (today) => formattedDate(today)
        }
    }
);

module.exports = reactionSchema;
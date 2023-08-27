const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const infoSchema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        fName: {
            type: String,
            required: true
        },
        lName: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

infoSchema.plugin(AutoIncrement, {
    inc_field: 'user',
    id: 'userNum',
    start_seq: 500
})

module.exports = mongoose.model('UserInfo', infoSchema)
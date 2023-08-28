const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

//reflect employee's daily sales record
const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        salesCount: {
            type: String,
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

noteSchema.plugin(AutoIncrement, {
    inc_field: 'note',
    id: 'noteNums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)
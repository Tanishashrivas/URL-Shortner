import mongoose from 'mongoose';
const schema = mongoose.Schema;

const shortUrlSchema = new schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type: String,
        required: true
    },
    visitHistory: [ { timestamp: { type: Number } } ],
}, { timestamps: true }
)

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema, 'urlData');

export default ShortUrl;
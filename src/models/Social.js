import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    icon: {
        type: String,
        required: true,
        index: true
    },
    baseUrl: {
        type: String,
        required: true,
        index: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Social = mongoose.model('Social', socialSchema);

export default Social;

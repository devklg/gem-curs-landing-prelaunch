const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    sponsorName: String,
    status: {
        type: String,
        enum: ['pending', 'active'],
        default: 'pending'
    },
    rank: {
        type: String,
        enum: ['Member', 'Silver', 'Gold', 'Platinum', 'Diamond'],
        default: 'Member'
    },
    enrollerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    leftLeg: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    rightLeg: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    placementLeg: {
        type: String,
        enum: ['left', 'right'],
        default: 'left'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 
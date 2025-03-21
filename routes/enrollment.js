const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Pre-enroll a new user
router.post('/pre-enroll', async (req, res) => {
    try {
        const { name, email, enrollerId } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate a random password and hash it
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            enrollerId,
            rank: 'Member'
        });

        // Determine placement leg
        if (enrollerId) {
            const enroller = await User.findById(enrollerId);
            if (enroller) {
                // Simple placement logic - alternate between legs
                user.placementLeg = enroller.leftLeg.length <= enroller.rightLeg.length ? 'left' : 'right';
            }
        }

        await user.save();

        res.status(201).json({
            message: 'Pre-enrollment successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                rank: user.rank,
                placementLeg: user.placementLeg
            }
        });
    } catch (error) {
        console.error('Pre-enrollment error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Complete enrollment
router.post('/complete', async (req, res) => {
    try {
        const { userId, password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update password
        user.password = password;
        await user.save();

        // Update enroller's leg
        if (user.enrollerId) {
            const enroller = await User.findById(user.enrollerId);
            if (enroller) {
                if (user.placementLeg === 'left') {
                    enroller.leftLeg.push(user._id);
                } else {
                    enroller.rightLeg.push(user._id);
                }
                await enroller.save();
            }
        }

        res.json({
            message: 'Enrollment completed successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                rank: user.rank,
                placementLeg: user.placementLeg
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get enrollment status
router.get('/status/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select('-password')
            .populate('enrollerId', 'name email rank');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            status: user.password ? 'completed' : 'pending',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                rank: user.rank,
                placementLeg: user.placementLeg,
                enroller: user.enrollerId
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 
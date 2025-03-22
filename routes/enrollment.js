const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Pre-enroll a new user
router.post('/pre-enroll', async (req, res) => {
    try {
        const { firstName, lastName, email, sponsorName } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Generate userId and temp password
        const userId = 'TF' + Date.now().toString().slice(-6);
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const newUser = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            userId,
            sponsorName
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'Pre-enrollment successful',
            data: { userId, tempPassword }
        });

    } catch (error) {
        console.error('Pre-enrollment error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
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
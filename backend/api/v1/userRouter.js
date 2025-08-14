const express = require('express');
const router = express.Router();
const { User } = require('../../schemas/userSchema');
const { Bank } = require('../../schemas/bankSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const zod = require('zod');
const authMiddleware = require('../../middleware/authMiddleware');
const { $ZodCheckLengthEquals } = require('zod/v4/core');

const inputform = zod.object({
    name: zod.string(),
    email: zod.email(),
    password: zod.string()
});

const loginInputType = zod.object({
    email: zod.string().email(),
    password: zod.string()
});

const updateExisting = zod.object({
    password: zod.string(),
    name: zod.string()

});

router.post('/signup', async (req, res) => {
    try {
        const parsed = inputform.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ msg: "Invalid input" });
        }

        const { name, email, password } = parsed.data;
        const existingUser = await User.findOne({ $or: [{ name }, { email }] });

        if (existingUser) {
            return res.status(409).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const bankData = new Bank({
            userId: newUser._id,
            balance: 50000
        })
        await bankData.save()

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

        return res.status(201).setHeader('authorization', `bearer ${token}`).json({ msg: "User created successfully", token });
    } catch (error) {
        return res.status(500).json({ msg: error.message || "Internal Server Error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const parsed = loginInputType.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ msg: "Invalid input" });
        }

        const { email, password } = parsed.data;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        return res.status(200).setHeader('authorization', `bearer ${token}`).json({ msg: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ msg: error.message || "Internal Server Error" });
    }
});


router.put('/update/:id', authMiddleware, async (req, res) => {
    try {
        const parsed = updateExisting.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ msg: "Invalid input" });
        }

        const id = req.params.id

        const { password, name } = parsed.data;

        const user = await User.findByIdAndUpdate(id, { $set: { password: password, name: name } }, { new: true });

        if (!user) {
            return res.json({
                msg: "User Does Not Exist"
            })
        }

        return res.status(200).json({
            msg: "User Updated Successfully"
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message || "Internal Server Error" });
    }
});


router.get('/bulk', authMiddleware, async (req, res) => {
    try {

        const filter = req.query.filter || '';
        const userFilter = await User.find({
            _id: { $ne: req.userId },
            name: { $regex: filter }
        })

        console.log(userFilter)
        if (userFilter.length <= 0) {
            return res.status(404).json({
                msg: 'User Not Found'
            })
        }

        return res.status(200).json({
            user: userFilter.map(user => (
                {
                    name: user.name,
                    email: user.email,
                    lastName: user.lastName,
                    _id: user._id
                }
            ))
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message || "Internal Server Error" });
    }
});

module.exports = router;

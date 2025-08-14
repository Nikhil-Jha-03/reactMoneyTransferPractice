const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware')
const { User } = require('../../schemas/userSchema');
const { Bank } = require('../../schemas/bankSchema')
const mongoose = require('mongoose')

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const id = req.userId;
        const user = await Bank.findOne(
            { userId: id }
        );
        console.log(user)
        if (!user) {
            return res.json({
                msg: "User Does Not Exist"
            })
        }

        return res.status(200).json({
            balance:user.balance
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message || "Internal Server Error" });
    }
});

// Without Transaction
router.post('/transfer', authMiddleware, async (req, res) => {
    try {
        const { amount, to } = req.body;
        const id = req.userId;


        if (id === to) {
            return res.status(400).json({ msg: "Cannot transfer to the same account" });
        }

        const fromUser = await Bank.findOne(
            { userId: id }
        )

        if (!fromUser) {
            return res.json({
                msg: "User Does Not Exist"
            })
        }

        const { balance } = fromUser;

        if (amount > balance) {
            return res.json({
                msg: "transfer cannot be performed"
            })
        }
        const toAccount = await Bank.findOne({
            userId: to
        });

        if (!toAccount) {
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        await Bank.updateOne(
            { userId: new mongoose.Types.ObjectId(id) },
            { $inc: { balance: -Number(amount) } }
        );

        await Bank.updateOne(
            { userId: new mongoose.Types.ObjectId(to) },
            { $inc: { balance: Number(amount) } }
        );

        return res.status(200).json({
            msg: 'transfer Successful'
        })


    } catch (error) {
        return res.status(500).json({ msg: error.message || "Internal Server Error" });
    }
})



// With Transaction || not working need to create replicas
// router.post('/transfer', authMiddleware, async (req, res) => {
//     try {
//         const session = await mongoose.startSession()
//         const { amount, to } = req.body;
//         const id = req.userId;


//         if (id === to) {
//             session.abortTransaction()
//             return res.status(400).json({ msg: "Cannot transfer to the same account" });
//         }


//         session.startTransaction();

//         const fromUser = await Bank.findOne(
//             { userId: id }
//         ).session(session)

//         if (!fromUser) {
//             await session.abortTransaction();
//             return res.json({
//                 msg: "User Does Not Exist"
//             })
//         }

//         const { balance } = fromUser;

//         if (amount > balance) {
//             await session.abortTransaction();
//             return res.json({
//                 msg: "transfer cannot be performed"
//             })
//         }
//         const toAccount = await Bank.findOne({
//             userId: to
//         }).session(session);

//         if (!toAccount) {
//             await session.abortTransaction();
//             return res.status(400).json({
//                 message: "Invalid account"
//             })
//         }

//         await Bank.updateOne(
//             { userId: new mongoose.Types.ObjectId(id) },
//             { $inc: { balance: -Number(amount) } }
//         ).session(session);

//         await Bank.updateOne(
//             { userId: new mongoose.Types.ObjectId(to) },
//             { $inc: { balance: Number(amount) } }
//         ).session(session);


//         await session.commitTransaction();
//         session.endSession();
//         return res.status(200).json({
//             msg: 'transfer Successful'
//         })


//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         return res.status(500).json({ msg: error.message || "Internal Server Error" });
//     }
// })

module.exports = router;
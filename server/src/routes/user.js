const express = require('express')
const router = express.Router();
const {User} = require('../models/models')

// CREATE
router.post('/create', async (req, res) => {
    console.log('Create user:', req.body);
    try {
        const createdUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age
        });
        res.send(`all good, created user ${createdUser}`)
    } catch (err) {
        res.send(err)
    }
})

// READ ALL
router.get('/read', async (req, res) => {
    console.log('Read all users');
    let users = await User.findAll()
    res.send(users)
})

// READ BY ID
router.get('/read/:id', async (req, res) => {
    console.log('Read by pk:', req.params.id);
    let user = await User.findByPk(req.params.id)
    res.send(user)
});

// UPDATE
router.post('/update/:id', async (req, res) => {
    console.log('update by pk:', req.params.id);
    let user = await User.findByPk(req.params.id)

    let values = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    }

    await user.update(values)
    res.send(user)
});

// DELETE
router.get('/delete/:id', async (req, res) => {
    console.log('delete by pk:', req.params.id);
    let user = await User.findByPk(req.params.id)

    await user.destroy()
    res.send(`user with id ${req.params.id} deleted!`)
});

module.exports = router
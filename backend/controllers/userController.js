const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const User = require('../models/User');

exports.getUsers = async (req, res) => {

    try {
        const users = await User.find({ deleted: false });
        console.log("users", users)
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

exports.createUser = async (req, res) => {

    const user = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,

    })

    try {
        const newUser = await user.save();
        console.log('createuser', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};

exports.deleteUser = async (req, res) => {

    try {
        await User.findByIdAndUpdate(req.params.id, { deleted: true });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

exports.exportUser = async (req, res) => {

    try {

        const users = await User.find({ _id: { $in: req.body.userIds }, deleted: false });
        console.log('export', Users);

        const csvWriter = createCsvWriter({

            path: path.join(__dirname, '..', 'exports', 'users.csv'),
            header: [
                { id: '_id', title: 'ID' },
                { id: 'email', title: 'Email' },
                { id: 'firstName', title: 'First Name' },
                { id: 'lastName', title: 'Last Name' },
            ]

        });

        await csvWriter.writeRecords(users);
        res.download(path.join(__dirname, '..', 'exports', 'users.csv'));

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = `mySecretKeyIsMyDogsName`;

exports.create = async (req, res) => {
    try {
        const user = await db.user.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({ error: 'User is already exist!' });
        } else {
            res.status(500).json({ error: 'An error occurred while registering the user.' });
        }
    }
}

exports.auth = async (req, res) => {
    let { username, password } = req.body;
    const user = await db.user.findOne ({
        where: {
            username: username
        }
    });

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign({ username, role: user.role }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({
            message: 'Authentication success',
            token
        })
    } else {
        return res.status(401).json({
            message: 'Authentication Failed, wrong password'
        });
    }
}
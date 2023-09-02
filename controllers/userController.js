const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = `mySecretKeyIsMyDogsName`;

exports.create = async (req, res) => {
    try {
        const book = await db.user.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        if (error.errors && error.errors[0].message === `PRIMARY must be unique`) {
            res.status(500).json({ error: 'User is already exist!' });
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
        return res.status(400).json({
            message: 'Authentication Failed, wrong password'
        });
    }
}
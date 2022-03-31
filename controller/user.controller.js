const User = require("../models/index").User
const bcrypt = require('bcrypt')
const db = require("../config/db");
const { generateToken } = require("../middlewares/auth")

exports.getUser = async (req, res) => {
    User.findAll().then(users => {
        res.status(200).send({
            status: "sukses",
            data: users
        })
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            status: "fail",
            message: "gagal memuat users"
        })
    })
}

exports.postUser = async (req, res) => {
    const body = req.body;
    const firstName = body.firstName
    const lastName = body.lastName
    const email = body.email

    return User.create({
        firstName: firstName,
        lastName: lastName,
        email: email
    }).then(users => {
        res.status(200).send({
            status: "success",
            message: "User berhasil dibuat",
            data: users
        })
    })
}
exports.signIn = async (req, res) => {
    const body = req.body
    const email = body.email
    const password = body.password

    return User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (!user) {
            return res.status(400).send({
                message: "email not found"
            })
        }
        const isValid = bcrypt.compareSync(password, user.password)

        if (!isValid) {
            return res.status(400).send({
                message: "Email and password not match"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const token = generateToken({
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            email: user.email
        })
        res.status(200).send({
            status: "success",
            message: "Login sukses",
            token: token
        })
    })
}

exports.signUp = async (req, res) => {
    const body = req.body;

    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const password = body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(users => {
        if (users) {
            return res.status(400).send({
                message: 'Email already exist'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash
        }).then(users => {
            const token = generateToken({
                firstName: users.firstName,
                lastName: users.lastName,
                id: users.id,
                email: users.email
            })

            res.status(200).send({
                status: 'SUCCESS',
                message: 'User created',
                token: token
            })
        }).catch(error => {
            console.log("error", error)
            res.status(503).send({
                status: 'FAILED',
                message: 'user creation failed'
            })
        })
    })
}

exports.putUser = async (req, res) => {
    const body = req.body;
    const id = req.query.id;

    await db.query(`update Users set title='${body.title}', checked = ${body.checked} where id=${id}`)
        .then(result => {
            res.status(200).json({
                "status": "Success"
            })
        }).catch(error => {
            console.log("error put", error)
            res.status(500).json({
                message: 'INTERNAL SERVER ERROR'
            })
        })

}

exports.deleteUser = async (req, res) => {
    const id = req.query.id

    await db.query(`delete from Users where id = ${id}`)
        .then(result => {
            res.status(200).json({
                "status": "Success"
            })
        }).catch(error => {
            console.log("error del", error)
            res.status(500).json({
                message: 'INTERNAL SERVER ERROR'
            })
        })

}
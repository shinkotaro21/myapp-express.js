const fs = require('fs')
const db = require('../config/db');

exports.getTodo = async (req, res) => {
    await db.query('SELECT * FROM todo').then(result => {
        res.status(200).json({
            "status": "sukses"
        })
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        })
    })
}


exports.postTodo = async (req, res) => {
    const body = req.body;

    await db.query(`insert into todos (title,checked) values
        ('${body.title}', ${body.checked})`)
        .then(result => {
            res.status(200).json({
                "status": "sukses"
            })
        }).catch(e => {
            console.log(e);
            res.status(500).json({
                message: "Internal Server Error"
            })
        })
}


exports.updateTodo = async (req, res) => {
    const body = req.body;
    const id = req.query.id;

    await db.query(`update todos set title = '${body.title}',
        checked = ${body.checked} where id = ${id}`)
        .then(result => {
            res.status(200).json({
                "status": "sukses"
            })
        }).catch(e => {
            console.log(e)
            res.status(500).json({
                message: "Internal Server Error"
            })
        })
}

exports.deleteTodo = async (req, res) => {
    const id = req.query.id;

    await db.query(`delete from todos where id = ${id}`)
        .then(result => {
            res.status(200).json({
                "status": "sukses"
            })
        }).catch(e => {
            console.log(e);
            res.status(500).json({
                message: "Internal Server Error"
            })
        })
}
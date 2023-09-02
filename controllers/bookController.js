const db = require('../models');

exports.create = async (req, res) => {
        try {
            const book = await db.barang.create(req.body);
            res.json(book);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

exports.showAll = async () => {
    try {
        const result = await db.barang.findAll({
            order: [
                ['namaBuku', 'ASC'],
                ['kategoriBuku', 'ASC']
            ]
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.update = async (idBuku,
    namaBuku,
    kategoriBuku,
    deskripsiBuku) => {
        try {
            await db.barang.update({
                namaBuku: namaBuku,
                kategoriBuku: kategoriBuku,
                deskripsiBuku: deskripsiBuku
            }, {
                where: {
                idBuku: idBuku
                }
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
}

exports.delete = async (idBuku) => {
    try {
        await db.barang.destroy({
            where: {
              idBuku: idBuku
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
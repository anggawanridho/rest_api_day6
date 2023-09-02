const db = require('../models');

exports.create = async (req, res) => {
        try {
            const book = await db.buku.create(req.body);
            res.json({
                message: 'Book added!',
                book
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error occurred!' });
        }
}

exports.showAll = async (req, res) => { // Add 'res' parameter here
    try {
        const books = await db.buku.findAll({
            order: [
                ['namaBuku', 'ASC'],
                ['kategoriBuku', 'ASC']
            ]
        });
        if (books.length === 0) {
            res.status(404).json({
                message: 'No Book in database'
            });
        } else {
            res.status(200).json({
                message: 'Books retrieved!',
                books
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching books.' });
    }
}

exports.showById = async (req, res) => {
    const { idBuku } = req.params;
    try {
        const book = await db.buku.findByPk(idBuku);

        if (!book) {
            return res.status(404).json({ error: `Book ${idBuku} not found.` });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log(error);
    }
}

exports.update = async (req, res) => {
    const { idBuku } = req.params;
    const updateFields = req.body;

    try {
        const existingBook = await db.buku.findByPk(idBuku);

        if (!existingBook) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        // Update only the fields provided in the request body
        await existingBook.update(updateFields);

        res.status(200).json({ 
            message: 'Book updated successfully',
            existingBook
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the book.' });
    }
}

exports.delete = async (req, res) => {
    const idBuku = req.params.idBuku;
    try {
        // Fetch the book data before deleting it
        const deletedBook = await db.buku.findOne({
            where: {
                idBuku: idBuku
            }
        });

        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        // Delete the book
        await db.buku.destroy({
            where: {
                idBuku: idBuku
            }
        });

        // Include the deleted book data in the response
        res.status(200).json({ 
            message: 'Book deleted successfully',
            deletedBook // Convert the book to a JSON object
        });
    } catch (error) {
        console.log(error);
    }
}

exports.deleteAll = async () => {
    try {
        await db.buku.destroy({
            where: {},
            truncate: true
        });
    } catch (error) {
        console.log(error);
    }
}
const assert = require('assert');
const bookController = require('../../controllers/bookController');

describe('Book API testing', () => {
    before(async () => {
        // runs once before the first test in this block
        const req = {
            body: {
                idBuku: 'erika',
                namaBuku: 'Wir lieben die Demokratie ',
                kategoriBuku: 'Party Anthem ',
                deskripsiBuku: 'Auf der Heide blüht ein kleines Blümelein und das heißt, Erika. '
            }
        };

        const res = {
            status: (statusCode) => {
                assert.equal(statusCode, 200);
            },
            json: (data) => {
                assert.deepStrictEqual(data.message, 'Book added!');
            }
        }

        await bookController.create(req, res);
    });
    
    after(async () => {
        // runs once after the last test in this block
        await bookController.deleteAll();
    });
    
    it('should return a response with list of books', async () => {
        let result;
        const req = { 
            query: {}
        };
        const res = {
            status: (statusCode) => {
                assert.strictEqual(statusCode, 200);
                return {
                    json: (data) => {
                        result = data;
                        assert.deepStrictEqual(data.message, 'Books retrieved!');
                    },
                };
            }
        };

        await bookController.showAll(req, res);
    });

    
    it('should remove a book', async () => {
        const req = { params: { idBuku: 'erika' } };
        
        const res = {
            status: (statusCode) => {
                assert.strictEqual(statusCode, 200);
                return {
                    json: (data) => {
                        result = data;
                        assert.deepStrictEqual(data.message, 'Book deleted successfully');
                    },
                };
            }
        };
        await bookController.delete(req, res);
    });
    
    it('should return a response with empty list of books', async () => {
        const req = { 
            query: {}
        };

        const res = {
            status: (status) => {
                assert.equal(status, 404)
                return {
                    json: (data) => {
                        assert.deepStrictEqual(data.message, 'No Book in database');
                    },
                };
            }
        };

        await bookController.showAll(req, res);
    });
    
    // describe('List of Books', () => {


        
    // });

    describe('Adding a book', () => {
        it('should add a book', async () => {
            const req = {
                body: {
                    idBuku: 'führer',
                    namaBuku: 'Mein Kampf',
                    kategoriBuku: 'Auto Biography',
                    deskripsiBuku: 'Das Buch Mein Kampf von Adolf Hitler beschreibt seinen Werdegang sowie die Ziele der nationalsozialistischen Bewegung.'
                }
            };
            const res = {
                status: (statusCode) => {
                    assert.equal(statusCode, 200);
                },
                json: (data) => {
                    assert.deepStrictEqual(data.message, 'Book added!');
                    assert.deepStrictEqual(data.book.idBuku, 'führer');
                    assert.deepStrictEqual(data.book.namaBuku, 'Mein Kampf');
                    assert.deepStrictEqual(data.book.kategoriBuku, 'Auto Biography');
                    assert.deepStrictEqual(data.book.deskripsiBuku, 'Das Buch Mein Kampf von Adolf Hitler beschreibt seinen Werdegang sowie die Ziele der nationalsozialistischen Bewegung.');
                }
            };

            await bookController.create(req, res);
        });
    });

    describe('Updating a book', () => {
        it('should update a book', async () => {
        const req = { 
            params: {
                idBuku: 'führer'
            },
            body: {
                namaBuku: 'Wir lieben die Demokratie',
                kategoriBuku: 'Party Anthem',
                deskripsiBuku: 'Auf der Heide blüht ein kleines Blümelein und das heißt, Erika.'
            }
        };

        const res = {
            status: (statusCode) => {
                assert.equal(statusCode, 200);
            },
            json: (data) => {
                assert.deepStrictEqual(data.message, 'Book updated successfully');
                assert.deepStrictEqual(data.existingBook.idBuku, 'führer');
                assert.deepStrictEqual(data.existingBook.namaBuku, 'Wir lieben die Demokratie');
                assert.deepStrictEqual(data.existingBook.kategoriBuku, 'Party Anthem');
                assert.deepStrictEqual(data.existingBook.deskripsiBuku, 'Auf der Heide blüht ein kleines Blümelein und das heißt, Erika.');
            }
        };

        await bookController.update(req, res);
        });
    });
});

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
            }
        }

        await bookController.create(req, res);
    });
    
    after(async () => {
        // runs once after the last test in this block
        // await bookController.deleteAll();
    });
    
    describe('List of Books', () => {

        it('should return a response with list of books', async () => {
            const req = { 
                query: {}
            };

            const res = {
                status: (status) => {
                    return {
                        json: (data) => {
                            assert.deepStrictEqual(data.message, 'Books retrieved!');
                        }
                    };
                }
            };

            await bookController.showAll(req, res);
        });

        it('shouldnt return a response with list of books', async () => {
            const req = { query: { status: 'error' } };

            const res = {
                status: (status) => {
                    return {
                        json: (data) => {
                            assert.deepStrictEqual(data.message, 'Error occurred!');
                        }
                    };
                }
            };

            await bookController.showAll(req, res);
        });
    });

    // describe('Adding a book', () => {
    //     it('should add a book', async () => {
    //         const req = {
    //             body: {
    //                 // Provide the necessary book data here
    //                 idBuku: 'führer',
    //                 namaBuku: 'Mein Kampf',
    //                 kategoriBuku: 'Auto Biography',
    //                 deskripsiBuku: 'Das Buch Mein Kampf von Adolf Hitler beschreibt seinen Werdegang sowie die Ziele der nationalsozialistischen Bewegung.'
    //             }
    //         };
    //         const res = {
    //             status: (statusCode) => {
    //                 assert.equal(statusCode, 200); // Check if status is 200
    //                 return res;
    //             },
    //             json: (data) => {
    //                 // Check if the response contains the book data
    //                 assert.isObject(data);
    //                 assert.equal(data.idBuku, 'führer');
    //                 assert.equal(data.namaBuku, 'Mein Kampf');
    //                 assert.equal(data.kategoriBuku, 'Auto Biography');
    //                 assert.equal(data.deskripsiBuku, 'Das Buch Mein Kampf von Adolf Hitler beschreibt seinen Werdegang sowie die Ziele der nationalsozialistischen Bewegung.');
    //             }
    //         };

    //         await bookController.create(req, res);
    //     });
    // });

    // describe('Updating a book', () => {
    //     it('should update a book', async () => {
    //     const req = { params: { id: 1 }, body: { title: 'The Lord of the Rings', author: 'J. R. R. Tolkien' } };

    //     const res = {
    //         status: (status) => {
    //         return {
    //             json: (data) => {
    //             assert.deepStrictEqual(data.message, 'Book updated!');
    //             }
    //         };
    //         }
    //     };

    //     await bookController.update(req, res);
    //     });
    // });

    // describe('Removing a book', () => {
    //     it('should remove a book', async () => {
    //     const req = { params: { id: 1 } };

    //     const res = {
    //         status: (status) => {
    //         return {
    //             json: (data) => {
    //             assert.deepStrictEqual(data.message, 'Book deleted!');
    //             }
    //         };
    //         }
    //     };

    //     await bookController.delete(req, res);
    //     });
    // });
});

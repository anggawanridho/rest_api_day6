module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('book',
    {
        idBuku: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        namaBuku: { type: DataTypes.STRING, allowNull: false },
        kategoriBuku: { type: DataTypes.STRING, defaultValue: 'Belum diisi' },
        deskripsiBuku: { type: DataTypes.TEXT, defaultValue: 'Deskripsi default' }
    },
    {
        timestamps: false
    });
    return Book;
}
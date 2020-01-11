module.exports = function (sequelize, DataTypes) {
    var Expenses = sequelize.define("Expenses", {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expenseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(13, 2),
            allowNull: false,
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Expenses;
};

//create association - belong to a user - foreign key will be user Id 

//belongs to a budget
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const csv = require('csv-parser');


const sequelize = new Sequelize('mysql://username:password@localhost:3306/database_name');


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });


const ProductCategory = sequelize.define('ProductCategory', {
    productCategoryName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


const Supplier = sequelize.define('Supplier', {
    supplierName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    supplierMail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    supplierContact: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


const Product = sequelize.define('Product', {
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productImage: {
        type: DataTypes.STRING
    },
    modelNumber: {
        type: DataTypes.STRING
    },
    serialNumber: {
        type: DataTypes.STRING
    }
});


Product.belongsTo(ProductCategory);
Product.belongsToMany(Supplier, { through: 'ProductSuppliers' });

const Inventory = sequelize.define('Inventory', {
    stockLevel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reorderPoint: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Inventory.belongsTo(Product);

const Order = sequelize.define('Order', {
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    orderStatus: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


const OrderDetails = sequelize.define('OrderDetails', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

OrderDetails.belongsTo(Order);
OrderDetails.belongsTo(Product);


sequelize.sync({ force: true })  
    .then(() => {
        console.log("Database synced!");
    })
    .catch((err) => {
        console.error("Error syncing the database:", err);
    });


const insertCsvData = () => {
    const data = [];

    
    fs.createReadStream('Inventory_DataSet.xlsx')
        .pipe(csv())
        .on('data', (row) => {
            data.push(row);
        })
        .on('end', async () => {
            console.log('CSV file successfully processed.');

            
            for (const row of data) {
                try {
                    
                    const category = await ProductCategory.findOrCreate({
                        where: { productCategoryName: row.productCategoryName }
                    });

                    
                    const supplier = await Supplier.findOrCreate({
                        where: { supplierName: row.supplierName },
                        defaults: {
                            supplierMail: row.supplierMail,
                            supplierContact: row.supplierContact
                        }
                    });

                    
                    const product = await Product.create({
                        productName: row.productName,
                        productImage: row.productImage,
                        modelNumber: row.modelNumber,
                        serialNumber: row.serialNumber,
                        productCategoryId: category[0].id
                    });

                    
                    await Inventory.create({
                        productId: product.id,
                        stockLevel: row.stockLevel,
                        reorderPoint: row.reorderPoint
                    });

                
                    const order = await Order.create({
                        orderDate: new Date(row.orderDate),
                        orderStatus: row.orderStatus
                    });

                    
                    await OrderDetails.create({
                        orderId: order.id,
                        productId: product.id,
                        quantity: row.quantity
                    });

                    
                    await product.addSupplier(supplier[0]);

                    console.log(`Data inserted for product: ${row.productName}`);
                } catch (err) {
                    console.error('Error inserting data:', err);
                }
            }
        });
};


insertCsvData();

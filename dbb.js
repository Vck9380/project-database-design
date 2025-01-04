const insertCsvData = () => {
    const data = [];

    fs.createReadStream('your_data_file.csv')
        .pipe(csv())
        .on('data', (row) => {
            data.push(row);
        })
        .on('end', async () => {
            console.log('CSV file successfully processed.');

            for (const row of data) {
                try {
                    // Ensure that the product category exists or create it
                    const [category] = await ProductCategory.findOrCreate({
                        where: { productCategoryName: row.productCategoryName }
                    });

                    // Ensure the supplier exists or create it
                    const [supplier] = await Supplier.findOrCreate({
                        where: { supplierName: row.supplierName },
                        defaults: {
                            supplierMail: row.supplierMail,
                            supplierContact: row.supplierContact
                        }
                    });

                    // Check if product already exists by its modelNumber or serialNumber
                    let product = await Product.findOne({
                        where: { modelNumber: row.modelNumber, serialNumber: row.serialNumber }
                    });

                    if (!product) {
                        // If not found, create a new product
                        product = await Product.create({
                            productName: row.productName,
                            productImage: row.productImage,
                            modelNumber: row.modelNumber,
                            serialNumber: row.serialNumber,
                            productCategoryId: category.id
                        });
                    }

                    // Create Inventory record
                    await Inventory.create({
                        productId: product.id,
                        stockLevel: parseInt(row.stockLevel, 10), // Ensure stockLevel is an integer
                        reorderPoint: parseInt(row.reorderPoint, 10) // Ensure reorderPoint is an integer
                    });

                    // Create Order record
                    const order = await Order.create({
                        orderDate: new Date(row.orderDate), // Ensure the date is valid
                        orderStatus: row.orderStatus
                    });

                    // Create OrderDetails record
                    await OrderDetails.create({
                        orderId: order.id,
                        productId: product.id,
                        quantity: parseInt(row.quantity, 10) // Ensure quantity is an integer
                    });

                    // Add supplier to product
                    await product.addSupplier(supplier);

                    console.log(`Data inserted for product: ${row.productName}`);
                } catch (err) {
                    console.error('Error inserting data:', err);
                }
            }
        });
};

insertCsvData();

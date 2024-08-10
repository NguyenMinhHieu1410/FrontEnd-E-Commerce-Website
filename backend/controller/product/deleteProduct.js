const productModel = require('../../models/productModel');

async function deleteProductController(req, res) {
    try {
        const { _id } = req.body;

        // Find the product by its ID and delete it
        const deletedProduct = await productModel.findByIdAndDelete(_id);
        
        if (!deletedProduct) {
            throw new Error("Product not found");
        }

        res.json({
            message: "Product deleted successfully",
            data: deletedProduct,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deleteProductController;

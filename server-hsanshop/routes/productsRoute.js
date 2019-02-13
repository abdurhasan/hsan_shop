const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

router.get('/', productController.getData);
router.get('/pages', productController.getPages);
router.post('/', productController.create);
router.get('/all', productController.getAll);
router.get('/:id', productController.getById);

router.post('/:file', productController.uploadFile);


// router.get('/search',phonebookController.search);

// router.put('/:id', phonebookController.updateById);
// router.delete('/:id', phonebookController.deleteById);


module.exports = router;
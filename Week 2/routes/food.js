const express = require('express');
const FoodController = require('../controllers/foodController');
const router = express().router

router.get('/', FoodController.getAllFood);

router.get('/food/{idFood}', FoodController.getFoodById);
router.post('/', FoodController.createFood);
router.put('/', FoodController.updateFood);
router.delete('/', FoodController.deleteFood);



module.exports = router
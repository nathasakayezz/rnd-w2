const { Food } = require('../models'); 

class FoodController {
    static async createFood(req, res, next) {
        try {
            const { name, description, price, categoryId } = req.body;

            // if (!name || !description || price === undefined || categoryId === undefined) {
            //     return res.status(400).json({ message: 'Name, description, price, and categoryId are required' });
            // }

            const newFood = await Food.create({
                name,
                description,
                price,
                categoryId
            });
            res.status(201).json({ message: 'Food created successfully', food: newFood });
        } catch (error) {
            console.error(error);
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAllFood(req, res, next) {
        try {
            const foods = await Food.findAll({
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json({ status: 'success', data: foods });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getFoodById(req, res, next) {
        try {
            const id = req.params.idFood;
            const food = await Food.findByPk(id, {
            });

            if (!food) {
                return res.status(404).json({ message: 'Food not found' });
            }
            res.status(200).json({ food });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateFood(req, res, next) {
        try {
            const id = req.params.id;
            const { name, description, price, categoryId } = req.body;

            const food = await Food.findByPk(id);
            if (!food) {
                return res.status(404).json({ message: 'Food not found' });
            }

            await food.update({
                name: name,
                description: description, 
                price: price,
                categoryId: categoryId 
            });

            res.status(200).json({ message: 'Food updated successfully', food });
        } catch (error) {
            console.error(error);
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteFood(req, res, next) {
        try {
            const { id } = req.params;
            const food = await Food.findByPk(id);

            if (!food) {
                return res.status(404).json({ message: 'Food not found' });
            }

            await food.destroy();
            res.status(200).json({ message: 'Food deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = FoodController; //Wajib ada untuk route
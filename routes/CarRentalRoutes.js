const express = require('express');
const router = express.Router();
const RentalController = require('../controllers/CarRentalControllers');

router.post('/book-car', RentalController.bookCar);
router.get('/rental-details', RentalController.viewRentalDetails);
router.get('/all-rentals', RentalController.viewAllRentals);
router.delete('/cancel-rental', RentalController.cancelRental);
router.put('/modify-rental', RentalController.modifyRentalDuration);

module.exports = router;

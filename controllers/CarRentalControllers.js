
const { user, password } = require('../config');
const con = require('../database');
const RentalModel = require('../model/CarRentalModel');
const RentalController = {
  bookCar: (req, res) => {
    const { name, email, carModel, startDate, endDate } = req.body;
  
    RentalModel.checkAvailability(carModel, (err, cars) => {
      if (err) return res.status(500).send(err);
  //testing
      if (cars.length === 0) {
        return res.status(400).json({ message: 'No cars available for the selected model.' });
      }
  
      const car = cars[0];
  
      RentalModel.bookCar(name, email, car.id, startDate, endDate, (err, result) => {
        if (err) return res.status(500).send(err);
  
        const rentalId = result.insertId; 
  
        RentalModel.updateCarAvailability(car.id, 0, (err) => {
          if (err) return res.status(500).send(err);
  
          res.json({
            status: true,
            message: 'Car rental booked successfully!',
            rentalDetails: {
              rentalId, 
              name,
              email,
              carModel,
              startDate,
              endDate,
            },
          });
        });
      });
    });
  },

  viewRentalDetails: (req, res) => {
    const { email } = req.query;
    RentalModel.getRentalDetails(email, (err, rentals) => {
      if (err) return res.status(500).send(err);

      if (rentals.length === 0) {
        return res.status(404).json({status: false, message: 'No rentals found for the provided email.' });
      }

      res.json(rentals);
    });
  },

  viewAllRentals: (req, res) => {
    RentalModel.getAllRentals((err, rentals) => {
      if (err) return res.status(500).send(err);

      res.json(rentals);
    });
  },

  cancelRental: (req, res) => {
    const { email, rentalId } = req.body;
    RentalModel.getRentalById(rentalId, email, (err, rentals) => {
      if (err) return res.status(500).send(err);

      if (rentals.length === 0) {
        return res.status(404).json({status: false, message: 'Rental not found.' });
      }

      const rental = rentals[0];
      RentalModel.deleteRental(rentalId, err => {
        if (err) return res.status(500).send(err);

        RentalModel.updateCarAvailability(rental.car_id, 1, err => {
          if (err) return res.status(500).send(err);

          res.json({status: true, message: 'Car rental canceled successfully.' });
        });
      });
    });
  },

  modifyRentalDuration: (req, res) => {
    const { email, rentalId, startDate, endDate } = req.body;
    RentalModel.updateRentalDuration(rentalId, email, startDate, endDate, (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({status: false, message: 'Rental not found or update failed.' });
      }

      res.json({status: true, message: 'Rental duration updated successfully.' });
    });
  },
};

module.exports = RentalController;
const con = require('../database'); 


const RentalModel = {
  checkAvailability: (carModel, callback) => {
    const query = 'SELECT * FROM cars WHERE model = ? AND available = 1 LIMIT 1';
    con.query(query, [carModel], callback);
  },

  bookCar: (name, email, carId, startDate, endDate, callback) => {
    const query =
      'INSERT INTO rentals (name, email, car_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)';
    con.query(query, [name, email, carId, startDate, endDate], callback);
  },

  updateCarAvailability: (carId, available, callback) => {
    const query = 'UPDATE cars SET available = ? WHERE id = ?';
    con.query(query, [available, carId], callback);
  },

  getRentalDetails: (email, callback) => {
    const query =
      'SELECT rentals.*, cars.model FROM rentals JOIN cars ON rentals.car_id = cars.id WHERE rentals.email = ?';
    con.query(query, [email], callback);
  },

  getAllRentals: (callback) => {
    const query =
      'SELECT rentals.*, cars.model FROM rentals JOIN cars ON rentals.car_id = cars.id';
    con.query(query, callback);
  },

  deleteRental: (rentalId, callback) => {
    const query = 'DELETE FROM rentals WHERE id = ?';
    con.query(query, [rentalId], callback);
  },

  updateRentalDuration: (rentalId, email, startDate, endDate, callback) => {
    const query =
      'UPDATE rentals SET start_date = ?, end_date = ? WHERE id = ? AND email = ?';
    con.query(query, [startDate, endDate, rentalId, email], callback);
  },

  getRentalById: (rentalId, email, callback) => {
    const query = 'SELECT * FROM rentals WHERE id = ? AND email = ?';
    con.query(query, [rentalId, email], callback);
  },
};

module.exports = RentalModel;

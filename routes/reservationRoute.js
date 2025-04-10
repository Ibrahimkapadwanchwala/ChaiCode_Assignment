const express = require("express");
const retaurantModel=require('../models/restaurant.model')
const reservationRouter = express.Router();
const {
  handleBookRestaurant,
  handleDeleteReservations,
  handleGetRestaurants
} = require("../controllers/reservation.controller");
const restaurantModel = require("../models/restaurant.model");

reservationRouter.get("/bookrestaurant/:id", (req, res) => {
  let id = req.params.id;
  res.render("bookRestaurant", { restaurantId: id });
});
reservationRouter.get('/restaurants',handleGetRestaurants)

reservationRouter.post('/reservations/:id',handleDeleteReservations)
reservationRouter.post("/bookrestaurant/:id", handleBookRestaurant);


reservationRouter.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const restaurants = await restaurantModel.find({
      name: { $regex: query, $options: 'i' } 
    });

    res.render('restaurants', { restaurants, query ,reservationSucessfull:false});
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).send('Something went wrong while searching.');
  }
});

module.exports = reservationRouter;

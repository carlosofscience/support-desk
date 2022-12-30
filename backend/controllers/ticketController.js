const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const Ticket = require("../models/ticketModel");


// @desc    Get user Tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler( async (req, res) => {
  // const user = { id: req.user._id, name: req.user.name, emai: req.user.email} 
  res.status(200).json({message:'getTickets'})
})

// @desc    Create new Tickets
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler( async (req, res) => {
  // const user = { id: req.user._id, name: req.user.name, emai: req.user.email} 
  res.status(200).json({ message: "createTicket" });
})


module.exports = {
  getTickets,
  createTicket,
};

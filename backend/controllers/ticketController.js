const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const Ticket = require("../models/ticketModel");


// @desc    Get user Tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler( async (req, res) => {
  //Get user using the id in the jwt
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(104)
    throw new Error('User no found')
  }

  const tickets = await Ticket.find({user: req.user.id})

  res.status(200).json(tickets);
})

// @desc    Get user Ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler( async (req, res) => {
  //Get user using the id in the jwt
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(104)
    throw new Error('User no found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket) {
    res.status(400)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(ticket);
})

// @desc    Create new Tickets
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler( async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please and a product and description");
  }

  //Get user using the id in the jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(104);
    throw new Error("User no found");
  }

  const ticket = await Ticket.create({
    product, description, user: req.user.id, status:'new'
  })

  res.status(200).json(ticket);
})

// @desc    Delete Ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler( async (req, res) => {
  //Get user using the id in the jwt
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(104)
    throw new Error('User no found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket) {
    res.status(400)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
  }

  //DELETE ticket
  await ticket.remove()
  res.status(200).json({success:true});
})

// @desc    Update Ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler( async (req, res) => {
  //Get user using the id in the jwt
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(104)
    throw new Error('User no found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket) {
    res.status(400)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
  }

  //UPDATE ticket

  const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updateTicket);
})


module.exports = {
  getTicket,
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
};

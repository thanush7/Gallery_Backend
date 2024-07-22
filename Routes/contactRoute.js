import express from 'express'
import { addContact, listcontact, removeMsg } from '../Controller/contactController.js'

const contactRoute=express.Router();

contactRoute.post("/contact",addContact);
contactRoute.get('/listcontact',listcontact);
contactRoute.post('/deletemsg',removeMsg);

export default contactRoute;
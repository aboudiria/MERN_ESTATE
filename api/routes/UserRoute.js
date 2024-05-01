const express = require('express');
const router = express.Router();
const { deleteUser, test, updateUser, getUserListings, getUser } = require('../controllers/UserControllers.js');
const { verifyToken } = require('../utils/verifyUser.js');

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);

module.exports = router;

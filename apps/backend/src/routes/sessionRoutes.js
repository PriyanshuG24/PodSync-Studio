const express=require('express')
const router=express.Router()
const verifyToken = require('../middlewares/verifyAccessToken');
const { createSession } = require('../controllers/sessionControllers');
const { updateSessionTitle } = require('../controllers/sessionControllers');
const { joinAsGuest } = require('../controllers/sessionControllers');
router.post('/create',verifyToken,createSession)
router.patch('/:sessionId/title', verifyToken, updateSessionTitle);
router.post('/:sessionId/join-as-guest', joinAsGuest);
module.exports=router

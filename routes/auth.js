const router = require('express').Router()
const {verifyToken, checkIsValidUser, requireRoles} = require('../middlewares/validate')

router.post('/', verifyToken, checkIsValidUser, (req,res)=>{
    return res.status(200).json({
        status:'success',
        data:`Logged in user has a role of ${req.user.role} in this organization`
    })
})

router.post('/only-owner',verifyToken,checkIsValidUser, requireRoles('owner'),(req,res)=>{
    res.status(200).json({
        status:'success',
        message:'logged in user is owner and hance is granted access'
    })
})

router.post('/only-user',verifyToken,checkIsValidUser, requireRoles('user'),(req,res)=>{
    res.status(200).json({
        status:'success',
        message:'logged in user is user and hance is granted access'
    })
})

module.exports = router
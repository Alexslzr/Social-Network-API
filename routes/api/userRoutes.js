const router = require('express').Router()
const {
    getAllUsers,
    getUserbyId,
    postNewUser,
    updateUser,
    deleteUser,
    addFriends,
    deleteFriends
 } = require('../../controllers/userControllers')

 router.route('/').get(getAllUsers).post(postNewUser)

 router.route('/:userId').get(getUserbyId).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriends).delete(deleteFriends)

module.exports = router
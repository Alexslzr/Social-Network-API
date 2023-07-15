const router = require('express').Router()
const {
    getThoughts,
    getThoughtsbyId,
    postThoughts,
    updateThoughts,
    deleteThoughts,
    postReaction,
    deleteReaction
} = require('../../controllers/thoughtsController')

router.route('/').get(getThoughts).post(postThoughts)

router.route('/:thoughtId')
    .get(getThoughtsbyId)
    .put(updateThoughts)
    .delete(deleteThoughts);

router.route('/:thoughtId/reactions').post(postReaction).delete(deleteReaction)

module.exports = router
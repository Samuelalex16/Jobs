const express = require('express')
const router = express.Router()

const {
    getAllJobs,
    getJobs,
    createJobs,
    updateJobs,
    deleteJobs
} = require('../controllers/jobs')

router.route('/').post(createJobs).get(getAllJobs)
router.route('/:id').patch(updateJobs).get(getJobs).delete(deleteJobs)

module.exports = router
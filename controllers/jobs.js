const Jobs = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const getAllJobs = async(req, res) => {
    const job = await Jobs.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ job, count: job.length })
}

const getJobs = async(req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req

    const job = await Jobs.findOne({
        _id: jobId,
        createdBy: userId
    })

    if (!job) {
        throw new NotFoundError(`No job id with ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJobs = async(req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJobs = async(req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId }
    } = req
    if (company === '' || position === '') {
        throw new BadRequestError("Company or position cannot be empty")
    }
    const job = await Jobs.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })
    if (!job) {
        throw new NotFoundError(`No job id with ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJobs = async(req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId }
    } = req
    const job = await Jobs.findByIdAndRemove({
        _id: jobId,
        createdBy: userId
    })
    if (!job) {
        throw new NotFoundError(`No job id with ${jobId}`)
    }

    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    getJobs,
    createJobs,
    updateJobs,
    deleteJobs
}
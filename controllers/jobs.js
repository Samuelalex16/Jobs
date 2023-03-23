const getAllJobs = async(req, res) => {
    res.send("All Jobs")
}

const getJobs = async(req, res) => {
    res.send("Get jobs")
}

const createJobs = async(req, res) => {
    res.send("Create Jobs")
}

const updateJobs = async(req, res) => {
    res.send("Update jobs")
}

const deleteJobs = async(req, res) => {
    res.send("Delete Jobs")
}
module.exports = {
    getAllJobs,
    getJobs,
    createJobs,
    updateJobs,
    deleteJobs
}
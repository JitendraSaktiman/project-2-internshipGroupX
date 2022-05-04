const InterModel = require('../models/internModels')
const CollegeModel = require('../models/collegeModel')
const validator = require('../validators/validator');
const internModels = require('../models/internModels');

const createIntern = async function (req, res) {
    try {

        let data = req.body

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: 'bad request, no data provided' })
        };
        const { name, email, mobile, collegeId } = data;

        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: 'Intern name is required' })
        };
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, msg: "Email is required " })
        }
        let duplicatEmail = await InterModel.findOne({ email: data.email })
        if (duplicatEmail) {
            return res.status(400).send({ status: false, msg: 'Email is already exist' })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email))) {
            return res.status(400).send({ status: false, message: ' email should be a valid' })
        }
        if (!validator.isValid(mobile)) {
            return res.status(400).send({ status: false, msg: 'Mobile number is required' })
        }
        let duplicateMobile = await InterModel.findOne({ mobile: data.mobile })
        if (duplicateMobile) {
            return res.status(400).send({ status: false, msg: 'Mobile number already exist' })
        }
        if (mobile.length != 10) {
            return res.status(400).send({ status: false, msg: " mobile number should be valid" })
        }
        if (!validator.isValid(collegeId)) {
            return res.status(400).send({ status: false, msg: 'CollegeId is required' })
        }
        if (collegeId.length != 24) {
            return res.status(400).send({ status: false, msg: " collegeId should be valid" })
        }

        let savedData = await InterModel.create(data)
        res.status(201).send({ status: true, msg: 'Intern successfully enroled', deta: savedData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

module.exports.createIntern = createIntern
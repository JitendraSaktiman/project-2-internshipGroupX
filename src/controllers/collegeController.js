const collegeModel = require('../models/collegeModel');
const CollegeModel = require('../models/collegeModel');
const InternModel = require('../models/internModels');
const validator = require('../validators/validator');

// const createCollege = async function(req, res){

//     try{
//     let data = req.body;

//     let savedData = await CollegeModel.create(data)
//     }
//     catch(err){
//             res.status(500).send({status:false,msg:err.message})
//     }
// }

const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "Bad request,No data provided" })
        };

        const { name, fullName, logoLink } = data

        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: "College name is required" })
        };

        let duplicate = await collegeModel.findOne({ name: data.name })
        if (duplicate) {
            return res.status(400).send({ status: false, msg: "name already exist" })
        };

        if (!validator.isValid(fullName)) {
            return res.status(400).send({ status: false, msg: "fullName of College is required " })
        };

        if (!validator.isValid(logoLink)) {
            return res.status(400).send({ status: false, msg: " logoLink is required" })
        };

        let savedData = await CollegeModel.create(data)
        return res.status(201).send({status: true, deta: savedData})}

        catch(error){
            return res.status(500).send({msg:"error.message"})
        }};

module.exports.createCollege = createCollege;
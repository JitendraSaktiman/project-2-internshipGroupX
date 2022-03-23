const collegeModel = require("../models/collegeModel")
const internModels = require("../models/internModels")



const isValid = function (value) {
  if (typeof value == undefined || value == null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true
}

// create college controller..................................

const createCollege = async function (req, res) {

  try {
    const data = req.body;

    if (Object.keys(data).length > 0) {

      if (!isValid(data.name)) { return res.status(400).send({ status: false, msg: "Name is required" }) }
      if (!isValid(data.fullName)) { return res.status(400).send({ status: false, msg: "Full Name is required" }) }
      if (!isValid(data.logoLink)) { return res.status(400).send({ status: false, msg: " LogoLink is required" }) }


      let checkNameCollege = await collegeModel.findOne({ name: data.name })
      if (checkNameCollege) { return res.status(400).send({ msg: "Name Already exist" }) }

      const collegeFullName= await collegeModel.findOne({fullName: {"$regex": data.fullName, "$options": "i"   }})
       if(collegeFullName){
       return res.status(400).send({status:false, message:"college already exist"})
      }

      if ((/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(data.logoLink))) {

        const savedData = await collegeModel.create(data)
        let resultCollegeEntry = {
          name: savedData.name,
          fullName: savedData.fullName,
          logoLink: savedData.logoLink,
          isDeleted: savedData.isDeleted

        }

        return res.status(201).send({ status: "college Created", date: resultCollegeEntry })

      } else { return res.status(400).send({ msg: "Please enter a valid URL" }) }

    } else { return res.status(400).send({ msg: "Please enter some data" }) }

  } catch (err) {
    return res.status(500).send({ ERROR: err.message })
  }
}


// get college detalis controller

const collegeDetails = async function (req, res) {
  try {
    let collegeName = req.query.collegeName
    if (!collegeName) { return res.status(400).send({ status: false, ERROR: "Please provide collegeName in query" }) }
    let resCollege = await collegeModel.findOne({ name: collegeName })
    if (!resCollege) { return res.status(404).send({ status: false, Error: "No college found" }) }

    if (resCollege.isDeleted === false) {

      let presentInterns = await internModels.find({ collegeId: resCollege._id, isDeleted: false })


      let result = { name: resCollege.name, fullName: resCollege.fullName, logoLink: resCollege.logoLink }

      if (presentInterns.length > 0) {
        result["Interest"] = presentInterns

        return res.status(200).send({ data: result })
      }

      if (presentInterns.length == 0) {
        result["Interest"] = "no interns for now";
        return res.status(200).send({ data: result })
      }

    }
    else {
      return res.status(400).send({ status: false, resCollege, ERROR: "This college is not recruiting interns" })
    }

  }
  catch (err) {
    return res.status(500).send({ ERROR: err.message })
  }

}



module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails
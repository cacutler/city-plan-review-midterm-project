const express = require("express")
const model = require("./model")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.static("../public"))
app.get("/city_standards", function (request, response) {
    model.Standards.find().then((standards) => {
        response.json(standards)
    })
})
app.get("/city_standards/:city_standardsID", function (request, response) {
    console.log("retrieve standards with id:", request.params.city_standardsID)
    model.Standards.findOne({_id:request.params.city_standardsID}).then((city_standards) => {
        if (city_standards) {
            response.json(city_standards)
        } else {
            response.sendStatus(404)
        }
    }).catch((error) => {
        console.error("Failed to query city standards with ID:", request.params.city_standardsID)
        response.sendStatus(404)
    })
})
app.put("/city_standards/:city_standardsID", function (request, response) {
    console.log("Update city standards with id:", request.params.city_standardsID)
    console.log("Request body:", request.body)
    model.Standards.findOneAndUpdate({_id: request.params.city_standardsID}, {
        min_development_size: parseInt(request.body.minDevelopmentSize),
        max_development_size: parseInt(request.body.maxDevelopmentSize),
        min_waterline_size: parseInt(request.body.minWaterlineSize),
        max_waterline_size: parseInt(request.body.maxWaterlineSize),
        min_sewer_size: parseInt(request.body.minSewerSize),
        max_sewer_size: parseInt(request.body.maxSewerSize),
        min_storm_drain_size: parseInt(request.body.minStormDrainSize),
        max_storm_drain_size: parseInt(request.body.maxStormDrainSize),
        min_roadway_width: parseInt(request.body.minRoadwayWidth),
        max_roadway_width: parseInt(request.body.maxRoadwayWidth),
        min_asphalt_width: parseInt(request.body.minAsphaltWidth),
        max_asphalt_width: parseInt(request.body.maxAsphaltWidth),
        min_sidewalk_width: parseInt(request.body.minSidewalkWidth),
        max_sidewalk_width: parseInt(request.body.maxSidewalkWidth),
        min_asphalt_thickness: parseInt(request.body.minAsphaltThickness),
        max_asphalt_thickness: parseInt(request.body.maxAsphaltThickness),
        min_roadbase_thickness: parseInt(request.body.minRoadbaseThickness),
        max_roadbase_thickness: parseInt(request.body.maxRoadbaseThickness)
    }).then(() => {
        response.status(200).send("Updated city standards.")
    }).catch((error) => {
        var errorMessages = {}
        if (error.errors) {//mongoose validation failed!
            for (var fieldName in error.errors) {
                errorMessages[fieldName] = error.errors[fieldName].errorMessages
            }
            response.status(422).send(error.errors)
        } else {
            response.status(500).send("Unknown error updating city standards.")
        }
    })
})
app.get("/developer_plans", function (request, response) {
    model.Plan.find().then((plans) => {
        response.json(plans)
    })
})
app.get("/developer_plans/:developer_planID", function (request, response) {
    console.log("retrieve plan with id:", request.params.developer_planID)
    model.Plan.findOne({_id:request.params.developer_planID}).then((developer_plan) => {
        if (developer_plan) {
            response.json(developer_plan)
        } else {
            response.sendStatus(404)
        }
    }).catch((error) => {
        console.error("Failed to query developer plan with ID:", request.params.developer_planID)
        response.sendStatus(404)
    })
})
app.post("/developer_plans", function (request, response) {
    console.log("request body:", request.body)
    var newPlan = new model.Plan({
        applicant_name: request.body.applicantName,
        applicant_phone_number: request.body.applicantPhone,
        applicant_email: request.body.applicantEmail,
        developer_name: request.body.developerName,
        developer_phone_number: request.body.developerPhone,
        developer_email: request.body.developerEmail,
        developer_address: request.body.developerAddress,
        applicant_address: request.body.applicantAddress,
        project_name: request.body.projectName,
        project_address: request.body.projectAddress,
        project_type: request.body.projectType,
        current_zoning: request.body.currentZoning,
        development_size: parseInt(request.body.developmentSize),
        waterline_size: parseInt(request.body.waterlineSize),
        sewer_size: parseInt(request.body.sewerSize),
        storm_drain_size: parseInt(request.body.stormDrainSize),
        power_company: request.body.powerCompany,
        internet_company: request.body.internetCompany,
        roadway_width: parseInt(request.body.roadwayWidth),
        asphalt_width: parseInt(request.body.asphaltWidth),
        sidewalk_width: parseInt(request.body.sidewalkWidth),
        asphalt_thickness: parseInt(request.body.asphaltThickness),
        roadbase_thickness: parseInt(request.body.roadbaseThickness),
        approved: request.body.approved
    })
    newPlan.save().then(() => {
        response.status(201).send("Created new developer plan.")
    }).catch((error) => {
        var errorMessages = {}
        if (error.errors) {//mongoose validation failed!
            for (var fieldName in error.errors) {
                errorMessages[fieldName] = error.errors[fieldName].errorMessages
            }
            response.status(422).send(errorMessages)
        } else {
            response.status(500).send("Unknown error creating developer plan.")
        }
    })
})
app.delete("/developer_plans/:developer_planID", function (request, response) {
    console.log("Delete plan with id:", request.params.developer_planID)
    model.Plan.deleteOne({_id: request.params.developer_planID}).then((response) => {
        response.standards(200).send("Deleted plan.")
    }).catch((error) => {
        console.error("Failed to delete developer plan with ID:", request.params.developer_planID)
        response.sendStatus(404)
    })
})
app.put("/developer_plans/:developer_planID", function (request, response) {
    console.log("Update plan with id:", request.params.developer_planID);
    console.log("Request body:", request.body)
    model.Plan.findOneAndUpdate({_id: request.params.developer_planID}, {
        applicant_name: request.body.applicantName,
        applicant_phone_number: request.body.applicantPhone,
        applicant_email: request.body.applicantEmail,
        developer_name: request.body.developerName,
        developer_phone_number: request.body.developerPhone,
        developer_email: request.body.developerEmail,
        developer_address: request.body.developerAddress,
        applicant_address: request.body.applicantAddress,
        project_name: request.body.projectName,
        project_address: request.body.projectAddress,
        project_type: request.body.projectType,
        current_zoning: request.body.currentZoning,
        development_size: parseInt(request.body.developmentSize),
        waterline_size: parseInt(request.body.waterlineSize),
        sewer_size: parseInt(request.body.sewerSize),
        storm_drain_size: parseInt(request.body.stormDrainSize),
        power_company: request.body.powerCompany,
        internet_company: request.body.internetCompany,
        roadway_width: parseInt(request.body.roadwayWidth),
        asphalt_width: parseInt(request.body.asphaltWidth),
        sidewalk_width: parseInt(request.body.sidewalkWidth),
        asphalt_thickness: parseInt(request.body.asphaltThickness),
        roadbase_thickness: parseInt(request.body.roadbaseThickness),
        approved: request.body.approved
    }).then(() => {
        response.status(200).send("Updated plan.")
    }).catch((error) => {
        var errorMessages = {}
        if (error.errors) {//mongoose validation failed!
            for (var fieldName in error.errors) {
                errorMessages[fieldName] = error.errors[fieldName].errorMessages
            }
            response.status(422).send(error.errors)
        } else {
            response.status(500).send("Unknown error updating developer plan.")
        }
    })
})
app.listen(8080, function () {
    console.log("Server is running...")
})
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const needle = require('needle')
const serverless = require('serverless-http')

const PORT = process.env.PORT || 5000

const app = express()

// Enable cors
// app.use(cors())

// set static folder
// app.use(express.static('public'))

// Routes
app.use('/.netlify/functions/api', require('../routes'))
// app.use('/api', require('./routes'))

// app.use(express.json())
// app.use('/apiSimply', async (req, res) => {
// 	try {
// 		const apiRes = await needle('post','https://user-api-v2.simplybook.me/admin/auth',
// 			{
// 				"company": "hcctestmakerspace",
// 				"login": "w209116758@student.hccs.edu",
// 				"password": "HCCTestBooking#2023"
// 			},
// 			{ json: true })
// 		console.log("apiRes Status Code", apiRes.statusCode)
// 		if(apiRes.statusCode === 200) {
// 			const data = apiRes.body
// 			console.log("apiRes body", data)

// 			res.send({ data })
// 		} else {
// 			res.status(apiRes.statusCode).send(response.body)
// 		}
			
// 		} catch (error) {
// 			res.status(500).json({error})
// 	}
// })



module.exports = app
module.exports.handler = serverless(app)
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
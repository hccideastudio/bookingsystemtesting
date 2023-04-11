const express = require('express')
const router = express.Router()
const needle = require('needle')
const axios = require('axios')

// Env vars
const API_KEY_AIRTABLE = process.env.API_KEY_AIRTABLE
const API_COMPANY_SIMPLY = process.env.API_COMPANY_SIMPLY
const API_LOGIN_SIMPLY = process.env.API_LOGIN_SIMPLY
const API_SIMPLY_PWD = process.env.API_SIMPLY_PWD

router.get('/data', async (req, res) => {
	// res.json({success: true})
	try {
		const options = {
			headers: {
				'Authorization': `Bearer ${API_KEY_AIRTABLE}`
			}
		}
		// const apiRes = await axios.get(`https://api.airtable.com/v0/app3dM15T6EB54Ngo/All%20Members`, options)
		const apiRes = await needle('get', `https://api.airtable.com/v0/app3dM15T6EB54Ngo/All%20Members`, options)
		const data = apiRes.body

		res.status(200).json(data)
		
	} catch (error) {
		res.status(500).json({error})
	}
})


router.get('/', async (req, res) => {
	// res.json({success: true})
	try {
		res.json({
			'hello':'hi'
		})
		// const login = {
		// 	"company": API_COMPANY_SIMPLY,
		// 	"login": API_LOGIN_SIMPLY,
		// 	"password": API_SIMPLY_PWD
		// }
		// const options = {
		// 	json: true,
		// }
		// const apiRes = await needle('post', `https://user-api-v2.simplybook.me/admin/auth`, login, options)
		
		// if(apiRes.statusCode === 200) {
		// 	const data = apiRes.body
		// 	res.send({ data })
		// } else {
		// 	res.status(apiRes.statusCode).send(response.body)
		// }
		
	} catch (error) {
		res.status(500).json({error})
	}
})


module.exports = router
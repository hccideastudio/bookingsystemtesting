
// require('dotenv').config()

// const apiKey = process.env.API_KEY_AIRTABLE;
// console.log(apiKey);

const message = document.getElementById('confirmation-message');
// let widget = new SimplybookWidget({"widget_type":"iframe","url":"https:\/\/hcctestmakerspace.simplybook.me","theme":"default","theme_settings":{"timeline_hide_unavailable":"1","hide_past_days":"0","timeline_show_end_time":"0","timeline_modern_display":"as_slots","sb_base_color":"#33bb60","display_item_mode":"block","booking_nav_bg_color":"#d1e9c6","body_bg_color":"#f7f7f7","sb_review_image":"","dark_font_color":"#494949","light_font_color":"#ffffff","btn_color_1":"#5e7da7","sb_company_label_color":"#ffffff","hide_img_mode":"0","show_sidebar":"1","sb_busy":"#dad2ce","sb_available":"#d3e0f1"},"timeline":"modern","datepicker":"top_calendar","is_rtl":false,"app_config":{"clear_session":0,"allow_switch_to_ada":0,"predefined":[]}});




// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "company": "hcctestmakerspace",
//   "login": "w209116758@student.hccs.edu",
//   "password": "HCCTestBooking#2023"
// });

// var requestOptions = {
// 	method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };
// console.log("OPTIONS1 :", requestOptions);


async function authenticate() {

	const accesstoken = await	fetch("/.netlify/functions/api");
// 	// const accesstoken = await	fetch("https://user-api-v2.simplybook.me/admin/auth", requestOptions);
// 	console.log('accesstoken',accesstoken);
	const response = await accesstoken.json();

	return response.data.token;
// 		// .then(result => console.log(JSON.parse(result)))
// 		// .catch(error => console.log('error', error));
}


// 000000000000000000000000000000000000000000000000000000
// 000000000000000000000000000000000000000000000000000000

//  AIRTABLE 
// let emailOnAirtable = '';
// const apiKey = 'patXlYHniKfyF3yvN.4881a013f13c4c163ca3c20c52ef654442b943b66fd010d9e4f07c8fac8b6c4d';
// const baseId = 'app3dM15T6EB54Ngo';
// const tableName = 'All%20Members';

const fetchAirtableRecords = async () => {
	const url = `/.netlify/functions/api/data`;
	// const response = await axios.get(url);
	const response = await fetch(url);

	// const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  
  // const headers = {
	// 		Authorization: `Bearer ${apiKey}`,
	// 	};
	// const response = await fetch(url, { headers });

	console.log("Response Airtable", response);
  // const data = response.data;
  const data = await response.json();
	// console.log('AIRTABLE DATA', data);
  return data.records;
};

// Example usage:
// fetchAirtableRecords()
//   .then((records) => {
	// 		records.forEach(rec => {
		// 			console.log('Email:',rec['fields']['Email']);
		// 			if (rec['fields']['Email']===emailOnSimplyBook) {
			// 				console.log("Email Found");
			// 			} else {
				// 				console.log("Email does not exist")
				// 			};
				// 		})
				//     // console.log('Airtable Records:', records);
				//   })
				//   .catch((error) => {
					//     console.error('Error:', error);
					//   });
					
					
// replace with the name of the column and the value you're searching for
const columnName = "Email";

// build the API URL

const fetchAirtableRecord = async (columnValue) => {
	const apiUrl = `/.netlify/functions/api/data?filterByFormula=${encodeURIComponent(`{${columnName}}="${columnValue}"`)}`;
	const response = await fetch(apiUrl);

	// const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=${encodeURIComponent(`{${columnName}}="${columnValue}"`)}`;
	
  // const headers = {
	// 	Authorization: `Bearer ${apiKey}`,
  // };
  // const response = await fetch(apiUrl, { headers });
  const data = await response.json();
  // const data = response.data;
  return data;
};

// 000000000000000000000000000000000000000000000000000000	
// 000000000000000000000000000000000000000000000000000000	
					
					// =============================================================
// ============================================================


// Get all bookings using the provided access token
const getAllBookings = async (token) => {
  const url = `https://user-api-v2.simplybook.me/admin/bookings?filter[upcoming_only]=1&filter[status]=confirmed`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Company-Login': 'hcctestmakerspace',
    'X-Token': token,
  };
  const response = await fetch(url, { headers });
  const data = await response.json();
  return data;
};

// Call the authenticate function to retrieve an access token, and then use that token to get all bookings
authenticate().then((token) => {
	console.log('Token:', token);
  return getAllBookings(token);
}).then((bookings) => {
	const listBookings = bookings.data;
	console.log(listBookings);

  // const obj = JSON.parse(result)['data'];
	const objLength = Object.keys(listBookings).length;
	console.log("length:",objLength);
	const lastItemIndex = Object.keys(listBookings)[objLength - 1];
	const lastItem = listBookings[Object.keys(listBookings)[lastItemIndex]]
	console.log("Last Item", lastItem);
	const emailOnSimplyBook = lastItem['client']['email']
	console.log(emailOnSimplyBook);


	// Airtable
	// fetch all records
	fetchAirtableRecords()
		.then((records) => {
			records.forEach(rec => {
				console.log('Email:',rec['fields']['Email']);
				if (rec['fields']['Email']===emailOnSimplyBook) {
					console.log("Email Found");
				} else {
					console.log("Email does not exist")
				};
			})
			// console.log('Airtable Records:', records);
		})	
	
	// find specific record by column name
	fetchAirtableRecord(emailOnSimplyBook)
		.then(rec => {
			const recordsFound = rec['records'].length;
			if (recordsFound == 0) {
				message.innerHTML = `${emailOnSimplyBook} does not exist in our records. Please make sure you have the right email and make the reservation again`;
			} else {
				message.innerHTML = `Thank you for making the tool reservation. A confirmation will be sent to ${emailOnSimplyBook}`;
			}
		})
}).catch((error) => {
  console.error(error);
});



// testing POST USING NEEDLE
// async function postneedle() {

// 	const fetching = await	fetch("/apiSimply");
// 	const response = await fetching.json();

// 	return response.data.token;
// 		// .then(result => console.log(JSON.parse(result)))
// 		// .catch(error => console.log('error', error));
// }

// postneedle().then(results => console.log("RESULTS FE: ", results));
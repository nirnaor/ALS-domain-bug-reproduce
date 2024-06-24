const axios = require('axios');
const Promise = require('bluebird');

// Url of the exported http function in my Velo site
const url = "https://giladbi2.wixstudio.io/async-local-storage/_functions/reproduceAlsProblem";

async function run(requestHeaderValue) {
    console.log(`run ${requestHeaderValue}`);

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'someRequestHeader': requestHeaderValue,
        },
      });

      console.log("response", {requestHeaderValue, ...response.data})
  
      if (response.data.receivedHeader !== requestHeaderValue) {
        console.error(`Unexpected response: expected ${requestHeaderValue}, got ${response.data.receivedHeader}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

async function runMultipleRequests(requestHeaderValue) {
    await Promise.mapSeries(Array.from({ length: 1000 }), async () => {
        await run(requestHeaderValue);
      await Promise.delay(Math.floor(Math.random() * 10));
    });
  }
  
runMultipleRequests("1");
runMultipleRequests("2");
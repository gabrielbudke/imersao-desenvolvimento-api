const axios = require("axios").default;

const api = axios.create({
   baseURL: "https://swapi.dev/api/"
});

async function getPeople(name) {

   const response = await api.get("people", {
      params: {
         search: name,
         format: "json"
      }
   });

   return response.data;
}

module.exports = { getPeople };

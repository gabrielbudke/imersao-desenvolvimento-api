const axios = require("axios").default;

const api = axios.create({
    baseURL: "https://swapi.dev/api"
});

const getPeople = async function (name) {

    const results = await api.get("/people", {
        params: {
            search: name
        }
    });

    return results.data.results.map(mappingPeople);
};

function mappingPeople(item) {
    return {
        name: item.name,
        weight: item.mass
    };
}

module.exports = { getPeople, mappingPeople };
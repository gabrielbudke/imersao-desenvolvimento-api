const { getPeople } = require("./service");

Array.prototype.customFilter = function (callback) {
   const newArrayFiltered = [];
   for (let index in this) {
      const result = callback(this[index], index, this);
      if (result) {
         newArrayFiltered.push(this[index]);
      }
   }
   return newArrayFiltered;
};


const main = async function () {

   try {
      const { results } = await getPeople("a");

      // >> Utilizando o método filter
      const larsFamily = results.filter(person => {
         return person.name.toLowerCase().includes("lars");
      });

      const nameLarsFamily = larsFamily.map(person => person.name);

      // >> Utilizando o método filter customizado
      const customLarsFamily = results.customFilter((person, index, array) => {
         return person.name.toLowerCase().includes("lars");
      });

      const customNameLarsFamily = customLarsFamily.map((person) => person.name);

      console.log("[nameLarsFamily]", nameLarsFamily);
      console.log("[customNameLarsFamily]", customNameLarsFamily);

   } catch (error) {
      console.error("[error]", error);
   }

};

main();
const service = require("./service");

// Criando um metódo map customizado
Array.prototype.customMap = function (callback) {
   const newArrayMapping = [];
   for (let index = 0; index < this.length; index++) {
      const result = callback(this[index], index);
      newArrayMapping.push(result);
   }

   return newArrayMapping;
};

async function main() {

   try {
      const response = await service.getPeople("a");

      // const names = [];
      // >> trabalhando com o metódo 'forEach'
      // response.results.forEach(person => {
      //    names.push(person.name);
      // });

      const names = response.results.map(function (person) {
         return person.name;
      });

      const customNames = response.results.customMap((person, index) => {
         return `[${index + 1}] ${person.name}`;
      });

      console.log("names", names);
      console.log("customNames", customNames);

   } catch (error) {
      console.error("[error]", error);
   }
}

main();
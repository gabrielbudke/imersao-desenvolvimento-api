const service = require("./service");

async function main() {

   const names = [];

   try {      
      const response = await service.getPeople("a");

      // >> Trabalhando com o 'for'
      console.time("[for]");
      for (let index = 0; index < response.results.length; index++) {
         const person = response.results[index];
         names.push(person.name);
      }
      console.timeEnd("[for]");

      // >> Trabalhando com o 'for-in'
      console.time("[for-in]");
      for (let index in response.results) {
         const person = response.results[index];
         names.push(person.name);
      }
      console.timeEnd("[for-in]");

      // >> Trabalhando com o for-of
      console.time("[for-of]");
      for (const person of response.results) {
         names.push(person.name);
      }
      console.timeEnd("[for-of]");

      console.log(names);

   } catch (error) {
      console.error("[error]", error);
   }

}

main();
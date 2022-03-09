/**
 * 1. get user 
 * 2. get user's phone number by id
 * 3. get user's address by id
 */

function getUser() {
   // Quando der algum problema -> REJECT
   // Quando der sucesso -> RESOLVE
   return new Promise(function handlePromise(resolve, reject) {
      setTimeout(function () {

         const user = {
            id: 1,
            name: "Ciclano",
            date: new Date('1947-08-17')
         };

         return resolve(user);

      }, 1000);
   });
}
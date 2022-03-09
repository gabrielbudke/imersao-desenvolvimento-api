/**
 * 1. get user 
 * 2. get user's phone number by id
 * 3. get user's address by id
 */

// É possível importar um módulo interno do Node.js para transformar uma callback em promise
const util = require("util");
const getAddressByUserIdAsync = util.promisify(getAddressByUserId);

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

function getPhoneNumberByUserId(userId) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {

         const userPhoneNumber = {
            number: "987875454",
            ddd: 47,
            userId: 1
         };

         if (userId !== userPhoneNumber.userId) {
            return reject(`Phone number not found to user id ${userId}`);
         }

         return resolve(userPhoneNumber);

      }, 2000);

   });
}

function getAddressByUserId(userId, callback) {
   setTimeout(() => {

      const userAddress = {
         street: "Rua dos bobos",
         number: 0,
         userId: 1
      };

      if (userId !== userAddress.userId) {
         return callback(new Error(`Address not found to user id ${userId}`), null);
      }

      return callback(null, userAddress);

   }, 2000);
}

const userPromise = getUser();
userPromise
   .then((user) => {
      return getPhoneNumberByUserId(user.id)
         .then((phoneNumber) => {
            return {
               user: {
                  id: user.id,
                  name: user.name,
                  phoneNumber: {
                     number: phoneNumber.number,
                     ddd: phoneNumber.ddd
                  }
               }
            };
         });
   })
   .then((response) => {
      return getAddressByUserIdAsync(response.user.id)
         .then((address) => {
            return {
               user: {
                  id: response.user.id,
                  name: response.user.name,
                  phoneNumber: response.user.phoneNumber,
                  address: {
                     street: address.street,
                     number: address.number
                  }
               }
            };
         });
   })
   .then((response) => {
      console.log("[response]", response);
   }).catch((error) => {
      console.error("[error]", error);
   });
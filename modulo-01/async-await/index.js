/**
 * 1. get user 
 * 2. get user's phone number by id
 * 3. get user's address by id
 */
const util = require("util");

function getUser() {
   return new Promise((resolve, reject) => {
      setTimeout(() => {

         const user = {
            id: 1,
            name: "Ciclano"
         };

         return resolve(user);

      }, 2000);
   });
}

function getPhoneNumberByUserId(userId) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         const phoneNumber = {
            number: "987875757",
            ddd: 47,
            userId: 1
         };

         if (phoneNumber.userId !== userId) {
            return reject(`Phone number not found by user id: ${userId}`);
         }

         return resolve(phoneNumber);

      }, 2000);
   });
}

function getAddressByUserId(userId, callback) {
   setTimeout(function () {
      const userAddress = {
         street: "Rua dos bobos",
         number: 0,
         userId: 1
      };

      if (userAddress.userId !== userId) {
         return callback(new Error(`Address not found by user id: ${userId}`), null);
      }

      return callback(null, userAddress);

   }, 2000);
}

const getAddressByUserIdAsync = util.promisify(getAddressByUserId);

async function main() {
   try {

      /*
         console.time("medida-promise");
         const user = await getUser();
         const phoneNumber = await getPhoneNumberByUserId(user.id);
         const address = await getAddressByUserIdAsync(user.id);
         console.log("[user]", { user, phoneNumber, address });
         console.timeEnd("medida-promise");
      */

      console.time("medida-promise");
      const user = await getUser();
      const [phoneNumber, address] = await Promise.all([
         getPhoneNumberByUserId(user.id),
         getAddressByUserIdAsync(user.id)
      ]);

      console.log("[user]", { user, phoneNumber, address });
      console.timeEnd("medida-promise");

   } catch (error) {
      console.error("[error]", error);
   }
}

main();
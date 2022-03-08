/**
 * 1. get user 
 * 2. get user's phone number by id
 * 3. get user's address by id
 */

function getUser(callback) {
   setTimeout(() => {

      const user = {
         id: 1,
         name: "Ciclano Sousa",
         date: new Date('1991-04-02')
      };

      return callback(null, user);

   }, 1000);
}

function getPhoneNumberByUserId(userId, callback) {
   setTimeout(() => {

      const userPhoneNumber = {
         phoneNumber: "987875454",
         ddd: 47,
         userId: 1
      };

      if (userId !== userPhoneNumber.userId) {
         return callback(new Error("Phone number not found by user id!"), null);
      }

      return callback(null, userPhoneNumber);

   }, 2000);
}

function getAddressByUserId(userId, callback) {
   setTimeout(() => {

      const userAddress = {
         street: "Rua dos bobos",
         number: 0,
         userId: 1
      };

      if (userId !== userAddress.userId) {
         return callback(new Error("Address not found by user id!"), null);
      }

      return callback(null, userAddress);

   }, 2000);

}

// Calling functions to test callbacks
getUser(function handleUser(error, user) {

   if (error) {
      console.log("[error]", error.message);
      return;
   }

   getPhoneNumberByUserId(user.id, function handlePhoneNumber(error, userPhoneNumber) {

      if (error) {
         console.error("[error]", error.message);
         return;
      }

      getAddressByUserId(user.id, function handleAddress(error, userAddress) {

         if (error) {
            console.error("[error]", error.message);
            return;
         }

         user.contact = userPhoneNumber;
         user.address = userAddress;

         console.log(user);

      });
   });
});
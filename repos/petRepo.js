let fs = require("fs");

// This is the working middleware using Espress.js

const FILE_NAME = "./assets/pets.json";

let petRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pet = JSON.parse(data).find((p) => p.id == id);
        resolve(pet);
      }
    });
  },
  search: function (searchObject, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pets = JSON.parse(data);
        // Perform search
        if (searchObject) {
          // Example search object:
          // let searchObject = {
          //   "id": 1,
          //   "name": 'A'
          // };
          pets = pets.filter(
            (p) =>
              (searchObject.id ? p.id == searchObject.id : true) &&
              (searchObject.type
                ? p.type
                    .toLowerCase()
                    .indexOf(searchObject.type.toLowerCase()) >= 0
                : true)
                &&
              (searchObject.breed
                ? p.breeds.primary
                    .toLowerCase()
                    .indexOf(searchObject.breed.toLowerCase()) >= 0
                : true)
                &&
                // Some color objects have no value
                (searchObject.color
                  ? p.colors && p.colors.primary
                      ? p.colors.primary.toLowerCase().includes(searchObject.color.toLowerCase())
                      : false
                  : true) 
                &&
              (searchObject.size
                ? p.size
                    .toLowerCase()
                    .indexOf(searchObject.size.toLowerCase()) >= 0
                : true) 
                &&
              (searchObject.age
                ? p.age.toLowerCase().indexOf(searchObject.age.toLowerCase()) >=
                  0
                : true) 
                &&
              (searchObject.gender
                ? p.gender
                    .toLowerCase()
                    .indexOf(searchObject.gender.toLowerCase()) >= 0
                : true) 
                &&
              (searchObject.name
                ? p.name
                    .toLowerCase()
                    .indexOf(searchObject.name.toLowerCase()) >= 0
                : true)
          );
        }
        resolve(pets);
      }
    });
  },
  // Placeholder functions for booking appointments
  insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        pies.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
  update: function (newData, id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pets = JSON.parse(data);
        let pet = pets.find((p) => p.id == id);
        if (pet) {
          Object.assign(pet, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(newData);
            }
          });
        }
      }
    });
  },
  delete: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pets = JSON.parse(data);
        let index = pies.findIndex((p) => p.id == id);
        if (index != -1) {
          pets.splice(index, 1);
          fs.writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(index);
            }
          });
        }
      }
    });
  },
};

module.exports = petRepo;

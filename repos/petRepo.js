let fs = require("fs");

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
              (searchObject.breed
                ? p.breeds.primary
                    .toLowerCase()
                    .indexOf(searchObject.breed.toLowerCase()) >= 0
                : true) 
              //   || 
              // (searchObject.breed
              //   ? p.breeds
              //       .toLowerCase()
              //       .indexOf(searchObject.breed.toLowerCase()) >= 0
              //   : true)
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
      }
      else {
        let pies = JSON.parse(data);
        pies.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
          if (err) {
            reject(err);
          }
          else {
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
      }
      else {
        let pets = JSON.parse(data);
        let pet = pets.find(p => p.id == id);
        if (pet) {
          Object.assign(pet, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
            if (err) {
              reject(err);
            }
            else {
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
      }
      else {
        let pets = JSON.parse(data);
        let index = pies.findIndex(p => p.id == id);
        if (index != -1) {
          pets.splice(index, 1);
          fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err) {
            if (err) {
              reject(err);
            }
            else {
              resolve(index);
            }
          });
        }
      }
    });
  }
};

module.exports = petRepo;

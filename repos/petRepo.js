let fs = require('fs');

const FILE_NAME = './assets/pets.json';

let petRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      }
      else { 
        let pet = JSON.parse(data).find(p => p.id == id);
        resolve(pet);
      }
    });
  }
};

module.exports = petRepo;
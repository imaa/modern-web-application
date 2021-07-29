const mongoose = require("mongoose");
const { models } = require("../../configs/models.config");
const seedData = require("./data");
const data = require("./data");
const PL = mongoose.model(models.ProgramingLanguage.name);
console.log("Seed Db started");
PL.countDocuments((error, count) => {
  if (count === 0) {
    seedData.forEach((pl) => {
      const dbPL = new PL(pl);
      PL.create(dbPL, (err, doc) => {
        if (err) {
          console.log("Error in seeding the db ", err);
        } else {
          console.log(
            `Seeding the database on progress record ${
              seedData.indexOf(pl) + 1
            } of ${seedData.length}`
          );
        }
        if (seedData.length == seedData.indexOf(pl) + 1) {
          setTimeout(() => {
            console.log("Seeding the database is finished");
          }, 5);
        }
      });
    });
  } else {
    console.log("Seed Ended : Db is up to date");
  }
});

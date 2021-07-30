const mongoose = require("mongoose");
const configs = require("../../configs");
const seedData = require("./data");
const Job = mongoose.model(configs.dbConfig.models.job.name);
console.log("Seed Db started");
Job.countDocuments((err, count) => {
  if (err) {
    console.log("Error reading from database", err);
  } else if (count === 0) {
    seedData.forEach((job) => {
      Job.create(job, (err, doc) => {
        if (err) {
          console.log("Error in seeding the db ", err);
        } else {
          console.log(`Seeding the database on progress record ${seedData.indexOf(job) + 1} of ${seedData.length}`);
        }
        if (seedData.length == seedData.indexOf(job) + 1) {
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

const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.evn' });

const Person = require('./models/Person');
const Vehicle = require('./models/Vehicle');
const User = require('./models/User');

mongoose.connect("mongodb://localhost:27017/StageProxym", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const persons = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/Person.json`, 'utf-8')
);

const vehicles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/Vehicle.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/User.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Person.create(persons);
    await Vehicle.create(vehicles);
    await User.create(users);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Person.deleteMany();
    await Vehicle.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}

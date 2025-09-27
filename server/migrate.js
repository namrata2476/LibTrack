const sequelize = require('./db');
const User = require('./models/User');

async function run() {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate([
      { name: 'Alice Student', email: 'alice@student.edu', role: 'student' },
      { name: 'Bob Hostel', email: 'bob@hostel.edu', role: 'hostel' },
      { name: 'Carol Librarian', email: 'carol@library.edu', role: 'librarian' }
    ]);
    console.log('Seed complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();

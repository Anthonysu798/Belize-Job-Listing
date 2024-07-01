// migrations/<timestamp>-add_fields_to_user.js

module.exports = {
    async up(db, client) {
      await db.collection('users').updateMany({}, {
        $set: {
          firstName: '',
          lastName: '',
          phone: '',
          dob: '',
          username: '',
          gender: ''
        }
      });
    },
  
    async down(db, client) {
      await db.collection('users').updateMany({}, {
        $unset: {
          firstName: '',
          lastName: '',
          phone: '',
          dob: '',
          username: '',
          gender: ''
        }
      });
    }
  };
  
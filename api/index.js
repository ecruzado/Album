const photos = require('./routes/photos');

module.exports = (app, db) => {
    photos(app, db);
};
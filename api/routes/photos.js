const https = require("https");
const url = 'https://jsonplaceholder.typicode.com/photos';

const getPhotos = () => new Promise ((resolve, reject) => {
    https.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            resolve(body);
        });
    });
});

module.exports = app => {
    app.get('/photos', async (req, res) => {
        try {
            const photos = await getPhotos();
            const lastPhotoPerAlbum = photos.reduce((acc, item) => {
                if(!item) return acc;
                if(acc[item.albumId]) {
                    if (acc[item.albumId].id < item.id) {
                        acc[item.albumId] = item;
                    }
                } else {
                    acc[item.albumId] = item;
                }
                return acc;
            }, {})

            res.send(lastPhotoPerAlbum);
                
        } catch (error) {
            console.log(error);
        }
    });
};
const {db} = require('./app');

exports.getAllPosts = () => {
    db.collection('posts')
    .orderBy('posted', 'desc')
    .get()
    .then(data => {
        console.log("POSTS:\n");
        console.log(data);
        return;
    })
    .catch(err => {
        console.error(err);
        return;
    })
}
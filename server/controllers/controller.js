const separate = require("separate-by-character");
const axios = require("axios");
const sortJSON = require("../helper/JSONSort");


//API method that sends a sucess response when pinged.
//Sends a JSON {"success": true} with status code 200
exports.pingServer = (req, res) => {
    let success = { success: true };

    res.status(200).json(success);
};

exports.getPosts = (req, res) => {
    //get the parameters and assign them to variables
    const { tags, sortBy, direction } = req.query;

    //checks to see if tag parameter is valid
    if (tags == undefined || tags == "") {
        res.status(400).send({ error: "Tags parameter is required" });
        return;
    }

    //separate the tags into an array conatining each tag as an element
    let tagArr = separate.separateByCharacter(tags);

    //checks to see if sortBy parameter is valid
    let sortByValidValues = ["id", "reads", "likes", "popularity", undefined];
    if (sortByValidValues.indexOf(sortBy) == -1) {
        res.status(400).send({ error: "sortBy parameter is invalid" });
        return;
    }

    //checks to see if direction parameter is valid
    let directionValidValues = ["desc", "asc", undefined];
    if (directionValidValues.indexOf(direction) == -1) {
        res.status(400).send({ error: "direction parameter is invalid" });
        return;
    }

    //put all the axios request in an array, each request is a request for posts with the given tag
    let requestArr = [];
    for (let i = 0; i < tagArr.length; i++) {
        requestArr.push(axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tagArr[i]}`))
    }

    //array to hold posts
    let posts = [];

    //make all the requests using axios all
    axios
        .all(requestArr)
        .then(axios.spread((...responses) => {
            //push all the posts into the posts array
            for (let i = 0; i < responses.length; i++) {
                responses[i].data.posts.forEach(element => {
                    posts.push(element);
                });
            }

            //filter out duplicate elements from the posts array using set and map
            const result = Array.from(new Set(posts.map(element => element.id)))
                .map(id => {
                    return {
                        "author": posts.find(element => element.id === id).author,
                        "authorId": posts.find(element => element.id === id).authorId,
                        "id": id,
                        "likes": posts.find(element => element.id === id).likes,
                        "popularity": posts.find(element => element.id === id).popularity,
                        "reads": posts.find(element => element.id === id).reads,
                        "tags": posts.find(element => element.id === id).tags
                    }
                });
            //send a 200 code for success and send a JSON object that is sorted as specified by request or
            //by default sorts by id ascending
            res.status(200).json({ "posts": sortJSON.sortjsonarray(result, sortBy, direction) });
        })).catch((error) => {
            //this is triggered is something goes wrong when using axios
            console.log(error);
            res.status(500).json({ error: "there is an internal server error" });
        });
};

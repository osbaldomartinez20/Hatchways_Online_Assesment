const index = require("./routes/index");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);


//these test look to see if the correct response if received for different scenarios.
//There are tests to check if the appropriate response is sent when everything is going fine
//and when there is an invalid request.
//The console.log methods should tell you what is being tested.

request(app)
    .get("/api/ping")
    .expect("Content-Type", /json/)
    .expect({ success: true })
    .expect(200)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/ping working as expected.");
    });

request(app)
    .get("/api/posts")
    .expect("Content-Type", /json/)
    .expect({ "error": "Tags parameter is required" })
    .expect(400)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/posts working as expected when no parameters are given.");
    });

request(app)
    .get("/api/posts?tags=tech&sortBy=lol")
    .expect("Content-Type", /json/)
    .expect({ "error": "sortBy parameter is invalid" })
    .expect(400)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/posts working as expected when sortBy is invalid.");
    });

request(app)
    .get("/api/posts?tags=tech&direction=lol")
    .expect("Content-Type", /json/)
    .expect({ "error": "direction parameter is invalid" })
    .expect(400)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/posts working as expected when sortBy is invalid.");
    });

request(app)
    .get("/api/posts?tags=history")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/posts working as expected when one tag is given.");
    });

request(app)
    .get("/api/posts?tags=history,tech")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/posts working as expected when two tags are given.");
    });


request(app)
    .get("/api/posts?tags=history&sortBy=likes")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/posts working as expected when one tag and sortBy are given.");
    });


request(app)
    .get("/api/posts?tags=history,tech&sortBy=likes")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/posts working as expected when two tags and sortBy are given.");
    });

request(app)
    .get("/api/posts?tags=history&direction=desc")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/posts working as expected when one tag and direction are given.");
    });

request(app)
    .get("/api/posts?tags=history,tech&direction=asc")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/posts working as expected when two tags and direction are given.");
    });

request(app)
    .get("/api/posts?tags=history&sortBy=likes&direction=desc")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/posts working as expected when one tag, sortBy, and direction are given.");
    });

request(app)
    .get("/api/posts?tags=history,tech&sortBy=likes&direction=desc")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("route /api/posts working as expected when two tags, sortBy, and direction are given.");
    });


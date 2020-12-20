const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const apicache = require('apicache');

/* GET routes. */

/* 
Step 1 of the challange
the second argument is used for the cache.
the third argument calls a function that returns a valid response.
*/
router.get('/api/ping', apicache.middleware("60 minutes"), controller.pingServer);

/*
Step 2 of the challange
the second argument is used for the cache.
the third argument calls a function that returns the posts as per requested.
*/
router.get('/api/posts', apicache.middleware("30 minutes"), controller.getPosts);

module.exports = router;

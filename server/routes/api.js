const express = require('express');
const router = express.Router();

var userModel = require('../models/user');

var goibibo = require('../externalApis/goibibo');
var jwt = require('jsonwebtoken');
var secret = 'gdkn!GuLp1';

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, secret, function (err, data) {
            if (err) {
                res.sendStatus(403);
            } else {
                next();

            }
        });
    } else {
        res.sendStatus(403);
    }
}

/* GET api listing. */
router.get('/healthcheck', (req, res) => {
    res.send('api works');
});

router.get('/users', ensureToken, function (req, res, next) {
    userModel.getusers(function (error, result) {
        if (!error) {
            res.send(result);
        } else {
            res.send(error);
        }
    });
});

router.post('/user', function (req, res, next) {
    var jsondata = req.body;
    userModel.postUser(jsondata, function (error, result) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(result);
        }
    });
});

router.put('/user', ensureToken, function (req, res, next) {
    var jsondata = req.body;
    userModel.updateUser(jsondata, function (error, result) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(result);
        }
    });
});


router.delete('/user', ensureToken, function (req, res, next) {
    var jsondata = req.body;
    userModel.deleteUser(jsondata, function (error, result) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(result);
        }
    });
});



router.get('/user/:id', ensureToken, function (req, res, next) {
    var jsondata = req.params.id;
    userModel.getauser(jsondata, function (error, result) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(result);
        }
    });
});


router.post('/authenticate', function (req, res, next) {
    var jsondata = req.body;
    userModel.verifyUser(jsondata, function (error, result) {
        if (error) {
            res.status(500).send(error);
        } else if (result) {
            const token = jwt.sign({ username: result.username, role: result.role }, secret, { expiresIn: '1h' });
            res.status(200).json({
                message: 'Authenticated! Use this token in the "Authorization" header',
                user: result.username,
                role: result.role,
                token: token
            });
        } else {
            res.status(403).send(error);
        }
    });

});



router.get('/searchBus', function (req, res, next) {
    var searchBusQuery = req.query;
    goibibo.searchBus(searchBusQuery, function (error, result) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;
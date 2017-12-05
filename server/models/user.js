var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var user = function () {
    var userSchema = new mongoose.Schema({
        type: Schema.Types.Object,
        username: { type: String },
        password: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        role: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        postalcode: { type: String },
        createdDate: { type: Date },
        updatedDate: { type: Date }
    });

    userSchema.pre('save', function (callback) {
        var user = this;

        // Break out if the password hasn't changed
        if (!user.isModified('password')) return callback();

        // Password changed so we need to hash it
        bcrypt.genSalt(5, function (err, salt) {
            if (err) return callback(err);

            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) return callback(err);
                user.password = hash;
                callback();
            });
        });
    });

    userSchema.methods.verifyPassword = function (password, cb) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };


    var _userModel = mongoose.model('users', userSchema);

    var _getusers = function (result) {
        _userModel.find().exec(function (err, docs) {
            if (err) {
                result(err, null);
            } else {
                result(null, docs);
            }
        });
    };

    var _getauser = function (item, result) {
        _userModel.findOne({ _id: item }).exec(function (err, docs) {
            if (err) {
                result(err, null);
            } else {
                result(null, docs);
            }
        });
    }

    var _postUser = function (jsonValue, callback) {
        var jsonValue = jsonValue.data;
        if (jsonValue) {
            var userDoc = new _userModel();
            userDoc.username = jsonValue.username;
            userDoc.password = jsonValue.password;
            userDoc.firstName = jsonValue.firstName;
            userDoc.lastName = jsonValue.lastName;
            userDoc.address = jsonValue.address;
            userDoc.city = jsonValue.city;
            userDoc.state = jsonValue.state;
            userDoc.postalcode = jsonValue.postalcode;
            userDoc.role = jsonValue.role;
            userDoc.createdDate = new Date().toISOString();
            userDoc.save(function (err, docs) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    console.log(docs);
                    callback(null, docs);
                }
            });
        } else {
            callback("server err", null);
        }
    };

    var _updateUser = function (jsonValue, callback) {
        var jsonValue = jsonValue.data;
        if (jsonValue) {
            _userModel.findById(jsonValue._id, function (err, userDoc) {
                if (!err) {
                    userDoc.username = jsonValue.username;
                    userDoc.password = jsonValue.password;
                    userDoc.firstName = jsonValue.firstName;
                    userDoc.lastName = jsonValue.lastName;
                    userDoc.role = jsonValue.role;
                    userDoc.address = jsonValue.address;
                    userDoc.city = jsonValue.city;
                    userDoc.state = jsonValue.state;
                    userDoc.postalcode = jsonValue.postalcode;
                    userDoc.updatedDate = new Date().toISOString();
                    userDoc.save(function (err, docs) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else {
                            callback(null, docs);
                        }
                    });
                } else {
                    console.log(err);
                    callback(err, null);
                }
            });
        } else {
            callback("server err", null);
        }
    };

    var _deleteUser = function (user, result) {
        _userModel.findByIdAndRemove(user.Id, function (err, family) {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, family);
            }
        });
    };

    var _verifyUser = function (userObj, result) {
        _userModel.findOne({ username: userObj.username }, function (err, user) {
            if (err) { return result(err, null); }

            // No user found with that username
            if (!user) { return result(null, false); }

            // Make sure the password is correct
            user.verifyPassword(userObj.password, function (err, isMatch) {
                if (err) { return result(err, null); }

                // Password did not match
                if (!isMatch) { return result(null, false); }

                // Success
                return result(null, user);
            });
        });
    }

    return {
        model: _userModel,
        getusers: _getusers,
        getauser: _getauser,
        postUser: _postUser,
        deleteUser: _deleteUser,
        updateUser: _updateUser,
        verifyUser: _verifyUser
    };
}();

module.exports = user;
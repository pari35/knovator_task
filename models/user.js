const express = require('express');
const { default: mongoose } = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please Enter full Name"],

    },
    email: {
        type: String,
        required: [true, "Please Enter email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please password"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("user", userSchema);
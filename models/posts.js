const express = require('express');
const { default: mongoose } = require('mongoose');

const postsSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter Title of post"],
        trim: true,
    },
    body: {
        type: String,
        required: [true, "Please Enter Content of post"],
        trim: true,
    },
    createdBy: {
        type: String,
        required: [true, "Please Enter Name of creator"],
        trim: true,
    },
    isActive: {
        type: Number,
        required: [true, "Please Enter status"],
        maxLength: [3, "age limit"],
    },
    lat: {
        type: String,
        required: [true, "Please Enter Lat"],
        trim: true,
    },
    long: {
        type: String,
        required: [true, "Please Enter Long"],
        trim: true,
    }
});

module.exports = mongoose.model("posts", postsSchema);
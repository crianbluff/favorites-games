"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timeago_js_1 = require("timeago.js");
const helpersTimeAgo = {};
helpersTimeAgo.timeago = (timestamp) => {
    return timeago_js_1.format(timestamp);
};
exports.default = helpersTimeAgo;

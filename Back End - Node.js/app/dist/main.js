"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var main_dispatch_1 = __importDefault(require("./main-dispatch"));
var app = express();
app.use(main_dispatch_1.default);
app.listen(5000, function () {
    console.log("server is runing");
});

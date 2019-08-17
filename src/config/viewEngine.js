import express from "express";
import ExpressEjsExtend from "express-ejs-extend";
/**
 * 
 * @param {*} app  from exactly app viewEngine
 */
let configViewEngine = (app) => {
app.use(express.static("./src/public"));// file này dung để lưu các file (thư viện) js , ejs,.. về fordel public
app.engine("ejs", ExpressEjsExtend );
app.set("view engine","ejs"); // sau khi cấu hình thì set view engine là ejs 
app.set("views", "./src/views"); // đường dẫn đến thư mục chứa giao diện website
}

module.exports = configViewEngine;
import express = require("express");
import mainDispatch from "./main-dispatch";

const app = express();
app.use(mainDispatch);

app.listen(5000, () => {
    console.log("server is runing");
});

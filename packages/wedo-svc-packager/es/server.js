"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const BuildController_1 = require("./controller/BuildController");
new BuildController_1.BuildController();
Application_1.Application.getInstance().listen(7003);

import Application from "./Application";
import { BuildController } from "./controller/BuildController";

Application.getInstance().listen(7003)
new BuildController()
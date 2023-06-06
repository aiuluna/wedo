import Application from "./Application";
import { BuildController } from "./controller/BuildController";

new BuildController()
Application.getInstance().listen(7003)

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildController = void 0;
const Application_1 = require("../Application");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const code_tools_1 = require("@wedo/code-tools");
var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod[HTTPMethod["GET"] = 0] = "GET";
    HTTPMethod[HTTPMethod["POST"] = 1] = "POST";
    HTTPMethod[HTTPMethod["PUT"] = 2] = "PUT";
    HTTPMethod[HTTPMethod["DELETE"] = 3] = "DELETE";
})(HTTPMethod || (HTTPMethod = {}));
// @ts-ignore
// global.fetch = fetch
class BuildController {
    constructor() { }
    index(req, res) {
        res.send('hello wedo-svc-packager');
    }
    build(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, name } = req.params;
            const cwd = path_1.default.resolve(__dirname, '../temp');
            console.log('start build...');
            try {
                if (!fs_1.default.existsSync(cwd)) {
                    fs_1.default.mkdirSync(cwd);
                }
                const builder = new code_tools_1.ProjectBuilder();
                yield builder.build(user, name, cwd);
                res.send({
                    success: true
                });
            }
            catch (error) {
                res.status(500).send('error msg:' + error.toString());
            }
        });
    }
}
__decorate([
    restful(HTTPMethod.GET, '/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BuildController.prototype, "index", null);
__decorate([
    restful(HTTPMethod.PUT, '/build/:user/:name'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuildController.prototype, "build", null);
exports.BuildController = BuildController;
function restful(method, path) {
    return function (target, propertyKey, descriptor) {
        const application = Application_1.Application.getInstance();
        const app = application.getApp();
        switch (method) {
            case HTTPMethod.GET:
                app.get(path, descriptor.value.bind(target));
                break;
            case HTTPMethod.POST:
                app.post(path, descriptor.value.bind(target));
                break;
            case HTTPMethod.PUT:
                app.put(path, descriptor.value.bind(target));
                break;
            default:
                break;
        }
    };
}

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
const Application_1 = __importDefault(require("../Application"));
const DocService_1 = __importDefault(require("../service/DocService"));
var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod[HTTPMethod["GET"] = 0] = "GET";
    HTTPMethod[HTTPMethod["POST"] = 1] = "POST";
    HTTPMethod[HTTPMethod["PUT"] = 2] = "PUT";
    HTTPMethod[HTTPMethod["DELETE"] = 3] = "DELETE";
})(HTTPMethod || (HTTPMethod = {}));
class DocController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('index success');
            res.send('success');
        });
    }
    saveCodeProjectJSON(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, name } = req.params;
            const values = req.body;
            const service = new DocService_1.default();
            const response = yield service.saveCodeProject(user, name, values);
            res.send(response);
        });
    }
    getCodeProjectJSON(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, name } = req.params;
            const service = new DocService_1.default();
            const response = yield service.getCodeProject(user, name);
            res.send(response);
        });
    }
    savePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, name } = req.params;
            const { url } = req.body;
            const service = new DocService_1.default();
            const response = yield service.savePage(user, name, url);
            res.send(response);
        });
    }
    getPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, name } = req.params;
            const service = new DocService_1.default();
            const response = yield service.getPage(user, name);
            res.send(response);
        });
    }
}
__decorate([
    restful(HTTPMethod.GET, '/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "index", null);
__decorate([
    restful(HTTPMethod.PUT, '/code-project/:user/:name'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "saveCodeProjectJSON", null);
__decorate([
    restful(HTTPMethod.GET, '/code-project/:user/:name'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "getCodeProjectJSON", null);
__decorate([
    restful(HTTPMethod.PUT, '/page/:user/:name'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "savePage", null);
__decorate([
    restful(HTTPMethod.GET, '/page/:user/:name'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DocController.prototype, "getPage", null);
function restful(method, path) {
    return function (target, propertyKey, descriptor) {
        const application = Application_1.default.getInstance();
        const app = application.getApp();
        switch (method) {
            case HTTPMethod.GET:
                app.get(path, descriptor.value.bind(target));
                break;
            case HTTPMethod.PUT:
                app.put(path, descriptor.value.bind(target));
                break;
        }
    };
}
exports.default = DocController;

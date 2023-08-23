"use strict";
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
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const code_tools_1 = require("@wedo/code-tools");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Hello wedo-svc-faas!');
});
router.get('/:user/:page/:fn', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, page, fn } = req.params;
    try {
        const runner = new code_tools_1.CodeRunner(path_1.default.resolve(__dirname, "./temp"), user, 'faas-' + page);
        const result = yield runner.run(fn);
        res.send({
            success: true,
            data: result
        });
    }
    catch (ex) {
        console.error(ex);
        res.status(500).send({
            success: false,
            status: 500,
            message: ex.toString()
        });
    }
}));
exports.default = router;

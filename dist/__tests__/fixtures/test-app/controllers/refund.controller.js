"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundController = void 0;
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const rest_1 = require("@loopback/rest");
class RefundController {
    async create() {
        return {
            id: '292983ea-a41a-4a83-b800-44b1764ee74e',
        };
    }
}
exports.RefundController = RefundController;
__decorate([
    (0, authentication_1.authenticate)('supertokens'),
    (0, authorization_1.authorize)({
        allowedRoles: ['admin', 'manager'],
    }),
    (0, rest_1.post)('/refunds')
], RefundController.prototype, "create", null);
//# sourceMappingURL=refund.controller.js.map
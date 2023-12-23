"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
class AuthenticationController {
    async getCurrentUser(profile) {
        return {
            userId: profile.userId,
            userDataInAccessToken: profile.userDataInAccessToken,
        };
    }
}
exports.AuthenticationController = AuthenticationController;
__decorate([
    (0, authentication_1.authenticate)('supertokens'),
    (0, rest_1.get)('/authentication/users/me', {
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                id: { type: 'string' },
                            },
                            type: 'object',
                        },
                    },
                },
            },
        },
        summary: 'Get the current logged in user, inferred from JWT token',
    }),
    __param(0, (0, core_1.inject)(security_1.SecurityBindings.USER))
], AuthenticationController.prototype, "getCurrentUser", null);
//# sourceMappingURL=authentication.controller.js.map
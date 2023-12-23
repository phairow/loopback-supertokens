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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperTokensAuthenticationStrategy = void 0;
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const supertokens_node_1 = require("supertokens-node");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
let SuperTokensAuthenticationStrategy = class SuperTokensAuthenticationStrategy {
    constructor(ctx) {
        this.ctx = ctx;
        this.name = 'supertokens';
    }
    async authenticate() {
        try {
            const session = await session_1.default.getSession(this.ctx, this.ctx);
            return {
                [security_1.securityId]: session.getUserId(),
                session: session.getHandle(),
                userId: session.getUserId(),
                userDataInAccessToken: session.getAccessTokenPayload(),
            };
        }
        catch (err) {
            if (supertokens_node_1.Error.isErrorFromSuperTokens(err)) {
                throw new rest_1.HttpErrors.Unauthorized(err.message);
            }
            throw err;
        }
    }
};
exports.SuperTokensAuthenticationStrategy = SuperTokensAuthenticationStrategy;
exports.SuperTokensAuthenticationStrategy = SuperTokensAuthenticationStrategy = __decorate([
    __param(0, (0, core_1.inject)(rest_1.RestBindings.Http.CONTEXT))
], SuperTokensAuthenticationStrategy);
//# sourceMappingURL=supertokens.strategy.js.map
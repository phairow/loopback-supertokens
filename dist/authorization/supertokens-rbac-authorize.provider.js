"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperTokensRBACAuthorizeProvider = void 0;
const authorization_1 = require("@loopback/authorization");
const rest_1 = require("@loopback/rest");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const userroles_1 = __importDefault(require("supertokens-node/recipe/userroles"));
class SuperTokensRBACAuthorizeProvider {
    value() {
        return this.authorize.bind(this);
    }
    async authorize(authorizationCtx, metadata) {
        const ctx = await authorizationCtx.invocationContext.get(rest_1.MiddlewareBindings.CONTEXT);
        const rbacSessionClaimValidator = [];
        if (metadata.allowedRoles && metadata.allowedRoles.length) {
            rbacSessionClaimValidator.push(userroles_1.default.UserRoleClaim.validators.includesAll(metadata.allowedRoles));
        }
        else if (metadata.deniedRoles && metadata.deniedRoles.length) {
            rbacSessionClaimValidator.push(userroles_1.default.UserRoleClaim.validators.excludesAll(metadata.deniedRoles));
        }
        try {
            await session_1.default.getSession(ctx, ctx, {
                overrideGlobalClaimValidators(validators) {
                    return validators.concat(rbacSessionClaimValidator);
                },
            });
            return authorization_1.AuthorizationDecision.ALLOW;
        }
        catch (err) {
            return authorization_1.AuthorizationDecision.DENY;
        }
    }
}
exports.SuperTokensRBACAuthorizeProvider = SuperTokensRBACAuthorizeProvider;
//# sourceMappingURL=supertokens-rbac-authorize.provider.js.map
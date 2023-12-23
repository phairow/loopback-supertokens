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
exports.SupertokensComponent = void 0;
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const core_1 = require("@loopback/core");
const loopback_1 = require("supertokens-node/framework/loopback");
const supertokens_internal_webhook_strategy_1 = require("./authentication/supertokens-internal-webhook.strategy");
const supertokens_strategy_1 = require("./authentication/supertokens.strategy");
const keys_1 = require("./keys");
const supertokens_rbac_authorize_provider_1 = require("./authorization/supertokens-rbac-authorize.provider");
const webhook_signature_interceptor_provider_1 = require("./authentication/webhook-signature-interceptor.provider");
const supertokens_webhook_helper_1 = require("./helpers/supertokens-webhook.helper");
let SupertokensComponent = class SupertokensComponent {
    constructor(app) {
        this.bindings = [
            core_1.Binding.bind(keys_1.LoopbackSupertokensBindings.AUTHORIZATION_RBAC_AUTHORIZER)
                .toProvider(supertokens_rbac_authorize_provider_1.SuperTokensRBACAuthorizeProvider)
                .tag(authorization_1.AuthorizationTags.AUTHORIZER),
            core_1.Binding.bind(keys_1.LoopbackSupertokensBindings.WEBHOOK_SIGNATURE_INTERCEPTOR).toProvider(webhook_signature_interceptor_provider_1.WebhookSignatureInterceptorProvider),
            core_1.Binding.bind(keys_1.LoopbackSupertokensBindings.WEBHOOK_SIGNATURE_HEADER_KEY).to(keys_1.DEFAULT_WEBHOOK_SIGNATURE_HEADER_KEY),
            core_1.Binding.bind(keys_1.LoopbackSupertokensBindings.WEBHOOK_SIGNATURE_SECRET).to(keys_1.DEFAULT_WEBHOOK_SIGNATURE_SECRET),
            core_1.Binding.bind(keys_1.LoopbackSupertokensBindings.WEBHOOK_EVENT_EXPIRY).to(keys_1.DEFAULT_WEBHOOK_EVENT_EXPIRY),
            core_1.Binding.bind(keys_1.LoopbackSupertokensBindings.WEBHOOK_HELPER_SERVICE).toClass(supertokens_webhook_helper_1.SupertokensWebhookHelper),
        ];
        app.middleware(loopback_1.middleware);
        (0, authentication_1.registerAuthenticationStrategy)(app, supertokens_strategy_1.SuperTokensAuthenticationStrategy);
        (0, authentication_1.registerAuthenticationStrategy)(app, supertokens_internal_webhook_strategy_1.SupertokensInternalWebhookAuthenticationStrategy);
    }
};
exports.SupertokensComponent = SupertokensComponent;
exports.SupertokensComponent = SupertokensComponent = __decorate([
    __param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE))
], SupertokensComponent);
//# sourceMappingURL=loopback-supertokens.component.js.map
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
exports.SupertokensInternalWebhookAuthenticationStrategy = void 0;
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const keys_1 = require("../keys");
let SupertokensInternalWebhookAuthenticationStrategy = class SupertokensInternalWebhookAuthenticationStrategy {
    constructor(operationSpec, requestBodyParser, request, webhookHelper, webhookSignatureHeaderKey, debug = false) {
        this.operationSpec = operationSpec;
        this.requestBodyParser = requestBodyParser;
        this.request = request;
        this.webhookHelper = webhookHelper;
        this.webhookSignatureHeaderKey = webhookSignatureHeaderKey;
        this.debug = debug;
        this.name = 'supertokens-internal-webhook';
    }
    async authenticate() {
        await this.requestBodyParser.loadRequestBodyIfNeeded(this.operationSpec, this.request);
        const signatureHeader = this.request.headers[this.webhookSignatureHeaderKey];
        let expectedSignature;
        try {
            expectedSignature = this.webhookHelper.verifyEventSignature(this.request.body, Array.isArray(signatureHeader)
                ? signatureHeader.shift()
                : signatureHeader);
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized(this.debug ? err.message : null);
        }
        return {
            [security_1.securityId]: expectedSignature,
        };
    }
};
exports.SupertokensInternalWebhookAuthenticationStrategy = SupertokensInternalWebhookAuthenticationStrategy;
SupertokensInternalWebhookAuthenticationStrategy.SIGNATURE_VERIFICATION_FAILED_OBSCURED_MESSAGE = 'Webhook request malformed, missing or invalid signature';
exports.SupertokensInternalWebhookAuthenticationStrategy = SupertokensInternalWebhookAuthenticationStrategy = __decorate([
    __param(0, (0, core_1.inject)(rest_1.RestBindings.OPERATION_SPEC_CURRENT)),
    __param(1, (0, core_1.inject)(rest_1.RestBindings.REQUEST_BODY_PARSER)),
    __param(2, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    __param(3, (0, core_1.inject)(keys_1.LoopbackSupertokensBindings.WEBHOOK_HELPER_SERVICE)),
    __param(4, (0, core_1.inject)(keys_1.LoopbackSupertokensBindings.WEBHOOK_SIGNATURE_HEADER_KEY))
], SupertokensInternalWebhookAuthenticationStrategy);
//# sourceMappingURL=supertokens-internal-webhook.strategy.js.map
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
exports.WebhookSignatureInterceptorProvider = void 0;
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const keys_1 = require("../keys");
let WebhookSignatureInterceptorProvider = class WebhookSignatureInterceptorProvider {
    constructor(webhookHelper, webhookSignatureHeaderKey, debug = false) {
        this.webhookHelper = webhookHelper;
        this.webhookSignatureHeaderKey = webhookSignatureHeaderKey;
        this.debug = debug;
    }
    value() {
        return this.intercept.bind(this);
    }
    async intercept(invocationCtx, next) {
        const request = await invocationCtx.get(rest_1.RestBindings.Http.REQUEST);
        const signatureHeader = request.headers[this.webhookSignatureHeaderKey];
        try {
            this.webhookHelper.verifyEventSignature(request.body, Array.isArray(signatureHeader)
                ? signatureHeader.shift()
                : signatureHeader);
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized(this.debug ? err.message : null);
        }
        return next();
    }
};
exports.WebhookSignatureInterceptorProvider = WebhookSignatureInterceptorProvider;
WebhookSignatureInterceptorProvider.SIGNATURE_VERIFICATION_FAILED_OBSCURED_MESSAGE = 'Webhook request malformed, missing or invalid signature';
exports.WebhookSignatureInterceptorProvider = WebhookSignatureInterceptorProvider = __decorate([
    __param(0, (0, core_1.inject)(keys_1.LoopbackSupertokensBindings.WEBHOOK_HELPER_SERVICE)),
    __param(1, (0, core_1.inject)(keys_1.LoopbackSupertokensBindings.WEBHOOK_SIGNATURE_HEADER_KEY))
], WebhookSignatureInterceptorProvider);
//# sourceMappingURL=webhook-signature-interceptor.provider.js.map
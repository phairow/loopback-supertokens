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
exports.SupertokensWebhookHelper = void 0;
const core_1 = require("@loopback/core");
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const keys_1 = require("../keys");
const sanitizeWebhookEndpoint_1 = require("../utils/sanitizeWebhookEndpoint");
const WebhookEventFactory_1 = require("./WebhookEventFactory");
let SupertokensWebhookHelper = class SupertokensWebhookHelper {
    constructor(webhookSignatureSecret, webhookSignatureHeaderKey = keys_1.DEFAULT_WEBHOOK_SIGNATURE_HEADER_KEY, eventExpiryInSeconds = keys_1.DEFAULT_WEBHOOK_EVENT_EXPIRY) {
        this.webhookSignatureSecret = webhookSignatureSecret;
        this.webhookSignatureHeaderKey = webhookSignatureHeaderKey;
        this.eventExpiryInSeconds = eventExpiryInSeconds;
    }
    async dispatchWebhookEvent(endpoint, event) {
        const timestamp = new Date().getTime();
        const signature = this.computeEventSignature(event, timestamp);
        const sanitiziedEndpoint = (0, sanitizeWebhookEndpoint_1.sanitizeWebhookEndpoint)(endpoint);
        return axios_1.default
            .post(sanitiziedEndpoint, event, {
            headers: {
                [this.webhookSignatureHeaderKey]: `t=${timestamp} v1=${signature}`,
            },
        })
            .catch((err) => {
            var _a, _b, _c, _d, _e;
            let { message } = err;
            if ((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.statusText) {
                message = err.response.statusText;
            }
            if ((_d = (_c = (_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) {
                message = err.response.data.error.message;
            }
            throw new Error(`Webhook failed: status="${((_e = err === null || err === void 0 ? void 0 : err.response) === null || _e === void 0 ? void 0 : _e.status) || err.code}" message="${message}"`);
        });
    }
    computeEventSignature(event, timestamp) {
        return crypto_1.default
            .createHmac('sha256', this.webhookSignatureSecret)
            .update(`${timestamp}.${JSON.stringify(event)}`)
            .digest('base64');
    }
    verifyEventSignature(event, signatureHeader) {
        let givenSignature;
        try {
            givenSignature = this.parseSignatureHeader(signatureHeader);
        }
        catch (err) {
            throw new Error('Webhook request malformed, missing or invalid signature header');
        }
        const timestamp = new Date().getTime();
        if (timestamp - givenSignature.timestamp >
            this.eventExpiryInSeconds * 1000) {
            throw new Error('Webhook request malformed, expired signature header');
        }
        const expectedSignature = this.computeEventSignature(event, givenSignature.timestamp);
        if (expectedSignature !== givenSignature.value) {
            throw new Error('Webhook request malformed, signature mismatch');
        }
        return expectedSignature;
    }
    getEventFactory() {
        return new WebhookEventFactory_1.WebhookEventFactory();
    }
    parseSignatureHeader(rawHeaderString) {
        if (!rawHeaderString) {
            throw new Error('No signature header string to parse');
        }
        const tokens = rawHeaderString
            .split(/[\s\n\r]+/)
            .reduce((accumulator, currentToken) => {
            const [tokenKey, tokenValue] = currentToken.split(/=(.*)/, 2);
            accumulator[tokenKey] = tokenValue;
            return accumulator;
        }, {});
        const timestampTokenValue = tokens.t;
        const signatureTokenValue = tokens.v1;
        if (!timestampTokenValue || !signatureTokenValue) {
            throw new Error('Malformed signature header');
        }
        return {
            value: signatureTokenValue,
            timestamp: parseInt(timestampTokenValue, 10),
        };
    }
};
exports.SupertokensWebhookHelper = SupertokensWebhookHelper;
exports.SupertokensWebhookHelper = SupertokensWebhookHelper = __decorate([
    __param(0, (0, core_1.inject)(keys_1.LoopbackSupertokensBindings.WEBHOOK_SIGNATURE_SECRET)),
    __param(1, (0, core_1.inject)(keys_1.LoopbackSupertokensBindings.WEBHOOK_SIGNATURE_HEADER_KEY)),
    __param(2, (0, core_1.inject)(keys_1.LoopbackSupertokensBindings.WEBHOOK_EVENT_EXPIRY))
], SupertokensWebhookHelper);
//# sourceMappingURL=supertokens-webhook.helper.js.map
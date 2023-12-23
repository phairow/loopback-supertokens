"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeWebhookEndpoint = void 0;
function sanitizeWebhookEndpoint(endpoint) {
    try {
        const parsedUrl = new URL(endpoint);
        return parsedUrl.toString();
    }
    catch (err) {
        throw new Error(`Invalid webhook endpoint, expected valid URL, got "${endpoint}"`);
    }
}
exports.sanitizeWebhookEndpoint = sanitizeWebhookEndpoint;
//# sourceMappingURL=sanitizeWebhookEndpoint.js.map
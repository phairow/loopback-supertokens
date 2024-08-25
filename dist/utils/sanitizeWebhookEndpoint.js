"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeWebhookEndpoint = sanitizeWebhookEndpoint;
function sanitizeWebhookEndpoint(endpoint) {
    try {
        const parsedUrl = new URL(endpoint);
        return parsedUrl.toString();
    }
    catch (err) {
        throw new Error(`Invalid webhook endpoint, expected valid URL, got "${endpoint}"`);
    }
}
//# sourceMappingURL=sanitizeWebhookEndpoint.js.map
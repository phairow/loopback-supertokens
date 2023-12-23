"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopbackSupertokensBindings = exports.DEFAULT_WEBHOOK_SIGNATURE_HEADER_KEY = exports.DEFAULT_WEBHOOK_SIGNATURE_SECRET = exports.DEFAULT_WEBHOOK_EVENT_EXPIRY = void 0;
const core_1 = require("@loopback/core");
exports.DEFAULT_WEBHOOK_EVENT_EXPIRY = 180;
exports.DEFAULT_WEBHOOK_SIGNATURE_SECRET = 'flying.microtonal.banana';
exports.DEFAULT_WEBHOOK_SIGNATURE_HEADER_KEY = 'webhook-signature';
var LoopbackSupertokensBindings;
(function (LoopbackSupertokensBindings) {
    LoopbackSupertokensBindings.AUTHORIZATION_RBAC_AUTHORIZER = 'loopback-supertokens.authorization.rbac-authorizer';
    LoopbackSupertokensBindings.WEBHOOK_EVENT_EXPIRY = core_1.BindingKey.create('loopback-supertokens.webhook.event-expiry');
    LoopbackSupertokensBindings.WEBHOOK_SIGNATURE_INTERCEPTOR = 'loopback-supertokens.webhook.signature-interceptor';
    LoopbackSupertokensBindings.WEBHOOK_SIGNATURE_HEADER_KEY = core_1.BindingKey.create('loopback-supertokens.webhook.signature-header-key');
    LoopbackSupertokensBindings.WEBHOOK_SIGNATURE_SECRET = core_1.BindingKey.create('loopback-supertokens.webhook.signature-secret');
    LoopbackSupertokensBindings.WEBHOOK_HELPER_SERVICE = 'loopback-supertokens.webhook.helper_service';
})(LoopbackSupertokensBindings || (exports.LoopbackSupertokensBindings = LoopbackSupertokensBindings = {}));
//# sourceMappingURL=keys.js.map
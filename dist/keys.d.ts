import { BindingKey } from '@loopback/core';
export declare const DEFAULT_WEBHOOK_EVENT_EXPIRY = 180;
export declare const DEFAULT_WEBHOOK_SIGNATURE_SECRET = "flying.microtonal.banana";
export declare const DEFAULT_WEBHOOK_SIGNATURE_HEADER_KEY = "webhook-signature";
export declare namespace LoopbackSupertokensBindings {
    const AUTHORIZATION_RBAC_AUTHORIZER = "loopback-supertokens.authorization.rbac-authorizer";
    const WEBHOOK_EVENT_EXPIRY: BindingKey<number>;
    const WEBHOOK_SIGNATURE_INTERCEPTOR = "loopback-supertokens.webhook.signature-interceptor";
    const WEBHOOK_SIGNATURE_HEADER_KEY: BindingKey<string>;
    const WEBHOOK_SIGNATURE_SECRET: BindingKey<string>;
    const WEBHOOK_HELPER_SERVICE = "loopback-supertokens.webhook.helper_service";
}

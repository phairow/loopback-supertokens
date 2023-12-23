import { Interceptor, InvocationContext, Next, Provider } from '@loopback/core';
import { SupertokensWebhookHelper } from '../helpers/supertokens-webhook.helper';
export declare class WebhookSignatureInterceptorProvider implements Provider<Interceptor> {
    private webhookHelper;
    private webhookSignatureHeaderKey;
    private debug;
    static SIGNATURE_VERIFICATION_FAILED_OBSCURED_MESSAGE: string;
    constructor(webhookHelper: SupertokensWebhookHelper, webhookSignatureHeaderKey: string, debug?: boolean);
    value(): any;
    intercept(invocationCtx: InvocationContext, next: Next): Promise<import("@loopback/core").NonVoid>;
}

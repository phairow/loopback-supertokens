/// <reference types="express" />
import { AuthenticationStrategy } from '@loopback/authentication';
import { OperationObject, RedirectRoute, Request, RequestBodyParser } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { SupertokensWebhookHelper } from '../helpers/supertokens-webhook.helper';
export declare class SupertokensInternalWebhookAuthenticationStrategy implements AuthenticationStrategy {
    private operationSpec;
    private requestBodyParser;
    private request;
    private webhookHelper;
    private webhookSignatureHeaderKey;
    private debug;
    name: string;
    static SIGNATURE_VERIFICATION_FAILED_OBSCURED_MESSAGE: string;
    constructor(operationSpec: OperationObject, requestBodyParser: RequestBodyParser, request: Request, webhookHelper: SupertokensWebhookHelper, webhookSignatureHeaderKey: string, debug?: boolean);
    authenticate(): Promise<UserProfile | RedirectRoute | undefined>;
}

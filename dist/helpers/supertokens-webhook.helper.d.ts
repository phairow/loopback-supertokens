import type { WebhookEvent } from '../types';
import { WebhookEventFactory } from './WebhookEventFactory';
export declare class SupertokensWebhookHelper {
    private webhookSignatureSecret;
    private webhookSignatureHeaderKey;
    private eventExpiryInSeconds;
    constructor(webhookSignatureSecret: string, webhookSignatureHeaderKey?: string, eventExpiryInSeconds?: number);
    dispatchWebhookEvent(endpoint: string, event: WebhookEvent): Promise<import("axios").AxiosResponse<any, any>>;
    computeEventSignature(event: WebhookEvent, timestamp: number): string;
    verifyEventSignature(event: WebhookEvent, signatureHeader: string): string;
    getEventFactory(): WebhookEventFactory;
    parseSignatureHeader(rawHeaderString: any): {
        value: string;
        timestamp: number;
    };
}

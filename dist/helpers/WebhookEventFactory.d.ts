import { UserSignInEvent, UserSignUpEvent, WebhookEventUserInterface } from '../types';
type APIResponseSharedInterface = {
    user: WebhookEventUserInterface;
};
export declare class WebhookEventFactory {
    createUserSignInEvent(res: APIResponseSharedInterface): UserSignInEvent;
    createUserSignUpEvent(res: APIResponseSharedInterface): UserSignUpEvent;
}
export {};

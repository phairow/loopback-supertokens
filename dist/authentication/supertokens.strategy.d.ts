import { AuthenticationStrategy } from '@loopback/authentication';
import { MiddlewareContext, RedirectRoute } from '@loopback/rest';
import type { SupertokensUserProfile } from '../types';
export declare class SuperTokensAuthenticationStrategy implements AuthenticationStrategy {
    private ctx;
    name: string;
    constructor(ctx: MiddlewareContext);
    authenticate(): Promise<SupertokensUserProfile | RedirectRoute | undefined>;
}

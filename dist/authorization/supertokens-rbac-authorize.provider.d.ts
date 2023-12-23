import type { AuthorizationContext, AuthorizationMetadata, Authorizer } from '@loopback/authorization';
import { AuthorizationDecision } from '@loopback/authorization';
import { Provider } from '@loopback/core';
export declare class SuperTokensRBACAuthorizeProvider implements Provider<Authorizer> {
    value(): Authorizer;
    authorize(authorizationCtx: AuthorizationContext, metadata: AuthorizationMetadata): Promise<AuthorizationDecision.ALLOW | AuthorizationDecision.DENY>;
}

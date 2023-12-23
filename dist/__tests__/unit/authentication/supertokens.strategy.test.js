"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const testlab_1 = require("@loopback/testlab");
const supertokens_node_1 = require("supertokens-node");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const supertokens_strategy_1 = require("../../../authentication/supertokens.strategy");
describe('SuperTokensAuthenticationStrategy', () => {
    let context;
    beforeEach(() => {
        context = new core_1.Context('app');
        context.bind(rest_1.RestBindings.Http.CONTEXT).to(new core_1.Context());
    });
    it('has proper name', async () => {
        const strategy = await (0, core_1.instantiateClass)(supertokens_strategy_1.SuperTokensAuthenticationStrategy, context);
        (0, testlab_1.expect)(strategy.name).to.equal('supertokens');
    });
    it('can execute authenticate', async () => {
        const getSessionStub = testlab_1.sinon.stub(session_1.default, 'getSession').returns(Promise.resolve({
            getUserId: () => '123',
            getAccessTokenPayload: () => ({
                'st-role': {
                    t: 1681996316335,
                    v: ['admin'],
                },
            }),
            getHandle: () => '3733a3f3-566f-40af-aa6c-febd29481279',
        }));
        const strategy = await (0, core_1.instantiateClass)(supertokens_strategy_1.SuperTokensAuthenticationStrategy, context);
        const profile = await strategy.authenticate();
        testlab_1.sinon.assert.calledOnce(getSessionStub);
        const sym = Object.getOwnPropertySymbols(profile).find((s) => s.description === 'securityId') || '';
        (0, testlab_1.expect)(profile[sym]).to.be.equal('123');
        (0, testlab_1.expect)(profile.session).to.be.equal('3733a3f3-566f-40af-aa6c-febd29481279');
        (0, testlab_1.expect)(profile.userId).to.be.equal('123');
        (0, testlab_1.expect)(profile.userDataInAccessToken).to.be.deepEqual({
            'st-role': {
                t: 1681996316335,
                v: ['admin'],
            },
        });
        getSessionStub.restore();
    });
    it('throws on getSession error', async () => {
        const getSessionStub = testlab_1.sinon.stub(session_1.default, 'getSession').throws(new supertokens_node_1.Error({
            message: '401 error from unit test',
            type: 'stub',
        }));
        const strategy = await (0, core_1.instantiateClass)(supertokens_strategy_1.SuperTokensAuthenticationStrategy, context);
        return strategy
            .authenticate()
            .finally(() => {
            getSessionStub.restore();
        })
            .catch((error) => {
            (0, testlab_1.expect)(error.message).to.be.equal('401 error from unit test');
            (0, testlab_1.expect)(error.status).to.be.equal(401);
        });
    });
    it('throws the underlying on unexpected error', async () => {
        const getSessionStub = testlab_1.sinon
            .stub(session_1.default, 'getSession')
            .throws(new Error('unexpected error from unit test'));
        const strategy = await (0, core_1.instantiateClass)(supertokens_strategy_1.SuperTokensAuthenticationStrategy, context);
        return strategy
            .authenticate()
            .finally(() => {
            getSessionStub.restore();
        })
            .catch((error) => {
            (0, testlab_1.expect)(error.message).to.be.equal('unexpected error from unit test');
            (0, testlab_1.expect)(error.status).to.be.undefined();
        });
    });
});
//# sourceMappingURL=supertokens.strategy.test.js.map
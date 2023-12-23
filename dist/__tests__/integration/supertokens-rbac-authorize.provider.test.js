"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const application_1 = require("../fixtures/test-app/application");
const supertokens_config_1 = require("../fixtures/test-app/supertokens.config");
const supertokens_rbac_authorize_provider_1 = require("../../authorization/supertokens-rbac-authorize.provider");
describe('@authorize w/ SuperTokensRBACAuthorizeProvider', () => {
    let app;
    let client;
    let getSessionStub;
    before(async () => {
        (0, supertokens_config_1.configureSupertokens)();
        app = new application_1.TestApplication({
            rest: (0, testlab_1.givenHttpServerConfig)(),
        });
        await app.boot();
        await app.start();
    });
    before(() => {
        client = (0, testlab_1.createRestAppClient)(app);
    });
    after(async () => {
        await app.stop();
    });
    afterEach(() => {
        getSessionStub.restore();
    });
    it('authorize is called for protected endpoint', async () => {
        const authorizerSpy = testlab_1.sinon.spy(supertokens_rbac_authorize_provider_1.SuperTokensRBACAuthorizeProvider.prototype, 'authorize');
        getSessionStub = testlab_1.sinon.stub(session_1.default, 'getSession').returns(Promise.resolve({
            getUserId: () => 'f48b7167-8d95-451c-bbfc-8a12cd49e763',
            getAccessTokenPayload: () => ({
                'st-role': {
                    t: 1681996316335,
                    v: ['admin'],
                },
            }),
            getHandle: () => '3733a3f3-566f-40af-aa6c-febd29481279',
        }));
        await client.post('/refunds').expect(200);
        (0, testlab_1.expect)(getSessionStub.firstCall.args.length).to.be.equal(2);
        (0, testlab_1.expect)(getSessionStub.secondCall.args.length).to.be.equal(3);
        testlab_1.sinon.assert.calledOnce(authorizerSpy);
        authorizerSpy.restore();
    });
});
//# sourceMappingURL=supertokens-rbac-authorize.provider.test.js.map
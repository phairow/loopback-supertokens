"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const supertokens_node_1 = require("supertokens-node");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const application_1 = require("../fixtures/test-app/application");
const supertokens_config_1 = require("../fixtures/test-app/supertokens.config");
describe('@authenticate("supertokens")', () => {
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
    it('can call protected endpoint', async () => {
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
        const res = await client.get('/authentication/users/me').expect(200);
        testlab_1.sinon.assert.calledOnce(getSessionStub);
        (0, testlab_1.expect)(res.body).to.deepEqual({
            userDataInAccessToken: {
                'st-role': {
                    t: 1681996316335,
                    v: ['admin'],
                },
            },
            userId: 'f48b7167-8d95-451c-bbfc-8a12cd49e763',
        });
    });
    it('returns proper 401 on SuperTokens error', async () => {
        getSessionStub = testlab_1.sinon.stub(session_1.default, 'getSession').throws(new supertokens_node_1.Error({
            message: '401 error from SuperTokens',
            type: 'stub',
        }));
        const res = await client.get('/authentication/users/me').expect(401);
        testlab_1.sinon.assert.calledOnce(getSessionStub);
        (0, testlab_1.expect)(res.body).to.deepEqual({
            error: {
                message: '401 error from SuperTokens',
                name: 'UnauthorizedError',
                statusCode: 401,
            },
        });
    });
    it('returns 500 on unexpected error', async () => {
        getSessionStub = testlab_1.sinon
            .stub(session_1.default, 'getSession')
            .throws(new Error('unexpected error from test'));
        const res = await client.get('/authentication/users/me').expect(500);
        testlab_1.sinon.assert.calledOnce(getSessionStub);
        (0, testlab_1.expect)(res.body).to.deepEqual({
            error: {
                message: 'Internal Server Error',
                statusCode: 500,
            },
        });
    });
});
//# sourceMappingURL=supertokens.strategy.test.js.map
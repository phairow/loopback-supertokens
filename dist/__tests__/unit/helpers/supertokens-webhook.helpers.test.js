"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const axios_1 = __importStar(require("axios"));
const supertokens_webhook_helper_1 = require("../../../helpers/supertokens-webhook.helper");
const types_1 = require("../../../types");
describe('SupertokensWebhookHelper', () => {
    const mockWebhookEvent = {
        data: { user: { id: 'ede4bf8e-38f8-4ff7-b07a-2836de2ba904' } },
        type: types_1.WebhookEventType.UserSignUp,
    };
    describe('dispatchWebhookEvent', () => {
        const webhookHelper = new supertokens_webhook_helper_1.SupertokensWebhookHelper('testkey');
        it('Correctly sets "Webhook-Signature"', async () => {
            const axiosPost = testlab_1.sinon.stub(axios_1.default, 'post').resolves();
            await webhookHelper.dispatchWebhookEvent('https://example.com/webhook', mockWebhookEvent);
            testlab_1.sinon.assert.calledOnce(axiosPost);
            (0, testlab_1.expect)(axiosPost.getCall(0).args[0]).to.be.eql('https://example.com/webhook');
            (0, testlab_1.expect)(axiosPost.getCall(0).args[1]).to.be.eql(mockWebhookEvent);
            const axiosConfigArgument = axiosPost.getCall(0).args[2];
            (0, testlab_1.expect)(axiosConfigArgument.headers).have.property('webhook-signature');
            (0, testlab_1.expect)(axiosConfigArgument.headers['webhook-signature']).to.match(/^t=\d+\sv1=.+$/);
            axiosPost.restore();
        });
        it('Handles and wraps errors', async () => {
            const axiosPost = testlab_1.sinon
                .stub(axios_1.default, 'post')
                .rejects(new axios_1.AxiosError('Gateway Timeout (from unit test)', '504'));
            try {
                await webhookHelper.dispatchWebhookEvent('https://example.com/webhook', mockWebhookEvent);
            }
            catch (err) {
                (0, testlab_1.expect)(err.message).to.be.eql('Webhook failed: status="504" message="Gateway Timeout (from unit test)"');
            }
            axiosPost.restore();
        });
    });
    describe('verifyEventSignature', () => {
        const expected = 'k3sYVKM84CvM8szBhNkXJbbYUgb3WRKpSdVe/wEG5EY=';
        const webhookHelper = new supertokens_webhook_helper_1.SupertokensWebhookHelper('Secret Enchanted Broccoli Forest', 'webhook-signature');
        it(`Can verify signature header against body`, () => {
            const clock = testlab_1.sinon.useFakeTimers(1683810604 + 320);
            (0, testlab_1.expect)(webhookHelper.verifyEventSignature(mockWebhookEvent, 't=1683810604 v1=k3sYVKM84CvM8szBhNkXJbbYUgb3WRKpSdVe/wEG5EY=')).to.eql(expected);
            clock.restore();
        });
        it(`Fails if signatures mismatch`, () => {
            const clock = testlab_1.sinon.useFakeTimers(1683810604 + 320);
            (0, testlab_1.expect)(() => {
                const otherWebhookHelper = new supertokens_webhook_helper_1.SupertokensWebhookHelper('Panic In Babylon', 'webhook-signature');
                otherWebhookHelper.verifyEventSignature(mockWebhookEvent, 't=1683810604 v1=k3sYVKM84CvM8szBhNkXJbbYUgb3WRKpSdVe/wEG5EY=');
            }).to.throw('Webhook request malformed, signature mismatch');
            clock.restore();
        });
        describe(`Fails if signature is missing or invalid`, () => {
            let clock;
            beforeEach(() => {
                clock = testlab_1.sinon.useFakeTimers(1683810604 + 1289 * 1000);
            });
            afterEach(() => {
                clock.restore();
            });
            ['', undefined, null, 't=1683810604 v1='].forEach((inputSignatureHeader, i) => {
                it(`Throws #${i + 1}`, () => {
                    (0, testlab_1.expect)(() => {
                        webhookHelper.verifyEventSignature(mockWebhookEvent, inputSignatureHeader);
                    }).to.throw('Webhook request malformed, missing or invalid signature header');
                });
            });
        });
        it(`Fails if event is _too late_`, () => {
            const clock = testlab_1.sinon.useFakeTimers(1683810604 + 5000 * 1000);
            (0, testlab_1.expect)(() => {
                webhookHelper.verifyEventSignature(mockWebhookEvent, 't=1683810604 v1=k3sYVKM84CvM8szBhNkXJbbYUgb3WRKpSdVe/wEG5EY=');
            }).to.throw('Webhook request malformed, expired signature header');
            clock.restore();
        });
    });
    describe('computeEventSignature', () => {
        const webhookHelper = new supertokens_webhook_helper_1.SupertokensWebhookHelper('testkey');
        it('Computes correct signature for tuple (event, timestamp, secret)', () => {
            const expectedSignature = 'YVDHA/tG6mDid95MtrBpcc4+RegJ7WpMpQlGQIekcQc=';
            (0, testlab_1.expect)(webhookHelper.computeEventSignature(mockWebhookEvent, 1683561413)).to.eql(expectedSignature);
            (0, testlab_1.expect)(webhookHelper.computeEventSignature({
                data: { user: { id: '0ab2bde4-9f31-4562-9d2a-5989dcf7db48' } },
                type: types_1.WebhookEventType.UserSignUp,
            }, 1683561413)).to.not.eql(expectedSignature);
            (0, testlab_1.expect)(webhookHelper.computeEventSignature(mockWebhookEvent, 1683561634)).to.not.eql(expectedSignature);
            const otherWebhookHelper = new supertokens_webhook_helper_1.SupertokensWebhookHelper('othertestkey');
            (0, testlab_1.expect)(otherWebhookHelper.computeEventSignature(mockWebhookEvent, 1683561413)).to.not.eql(expectedSignature);
        });
    });
    describe('parseSignatureHeader', () => {
        const webhookHelper = new supertokens_webhook_helper_1.SupertokensWebhookHelper('testkey');
        const expectedParsedObject = {
            timestamp: 1683810604,
            value: 'YVDHA/tG6mDid95MtrBpcc4+RegJ7WpMpQlGQIekcQc=',
        };
        [
            [
                't=1683810604 v1=YVDHA/tG6mDid95MtrBpcc4+RegJ7WpMpQlGQIekcQc=',
                expectedParsedObject,
            ],
            [
                'v1=YVDHA/tG6mDid95MtrBpcc4+RegJ7WpMpQlGQIekcQc= t=1683810604',
                expectedParsedObject,
            ],
            [
                't=1683810604 v1=YVDHA/tG6mDid95MtrBpcc4+RegJ7WpMpQlGQIekcQc= v2=8bv1rB6Hz9D4/UFyxbWN7PCci29eB7m7lblUTl+KmwA=',
                expectedParsedObject,
            ],
            [
                '    t=1683810604     v1=YVDHA/tG6mDid95MtrBpcc4+RegJ7WpMpQlGQIekcQc=   ',
                expectedParsedObject,
            ],
            [
                `
          t=1683810604
  
          v1=YVDHA/tG6mDid95MtrBpcc4+RegJ7WpMpQlGQIekcQc=
        `,
                expectedParsedObject,
            ],
        ].forEach(([input, expected], i) => {
            it(`Works #${i + 1}`, () => {
                (0, testlab_1.expect)(webhookHelper.parseSignatureHeader(input)).to.eql(expected);
            });
        });
        const MISSING_HEADER_ERROR_MSG = 'No signature header string to parse';
        const MALFORMED_HEADER_ERROR_MSG = 'Malformed signature header';
        [
            ['', MISSING_HEADER_ERROR_MSG],
            [undefined, MISSING_HEADER_ERROR_MSG],
            [null, MISSING_HEADER_ERROR_MSG],
            ['abc123', MALFORMED_HEADER_ERROR_MSG],
            ['t=1683810604 ', MALFORMED_HEADER_ERROR_MSG],
            [
                'v1=YVDHA/tG6mDid95MtrBpcc4+RegJ7WpMpQlGQIekcQc=',
                MALFORMED_HEADER_ERROR_MSG,
            ],
        ].forEach(([input, expectedErrorMsg], i) => {
            it(`Throws for invalid input #${i + 1}`, () => {
                (0, testlab_1.expect)(() => {
                    webhookHelper.parseSignatureHeader(input);
                }).to.throw(expectedErrorMsg);
            });
        });
    });
});
//# sourceMappingURL=supertokens-webhook.helpers.test.js.map
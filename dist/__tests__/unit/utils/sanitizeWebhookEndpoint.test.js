"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const sanitizeWebhookEndpoint_1 = require("../../../utils/sanitizeWebhookEndpoint");
describe('sanitizeWebhookEndpoint', () => {
    [
        ['https://example.com/webhook', 'https://example.com/webhook'],
        [
            'https://example.com/webhook?whatever=1',
            'https://example.com/webhook?whatever=1',
        ],
        ['http://localhost:4000/webhook', 'http://localhost:4000/webhook'],
    ].forEach(([input, expected], i) => {
        it(`Works #${i + 1}`, () => {
            (0, testlab_1.expect)((0, sanitizeWebhookEndpoint_1.sanitizeWebhookEndpoint)(input)).to.eql(expected);
        });
    });
    [
        '',
        undefined,
        null,
        '12',
        'false',
        '/without-domain',
        'example/some/endpoint',
    ].forEach((input, i) => {
        it(`Throws for invalid input #${i + 1}`, () => {
            (0, testlab_1.expect)(() => {
                (0, sanitizeWebhookEndpoint_1.sanitizeWebhookEndpoint)(input);
            }).to.throw(/Invalid webhook endpoint, expected valid URL, got/);
        });
    });
});
//# sourceMappingURL=sanitizeWebhookEndpoint.test.js.map
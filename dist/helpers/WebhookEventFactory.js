"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookEventFactory = void 0;
const types_1 = require("../types");
class WebhookEventFactory {
    createUserSignInEvent(res) {
        return {
            data: {
                user: {
                    id: res.user.id,
                },
            },
            type: types_1.WebhookEventType.UserSignIn,
        };
    }
    createUserSignUpEvent(res) {
        return {
            data: {
                user: {
                    id: res.user.id,
                },
            },
            type: types_1.WebhookEventType.UserSignUp,
        };
    }
}
exports.WebhookEventFactory = WebhookEventFactory;
//# sourceMappingURL=WebhookEventFactory.js.map
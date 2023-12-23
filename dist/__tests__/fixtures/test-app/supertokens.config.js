"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSupertokens = exports.supertokens = void 0;
const supertokens_node_1 = __importDefault(require("supertokens-node"));
const emailpassword_1 = __importDefault(require("supertokens-node/recipe/emailpassword"));
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const userroles_1 = __importDefault(require("supertokens-node/recipe/userroles"));
var supertokens_node_2 = require("supertokens-node");
Object.defineProperty(exports, "supertokens", { enumerable: true, get: function () { return __importDefault(supertokens_node_2).default; } });
const appInfo = {
    apiDomain: 'http://localhost:9001',
    appName: 'test-app',
    websiteDomain: 'http://localhost:9000',
};
function configureSupertokens() {
    supertokens_node_1.default.init({
        appInfo,
        framework: 'loopback',
        recipeList: [emailpassword_1.default.init(), session_1.default.init(), userroles_1.default.init()],
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CORE_CONNECTION_URI || '',
        },
    });
}
exports.configureSupertokens = configureSupertokens;
//# sourceMappingURL=supertokens.config.js.map
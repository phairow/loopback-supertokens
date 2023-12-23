"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestApplication = void 0;
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const loopback_supertokens_component_1 = require("../../../loopback-supertokens.component");
class TestApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        this.component(authentication_1.AuthenticationComponent);
        this.configure(authorization_1.AuthorizationBindings.COMPONENT).to({
            defaultDecision: authorization_1.AuthorizationDecision.DENY,
            precedence: authorization_1.AuthorizationDecision.ALLOW,
        });
        this.component(authorization_1.AuthorizationComponent);
        this.component(loopback_supertokens_component_1.SupertokensComponent);
        this.projectRoot = __dirname;
        this.bootOptions = {
            controllers: {
                dirs: ['controllers'],
                extensions: ['.controller.ts', '.controller.js'],
                nested: true,
            },
        };
    }
}
exports.TestApplication = TestApplication;
//# sourceMappingURL=application.js.map
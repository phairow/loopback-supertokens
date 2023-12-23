import { Binding, Component } from '@loopback/core';
import { RestApplication } from '@loopback/rest';
export declare class SupertokensComponent implements Component {
    bindings: Binding[];
    constructor(app: RestApplication);
}

import { juggler } from '@loopback/repository';
export declare class MemoryDataSource extends juggler.DataSource {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
    };
    constructor(dsConfig?: object);
}

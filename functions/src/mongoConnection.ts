import { connect } from 'mongoose';

export interface IMongoConnection {
    uri: string;
    options: any;
}

export class MongoConnection {
    private uri: string;
    private options: any;
    private connected = false;

    constructor({ uri, options }: IMongoConnection) {
        this.uri = uri;
        this.options = options;
    }

    connect = async () => {
        if (this.connected) return;
        await connect(this.uri, this.options);
        console.info(`Successfully to connected MongoDB`);
        this.connected = true;
    };
}

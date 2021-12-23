import { MongoConnection } from './mongoConnection';

try {
    const mongooseOptions = {
        dbName: 'hrm',
        user: 'hrm',
        pass: 'hrmPassword',
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    const mongoose = new MongoConnection({
        uri: 'mongodb+srv://hrm:hrmPassword@cluster0.zzdys.mongodb.net/hrm?retryWrites=true&w=majority',
        options: mongooseOptions
    });

    mongoose.connect();
} catch (error) {
    console.error(error);
    process.exit(-1);
}

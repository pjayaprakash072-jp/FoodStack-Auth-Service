const dotEnv = require('dotenv');
dotEnv.config();
const app = require('./app')
const connectDB = require('./src/config/db');
const {connectRedis} = require('./src/config/redis');


const {connectProducer} = require('./src/utils/kafka/producer')
const {connectConsumer} = require('./src/utils/kafka/consumer');
const {createTopics} = require('./src/utils/kafka/createTopics')
const KAFKA_TOPICS = require('./src/utils/kafka/topics');


const PORT = process.env.PORT || 5000
const startServer =async ()=>{
    try {
        await connectDB();
        await connectRedis();

        await createTopics();
        await connectProducer();
        await connectConsumer(Object.values(KAFKA_TOPICS))
        app.listen(PORT,()=>{
            console.log(`Server is running at port ${PORT}`)
        })
    } catch (error) {
        console.log("Failed to Start Server!",error);
        process.exit(1);
    }
}
startServer();
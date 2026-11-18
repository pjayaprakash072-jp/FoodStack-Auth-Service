const {Kafka} = require('kafkajs');

const kafka = new Kafka(
  {
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers:[process.env.KAFKA_BROKERS || "localhost:9092"],
    retry:{
      initialRetryTime:300,
      retries:5
    }
  }
)

const producer = kafka.producer();

const connectProducer = async()=>{
  await producer.connect();
  console.log(`Kafka producer connected(auth-service)`)
}

module.exports = {
  kafka,
  connectProducer
}
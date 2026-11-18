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
module.exports = kafka;
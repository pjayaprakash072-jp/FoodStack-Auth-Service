const {Kafka} = require('kafkajs');

const caCert = Buffer.from(
  process.env.KAFKA_CA_CERT,
  'base64'
).toString('utf-8')
console.log(caCert);
const kafka = new Kafka(
  {
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers:(process.env.KAFKA_BROKERS || "localhost:9092").split(","),
    //=================================== for deployment =======================
    ssl:{
      ca:[caCert]
    },
    sasl:{
      mechanism:process.env.KAFKA_SASL_MECHANISM || 'plain',
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD
    },
    //============================================================================
    retry:{
      initialRetryTime:300,
      retries:5
    },
    connectionTimeout: 10000,
    requestTimeout:30000
  }
)
module.exports = kafka;
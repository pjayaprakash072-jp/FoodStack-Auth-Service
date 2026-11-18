const kafka = require('../../config/kafka');

const producer = kafka.producer();

const connectProducer = async()=>{
  try {
    await producer.connect();
    console.log("Kafka producer connected successfully!")
  } catch (error) {
    console.log("Kafka producer connection Error.",error);
    throw error;
  }
}

const pbulishMessage = async(topic,msg)=>{
  try {
    await producer.send(
      {
        topic,
        messages:[
          {
            value: JSON.stringify(msg),
          }
        ]
      }
    )
    console.log("Message published to : ",topic)
  } catch (error) {
    console.log("Kafka producer Error:",error);
    throw error
  }
}

const disconnectproducer = async()=>{
  await producer.disconnect();
}

module.exports = {
  connectProducer,
  pbulishMessage,
  disconnectproducer
}
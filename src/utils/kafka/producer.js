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

const publishMessage = async(topic,msg)=>{
  try {
    const { eventType, eventId, ...message}= msg;
    await producer.send(
      {
        topic,
        messages:[
          {
            key:eventId?eventId : undefined,
            value: JSON.stringify(message),
            headers:{
              eventType,
              version:"1"
            }
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
  publishMessage,
  disconnectproducer
}
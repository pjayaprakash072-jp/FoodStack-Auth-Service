const kafka = require('../../config/kafka');

const consumer = kafka.consumer(
  {
    groupId:process.env.KAFKA_GROUP_ID
  }
);

const connectConsumer = async(topics)=>{
  try {
    await consumer.connect();
    console.log("Kafka consumer connected successfully!");

    for(const topic of topics){
      await consumer.subscribe(
        {
          topic,
          fromBeginning:false
        }
      )
    }

    await consumer.run(
      {
        eachMessage: async ({topic,partition,message})=>{
          const eventType = message.headers?.eventType?.toString();
          const data = JSON.parse(message.value.toString());
          console.log("Received Kafka message:",{
            eventType,
            topic,
            partition,
            data
          })
        }
      }
    )
  } catch (error) {
    console.log("Kafka consume Error: ", error);
    throw error;
  }
}
const disconnectConsumer = async()=>{
  await consumer.disconnect();
}

module.exports = {
  consumer,
  connectConsumer,
  disconnectConsumer
}
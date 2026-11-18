const kafka = require('../../config/kafka');

const consumer = kafka.consumer();

const connectConsumer = async(topics)=>{
  try {
    await consumer.connect();
    console.log("Kafka consumer connected successfully!");

    for(const topic of topics){
      await consumer.subscribe(
        {
          topic,
          fromBeginning:true
        }
      )
    }

    await consumer.run(
      {
        eachMessage: async ({topic,partition,message})=>{
          const data = JSON.parse(message.value.toString());
          console.log("Received Kafka message:",{
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
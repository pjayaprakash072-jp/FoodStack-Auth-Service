const kafka = require('../../config/kafka');
const {
  userProfileCreated,
  userProfileFailed
} = require('./handlers/userServiceHandler')
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
          switch(eventType){
            case "USER_PROFILE_CREATED":
              await userProfileCreated(data).then(()=>console.log("profile created handled")).catch((err)=>console.log("handled Failed",err))
              break;
            case "USER_PROFILE_FAILED":
              await userProfileFailed(data);
              break;
            default:
              throw new Error("Unknown eventType:",eventType);
          }
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
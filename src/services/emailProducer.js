const connectRabbitMQ = require('../config/rabbitmq');
const sendEmailJob = async(emailData)=>{
  const channel = await connectRabbitMQ();
  const msg = {
    type:emailData.type,
    data:emailData.data
  }
  channel.sendToQueue(
    "email_queue",
    Buffer.from(JSON.stringify(msg)),
    {
      persistent:true,
      contentType:"application/json"
    }
  )
  await channel.waitForConfirms();
  console.log(`Email job published successfully!`);
}
module.exports = sendEmailJob;
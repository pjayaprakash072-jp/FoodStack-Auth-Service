const amqp = require('amqplib');
let connection;
let channel;
const connectRabbitMQ = async()=>{
  if(channel){
    return channel;
  }
  connection = await amqp.connect(
    process.env.RABBITMQ_URL
  );
  channel = await connection.createConfirmChannel();
  await channel.assertQueue("email_queue",{
    durable:true
  })
  console.log("RabbitMQ connected successfully!");
  connection.on("close",()=>{
    connection = null;
    channel = null;
    console.log(`RabbitMQ connection closed!`);
  })
  connection.on("error",(error)=>{
    console.error(`RabbitMQ connection error:`,error)
  })
  return channel;
}
module.exports = connectRabbitMQ;
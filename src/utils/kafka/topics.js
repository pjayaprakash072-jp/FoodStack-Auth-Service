const KAFKA_TOPICS = {
  USER_REG_REQ:"user.registration.requested",
  EMAIL_REQUESTS:"email.requests"
}
const CONSUMER_TOPICS = {
  USER_PROFILE_CREATED:"user.profile.created",
  USER_PROFILE_FAILED:"user.profile.failed",
}
module.exports = {
  KAFKA_TOPICS,
  CONSUMER_TOPICS
};
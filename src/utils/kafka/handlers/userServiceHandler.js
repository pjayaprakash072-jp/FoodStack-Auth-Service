const User = require('../../../models/UserAuth');

const userProfileCreated = async(event)=>{
  try {
    const {
      authId,
      data
    } = event;
    const user = await User.findById(authId);
    if(!user){
      throw new Error("Auth user not found :",authId)
    }
    if(user.registrationStatus === "ACTIVE"){
      return ;
    }

    user.registrationStatus = "ACTIVE";
    await user.save();
    console.log("User Registration is completed for :", authId);
  } catch (error) {
    console.log("User profile creation failed in AuthService:",error);
    throw error;
  }
}
const userProfileFailed = async(event)=>{
    const {authId,data} = event;

    const user = await User.findById(authId);
    if(!user) {
      return ;
    }
    if(user.registrationStatus === "ACTIVE"){
      return ;
    }
    user.registrationStatus = "FAILED"
    user.registrationError = data.reason;

    await user.save();
    console.log("User Registration failed for :" , authId);
}
module.exports = {
  userProfileCreated,
  userProfileFailed
}
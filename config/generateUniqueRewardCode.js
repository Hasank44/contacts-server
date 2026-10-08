import Reward from "../models/Reward/Reward.js";

async function generateUniqueReward() {
  let code;
  let exists = true;

  while (exists) {
    code = generateCode();
    exists = await Reward.findOne({ code }).lean();
  }

  return code;
}

function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}

export default generateUniqueReward;

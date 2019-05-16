import bcrypt from 'bcryptjs';

const helpersValidPassword:any = {};

helpersValidPassword.encryptPassword = async (password:any) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpersValidPassword.matchPassword = async (password:any, savePassword:any) => {
  try {
    return await bcrypt.compare(password, savePassword);
  } catch (e) {
      console.log(e);
    }
};

export default helpersValidPassword;
import * as bcrypt from 'bcrypt';

export const hashedPass = async (password: string) => {
  const salt = await bcrypt.genSalt(5);
  const newPassword = await bcrypt.hash(password, salt);
  return newPassword;
};

export const validatePass = async (
  password: string,
  hashedPassword: string,
) => {
  const validUser = await bcrypt.compare(password, hashedPassword);
  return validUser;
};

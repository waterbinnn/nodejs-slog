import { duplicateVerifyUser, generateHash } from '../lib/authHelper';
import db from '../lib/db';

function authService() {
  const register = async (email: string, pwd: string) => {
    try {
      await duplicateVerifyUser(email); //여기서 오류나면 아래 내용 더이상 실행 X
      const hashPwd = generateHash(pwd); //패스워드 암호화

      //객체 형태로 만들고
      const values = {
        email,
        password: hashPwd,
      };

      const returnValue = await db.user.create({
        data: values,
      }); //정상적으로 db에 저장되면

      return returnValue; //값을 리턴
    } catch (error) {
      throw error;
    }
  };
  return {
    register,
  };
}

export default authService();

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { registerSchema } from '../../schema';
import { TAuthBody } from '../../schema/types';
import authService from '../../services/authService';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../lib/constants';
import { handleError } from '../../lib/errorHelper';

const authRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/register',
    { schema: registerSchema },
    async (req: FastifyRequest<{ Body: TAuthBody }>, rep: FastifyReply) => {
      const { email, pwd } = req.body;

      try {
        await authService.register(email, pwd);
        rep
          .status(SUCCESS_MESSAGE.registerOk.status) //body 값에 대한 유무는 스키마에서 체크하기 때문에 여기서 해줄 필요 X
          .send(SUCCESS_MESSAGE.registerOk);
      } catch (error) {
        handleError(rep, ERROR_MESSAGE.badRequest, error);
      }
    }
  );
};

export default authRoute;

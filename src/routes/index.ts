import fastify, { FastifyInstance } from 'fastify';
import authRoute from './auth';

const routes = async (fastify: FastifyInstance) => {
  ///auth/register
  await fastify.register(authRoute, { prefix: '/auth' });
};

export default routes;

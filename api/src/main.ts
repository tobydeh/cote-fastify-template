import Fastify, { FastifyInstance } from 'fastify'
import { Requester } from 'cote';
import hyperid from 'hyperid';

const uuid = hyperid();

const server: FastifyInstance = Fastify({
  genReqId: () => uuid()
})

const serviceRequester = new Requester({
  name: "Servcie1 requester",
  namespace: "service1",
})

server.all('/', (request, reply) => {
   serviceRequester.send({
    type: 'test',
    requestId: request.id,
    data: request.body
   }, (error, data) => {
     if(error) return reply.code(500).send(error);
     reply.code(200).send(data);
   })
})

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    console.log('Server listening on', port);
    await server.listen(port, '0.0.0.0');
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()

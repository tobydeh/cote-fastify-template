import { Responder } from 'cote';
import { test } from '@project/shared/utils';

const service1Responder = new Responder({
  name: "Service1 responder",
  namespace: "service1",
})

service1Responder.on('test', (req, cb) => {
  console.log(req);
  cb(null, test);
})

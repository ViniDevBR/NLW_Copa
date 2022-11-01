import Fastify from "fastify";

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  //localhost:4444/pools/count
  fastify.get('/pools/count',() => {
    return {
      count: 123456
    }
  })

  await fastify.listen({ port: 4444 })
}

bootstrap()
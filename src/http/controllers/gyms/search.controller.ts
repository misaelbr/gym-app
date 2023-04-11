import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQUerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymQUerySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymUseCase()

  const { gyms } = await searchGymUseCase.execute({ query: q, page })

  return reply.status(200).send({ gyms })
}

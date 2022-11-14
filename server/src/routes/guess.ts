import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function guessRoutes(fastify: FastifyInstance){
  fastify.get('/guesses/count', async() => {
    const countGuesses = await prisma.guess.count()

    return { countGuesses }
  })

  fastify.post('/pools/:poolId/games/:gameId/guesses', {onRequest: [authenticate]}, async (request, reply) => {
    const createGuessParams = z.object({
      poolId: z.string(),
      gamesId: z.string(),
    })

    const createGuessBody = z.object({
      firstTeamPoints: z.number(),
      secondTeamPoints: z.number(),
    });

    const { poolId, gamesId } = createGuessParams.parse(request.params)
    const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(request.body)

    const participant = await prisma.participants.findUnique({
      where: {
        userId_poolId: {
          poolId,
          userId: request.user.sub,
        }
      }
    })

    if (!participant) {
      return reply.status(400).send({
        message: "You're not allowed to create a guess inside this pool."
      })
    }

    const guess = await prisma.guess.findUnique({
      where: {
        participantsId_gamesId: {
          participantsId: participant.id,
          gamesId
        }
      }
    })

    if (guess) {
      return reply.status(400).send({
        message: "You already sent a guess to this game on this pool."
      })
    }

    const game = await prisma.games.findUnique({
      where: {
        id: gamesId,
      }
    })

    if (!game) {
      return reply.status(400).send({
        message: "Game not found."
      })
    }

    if (game.date < new Date()) {
      return reply.status(400).send({
        message: "You cannot send guesses after the game date."
      })
    }

    await prisma.guess.create({
      data: {
        gamesId,
        participantsId: participant.id,
        firstTeamPoints,
        secondTeamPoints,
      }
    })

    return reply.status(201).send()
  })
}
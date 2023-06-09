import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validade-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckinsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}

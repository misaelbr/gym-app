import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface SearchGymsUseCaseRequest {
  query: string
  page?: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[] | null
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    if (!page) {
      page = 1
    }
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}

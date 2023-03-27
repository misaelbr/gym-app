import { InMemoryGimsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGimsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGimsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search a gym', async () => {
    await gymsRepository.create({
      id: '456',
      title: 'Javascript gym',
      description: 'A gym for javascript developers',
      latitude: new Decimal(-29.720723),
      longitude: new Decimal(-52.5211914),
      created_at: new Date(),
      updated_at: null,
      phone: null,
    })

    await gymsRepository.create({
      id: '457',
      title: 'Typescript GYm',
      description: 'A gym for javascript developers',
      latitude: new Decimal(-29.720623),
      longitude: new Decimal(-52.5218914),
      created_at: new Date(),
      updated_at: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript gym' })])
  })

  it('should be abe to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `${i}`,
        title: `Javascript Gym ${i}`,
        description: 'A gym for javascript developers',
        latitude: new Decimal(-29.720623),
        longitude: new Decimal(-52.5218914),
        created_at: new Date(),
        updated_at: null,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})

import { InMemoryGimsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGimsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGimsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      id: '456',
      title: 'Far gym',
      description: 'A gym for javascript developers',
      latitude: new Decimal(-29.6197784),
      longitude: new Decimal(-52.2171801),
      created_at: new Date(),
      updated_at: null,
      phone: null,
    })

    await gymsRepository.create({
      id: '457',
      title: 'Near Gym',
      description: 'A gym for javascript developers',
      latitude: new Decimal(-29.720623),
      longitude: new Decimal(-52.5218914),
      created_at: new Date(),
      updated_at: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -29.720723,
      userLongitude: -52.5211914,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})

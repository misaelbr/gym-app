import { InMemoryGimsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let inMemoryGymnsRepository: InMemoryGimsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    inMemoryGymnsRepository = new InMemoryGimsRepository()
    sut = new CreateGymUseCase(inMemoryGymnsRepository)
  })

  it('shoud be able to create Gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -29.7198873,
      longitude: -52.503749,
    })

    expect(gym.id).toEqual(expect.any(String))
  })

  it('should be able to find a Gym by id', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: 'A gym for javascript developers',
      phone: null,
      latitude: -29.7198873,
      longitude: -52.503749,
    })

    const gymFound = await inMemoryGymnsRepository.findById(gym.id)

    expect(gymFound).toEqual(gym)
  })

  it('should be not able to find a Gym by invalid id', async () => {
    await sut.execute({
      title: 'JavaScript Gym',
      description: 'A gym for javascript developers',
      phone: null,
      latitude: -29.7198873,
      longitude: -52.503749,
    })

    const gymFound = await inMemoryGymnsRepository.findById('invalid id')

    expect(gymFound).toEqual(null)
  })
})

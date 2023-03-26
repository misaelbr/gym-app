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
      description: 'A gym for javascript developers',
      phone: null,
      latitude: -29.7198873,
      longitude: -52.503749,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

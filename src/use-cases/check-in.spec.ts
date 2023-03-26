import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGimsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGimsRepository
let checkInUseCase: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGimsRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: '456',
      title: 'Javascript GYm',
      description: 'A gym for javascript developers',
      latitude: new Decimal(-29.720723),
      longitude: new Decimal(-52.5211914),
      created_at: new Date(),
      updated_at: null,
      phone: null,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: '343',
      gymId: '456',
      userLatitude: -29.720723,
      userLongitude: -52.5211914,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be not able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    // -29.720723,-52.5211914
    await checkInUseCase.execute({
      userId: '123',
      gymId: '456',
      userLatitude: -29.720723,
      userLongitude: -52.5211914,
    })

    await expect(() =>
      checkInUseCase.execute({
        userId: '123',
        gymId: '456',
        userLatitude: -29.720723,
        userLongitude: -52.5211914,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in the different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      userId: '123',
      gymId: '456',
      userLatitude: -29.720723,
      userLongitude: -52.5211914,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      userId: '123',
      gymId: '456',
      userLatitude: -29.720723,
      userLongitude: -52.5211914,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    gymsRepository.items.push({
      id: '457',
      title: 'Javascript GYm',
      description: 'A gym for javascript developers',
      latitude: new Decimal(-29.7198873),
      longitude: new Decimal(-52.503749),
      created_at: new Date(),
      updated_at: null,
      phone: null,
    })

    await expect(() =>
      checkInUseCase.execute({
        userId: '123',
        gymId: '457',
        userLatitude: -29.720723,
        userLongitude: -52.5211914,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resourse-not-found-error'

let usersRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })

  it('shoud be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com.br',
      password_hash: await hash('123456', 6),
    })

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('shoud not be able to get user profile with wrong id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialErrors } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('shoud be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com.br',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@teste.com.br',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('shoud not be able to authenticate with wrong email', async () => {
    expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@teste.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialErrors)
  })

  it('shoud not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com.br',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@teste.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialErrors)
  })
})

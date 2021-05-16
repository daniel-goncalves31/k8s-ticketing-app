import request from 'supertest'
import { app } from '../../app'

it('should return 400 if a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400)
})

it('should return 400 if an icorrect password is supplied', async () => {
  await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'password',
  })

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'incorrect_password',
    })
    .expect(400)
})

it('should return 200 if the correct password and email are supplied', async () => {
  await request(app).post('/api/users/signup').send({
    email: 'test@test.com',
    password: 'password',
  })

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})

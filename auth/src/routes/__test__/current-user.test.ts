import request from 'supertest'
import { app } from '../../app'

it('should return 200 with detais about the current user', async () => {
  const cookie = await global.signUp()

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200)

  expect(response.body.currentUser.email).toBe('test@test.com')
})

it('should return 401 if not authenticated', async () => {
  const response = await request(app).get('/api/users/currentuser').expect(200)

  expect(response.body.currentUser).toBeNull()
})

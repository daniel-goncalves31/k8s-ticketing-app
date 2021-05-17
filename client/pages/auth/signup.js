import axios from 'axios'
import { useState } from 'react'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/users/signup', { email, password })
    } catch (error) {
      setErrors(error.response.data.errors)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>SignUp</h1>

      {errors.length && (
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  )
}

export default SignUp

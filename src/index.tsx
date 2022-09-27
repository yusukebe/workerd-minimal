/** @jsx jsx */
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { jsx } from 'hono/jsx'

const app = new Hono()

app.use(
  '/auth/*',
  basicAuth({
    username: 'workerd',
    password: 'iscool',
  })
)

app.get('/', (c) => c.html(<h1>Hello workerd!!</h1>))
app.get('/auth', (c) => c.text('Your are authorized'))

export default app

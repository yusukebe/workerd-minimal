/** @jsx jsx */
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { jsx } from 'hono/jsx'

type Bindings = {
  KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(
  '/auth/*',
  basicAuth({
    username: 'workerd',
    password: 'iscool',
  })
)

app.get('/', (c) => c.html(<h1>Hello workerd!!</h1>))

app.get('/count', async (c) => {
  const value = await c.env.KV.get('count')
  const count = Number(value || '0') + 1
  c.env.KV.put('count', count.toString())

  return c.json({
    count: count,
  })
})

app.get('/auth', (c) => c.text('Your are authorized'))

export default app

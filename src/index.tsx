import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getAppHTML } from './html'

const app = new Hono()

app.use('*', cors())

// ─── Serve main SPA ──────────────────────────────────────────
app.get('/', (c) => {
  return c.html(getAppHTML())
})

// ─── API Routes (Supabase-ready stubs) ───────────────────────
// These routes are ready for Supabase integration.
// Simply replace the stub responses with actual Supabase queries.

// Employees
app.get('/api/employees', (c) => {
  return c.json({ data: [], message: 'Connect Supabase to enable persistence' })
})
app.post('/api/employees', async (c) => {
  const body = await c.req.json()
  return c.json({ data: body })
})

// Inventory
app.get('/api/inventory', (c) => {
  return c.json({ data: [] })
})
app.post('/api/inventory', async (c) => {
  const body = await c.req.json()
  return c.json({ data: body })
})
app.put('/api/inventory/:id', async (c) => {
  const body = await c.req.json()
  return c.json({ data: body })
})
app.delete('/api/inventory/:id', (c) => {
  return c.json({ message: 'Deleted' })
})

// Inventory Logs
app.get('/api/inventory-logs', (c) => {
  return c.json({ data: [] })
})
app.post('/api/inventory-logs', async (c) => {
  const body = await c.req.json()
  return c.json({ data: body })
})

// Orders
app.get('/api/orders', (c) => {
  return c.json({ data: [] })
})
app.post('/api/orders', async (c) => {
  const body = await c.req.json()
  return c.json({ data: body })
})

// Reservations
app.get('/api/reservations', (c) => {
  return c.json({ data: [] })
})
app.post('/api/reservations', async (c) => {
  const body = await c.req.json()
  return c.json({ data: body })
})
app.put('/api/reservations/:id', async (c) => {
  const body = await c.req.json()
  return c.json({ data: body })
})
app.delete('/api/reservations/:id', (c) => {
  return c.json({ message: 'Deleted' })
})

// Tasks
app.get('/api/tasks', (c) => {
  return c.json({ data: [] })
})
app.post('/api/tasks', async (c) => {
  const body = await c.req.json()
  return c.json({ data: body })
})
app.put('/api/tasks/:id', async (c) => {
  const body = await c.req.json()
  return c.json({ data: body })
})
app.delete('/api/tasks/:id', (c) => {
  return c.json({ message: 'Deleted' })
})

export default app

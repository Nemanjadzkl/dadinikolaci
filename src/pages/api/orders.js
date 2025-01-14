import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const ordersPath = path.join(process.cwd(), 'src/data/orders.json')

  switch (req.method) {
    case 'GET':
      try {
        const jsonData = await fs.readFile(ordersPath, 'utf8')
        const data = JSON.parse(jsonData)
        res.status(200).json(data)
      } catch (error) {
        res.status(200).json({ orders: [] })
      }
      break

    case 'POST':
      try {
        const newOrder = {
          id: Date.now().toString(),
          ...req.body,
          createdAt: new Date().toISOString(),
          status: 'Nova'
        }

        const jsonData = await fs.readFile(ordersPath, 'utf8')
        const data = JSON.parse(jsonData)
        
        data.orders.push(newOrder)
        data.statistics.totalOrders++
        data.statistics.totalRevenue += newOrder.total
        
        await fs.writeFile(ordersPath, JSON.stringify(data, null, 2))
        
        res.status(201).json(newOrder)
      } catch (error) {
        res.status(500).json({ message: 'Error creating order' })
      }
      break

    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}

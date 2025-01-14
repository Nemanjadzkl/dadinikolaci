import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const { id } = req.query
  const ordersPath = path.join(process.cwd(), 'src/data/orders.json')

  switch (req.method) {
    case 'PATCH':
      try {
        const jsonData = await fs.readFile(ordersPath, 'utf8')
        const data = JSON.parse(jsonData)
        
        const orderIndex = data.orders.findIndex(order => order.id === id)
        if (orderIndex === -1) {
          return res.status(404).json({ message: 'Order not found' })
        }

        data.orders[orderIndex] = {
          ...data.orders[orderIndex],
          ...req.body,
          updatedAt: new Date().toISOString()
        }

        await fs.writeFile(ordersPath, JSON.stringify(data, null, 2))
        
        res.status(200).json(data.orders[orderIndex])
      } catch (error) {
        res.status(500).json({ message: 'Error updating order' })
      }
      break

    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}

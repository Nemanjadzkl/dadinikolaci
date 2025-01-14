import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const productsPath = path.join(process.cwd(), 'src/data/products.json')
      const ordersPath = path.join(process.cwd(), 'src/data/orders.json')
      const analyticsPath = path.join(process.cwd(), 'src/data/analytics.json')

      // Read all data files
      const [productsData, ordersData, analyticsData] = await Promise.all([
        fs.readFile(productsPath, 'utf8').catch(() => '{"products": []}'),
        fs.readFile(ordersPath, 'utf8').catch(() => '{"orders": [], "statistics": {"totalOrders": 0, "totalRevenue": 0, "totalCustomers": 0}}'),
        fs.readFile(analyticsPath, 'utf8').catch(() => '{"pageViews": {}, "productViews": {}, "popularProducts": []}')
      ])

      const products = JSON.parse(productsData)
      const orders = JSON.parse(ordersData)
      const analytics = JSON.parse(analyticsData)

      // Calculate dashboard statistics
      const stats = {
        totalOrders: orders.orders.length,
        totalRevenue: orders.orders.reduce((sum, order) => sum + order.total, 0),
        totalCustomers: orders.statistics.totalCustomers || 0,
        totalProducts: products.products.length
      }

      // Get recent orders (last 5)
      const recentOrders = orders.orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)

      res.status(200).json({
        stats,
        recentOrders,
        analytics: {
          popularProducts: analytics.popularProducts,
          recentViews: analytics.pageViews
        }
      })
    } catch (error) {
      console.error('Dashboard data error:', error)
      res.status(500).json({ message: 'Error fetching dashboard data' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

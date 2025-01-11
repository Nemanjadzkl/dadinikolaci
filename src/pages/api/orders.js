export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' })
    }
  
    try {
      // Here you would typically save the order to your database
      // For now, we'll just return success
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ message: 'Error creating order' })
    }
  }
  
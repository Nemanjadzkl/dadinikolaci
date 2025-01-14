import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const { id } = req.query
  const bannersPath = path.join(process.cwd(), 'src/data/banners.json')

  switch (req.method) {
    case 'PATCH':
      try {
        const data = JSON.parse(await fs.readFile(bannersPath, 'utf8'))
        const bannerIndex = data.banners.findIndex(banner => banner.id === id)
        
        if (bannerIndex > -1) {
          const updates = JSON.parse(req.body)
          data.banners[bannerIndex] = {
            ...data.banners[bannerIndex],
            ...updates
          }
          
          await fs.writeFile(bannersPath, JSON.stringify(data, null, 2))
          res.status(200).json(data.banners[bannerIndex])
        } else {
          res.status(404).json({ message: 'Banner not found' })
        }
      } catch (error) {
        console.error('Update error:', error)
        res.status(500).json({ message: 'Error updating banner' })
      }
      break

    case 'DELETE':
      try {
        const data = JSON.parse(await fs.readFile(bannersPath, 'utf8'))
        const bannerIndex = data.banners.findIndex(banner => banner.id === id)
        
        if (bannerIndex > -1) {
          const banner = data.banners[bannerIndex]
          const imagePath = path.join(process.cwd(), 'public', banner.imageUrl)
          
          try {
            await fs.unlink(imagePath)
          } catch (error) {
            console.log('Image already removed')
          }

          data.banners.splice(bannerIndex, 1)
          await fs.writeFile(bannersPath, JSON.stringify(data, null, 2))
          
          res.status(200).json({ message: 'Banner deleted successfully' })
        } else {
          res.status(404).json({ message: 'Banner not found' })
        }
      } catch (error) {
        console.error('Delete error:', error)
        res.status(500).json({ message: 'Error deleting banner' })
      }
      break

    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}

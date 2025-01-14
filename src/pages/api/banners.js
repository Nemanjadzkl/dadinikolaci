import { promises as fs } from 'fs'
import path from 'path'
import formidable from 'formidable'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  const bannersPath = path.join(process.cwd(), 'src/data/banners.json')
  const uploadsDir = path.join(process.cwd(), 'public/uploads/banners')

  await fs.mkdir(uploadsDir, { recursive: true })

  switch (req.method) {
    case 'GET':
      try {
        const fileContent = await fs.readFile(bannersPath, 'utf8')
        const data = JSON.parse(fileContent)
        res.status(200).json(data)
      } catch {
        res.status(200).json({ banners: [] })
      }
      break

    case 'POST':
      try {
        const form = formidable({
          uploadDir: uploadsDir,
          keepExtensions: true
        })

        const [fields, files] = await new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            resolve([fields, files])
          })
        })

        const imageFile = files.image[0]
        const imageUrl = `/uploads/banners/${path.basename(imageFile.filepath)}`

        const banner = {
          id: Date.now().toString(),
          title: fields.title[0],
          description: fields.description[0],
          link: fields.link[0],
          imageUrl,
          isActive: true,
          createdAt: new Date().toISOString()
        }

        let data = { banners: [] }
        try {
          const fileContent = await fs.readFile(bannersPath, 'utf8')
          data = JSON.parse(fileContent)
        } catch {}

        data.banners.push(banner)
        await fs.writeFile(bannersPath, JSON.stringify(data, null, 2))

        res.status(201).json(banner)
      } catch (error) {
        console.error('Upload error:', error)
        res.status(500).json({ error: 'Upload failed' })
      }
      break

    case 'PATCH':
      try {
        const { id } = req.query
        const updates = JSON.parse(req.body)
        
        const jsonData = await fs.readFile(bannersPath, 'utf8')
        const data = JSON.parse(jsonData)
        
        const bannerIndex = data.banners.findIndex(banner => banner.id === id)
        if (bannerIndex > -1) {
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
        res.status(500).json({ message: 'Error updating banner' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.query
        const jsonData = await fs.readFile(bannersPath, 'utf8')
        const data = JSON.parse(jsonData)
        
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
        res.status(500).json({ message: 'Error deleting banner' })
      }
      break

    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}

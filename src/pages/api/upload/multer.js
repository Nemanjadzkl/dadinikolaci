import multer from 'multer'
import path from 'path'
import { promises as fs } from 'fs'

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/images/categories',
    filename: (req, file, cb) => {
      const categoryId = req.body.categoryId
      cb(null, `${categoryId}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' })
    }

    try {
      const categoryId = req.body.categoryId
      const filename = req.file.filename

      const categoriesPath = path.join(process.cwd(), 'src/data/categories.json')
      const categoriesData = JSON.parse(await fs.readFile(categoriesPath, 'utf8'))
      
      categoriesData[categoryId] = {
        ...categoriesData[categoryId],
        imageUrl: `/images/categories/${filename}`
      }

      await fs.writeFile(categoriesPath, JSON.stringify(categoriesData, null, 2))

      res.status(200).json({ 
        success: true,
        imageUrl: `/images/categories/${filename}`
      })
    } catch (error) {
      console.error('Upload error:', error)
      res.status(500).json({ message: 'Error processing file' })
    }
  })
}

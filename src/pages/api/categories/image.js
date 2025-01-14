import { promises as fs } from 'fs'
import path from 'path'
import formidable from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const form = formidable({})
  
  try {
    const [fields, files] = await form.parse(req)
    const file = files.file[0]
    const categoryId = fields.categoryId[0]

    const filename = `${categoryId}-${Date.now()}${path.extname(file.originalFilename)}`
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'categories')
    const filePath = path.join(uploadDir, filename)

    await fs.mkdir(uploadDir, { recursive: true })
    await fs.copyFile(file.filepath, filePath)

    // Update categories.json with new image URL
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
    res.status(500).json({ message: 'Error uploading file' })
  }
}

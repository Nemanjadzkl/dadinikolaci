import { promises as fs } from 'fs'
import path from 'path'
import { formidable } from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  const dataFilePath = path.join(process.cwd(), 'src/data/products.json')
  const uploadsDir = path.join(process.cwd(), 'public/uploads')

  // Create uploads directory if it doesn't exist
  try {
    await fs.access(uploadsDir)
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true })
  }

  switch (req.method) {
    case 'POST':
      try {
        const form = formidable({
          uploadDir: uploadsDir,
          keepExtensions: true,
          multiples: true
        })

        const [fields, files] = await form.parse(req)

        // Handle multiple image uploads
 const imageFiles = files.images || []
 const imageUrls = imageFiles.map(file => `/uploads/${path.basename(file.filepath)}`)

        const newProduct = {
          id: Date.now().toString(),
          name: fields.name[0],
          description: fields.description[0],
          ingredients: fields.ingredients[0],
          preparation: fields.preparation[0],
          servingSize: fields.servingSize[0],
          price: Number(fields.price[0]),
          category: fields.category[0],
          allergens: fields.allergens[0],
          storageInfo: fields.storageInfo[0],
          isSpecialOffer: fields.isSpecialOffer[0] === 'true',
          images: imageUrls,
          createdAt: new Date().toISOString()
        }

        // Read existing data
        let data = { products: [] }
        try {
          const jsonData = await fs.readFile(dataFilePath, 'utf8')
          data = JSON.parse(jsonData)
        } catch {
          // If file doesn't exist, we'll create it
        }

        // Add new product
        data.products.push(newProduct)

        // Save updated data
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))

        res.status(201).json(newProduct)
      } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ message: 'Error adding product' })
      }
      break

    case 'GET':
      try {
        const jsonData = await fs.readFile(dataFilePath, 'utf8')
        const data = JSON.parse(jsonData)
        res.status(200).json(data)
      } catch {
        res.status(200).json({ products: [] })
      }
      break
      case 'DELETE':
        try {
          const { id } = req.query
          const jsonData = await fs.readFile(dataFilePath, 'utf8')
          const data = JSON.parse(jsonData)
          
          data.products = data.products.filter(product => product.id !== id)
          await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
          
          res.status(200).json({ message: 'Product deleted successfully' })
        } catch (error) {
          res.status(500).json({ message: 'Error deleting product' })
        }
        break
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }

}

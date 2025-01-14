import { promises as fs } from 'fs'
import path from 'path'
import { formidable } from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  const blogPath = path.join(process.cwd(), 'src/data/blog.json')
  const uploadsDir = path.join(process.cwd(), 'public/uploads/blog')

  try {
    await fs.access(uploadsDir)
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true })
  }

  switch (req.method) {
    case 'GET':
      try {
        const jsonData = await fs.readFile(blogPath, 'utf8')
        const data = JSON.parse(jsonData)
        res.status(200).json(data)
      } catch {
        res.status(200).json({ posts: [] })
      }
      break

    case 'POST':
      try {
        const form = formidable({
          uploadDir: uploadsDir,
          keepExtensions: true,
        })

        const [fields, files] = await form.parse(req)
        const imageFile = files.image[0]
        const imageUrl = `/uploads/blog/${path.basename(imageFile.filepath)}`

        const newPost = {
          id: Date.now().toString(),
          title: fields.title[0],
          excerpt: fields.excerpt[0],
          content: fields.content[0],
          category: fields.category[0],
          imageUrl,
          isPublished: fields.isPublished[0] === 'true',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        let data = { posts: [] }
        try {
          const jsonData = await fs.readFile(blogPath, 'utf8')
          data = JSON.parse(jsonData)
        } catch {}

        data.posts.push(newPost)
        await fs.writeFile(blogPath, JSON.stringify(data, null, 2))

        res.status(201).json(newPost)
      } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ message: 'Error creating blog post' })
      }
      break

    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}

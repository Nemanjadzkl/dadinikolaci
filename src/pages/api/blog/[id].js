import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const { id } = req.query
  const blogPath = path.join(process.cwd(), 'src/data/blog.json')

  switch (req.method) {
    case 'PATCH':
      try {
        const jsonData = await fs.readFile(blogPath, 'utf8')
        const data = JSON.parse(jsonData)
        
        const postIndex = data.posts.findIndex(post => post.id === id)
        if (postIndex === -1) {
          return res.status(404).json({ message: 'Blog post not found' })
        }

        data.posts[postIndex] = {
          ...data.posts[postIndex],
          ...req.body,
          updatedAt: new Date().toISOString()
        }

        await fs.writeFile(blogPath, JSON.stringify(data, null, 2))
        
        res.status(200).json(data.posts[postIndex])
      } catch (error) {
        res.status(500).json({ message: 'Error updating blog post' })
      }
      break

    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}

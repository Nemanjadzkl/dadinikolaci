import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'src/data/categories.json')

  if (req.method === 'GET') {
    try {
      const fileData = await fs.readFile(filePath, 'utf8')
      const categories = JSON.parse(fileData)
      res.status(200).json(categories)
    } catch (error) {
      const initialCategories = {
        'torte': {
          id: 'torte',
          name: 'Torte',
          description: 'Ukusne torte za sve prilike',
          imageUrl: null
        },
        'kolaci': {
          id: 'kolaci',
          name: 'Kolači',
          description: 'Domaći kolači pravljeni sa ljubavlju',
          imageUrl: null
        },
        'sitni-kolaci': {
          id: 'sitni-kolaci',
          name: 'Sitni Kolači',
          description: 'Savršeni za proslave i posebne prilike',
          imageUrl: null
        },
        'svadbene-torte': {
          id: 'svadbene-torte',
          name: 'Svadbene Torte',
          description: 'Elegantne torte za vaš poseban dan',
          imageUrl: null
        }
      }
      
      await fs.mkdir(path.dirname(filePath), { recursive: true })
      await fs.writeFile(filePath, JSON.stringify(initialCategories, null, 2))
      
      res.status(200).json(initialCategories)
    }
  }
}

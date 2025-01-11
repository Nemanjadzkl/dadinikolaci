import Layout from '@/components/layout/Layout'

function BlogPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-serif mb-8">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog posts will go here */}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage

import { getArticleBySlug } from '../../../lib/db'
import { notFound } from 'next/navigation'

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let article: any = null
  try {
    article = await getArticleBySlug(params.slug)
  } catch (e) {
    console.error('DB error:', e)
  }

  if (!article) return notFound()

  return (
    <article>
      <div className="mb-6">
        <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">{article.category}</span>
        <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-3">{article.title}</h1>
        <p className="text-sm text-gray-400">
          {new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
      <div className="mt-12 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute financial advice.
      </div>
      <div className="mt-6">
        <a href="/" className="text-green-600 hover:underline text-sm">← Back to all articles</a>
      </div>
    </article>
  )
}

import { getPublishedArticles } from '../lib/db'

export default async function HomePage() {
  let articles: any[] = []
  try {
    articles = await getPublishedArticles()
  } catch (e) {
    console.error('DB error:', e)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Personal Finance Tips</h1>
        <p className="text-gray-600">Smart money strategies to help you save, invest, and thrive.</p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-xl">Articles coming soon...</p>
          <p className="text-sm mt-2">Check back shortly for fresh finance tips!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {articles.map((article: any) => (
            <a
              key={article.id}
              href={'/articles/' + article.slug}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">{article.category}</span>
              <h2 className="text-xl font-bold text-gray-800 mt-1 mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{article.excerpt}</p>
              <span className="text-xs text-gray-400 mt-3 block">
                {new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

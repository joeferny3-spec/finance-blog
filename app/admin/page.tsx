'use client'
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin')
    const data = await res.json()
    setArticles(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: number, status: string) => {
    await fetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    })
    setMsg(status === 'published' ? 'Article published!' : 'Article rejected.')
    setTimeout(() => setMsg(''), 2000)
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Admin - Pending Articles</h1>
      <p className="text-sm text-gray-500 mb-6">Review AI-generated articles before publishing.</p>
      {msg && <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-sm">{msg}</div>}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-400">No pending articles. Check back after the next generation run.</p>
      ) : (
        <div className="space-y-6">
          {articles.map((a: any) => (
            <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <span className="text-xs font-semibold text-green-600 uppercase">{a.category}</span>
              <h2 className="text-lg font-bold mt-1 mb-1">{a.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{a.excerpt}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(a.id, 'published')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                >
                  Publish
                </button>
                <button
                  onClick={() => updateStatus(a.id, 'rejected')}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-200"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

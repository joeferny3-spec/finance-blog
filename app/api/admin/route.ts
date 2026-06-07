import { NextResponse } from 'next/server'
import { getPendingArticles, updateArticleStatus } from '../../../lib/db'

export async function GET() {
  try {
    const articles = await getPendingArticles()
    return NextResponse.json(articles)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json()
    if (!id || !['published', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    await updateArticleStatus(id, status)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

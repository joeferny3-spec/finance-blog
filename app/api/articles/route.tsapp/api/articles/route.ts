import { NextResponse } from 'next/server'
import { getPublishedArticles } from '../../../lib/db'

export async function GET() {
  try {
    const articles = await getPublishedArticles()
    return NextResponse.json(articles)
  } catch (e) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}

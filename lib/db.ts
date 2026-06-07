import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default sql;

export async function getPublishedArticles() {
  const rows = await sql`
    SELECT id, title, slug, excerpt, category, created_at
    FROM articles
    WHERE status = 'published'
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function getArticleBySlug(slug: string) {
  const rows = await sql`
    SELECT * FROM articles WHERE slug = ${slug} AND status = 'published'
  `;
  return rows[0] || null;
}

export async function getPendingArticles() {
  const rows = await sql`
    SELECT id, title, slug, excerpt, category, created_at
    FROM articles
    WHERE status = 'pending'
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function updateArticleStatus(id: number, status: string) {
  await sql`UPDATE articles SET status = ${status} WHERE id = ${id}`;
}

export async function createArticle(data: {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  keyword: string;
}) {
  const rows = await sql`
    INSERT INTO articles (title, slug, content, excerpt, category, keyword, status)
    VALUES (${data.title}, ${data.slug}, ${data.content}, ${data.excerpt}, ${data.category}, ${data.keyword}, 'pending')
    RETURNING id
  `;
  return rows[0];
}

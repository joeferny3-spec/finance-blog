import { schedules } from '@trigger.dev/sdk/v3'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { neon } from '@neondatabase/serverless'

const KEYWORDS = [
  'how to build an emergency fund',
  'best budgeting methods for beginners',
  'how to pay off credit card debt fast',
  'index fund investing for beginners',
  'how to save money on groceries',
  'how to improve your credit score',
  'side hustles to make extra money',
  '50 30 20 budget rule explained',
  'what is a Roth IRA',
  'how to stop living paycheck to paycheck',
]

export const generateArticleJob = schedules.task({
  id: 'generate-finance-article',
  cron: '0 9 * * *',
  run: async () => {
    const sql = neon(process.env.DATABASE_URL!)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const keyword = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)]
    const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const articlePrompt = 'Write a helpful personal finance article about: ' + keyword + '. Use HTML h2/h3/p/ul/li. 600-800 words. Return HTML only.'
    const result = await model.generateContent(articlePrompt)
    const content = result.response.text()
    const titleRes = await model.generateContent('SEO title max 60 chars for: ' + keyword + '. Return title only.')
    const title = titleRes.response.text().trim()
    const excerptRes = await model.generateContent('One sentence meta description max 155 chars for: ' + title)
    const excerpt = excerptRes.response.text().trim()
    await sql('INSERT INTO articles (title,slug,content,excerpt,category,keyword,status) VALUES ($1,$2,$3,$4,$5,$6,$7)', [title, slug, content, excerpt, 'Finance', keyword, 'pending'])
    return { success: true, title }
  },
})

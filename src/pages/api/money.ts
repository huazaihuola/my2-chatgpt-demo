
// #vercel-end
import { moneyCheck, parseOpenAIStream } from '@/utils/openAI'

import type { APIRoute } from 'astro'


const baseUrl = 'https://api.openai.com'


export const post: APIRoute = async(context) => {
  const body = await context.request.json()
  const { apiKey } = body
  
  const initOptions = moneyCheck(apiKey)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const response = await fetch(`${baseUrl}/dashboard/billing/credit_grants`, initOptions).catch((err: Error) => {
    console.error(err)
    return new Response(JSON.stringify({
      error: {
        code: err.name,
        message: err.message,
      },
    }), { status: 500 })
  }) as Response

  return parseOpenAIStream(response) as Response
}

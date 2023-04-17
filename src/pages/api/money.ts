
// #vercel-end
import { moneyCheck, parseOpenAIStream } from '@/utils/openAI'

import type { APIRoute } from 'astro'


const baseUrl = 'https://api.openai.com'


export const post: APIRoute = async(context) => {
  const body = await context.request.json()
  const { apiKey , startDate, endDate} = body
  
  const initOptions = moneyCheck(apiKey)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const response = await fetch(`${baseUrl}/dashboard/billing/usage?start_date=${startDate}&end_date=${endDate}`, initOptions).catch((err: Error) => {
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

import type { NextApiRequest, NextApiResponse } from 'next'
import process from 'process'
import queryString from 'query-string'

type Weather = {
  date: string
  day: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Weather[]>
) {
  const queryData = {
    key: process.env.API_KEY,
    q: req.query.location,
    days: 7,
    aqi: 'no',
    alerts: 'no',
  }

  if (req.query.location) {
    const response = await fetch(`${process.env.API_URL}/forecast.json?${queryString.stringify(queryData)}`)
    const data = await response.json()

    res.status(200).json(
      data.forecast.forecastday.map(({ day, date }: Weather) => ({ day, date } as Weather))
    )
    return
  }

  res.status(400)
}

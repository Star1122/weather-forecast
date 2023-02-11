import Image from 'next/image'
import React from 'react'

import HeartIcon from '@/components/HeartIcon'
import { isGoodDay } from '@/utils'

import styles from '@/styles/Home.module.css'

export interface IWeather {
  date: string
  day: any
}

interface IWeatherCardProps {
  isSelected: boolean
  weather: IWeather
  handleClick: (date: string) => () => void
}

export default function WeatherCard(props: IWeatherCardProps) {
  const { isSelected, weather, handleClick } = props

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick(weather.date)}
    >
      <div className={styles.flexRow}>
        <p>{weather.date}</p>
        {isGoodDay(weather.day.condition.text, weather.day.avgtemp_c, weather.day.avghumidity) && (
          <HeartIcon />
        )}
      </div>

      <div className={styles.flexRow}>
        <Image
          src={`https:${weather.day.condition.icon}`}
          width={64}
          height={64}
          alt="weather"
        />
        <h2>{weather.day.avgtemp_c}°C</h2>
      </div>

      <div className={styles.flexRow}>
        <span>Humidity: {weather.day.avghumidity}%</span>
        <span>Precipitation: {weather.day.totalprecip_mm}mm</span>
      </div>
      <div className={styles.flexRow}>
        <span>Wind: {(weather.day.maxwind_kph * 1000 / 3600).toFixed(2)}m/s</span>
        <span>Visibility: {weather.day.avgvis_km}km</span>
      </div>
    </div>
  )
}
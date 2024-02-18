'use client'

import React from 'react'
import SliderSlick from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import style from './style.module.scss'
import ContentWithTitleCard from '@/components/molecules/cards/ContentWithTitleCard'

const settingsSlider = {
  className: 'center',
  centerMode: true,
  focusOnSelect: true,
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  initialSlide: 0,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

interface Props {
  CardsInfo: CardContent[]
}

interface CardContent {
  Logo: React.ReactNode
  text: string
}

export default function Slider ({ CardsInfo }: Props): JSX.Element {
  return (
    <section className={style.sliderContainer}>
      <SliderSlick {...settingsSlider}>
        {CardsInfo.map((card, index) => {
          return (
            <ContentWithTitleCard
              key={index}
              Logo={card.Logo}
              text={card.text}
            />
          )
        })}
      </SliderSlick>
    </section>
  )
}

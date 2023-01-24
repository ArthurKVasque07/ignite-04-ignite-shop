import { HomeContainer, Product } from "@/styles/pages/home";

import { useKeenSlider } from 'keen-slider/react';

import shirt1 from '../assets/camisetas/shirt-1.png';
import shirt2 from '../assets/camisetas/shirt-2.png';
import shirt3 from '../assets/camisetas/shirt-3.png';
import Image from "next/image";

import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })
  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      <Product className='keen-slider__slide'>
        <Image src={shirt1} alt='' width={520} height={480} />
      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
      </Product>
      <Product className='keen-slider__slide'>
        <Image src={shirt1} alt='' width={520} height={480} />
      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
      </Product>
      <Product className='keen-slider__slide'>
        <Image src={shirt3} alt='' width={520} height={480} />
      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
      </Product>
      <Product className='keen-slider__slide'>
        <Image src={shirt2} alt='' width={520} height={480} />
      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
      </Product>
    </HomeContainer>
  )
}

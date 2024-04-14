import { useState } from 'react'
import Card from '../components/Card'
import Customization from '../components/Customization'
import Navbar from '../components/Navbar'
import useStore from '../store'

function CardMain() {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardData = useStore((state) => state.data.card)

  return (
    <div className="flex h-screen flex-col bg-[#F3F5F9]">
      <Navbar />
      <div className="mx-6 mt-[80px] flex flex-1 rounded-[60px] bg-white">
        <Card data={cardData} isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
        <Customization isFlipped={isFlipped} data={cardData} />
      </div>
    </div>
  )
}

export default CardMain

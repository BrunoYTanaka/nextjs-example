import React from 'react'
import Image from 'next/image'

const Background: React.FC = () =>{
    return (
        <Image
          src="/github-background.svg"
          alt="Background"
          layout="fill"
          objectFit="none"
          quality={100}
          objectPosition="70% top"
        />
    )
}

export default Background
"use client"

import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { C } from '@/lib/constants'

export function Partners() {
  return (
    <Section id="partners" size="sm" className="-mt-8 md:-mt-12" style={{ background: C.white }}>
        {/* Partners Grid */}
        <div className="w-full mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center justify-items-center">
            {/* Partner 1 */}
            <div className="flex items-center justify-center h-56 w-56 px-4">
              <Image 
                src="/gemarawana_color.png" 
                alt="Gemarawana" 
                width={200} 
                height={200}
                className="object-contain max-h-56 w-auto"
                priority
              />
            </div>

            {/* Partner 2 */}
            <div className="flex items-center justify-center h-56 w-56 px-4">
              <Image 
                src="/kmpa.png" 
                alt="KMPA" 
                width={200} 
                height={200}
                className="object-contain max-h-56 w-auto"
              />
            </div>

            {/* Partner 3 */}
            <div className="flex items-center justify-center h-56 w-56 px-4">
              <Image 
                src="/telkom.png" 
                alt="Telkom" 
                width={200} 
                height={200}
                className="object-contain max-h-56 w-auto"
              />
            </div>
          </div>
        </div>
    </Section>
  )
}

export default Partners
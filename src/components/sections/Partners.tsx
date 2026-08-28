"use client"

import { SmoothImage } from '@/components/ui/SmoothImage'
import { Section } from '@/components/ui/Section'
import { C } from '@/lib/constants'

export function Partners() {
  return (
    <Section id="partners" size="sm" className="-mt-8 md:-mt-12" style={{ background: C.white }}>
        {/* Partners Grid */}
        <div className="w-full mt-8">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-12 lg:gap-16 items-center justify-items-center">
            {/* Partner 1 */}
            <div className="flex items-center justify-center h-20 w-20 sm:h-28 sm:w-28 md:h-56 md:w-56 px-1 sm:px-2 md:px-4">
              <SmoothImage 
                src="/gemarawana_color.png" 
                alt="Gemarawana" 
                width={200} 
                height={200}
                className="object-contain h-full w-auto max-h-full"
                priority
              />
            </div>

            {/* Partner 2 */}
            <div className="flex items-center justify-center h-20 w-20 sm:h-28 sm:w-28 md:h-56 md:w-56 px-1 sm:px-2 md:px-4">
              <SmoothImage 
                src="/kmpa.png" 
                alt="KMPA" 
                width={200} 
                height={200}
                className="object-contain h-full w-auto max-h-full"
              />
            </div>

            {/* Partner 3 */}
            <div className="flex items-center justify-center h-20 w-20 sm:h-28 sm:w-28 md:h-56 md:w-56 px-1 sm:px-2 md:px-4">
              <SmoothImage 
                src="/telkom.png" 
                alt="Telkom" 
                width={200} 
                height={200}
                className="object-contain h-full w-auto max-h-full"
              />
            </div>
          </div>
        </div>
    </Section>
  )
}

export default Partners
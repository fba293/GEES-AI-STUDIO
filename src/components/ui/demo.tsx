"use client"

import BeamWordmarkFooter from "./beam-wordmark-footer.tsx"

export default function Demo() {
  // w-full is load-bearing: 21st centres every demo in a flex wrapper, and a
  // flex item left at width:auto shrinks to its contents.
  return (
    <div className="w-full bg-[#02040b]">
      <BeamWordmarkFooter />
    </div>
  )
}

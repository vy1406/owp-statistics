import React, { Suspense } from "react"
import Signin from "./sign-in"

const Page = () => {
  return (
    <Suspense>
      <Signin />
    </Suspense>
  )
}

export default Page
import React, { Suspense } from "react"
import Signin from "./sign-in"
import GoogleAalytics from "@/components/google_analytics"

const Page = () => {
  return (
    <Suspense>
      <GoogleAalytics />
      <Signin />
    </Suspense>
  )
}

export default Page
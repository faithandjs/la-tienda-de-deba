import React from "react"

import { StoreProvider } from "./StoreContext"

const CombinedProvider = ({ element }:any) => {
  return (
    <StoreProvider>{element}</StoreProvider>
  )
} 

export default CombinedProvider
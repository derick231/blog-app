import { ImageKitProvider } from "@imagekit/react"
import Navbar from "./Components/Navbar"

const App = () => {
  return (
    <ImageKitProvider urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT }>
    <div className='px-4 md:px-8 lg:px-16'>
      <Navbar/>
    </div>
    </ImageKitProvider>
  )
}

export default App
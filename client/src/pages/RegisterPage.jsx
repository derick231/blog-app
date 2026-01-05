import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const RegisterPage = () => {
  return (
     <div className="flex justify-center items-center h-[1000px]">
      <SignUp/>
    </div>
  )
}

export default RegisterPage
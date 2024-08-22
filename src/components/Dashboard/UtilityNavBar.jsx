import { MessageCircle } from 'lucide-react'
import React from 'react'

const UtilityNavBar = () => {
  return (
    <div>
        <div className=" fixed bottom-16 right-16 h-14 w-14 border rounded-full cursor-pointer hover:border-purple-700 backdrop-blur-3xl">
            <div className="mt-[25%]">
                <div className="flex justify-evenly text-purple-700 hover:text-white ">
                    <MessageCircle className ='scale-125'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UtilityNavBar
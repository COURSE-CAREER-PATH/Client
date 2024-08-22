import React from 'react'
import { ButtonsTwo, Input } from '../../Buttons'


const DisableAccount = () => {
  return (
    <div className='mx-auto w-[80%] flex flex-col gap-4'>
     <Input Labelvalue={'Enter Password'}/>
     <ButtonsTwo value={'Disable Account'}/>
    </div>
  )
}

export default DisableAccount
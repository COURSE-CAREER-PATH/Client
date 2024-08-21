import React from 'react'
import { ButtonsTwo, Input } from '../../Buttons'

const DeleteAccount = () => {
  return (
    <>
    <div className='mx-auto w-[80%] flex flex-col gap-4'>
     <Input Labelvalue={'Enter Password'}/>
     <Input Labelvalue={'Confirm Password'}/>
     <ButtonsTwo value={'Delete'}/>
    </div>
    </>
      )
}

export default DeleteAccount
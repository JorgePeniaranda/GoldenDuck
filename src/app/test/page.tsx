"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '@/useCases/registerUseCase'

export default function Form() {
const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(schema)
})

  return (
    <form onSubmit={handleSubmit(data => {})}>
        <label>
            Email:
            <br/>
            <input type="text" {...register("email")}/>
        </label>
        <br/>
        <button>Enviar</button>
        <br/>
        {errors.email?.message as string}
    </form>
  )
}

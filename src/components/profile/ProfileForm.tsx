import React from 'react'
import { FileInput, Modal, Button, TextInput, Label, Select } from "@/components/flowbite";
import { ProfileProps } from './constants';
import * as z from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

const ProfileForm = ({
  children, 
  formInfo,
  defaultValues = {},
  formSchema,
  onFormSubmit

}:ProfileProps) => {
  type formType = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });


  function onSubmit (values: formType) {
    onFormSubmit && onFormSubmit(values)
  }
  return (
   
    <form onSubmit={handleSubmit(onSubmit)}>
      {formInfo.map((el, i: number) => {
        const isTextInput =
        el.type === "text" || el.type === "password" || el.type === "email";

        return (
          <div key={i}>
             {el.label && (
              <div className="mb-2 block">
                <Label htmlFor={el.name} value={el.label} className='font-bold' />
              </div>
            )}

            {isTextInput && (
              <TextInput
                id={el.name}
                placeholder=''
                type={el.type}
                sizing="md"
                helperText={<>{errors[el.name]?.message}</>}
                color={errors[el.name] && "failure"}
                {...el.textInputProp}
                {...register(el.name)}
            />
            )}

             {el.type === "file" && (
              <FileInput
                id={el.name}
                helperText={<>{errors[el.name]?.message}</>}
                {...register(el.name)}
              />
            )}

            {el.type === "select" && el.selectOptions && (
              <Select
                id={el.name}
                // placeholder="Pick one"
                color={errors[el.name] && "failure"}
                helperText={<>{errors[el.name]?.message}</>}
                {...el.selectProp}
                {...register(el.name)}
              >
                {el.selectOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
            )}
          </div>
        )
      })}

        {children}
    </form>
  )
}

export default ProfileForm
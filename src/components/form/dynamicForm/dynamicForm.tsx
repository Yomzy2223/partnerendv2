"use client";

import { Checkbox, FileInput, Label, Radio, Select, TextInput } from "flowbite-react";
import React, { useEffect, useMemo, useRef, useCallback, MutableRefObject } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DynamicFormProps } from "./constants";
import { useDynamic } from "@/hooks/useDynamic";

const DynamicFormInput = ({
  children,
  formInfo,
  defaultValues,
  formSchema,
  onFormSubmit,
  watchValues,
}: DynamicFormProps) => {
  const dynamic = useDynamic({ subForms: formInfo });

  const schema = formSchema || dynamic.schema;
  const dValues = defaultValues || dynamic.defaultValues;

  type formType = z.infer<typeof schema>;

  // Form definition
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: dValues,
  });

  // Submit handler
  function onSubmit(values: formType) {
    // console.log(values);
    onFormSubmit && onFormSubmit(values);
  }

  useEffect(() => {
    const subscription = watch((values) => watchValues && watchValues(values));
    return () => subscription.unsubscribe();
  }, [watch, watchValues]);

  // useEffect(() => {
  //   if (dValues) {
  //     formInfo.forEach((el) => dValues[el.name] && setValue(el.name, dValues[el.name] || el.value));
  //   }
  // }, [formInfo, dValues]);

  const prevFormInfoRef = useRef(formInfo);

  useEffect(() => {
    if (JSON.stringify(prevFormInfoRef.current) !== JSON.stringify(formInfo)) {
      (formInfo || []).forEach((form) => {
        if (form.value) {
          setValue(form.name, form.value);
        }
      });
      prevFormInfoRef.current = formInfo;
    }
  }, [setValue, formInfo]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {(formInfo || []).map((el, i: number) => {
        const isTextInput = el.type === "text" || el.type === "password" || el.type === "email";
        const errorMsg = errors[el.name]?.message;

        return (
          <div key={i}>
            {el.label && (
              <div className="mb-2 block">
                <Label htmlFor={el.name} value={el.label} />
              </div>
            )}

            {isTextInput && (
              <TextInput
                id={el.name}
                type={el.type}
                sizing="md"
                helperText={<>{errorMsg}</>}
                color={errorMsg && "failure"}
                {...el.textInputProp}
                {...register(el.name)}
              />
            )}

            {(el.type === "address" ||
              el.type === "email address" ||
              el.type === "short answer") && (
              <TextInput
                id={el.name}
                type={el.type}
                sizing="md"
                helperText={<>{errorMsg}</>}
                color={errorMsg && "failure"}
                // {...el.textInputProp}
                {...register(el.name)}
              />
            )}

            {el.type === "checkbox" && (
              <Checkbox id={el.name} defaultChecked {...register(el.name)} />
            )}

            {el.type === "radio" && <Radio id={el.name} {...register(el.name)} />}

            {el.type === "file" && (
              <FileInput
                id={el.name}
                helperText="Text needed here"
                {...register(el.name)}
              />
            )}

            {el.type === "select" && el.selectOptions && (
              <Select
                id={el.name}
                placeholder="dkcdslcj"
                color={errorMsg && "failure"}
                helperText={<>{errorMsg}</>}
                {...el.selectProp}
                {...register(el.name)}
              >
                {el.selectOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
            )}

          </div>
        );
      })}

      {children}
    </form>
  );
};

export default DynamicFormInput;



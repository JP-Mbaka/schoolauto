import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { changePassType } from "@/helper/formtype";
import z from "zod";

interface CustomInputProps {
  control: Control<z.infer<typeof changePassType>>;
  label: string;
  placeHolder: string;
  name: FieldPath<z.infer<typeof changePassType>>;
}

function CustomInputChange(values: CustomInputProps) {
  return (
    <section className="mt-4">
      <FormField
        control={values.control}
        name={values.name}
        render={({ field }) => (
          <div>
            <FormLabel className="mb-1.5">{values.label}</FormLabel>
            <div>
              <FormControl>
                <Input placeholder={values.placeHolder} {...field} />
              </FormControl>
              <FormMessage className="mt-1.5"></FormMessage>
            </div>
          </div>
        )}
      />
    </section>
  );
}

export default CustomInputChange;

"use client";

import CustomInputChange from "@/components/custom_input_change";
import LoadingSimpleModal from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { changePassType } from "@/helper/formtype";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const formBase = useForm<z.infer<typeof changePassType>>({
    resolver: zodResolver(changePassType),
  });
  const onSubmit = () => {};
  return (
    <section className="flex flex-col items-center justify-center h-full m-auto max-md:h-[80%] max-md:w-[80%] max-md:bg-amber-100 max-md:opacity-85 max-md:rounded-2xl">
      <h1 className="text-black text-4xl max-md:text-2xl font-bold tracking-tighter font-[family-name:var(--font-geist-sans)]">
        Welcome Back!
      </h1>
      <p className="tracking-widest my-2">Enter your email and password</p>
      <section className=" w-[50%] max-md:w-full max-md:px-2">
        <Form {...formBase}>
          <form onSubmit={formBase.handleSubmit(onSubmit)}>
            <CustomInputChange
              control={formBase.control}
              name="newPassword"
              placeHolder="Enter your old password"
              label="Old Password"
            />
            <CustomInputChange
              control={formBase.control}
              name="confirmPassword"
              placeHolder="Enter your new password"
              label="New Password"
            />

            <Button className="w-full mt-10 p-5 bg-blue-600 text-amber-50">
              Sign In
            </Button>
          </form>
        </Form>

        <h1 className="my-1.5 text-center">
          Don&apos;t have an account yet?{" "}
          <span className="text-blue-600 font-semibold">Sign Up</span>
        </h1>
      </section>
      <LoadingSimpleModal
        open={loading}
        onClose={function (): void {
          setLoading(false);
        }}
      />
    </section>
  );
}

export default ChangePasswordPage;

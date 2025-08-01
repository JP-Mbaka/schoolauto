"use client";

import CustomInput from "@/components/custom_input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authType } from "@/helper/formtype";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
// import { loginAccount } from "@/action/auth_action";
import { useRouter } from "next/navigation";
import LoadingSimpleModal from "@/components/loading";
import { users } from "@/data";

function Auth() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const formBase = useForm<z.infer<typeof authType>>({
    resolver: zodResolver(authType),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit = async (values: z.infer<typeof authType>) => {
  //   console.log(JSON.stringify(values) + "Login message going on");
  //   try {
  //     setLoading(true);
  //     const res = await loginAccount(values);
  //     console.log(res);
  //     if (res["success"]) {
  //       route.push("/records");
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log("Error from login in user" + error);
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (values: z.infer<typeof authType>) => {
    console.log(JSON.stringify(values) + " Login check starting");

    try {
      setLoading(true);

      // Check if input email matches any user's first_name (case-insensitive)
      const matchedUser = users.find(
        (user) =>
          user.success &&
          user.data.user.first_name.toLowerCase() === values.email.toLowerCase()
      );

      if (matchedUser) {
        console.log("User matched:", matchedUser.data.user);
        route.push("/records");
      } else {
        console.log("No matching user found with first name:", values.email);
      }

      setLoading(false);
    } catch (error) {
      console.log("Error during login: " + error);
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-full m-auto max-md:h-[80%] max-md:w-[80%] max-md:bg-amber-100 max-md:opacity-85 max-md:rounded-2xl">
      <h1 className="text-black text-4xl max-md:text-2xl font-bold tracking-tighter font-[family-name:var(--font-geist-sans)]">
        Welcome Back!
      </h1>
      <p className="tracking-widest my-2">Enter your email and password</p>
      <section className=" w-[50%] max-md:w-full max-md:px-2">
        <Form {...formBase}>
          <form onSubmit={formBase.handleSubmit(onSubmit)}>
            <CustomInput
              control={formBase.control}
              name="email"
              placeHolder="Enter your first Name"
              label="Email"
            />
            <CustomInput
              control={formBase.control}
              name="password"
              placeHolder="Enter your password"
              label="Password"
            />
            <div className="flex justify-end">
              <p>forgot password?</p>
            </div>
            <Button className="w-full mt-10 p-5 bg-blue-600 text-amber-50">
              Sign In
            </Button>
          </form>
        </Form>
        <div className="flex justify-center my-2">OR</div>
        <div className="rounded-md p-2 flex justify-center gap-2 border-2  w-full">
          <Image
            src="/icon_google.png"
            alt="Google Logo"
            width={20}
            height={16}
          />
          <span>Sign In with Google</span>
        </div>
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

export default Auth;

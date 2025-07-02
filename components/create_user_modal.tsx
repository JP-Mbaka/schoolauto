import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAccountSchema } from "@/types";

interface SimpleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof createAccountSchema>) => void;
}

export default function SimpleModal({
  open,
  onClose,
  onSubmit,
}: SimpleModalProps) {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: "",
      student_id: "",
      first_name: "",
      last_name: "",
      role: "", // add this if your schema expects it
    },
  });

  const [value, setValue] = useState("");

  const handleRoleSelect = (role: string) => {
    form.setValue("role", role); // sync role with form
    setValue(role);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log("Submitted data:", data);
          onSubmit(data);
          onClose();
          form.reset();
        })}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Create New User</h2>

        <input
          placeholder="First Name"
          className="w-full border p-2 mb-2 rounded"
          {...form.register("first_name")}
        />

        <input
          placeholder="Last Name"
          className="w-full border p-2 mb-2 rounded"
          {...form.register("last_name")}
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full border p-2 mb-2 rounded"
          {...form.register("email")}
        />

        {/* Role Dropdown */}
        <div className="w-full border p-2 mb-2 rounded">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button type="button" className="w-2/5 text-left">
                {value === "" ? "Select Role" : value}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white shadow-md p-2 rounded-md">
              {["Admin", "Teacher", "Parent", "Student"].map((role) => (
                <DropdownMenu.Item
                  key={role}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-200 rounded"
                  onSelect={() => handleRoleSelect(role)}
                >
                  {role}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        {value === "Teacher" ? (
          <input
            placeholder="Teacher ID"
            className="w-full border p-2 mb-2 rounded"
            {...form.register("teacher_id")}
          />
        ) : (
          <input
            placeholder="Student ID"
            className="w-full border p-2 mb-2 rounded"
            {...form.register("student_id")}
          />
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

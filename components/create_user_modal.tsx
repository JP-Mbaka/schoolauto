import React, { useState } from "react";

interface UserFormData {
  name: string;
  email: string;
  password: string;
}

interface SimpleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
}

export default function SimpleModal({
  open,
  onClose,
  onSubmit,
}: SimpleModalProps) {
  const [form, setForm] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New User</h2>
        <input
          placeholder="Name"
          className="w-full border p-2 mb-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          type="email"
          className="w-full border p-2 mb-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full border p-2 mb-4 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(form);
              onClose();
              setForm({ name: "", email: "", password: "" }); // Optional reset
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

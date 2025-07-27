import React, { useState } from "react";

interface EditModalProps<T> {
  data: T;
  onClose: () => void;
  onSave: (updated: T) => void;
}

const EditModal = <T extends Record<string, unknown>>({
  data,
  onClose,
  onSave,
}: EditModalProps<T>) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(formData as T);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Record</h2>
        <form className="space-y-3">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium">{key}</label>
              <input
                type="text"
                value={
                  typeof value === "string" || typeof value === "number"
                    ? value
                    : ""
                }
                onChange={(e) => handleChange(key, e.target.value)}
                className="border px-2 py-1 rounded"
              />
            </div>
          ))}
        </form>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

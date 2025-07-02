import React from "react";
import { LoaderPinwheelIcon } from "lucide-react";

interface LoadingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoadingSimpleModal({ open }: LoadingModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <LoaderPinwheelIcon className="h-2/5 w-auto animate-spin"></LoaderPinwheelIcon>
    </div>
  );
}
//  <Loader2 size={20} className="animate-spin" />

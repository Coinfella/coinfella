import { toast, ToastOptions } from "react-toastify";

export function showToast(content: string, options: ToastOptions) {
  toast(content, options);
}

export function hideToast() {
  toast.dismiss();
}

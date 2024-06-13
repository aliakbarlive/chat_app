import React from "react";
import {
    BsExclamationOctagonFill,
    BsExclamationTriangleFill,
    BsFillCheckCircleFill,
    BsFillInfoCircleFill,
} from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastIconProps {
  color: string;
  children?: React.ReactNode;
}

const ToastIcon: React.FC<ToastIconProps> = ({ color, children }) => {
  return (
    <div className={`w-8 h-8 text-${color} flex items-center justify-center`}>
      {children}
    </div>
  );
};

export const defaultToast = (text: string) =>
  toast.success(text, {
    icon: (props) => (
      <ToastIcon color="primary" {...props}>
        <BsFillCheckCircleFill />
      </ToastIcon>
    ),
  });

export const infoToast = (text: string) =>
  toast.info(text, {
    icon: (props) => (
      <ToastIcon color="secondary" {...props}>
        <BsFillInfoCircleFill />
      </ToastIcon>
    ),
  });

export const errorToast = (text: string) =>
  toast.error(text, {
    icon: (props) => (
      <ToastIcon color="danger" {...props}>
        <BsExclamationOctagonFill />
      </ToastIcon>
    ),
  });

export const warningToast = (text: string) =>
  toast.warn(text, {
    icon: (props) => (
      <ToastIcon color="warning" {...props}>
        <BsExclamationTriangleFill />
      </ToastIcon>
    ),
  });

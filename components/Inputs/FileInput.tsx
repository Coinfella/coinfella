import React, { useRef } from "react";
import { ErrorMessage } from "./ErrorMessage";
import cameraImage from "../../..//assets/icons/camera.svg";
 
export interface FileInputProps {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  previewImage?: string;
  showError?: boolean;
  errorMessage?: string;
  [key: string]: any;
}
export const FileInput: React.FC<FileInputProps> = ({
  previewImage,
  onChange,
  showError,
  errorMessage,
  children,
  ...props
}) => {
  const imageInput: any = useRef(null);
  const { formRef, ...rest } = props;
  let CustomElement: any;

  if (children) {
    CustomElement = children;
  }

  return (
    <>
      <input type="hidden" ref={formRef} />
      <input
        onChange={onChange}
        type="file"
        accept="*"
        className="hidden"
        ref={imageInput}
        onClick={(e) => {        
          // This is done to fire the onChange event when user select the same file  
          //@ts-ignore
          e.target.value = "";
        }}
        {...rest}
      />
       
      {CustomElement && (
        <CustomElement.type
          onClick={() => imageInput.current.click()}
          src={previewImage}
          {...CustomElement.props}
        />
      )}
      <ErrorMessage showError={showError ?? false} message={errorMessage} />
    </>
  );
};

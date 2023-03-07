import { FC, PropsWithChildren } from "react";

// Custom Type for a React functional component with props AND CHILDREN
export type FCC<P = {}> = FC<PropsWithChildren<P>>;
export type PropsWithClass<T> = T & {
  className?: string;
};


export interface ApiResponse<T> {
  success: boolean;
  entity:T
}
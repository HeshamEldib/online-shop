import { ReactNode } from "react";

export interface ProductProps {
  product: any;
}

export interface ProductIdProps {
  productId: string;
}

export interface ChildrenProps {
  children: ReactNode;
}

export interface ButtonActionProps {
  buttonAction(): any;
}

export interface CommentProps {
  comment: any;
}
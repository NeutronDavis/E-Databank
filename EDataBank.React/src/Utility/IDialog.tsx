import { Dialog, IDialogProps } from "@fluentui/react";
import React, { ReactNode } from "react";

type IDialogPropsEx = IDialogProps & { children: ReactNode };
export const DialogEx: React.FunctionComponent<IDialogPropsEx> = ({
  children,
  ...props
}) => {
  return <Dialog {...props}>{children}</Dialog>;
};

export default DialogEx;

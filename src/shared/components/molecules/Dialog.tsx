import {
  Dialog as ShadDialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";

import React from "react";

const Dialog = ({ ...props }: React.ComponentProps<typeof ShadDialog>) => {
  return <ShadDialog {...props} />;
};

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Title = DialogTitle;
Dialog.Close = DialogClose;
Dialog.Description = DialogDescription;

export { Dialog };

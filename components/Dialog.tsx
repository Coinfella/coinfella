import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import React, { Fragment, PropsWithChildren, useState } from "react";
import { FCC } from "../utils/types";

interface DialogProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  showCloseButton?: boolean;
  onClose?: () => void;
  backdropDismiss?: boolean;
  className?: string;
}

export const Dialog: FCC<DialogProps> & {
  Title: React.FunctionComponent<PropsWithChildren<{}>>;
  Body: React.FunctionComponent<PropsWithChildren<{}>>;
  Footer: React.FunctionComponent<PropsWithChildren<{}>>;
} = ({
  isOpen,
  backdropDismiss,
  className,
  onClose,
  setIsOpen,
  showCloseButton,
  children,
}) => {
  const title = React.Children.map(children, (child: any) =>
    child?.type?.displayName === "Title" ? child : null
  );
  const body = React.Children.map(children, (child: any) =>
    child?.type?.displayName === "Body" ? child : null
  );
  const footer =
    React.Children.map(children, (child: any) =>
      child?.type?.displayName === "Footer" ? child : null
    ) ?? [];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="relative z-10"
        onClose={() => {
          if (onClose) {
            onClose();
          }
          if (backdropDismiss && setIsOpen) {
            setIsOpen(false);
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 bg-[#252638] text-left align-middle shadow-xl transition-all">
                <HeadlessDialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  {title}
                </HeadlessDialog.Title>
                {body}
                {footer.length > 0 && (
                  <div className="rounded-bl-md rounded-br-md p-4">
                    {footer}
                  </div>
                )}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

const Slot1: React.FC<PropsWithChildren<{}>> = ({ children }): JSX.Element => {
  return <div className="p-6 pb-4">{children}</div>;
};
const Slot2: React.FC<PropsWithChildren<{}>> = ({ children }): JSX.Element => {
  return <div className="p-4 pt-0">{children}</div>;
};
const Slot3: React.FC<PropsWithChildren<{}>> = ({ children }): JSX.Element => {
  return <>{children}</>;
};

const SlotTitle = Slot1;
const SlotBody = Slot2;
const SlotFooter = Slot3;

SlotTitle.displayName = "Title";
SlotBody.displayName = "Body";
SlotFooter.displayName = "Footer";

Dialog.Title = SlotTitle;
Dialog.Body = SlotBody;
Dialog.Footer = SlotFooter;

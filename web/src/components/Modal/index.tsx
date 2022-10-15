import * as Dialog from '@radix-ui/react-dialog';
import { ModalProps } from './types';

export function Modal({ children, title }: ModalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
          <Dialog.Title className="text-3xl text-white font-black">{title}</Dialog.Title>

          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}

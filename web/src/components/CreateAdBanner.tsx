import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden">
      <div className="bg-[#2a2634] flex justify-between items-center px-8 py-6 ">
        <div>
          <strong className="block text-2xl text-white font-black">
            Não encontrou o seu duo?
          </strong>
          <span className="block text-zinc-400">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger className="py-3 px-4 rounded flex items-center gap-3 bg-violet-500 hover:bg-violet-600 text-white">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}

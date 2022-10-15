import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';

import '../../styles/main.css';
import logoImg from '../../assests/logo-nlw-esports.svg';
import { Modal } from '../Modal';
import { CreateAdBanner } from '../CreateAdBanner';
import { GameBanner } from '../GameBanner';
import { CreateAdForm } from '../CreateAdForm';

import { Game } from './types';

export function FindYourDuo() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) => setGames(response.data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          console.log(game.banner);
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              banner={game.banner}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <Modal title="Publique um anúncio">
          <CreateAdForm />
        </Modal>
      </Dialog.Root>
    </div>
  );
}

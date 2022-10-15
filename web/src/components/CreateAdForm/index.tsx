import { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';
import { Check, GameController } from 'phosphor-react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../Input';

import { Game } from './types';
import { schema } from './schemas';

export function CreateAdForm() {
  const [games, setGames] = useState<Game[]>();
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  const { handleSubmit, register, control } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) => setGames(response.data));
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const id = data.game;
    console.log(data);

    try {
      await axios.post(`http://localhost:3333/games/${id}/ads`, {
        gameId: id,
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.toString(),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      alert('Anúncio criado com sucesso');
    } catch (err) {
      alert('Erro ao criar o anúncio');
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="game" className="font-semibold">
          Qual o game?
        </label>
        <select
          id="game"
          className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none border-2 border-zinc-900"
          defaultValue=""
          {...register('game')}
        >
          <option disabled value="">
            Selecione o game que deseja jogar
          </option>
          {games?.map((game) => {
            return (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Seu nome ou nickname</label>
        <Input
          type="text"
          id="name"
          placeholder="Como te chamam dentro do game?"
          defaultValue=""
          name="name"
          control={control}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
          <Input
            type="number"
            id="yearsPlaying"
            placeholder="Tudo bem ser Zero"
            name="yearsPlaying"
            control={control}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="discord">Qual o seu Discord?</label>
          <Input
            type="text"
            id="discord"
            placeholder="Usuário#00000"
            name="discord"
            control={control}
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="weekDays">Quando costuma jogar?</label>

          <ToggleGroup.Root
            type="multiple"
            className="grid grid-cols-4 gap-2"
            value={weekDays}
            onValueChange={setWeekDays}
            {...register('weekdays')}
          >
            <ToggleGroup.Item
              value="0"
              title="Domingo"
              className={`w-8 h-8 rounded ${
                weekDays.includes('0') ? 'bg-violet-500' : ' bg-zinc-900'
              }`}
            >
              D
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="1"
              title="Segunda-feira"
              className={`w-8 h-8 rounded ${
                weekDays.includes('1') ? 'bg-violet-500' : ' bg-zinc-900'
              }`}
            >
              S
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="2"
              title="Terça-feira"
              className={`w-8 h-8 rounded ${
                weekDays.includes('2') ? 'bg-violet-500' : ' bg-zinc-900'
              }`}
            >
              T
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="3"
              title="Quarta-feira"
              className={`w-8 h-8 rounded ${
                weekDays.includes('3') ? 'bg-violet-500' : ' bg-zinc-900'
              }`}
            >
              Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="4"
              title="Quinta-feira"
              className={`w-8 h-8 rounded ${
                weekDays.includes('4') ? 'bg-violet-500' : ' bg-zinc-900'
              }`}
            >
              Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="5"
              title="Sexta-feira"
              className={`w-8 h-8 rounded ${
                weekDays.includes('5') ? 'bg-violet-500' : ' bg-zinc-900'
              }`}
            >
              S
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="6"
              title="Sábado"
              className={`w-8 h-8 rounded ${
                weekDays.includes('6') ? 'bg-violet-500' : ' bg-zinc-900'
              }`}
            >
              S
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <label htmlFor="hoursStart">Qual horário do dia?</label>
        <div className="grid grid-cols-2 gap-2">
          <Input type="time" id="hourStart" placeholder="De" name="hourStart" control={control} />
          <Input type="time" id="hourEnd" placeholder="Até" name="hourEnd" control={control} />
        </div>
      </div>

      <label className="mt-2 flex gap-2 text-sm items-center">
        <Checkbox.Root
          checked={useVoiceChannel}
          onCheckedChange={(checked) => {
            if (checked) {
              setUseVoiceChannel(true);
            } else {
              setUseVoiceChannel(false);
            }
          }}
          className="w-6 h-6 p-1 rounded bg-zinc-900"
          {...register('useVoiceChannel')}
        >
          <Checkbox.Indicator>
            <Check className="w-4 h-4 text-emerald-400 " />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Costumo me conectar ao chat de voz
      </label>

      <footer className="mt-4 flex justify-center gap-4">
        <Dialog.Close
          type="button"
          className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
        >
          Cancelar
        </Dialog.Close>
        <button
          type="submit"
          className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
        >
          <GameController className="w-6 h-6" />
          Encontrar duo
        </button>
      </footer>
    </form>
  );
}

import Yup from '../../settings/yup';

export const schema = Yup.object().shape({
  game: Yup.string().required(),
  name: Yup.string().required(),
  yearsPlaying: Yup.string().required(),
  discord: Yup.string().required(),
  weekDays: Yup.string().required(),
  hourStart: Yup.string().required(),
  hourEnd: Yup.string().required(),
  useVoiceChannel: Yup.boolean(),
});

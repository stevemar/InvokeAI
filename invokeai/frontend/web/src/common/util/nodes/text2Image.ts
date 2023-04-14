import { v4 as uuidv4 } from 'uuid';
import { RootState } from 'app/store';
import { TextToImageInvocation } from 'services/api';

export const buildTxt2ImgNode = (
  state: RootState
): Record<string, TextToImageInvocation> => {
  const nodeId = uuidv4();
  const { generation, system, models } = state;

  const { shouldDisplayInProgressType } = system;
  const { currentModel: model } = models;

  const {
    prompt,
    seed,
    steps,
    width,
    height,
    cfgScale: cfg_scale,
    sampler,
    seamless,
    shouldRandomizeSeed,
  } = generation;

  // missing fields in TextToImageInvocation: strength, hires_fix
  return {
    [nodeId]: {
      id: nodeId,
      type: 'txt2img',
      prompt,
      seed: shouldRandomizeSeed ? -1 : seed,
      steps,
      width,
      height,
      cfg_scale,
      scheduler: sampler as TextToImageInvocation['scheduler'],
      seamless,
      model,
      progress_images: shouldDisplayInProgressType === 'full-res',
    },
  };
};
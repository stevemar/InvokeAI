import { createSelector } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAISlider from 'common/components/IAISlider';
import { generationSelector } from 'features/parameters/store/generationSelectors';
import { setImg2imgStrength } from 'features/parameters/store/generationSlice';
import { configSelector } from 'features/system/store/configSelectors';
import { hotkeysSelector } from 'features/ui/store/hotkeysSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selector = createSelector(
  [generationSelector, hotkeysSelector, configSelector],
  (generation, hotkeys, config) => {
    const { initial, min, sliderMax, inputMax, fineStep, coarseStep } =
      config.sd.img2imgStrength;
    const { img2imgStrength, isImageToImageEnabled } = generation;

    const step = hotkeys.shift ? fineStep : coarseStep;

    return {
      img2imgStrength,
      isImageToImageEnabled,
      initial,
      min,
      sliderMax,
      inputMax,
      step,
    };
  }
);

const ImageToImageStrength = () => {
  const {
    img2imgStrength,
    isImageToImageEnabled,
    initial,
    min,
    sliderMax,
    inputMax,
    step,
  } = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (v: number) => dispatch(setImg2imgStrength(v)),
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch(setImg2imgStrength(initial));
  }, [dispatch, initial]);

  return (
    <IAISlider
      label={`${t('parameters.strength')}`}
      step={step}
      min={min}
      max={sliderMax}
      onChange={handleChange}
      handleReset={handleReset}
      value={img2imgStrength}
      isInteger={false}
      withInput
      withSliderMarks
      withReset
      isDisabled={!isImageToImageEnabled}
      sliderNumberInputProps={{ max: inputMax }}
    />
  );
};

export default memo(ImageToImageStrength);

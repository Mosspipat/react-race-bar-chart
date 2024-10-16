declare module "react-range-slider-input" {
  import { FC } from "react";

  interface RangeSliderProps {
    min?: number;
    max?: number;
    step?: number;
    value: number | [number, number];
    onInput?: (value: number | [number, number]) => void;
  }

  const RangeSlider: FC<RangeSliderProps>;

  export default RangeSlider;
}

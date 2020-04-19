import React from 'react';
import { shallow } from 'enzyme';

import { scaleLinear } from '@vx/scale';
import { BoxPlot, computeStats } from '../src';
import { GenericScale } from '../src/types';

const data = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 1];
const { boxPlot: boxPlotData } = computeStats(data);
const { min, firstQuartile, median, thirdQuartile, max, outliers } = boxPlotData;

const valueScale = scaleLinear<number>({
  rangeRound: [10, 0],
  domain: [0, 10],
});

describe('<BoxPlot />', () => {
  test('it should be defined', () => {
    expect(BoxPlot).toBeDefined();
  });

  test('it should have className .vx-boxplot', () => {
    const wrapper = shallow(
      <BoxPlot
        min={min}
        max={max}
        left={0}
        firstQuartile={firstQuartile}
        thirdQuartile={thirdQuartile}
        median={median}
        boxWidth={100}
        valueScale={valueScale as GenericScale<number>}
        outliers={outliers}
      />,
    );
    expect(wrapper.prop('className')).toEqual('vx-boxplot');
  });

  test('it should render 5 lines and one rectangle', () => {
    const wrapper = shallow(
      <BoxPlot
        min={min}
        max={max}
        left={0}
        firstQuartile={firstQuartile}
        thirdQuartile={thirdQuartile}
        median={median}
        boxWidth={100}
        valueScale={valueScale as GenericScale<number>}
        outliers={outliers}
      />,
    );
    expect(wrapper.find('line')).toHaveLength(5);
    expect(wrapper.find('rect')).toHaveLength(1);
  });
});

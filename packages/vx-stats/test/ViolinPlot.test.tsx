import React from 'react';
import { shallow } from 'enzyme';
import { scaleLinear } from '@vx/scale';

import { ViolinPlot, computeStats } from '../src';
import { GenericScale } from '../src/types';

const data = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 1];
const { binData } = computeStats(data);

const valueScale = scaleLinear<number>({
  rangeRound: [10, 0],
  domain: [0, 10],
});

describe('<VoilinPlot />', () => {
  test('it should be defined', () => {
    expect(ViolinPlot).toBeDefined();
  });

  test('it should have className .vx-violin', () => {
    const wrapper = shallow(
      <ViolinPlot
        data={binData}
        left={3}
        width={100}
        valueScale={valueScale as GenericScale<number>}
      />,
    );
    expect(wrapper.prop('className')).toEqual('vx-violin');
  });

  test('it should render one path element', () => {
    const wrapper = shallow(
      <ViolinPlot
        data={binData}
        left={3}
        width={100}
        valueScale={valueScale as GenericScale<number>}
      />,
    );
    expect(wrapper.find('path')).toHaveLength(1);
  });
});

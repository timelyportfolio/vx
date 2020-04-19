import React from 'react';
import { Polygon } from '@vx/shape';
import { Group } from '@vx/group';
import { scaleBand } from '@vx/scale';
import { GradientPinkRed } from '@vx/gradient';
import { ShowProvidedProps } from '../../types';

const polygons = [
  {
    sides: 3,
    fill: 'rgb(174, 238, 248)',
    rotate: 90,
  },
  {
    sides: 4,
    fill: 'rgb(229, 253, 61)',
    rotate: 45,
  },
  {
    sides: 6,
    fill: 'rgb(229, 130, 255)',
    rotate: 0,
  },
  {
    sides: 8,
    fill: 'url(#polygon-pink)',
    rotate: 0,
  },
];

const yScale = scaleBand<number>({
  domain: polygons.map((p, i) => i),
  padding: 0.5,
});

export default ({ width, height }: ShowProvidedProps) => {
  yScale.rangeRound([0, height]);
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="#7f82e3" rx={14} />
      <GradientPinkRed id="polygon-pink" />
      {polygons.map((polygon, i) => (
        <Group key={`polygon-${i}`} top={yScale(i)} left={width / 2}>
          <Polygon sides={polygon.sides} size={25} fill={polygon.fill} rotate={polygon.rotate} />
        </Group>
      ))}
    </svg>
  );
};

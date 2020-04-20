const pkg = require('./package.json');
const resolve = require('@rollup/plugin-node-resolve');
//const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const uglify = require('rollup-plugin-uglify').uglify;

let deps = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.peerDependencies))
  .concat([
    'd3-array',
    'd3-axis',
    'd3-brush',
    'd3-chord',
    'd3-collection',
    'd3-color',
    'd3-contour',
    'd3-dispatch',
    'd3-drag',
    'd3-dsv',
    'd3-ease',
    'd3-fetch',
    'd3-force',
    'd3-format',
    'd3-geo',
    'd3-hierarchy',
    'd3-interpolate',
    'd3-path',
    'd3-polygon',
    'd3-quadtree',
    'd3-random',
    'd3-scale',
    'd3-scale-chromatic',
    'd3-selection',
    'd3-shape',
    'd3-time',
    'd3-time-format',
    'd3-timer',
    'd3-transition',
    'd3-voronoi',
    'd3-zoom',
    'react-dom',
    'prop-types',
    'classnames',
  ]);

// this does not work as before but leave for now
let globals = deps.reduce((o, name) => {
  if (name.includes('@vx/')) {
    o[name] = 'vx';
  }
  if (name.includes('d3-')) {
    o[name] = 'd3';
  }
  if (name === 'react') {
    o[name] = 'React';
  }
  if (name === 'react-dom') {
    o[name] = 'ReactDOM';
  }
  if (name === 'prop-types') {
    o[name] = 'PropTypes';
  }
  if (name === 'classnames') {
    o[name] = 'classNames';
  }
  return o;
}, {});

export default [
  {
    input: 'src/index',
    external: deps,
    plugins: [
      resolve(),
      //babel({
      //  exclude: 'node_modules/**'
      //}),
      replace({
        ENV: JSON.stringify('production'),
      }), //,
      //uglify()
    ],
    output: {
      extend: true,
      file: pkg.main,
      format: 'umd',
      globals,
      name: 'vx',
    },
  },
  {
    input: 'src/index',
    external: deps,
    plugins: [
      resolve(),
      //babel({
      //  exclude: 'node_modules/**'
      //}),
      replace({
        ENV: JSON.stringify('production'),
      }),
    ],
    output: [{ file: pkg.module, format: 'es' }],
  },
];

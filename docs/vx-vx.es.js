import _pt from 'prop-types';
import React, { useState } from 'react';
import cx from 'classnames';
import { Group as Group$1 } from '@vx/group';
import { LinePath as LinePath$1, Line as Line$1, Bar as Bar$1 } from '@vx/shape';
import { Point as Point$1 } from '@vx/point';
import { Text as Text$1 } from '@vx/text';
import ReactDOM from 'react-dom';
import { Drag as Drag$1 } from '@vx/drag';
import { symbol, symbolCross, symbolDiamond, symbolStar, symbolTriangle, symbolWye, symbolSquare, symbolCircle, arc, pie, line, radialLine, area, stackOrderAscending, stackOrderDescending, stackOrderInsideOut, stackOrderNone, stackOrderReverse, stackOffsetExpand, stackOffsetDiverging, stackOffsetNone, stackOffsetSilhouette, stackOffsetWiggle, stack, linkHorizontal, linkVertical, linkRadial } from 'd3-shape';
export { curveBasis, curveBasisClosed, curveBasisOpen, curveBundle, curveCardinal, curveCardinalClosed, curveCardinalOpen, curveCatmullRom, curveCatmullRomClosed, curveCatmullRomOpen, curveLinear, curveLinearClosed, curveMonotoneX, curveMonotoneY, curveNatural, curveStep, curveStepAfter, curveStepBefore } from 'd3-shape';
import { localPoint as localPoint$2 } from '@vx/event';
import { geoGraticule, geoPath, geoOrthographic, geoAlbers, geoAlbersUsa, geoMercator, geoNaturalEarth1, geoEqualEarth } from 'd3-geo';
import { tree, treemap, cluster, pack, partition } from 'd3-hierarchy';
export { hierarchy, stratify, treemapBinary, treemapDice, treemapResquarify, treemapSlice, treemapSliceDice, treemapSquarify } from 'd3-hierarchy';
import { randomNormal } from 'd3-random';
import { scaleBand, scalePoint, scaleLinear, scaleTime, scaleUtc, scaleLog, scalePow, scaleOrdinal, scaleQuantize, scaleQuantile, scaleSymlog, scaleThreshold } from 'd3-scale';
import { path } from 'd3-path';
import { withBoundingRects as withBoundingRects$1 } from '@vx/bounds';
import { voronoi } from 'd3-voronoi';

function LinePathAnnotation(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      _ref$points = _ref.points,
      points = _ref$points === void 0 ? [] : _ref$points,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? 'black' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
      className = _ref.className,
      label = _ref.label,
      _ref$labelAnchor = _ref.labelAnchor,
      labelAnchor = _ref$labelAnchor === void 0 ? 'middle' : _ref$labelAnchor,
      _ref$labelDx = _ref.labelDx,
      labelDx = _ref$labelDx === void 0 ? 0 : _ref$labelDx,
      _ref$labelDy = _ref.labelDy,
      labelDy = _ref$labelDy === void 0 ? 0 : _ref$labelDy,
      labelFill = _ref.labelFill,
      _ref$labelFontSize = _ref.labelFontSize,
      labelFontSize = _ref$labelFontSize === void 0 ? 10 : _ref$labelFontSize,
      _ref$labelStroke = _ref.labelStroke,
      labelStroke = _ref$labelStroke === void 0 ? 'white' : _ref$labelStroke,
      _ref$labelStrokeWidth = _ref.labelStrokeWidth,
      labelStrokeWidth = _ref$labelStrokeWidth === void 0 ? 3 : _ref$labelStrokeWidth,
      _ref$labelPaintOrder = _ref.labelPaintOrder,
      labelPaintOrder = _ref$labelPaintOrder === void 0 ? 'stroke' : _ref$labelPaintOrder;
  var endPoint = points[points.length - 1];
  return /*#__PURE__*/React.createElement(Group$1, {
    className: "vx-line-path-annotation-group",
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement(LinePath$1, {
    className: cx('vx-line-path-annotation', className),
    data: points,
    x: function x(p) {
      return p.x;
    },
    y: function y(p) {
      return p.y;
    },
    stroke: stroke,
    strokeWidth: strokeWidth
  }), label && endPoint && /*#__PURE__*/React.createElement("text", {
    x: endPoint.x,
    y: endPoint.y,
    dx: labelDx,
    dy: labelDy,
    fontSize: labelFontSize,
    fill: labelFill || stroke,
    stroke: labelStroke,
    strokeWidth: labelStrokeWidth,
    textAnchor: labelAnchor,
    paintOrder: labelPaintOrder
  }, label));
}
LinePathAnnotation.propTypes = {
  top: _pt.number,
  left: _pt.number,
  points: _pt.array,
  stroke: _pt.string,
  strokeWidth: _pt.number,
  className: _pt.string,
  label: _pt.string,
  labelAnchor: _pt.oneOf(['start', 'middle', 'end']),
  labelDx: _pt.number,
  labelDy: _pt.number,
  labelFill: _pt.string,
  labelFontSize: _pt.number,
  labelStroke: _pt.string,
  labelStrokeWidth: _pt.number,
  labelPaintOrder: _pt.string
};

/**
 * Returns a function that applies a centering transform to a scaled value,
 * if `Output` is of type `number` and `scale.bandwidth()` is defined
 */
function center(scale) {
  var offset = scale.bandwidth ? scale.bandwidth() / 2 : 0;
  if (scale.round && scale.round()) offset = Math.round(offset);
  return function (d) {
    var scaledValue = scale(d);
    if (typeof scaledValue === 'number') return scaledValue + offset; // quantize scales return an array of values

    if (Array.isArray(scaledValue)) return Number(scaledValue[0]) + offset;
    return scaledValue;
  };
}

var orientation = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom'
};

function labelTransform(_ref) {
  var labelOffset = _ref.labelOffset,
      labelProps = _ref.labelProps,
      orientation$1 = _ref.orientation,
      range = _ref.range,
      tickLabelFontSize = _ref.tickLabelFontSize,
      tickLength = _ref.tickLength;
  var sign = orientation$1 === orientation.left || orientation$1 === orientation.top ? -1 : 1;
  var x;
  var y;
  var transform;

  if (orientation$1 === orientation.top || orientation$1 === orientation.bottom) {
    var yBottomOffset = orientation$1 === orientation.bottom && typeof labelProps.fontSize === 'number' ? labelProps.fontSize : 0;
    x = (Number(range[0]) + Number(range[range.length - 1])) / 2;
    y = sign * (tickLength + labelOffset + tickLabelFontSize + yBottomOffset);
  } else {
    x = sign * ((Number(range[0]) + Number(range[range.length - 1])) / 2);
    y = -(tickLength + labelOffset);
    transform = "rotate(" + sign * 90 + ")";
  }

  return {
    x: x,
    y: y,
    transform: transform
  };
}

function toString(x) {
  return x && x.toString();
}

function toNumberOrUndefined(val) {
  if (typeof val === 'undefined') return val;
  return Number(val);
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Axis(_ref) {
  var children = _ref.children,
      axisClassName = _ref.axisClassName,
      axisLineClassName = _ref.axisLineClassName,
      _ref$hideAxisLine = _ref.hideAxisLine,
      hideAxisLine = _ref$hideAxisLine === void 0 ? false : _ref$hideAxisLine,
      _ref$hideTicks = _ref.hideTicks,
      hideTicks = _ref$hideTicks === void 0 ? false : _ref$hideTicks,
      _ref$hideZero = _ref.hideZero,
      hideZero = _ref$hideZero === void 0 ? false : _ref$hideZero,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? '' : _ref$label,
      labelClassName = _ref.labelClassName,
      _ref$labelOffset = _ref.labelOffset,
      labelOffset = _ref$labelOffset === void 0 ? 14 : _ref$labelOffset,
      _ref$labelProps = _ref.labelProps,
      labelProps = _ref$labelProps === void 0 ? {
    textAnchor: 'middle',
    fontFamily: 'Arial',
    fontSize: 10,
    fill: '#222'
  } : _ref$labelProps,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      _ref$numTicks = _ref.numTicks,
      numTicks = _ref$numTicks === void 0 ? 10 : _ref$numTicks,
      _ref$orientation = _ref.orientation,
      orientation$1 = _ref$orientation === void 0 ? orientation.bottom : _ref$orientation,
      _ref$rangePadding = _ref.rangePadding,
      rangePadding = _ref$rangePadding === void 0 ? 0 : _ref$rangePadding,
      scale = _ref.scale,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? '#222' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      tickClassName = _ref.tickClassName,
      tickFormat = _ref.tickFormat,
      _ref$tickLabelProps = _ref.tickLabelProps,
      tickLabelProps = _ref$tickLabelProps === void 0 ? function () {
    return (
      /** tickValue, index */
      {
        textAnchor: 'middle',
        fontFamily: 'Arial',
        fontSize: 10,
        fill: '#222'
      }
    );
  } : _ref$tickLabelProps,
      _ref$tickLength = _ref.tickLength,
      tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
      _ref$tickStroke = _ref.tickStroke,
      tickStroke = _ref$tickStroke === void 0 ? '#222' : _ref$tickStroke,
      tickTransform = _ref.tickTransform,
      tickValues = _ref.tickValues,
      tickComponent = _ref.tickComponent,
      _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top;
  var values = tickValues || (scale.ticks ? scale.ticks(numTicks) : scale.domain());
  var format = tickFormat || (scale.tickFormat ? scale.tickFormat() : toString);
  var range = scale.range();
  var range0 = Number(range[0]) + 0.5 - rangePadding;
  var range1 = Number(range[range.length - 1]) + 0.5 + rangePadding;
  var isLeft = orientation$1 === orientation.left;
  var isTop = orientation$1 === orientation.top;
  var axisIsHorizontal = isTop || orientation$1 === orientation.bottom;
  var tickSign = isLeft || isTop ? -1 : 1;
  var position = center(scale.copy());
  var axisFromPoint = new Point$1({
    x: axisIsHorizontal ? range0 : 0,
    y: axisIsHorizontal ? 0 : range0
  });
  var axisToPoint = new Point$1({
    x: axisIsHorizontal ? range1 : 0,
    y: axisIsHorizontal ? 0 : range1
  });
  var tickLabelFontSize = 10; // track the max tick label size to compute label offset

  if (children) {
    return /*#__PURE__*/React.createElement(Group$1, {
      className: cx('vx-axis', axisClassName),
      top: top,
      left: left
    }, children({
      axisFromPoint: axisFromPoint,
      axisToPoint: axisToPoint,
      horizontal: axisIsHorizontal,
      tickSign: tickSign,
      numTicks: numTicks,
      label: label,
      rangePadding: rangePadding,
      tickLength: tickLength,
      tickFormat: format,
      tickPosition: position,
      ticks: values.map(function (value, index) {
        var scaledValue = toNumberOrUndefined(position(value));
        var from = new Point$1({
          x: axisIsHorizontal ? scaledValue : 0,
          y: axisIsHorizontal ? 0 : scaledValue
        });
        var to = new Point$1({
          x: axisIsHorizontal ? scaledValue : tickSign * tickLength,
          y: axisIsHorizontal ? tickLength * tickSign : scaledValue
        });
        return {
          value: value,
          index: index,
          from: from,
          to: to,
          formattedValue: format(value, index)
        };
      })
    }));
  }

  return /*#__PURE__*/React.createElement(Group$1, {
    className: cx('vx-axis', axisClassName),
    top: top,
    left: left
  }, values.map(function (val, index) {
    if (hideZero && (typeof val === 'number' && val === 0 || typeof val === 'string' && val === '0')) {
      return null;
    }

    var scaledValue = toNumberOrUndefined(position(val));
    var tickFromPoint = new Point$1({
      x: axisIsHorizontal ? scaledValue : 0,
      y: axisIsHorizontal ? 0 : scaledValue
    });
    var tickToPoint = new Point$1({
      x: axisIsHorizontal ? scaledValue : tickSign * tickLength,
      y: axisIsHorizontal ? tickLength * tickSign : scaledValue
    });
    var tickLabelPropsObj = tickLabelProps(val, index);
    tickLabelFontSize = Math.max(tickLabelFontSize, typeof tickLabelPropsObj.fontSize === 'number' && tickLabelPropsObj.fontSize || 0);
    var tickYCoord = tickToPoint.y + (axisIsHorizontal && !isTop ? tickLabelFontSize : 0);
    var formattedValue = format(val, index);
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "vx-tick-" + val + "-" + index,
      className: cx('vx-axis-tick', tickClassName),
      transform: tickTransform
    }, !hideTicks && /*#__PURE__*/React.createElement(Line$1, {
      from: tickFromPoint,
      to: tickToPoint,
      stroke: tickStroke,
      strokeLinecap: "square"
    }), tickComponent ? tickComponent(_extends({}, tickLabelPropsObj, {
      x: tickToPoint.x,
      y: tickYCoord,
      formattedValue: formattedValue
    })) : /*#__PURE__*/React.createElement(Text$1, _extends({
      x: tickToPoint.x,
      y: tickYCoord
    }, tickLabelPropsObj), formattedValue));
  }), !hideAxisLine && /*#__PURE__*/React.createElement(Line$1, {
    className: cx('vx-axis-line', axisLineClassName),
    from: axisFromPoint,
    to: axisToPoint,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray
  }), label && /*#__PURE__*/React.createElement(Text$1, _extends({
    className: cx('vx-axis-label', labelClassName)
  }, labelTransform({
    labelOffset: labelOffset,
    labelProps: labelProps,
    orientation: orientation$1,
    range: range,
    tickLabelFontSize: tickLabelFontSize,
    tickLength: tickLength
  }), labelProps), label));
}

function AxisLeft(_ref) {
  var children = _ref.children,
      axisClassName = _ref.axisClassName,
      axisLineClassName = _ref.axisLineClassName,
      hideAxisLine = _ref.hideAxisLine,
      hideTicks = _ref.hideTicks,
      hideZero = _ref.hideZero,
      label = _ref.label,
      labelClassName = _ref.labelClassName,
      _ref$labelOffset = _ref.labelOffset,
      labelOffset = _ref$labelOffset === void 0 ? 36 : _ref$labelOffset,
      labelProps = _ref.labelProps,
      left = _ref.left,
      numTicks = _ref.numTicks,
      rangePadding = _ref.rangePadding,
      scale = _ref.scale,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      tickClassName = _ref.tickClassName,
      tickFormat = _ref.tickFormat,
      _ref$tickLabelProps = _ref.tickLabelProps,
      tickLabelProps = _ref$tickLabelProps === void 0 ? function () {
    return (
      /** tickValue, index */
      {
        dx: '-0.25em',
        dy: '0.25em',
        fill: '#222',
        fontFamily: 'Arial',
        fontSize: 10,
        textAnchor: 'end'
      }
    );
  } : _ref$tickLabelProps,
      _ref$tickLength = _ref.tickLength,
      tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
      tickStroke = _ref.tickStroke,
      tickTransform = _ref.tickTransform,
      tickValues = _ref.tickValues,
      tickComponent = _ref.tickComponent,
      top = _ref.top;
  return /*#__PURE__*/React.createElement(Axis, {
    axisClassName: cx('vx-axis-left', axisClassName),
    axisLineClassName: axisLineClassName,
    hideAxisLine: hideAxisLine,
    hideTicks: hideTicks,
    hideZero: hideZero,
    label: label,
    labelClassName: labelClassName,
    labelOffset: labelOffset,
    labelProps: labelProps,
    left: left,
    numTicks: numTicks,
    orientation: orientation.left,
    rangePadding: rangePadding,
    scale: scale,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    tickClassName: tickClassName,
    tickFormat: tickFormat,
    tickLabelProps: tickLabelProps,
    tickLength: tickLength,
    tickStroke: tickStroke,
    tickTransform: tickTransform,
    tickValues: tickValues,
    tickComponent: tickComponent,
    top: top,
    children: children
  });
}

function AxisRight(_ref) {
  var children = _ref.children,
      axisClassName = _ref.axisClassName,
      axisLineClassName = _ref.axisLineClassName,
      hideAxisLine = _ref.hideAxisLine,
      hideTicks = _ref.hideTicks,
      hideZero = _ref.hideZero,
      label = _ref.label,
      labelClassName = _ref.labelClassName,
      _ref$labelOffset = _ref.labelOffset,
      labelOffset = _ref$labelOffset === void 0 ? 36 : _ref$labelOffset,
      labelProps = _ref.labelProps,
      left = _ref.left,
      numTicks = _ref.numTicks,
      rangePadding = _ref.rangePadding,
      scale = _ref.scale,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      tickClassName = _ref.tickClassName,
      tickFormat = _ref.tickFormat,
      _ref$tickLabelProps = _ref.tickLabelProps,
      tickLabelProps = _ref$tickLabelProps === void 0 ? function () {
    return (
      /** tickValue, index */
      {
        dx: '0.25em',
        dy: '0.25em',
        fill: '#222',
        fontFamily: 'Arial',
        fontSize: 10,
        textAnchor: 'start'
      }
    );
  } : _ref$tickLabelProps,
      _ref$tickLength = _ref.tickLength,
      tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
      tickStroke = _ref.tickStroke,
      tickTransform = _ref.tickTransform,
      tickValues = _ref.tickValues,
      tickComponent = _ref.tickComponent,
      top = _ref.top;
  return /*#__PURE__*/React.createElement(Axis, {
    axisClassName: cx('vx-axis-right', axisClassName),
    axisLineClassName: axisLineClassName,
    hideAxisLine: hideAxisLine,
    hideTicks: hideTicks,
    hideZero: hideZero,
    label: label,
    labelClassName: labelClassName,
    labelOffset: labelOffset,
    labelProps: labelProps,
    left: left,
    numTicks: numTicks,
    orientation: orientation.right,
    rangePadding: rangePadding,
    scale: scale,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    tickClassName: tickClassName,
    tickFormat: tickFormat,
    tickLabelProps: tickLabelProps,
    tickLength: tickLength,
    tickStroke: tickStroke,
    tickTransform: tickTransform,
    tickValues: tickValues,
    tickComponent: tickComponent,
    top: top,
    children: children
  });
}

function AxisTop(_ref) {
  var children = _ref.children,
      axisClassName = _ref.axisClassName,
      axisLineClassName = _ref.axisLineClassName,
      hideAxisLine = _ref.hideAxisLine,
      hideTicks = _ref.hideTicks,
      hideZero = _ref.hideZero,
      label = _ref.label,
      labelClassName = _ref.labelClassName,
      _ref$labelOffset = _ref.labelOffset,
      labelOffset = _ref$labelOffset === void 0 ? 8 : _ref$labelOffset,
      labelProps = _ref.labelProps,
      left = _ref.left,
      numTicks = _ref.numTicks,
      rangePadding = _ref.rangePadding,
      scale = _ref.scale,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      tickClassName = _ref.tickClassName,
      tickFormat = _ref.tickFormat,
      _ref$tickLabelProps = _ref.tickLabelProps,
      tickLabelProps = _ref$tickLabelProps === void 0 ? function () {
    return (
      /** tickValue, index */
      {
        dy: '-0.25em',
        fill: '#222',
        fontFamily: 'Arial',
        fontSize: 10,
        textAnchor: 'middle'
      }
    );
  } : _ref$tickLabelProps,
      _ref$tickLength = _ref.tickLength,
      tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
      tickStroke = _ref.tickStroke,
      tickTransform = _ref.tickTransform,
      tickValues = _ref.tickValues,
      tickComponent = _ref.tickComponent,
      top = _ref.top;
  return /*#__PURE__*/React.createElement(Axis, {
    axisClassName: cx('vx-axis-top', axisClassName),
    axisLineClassName: axisLineClassName,
    hideAxisLine: hideAxisLine,
    hideTicks: hideTicks,
    hideZero: hideZero,
    label: label,
    labelClassName: labelClassName,
    labelOffset: labelOffset,
    labelProps: labelProps,
    left: left,
    numTicks: numTicks,
    orientation: orientation.top,
    rangePadding: rangePadding,
    scale: scale,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    tickClassName: tickClassName,
    tickFormat: tickFormat,
    tickLabelProps: tickLabelProps,
    tickLength: tickLength,
    tickStroke: tickStroke,
    tickTransform: tickTransform,
    tickValues: tickValues,
    tickComponent: tickComponent,
    top: top,
    children: children
  });
}

function AxisBottom(_ref) {
  var children = _ref.children,
      axisClassName = _ref.axisClassName,
      axisLineClassName = _ref.axisLineClassName,
      hideAxisLine = _ref.hideAxisLine,
      hideTicks = _ref.hideTicks,
      hideZero = _ref.hideZero,
      label = _ref.label,
      labelClassName = _ref.labelClassName,
      _ref$labelOffset = _ref.labelOffset,
      labelOffset = _ref$labelOffset === void 0 ? 8 : _ref$labelOffset,
      labelProps = _ref.labelProps,
      left = _ref.left,
      numTicks = _ref.numTicks,
      rangePadding = _ref.rangePadding,
      scale = _ref.scale,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      tickClassName = _ref.tickClassName,
      tickFormat = _ref.tickFormat,
      _ref$tickLabelProps = _ref.tickLabelProps,
      tickLabelProps = _ref$tickLabelProps === void 0 ? function () {
    return (
      /** tickValue, index */
      {
        dy: '0.25em',
        fill: '#222',
        fontFamily: 'Arial',
        fontSize: 10,
        textAnchor: 'middle'
      }
    );
  } : _ref$tickLabelProps,
      _ref$tickLength = _ref.tickLength,
      tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
      tickStroke = _ref.tickStroke,
      tickTransform = _ref.tickTransform,
      tickValues = _ref.tickValues,
      tickComponent = _ref.tickComponent,
      top = _ref.top;
  return /*#__PURE__*/React.createElement(Axis, {
    axisClassName: cx('vx-axis-bottom', axisClassName),
    axisLineClassName: axisLineClassName,
    hideAxisLine: hideAxisLine,
    hideTicks: hideTicks,
    hideZero: hideZero,
    label: label,
    labelClassName: labelClassName,
    labelOffset: labelOffset,
    labelProps: labelProps,
    left: left,
    numTicks: numTicks,
    orientation: orientation.bottom,
    rangePadding: rangePadding,
    scale: scale,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    tickClassName: tickClassName,
    tickFormat: tickFormat,
    tickLabelProps: tickLabelProps,
    tickLength: tickLength,
    tickStroke: tickStroke,
    tickTransform: tickTransform,
    tickValues: tickValues,
    tickComponent: tickComponent,
    top: top,
    children: children
  });
}

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var emptyRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0
};
function withBoundingRects(BaseComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_React$PureComponent) {
    _inheritsLoose(WrappedComponent, _React$PureComponent);

    function WrappedComponent(props) {
      var _this;

      _this = _React$PureComponent.call(this, props) || this;

      _defineProperty(_assertThisInitialized(_this), "node", void 0);

      _this.state = {
        rect: undefined,
        parentRect: undefined
      };
      _this.getRects = _this.getRects.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = WrappedComponent.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var _this2 = this;

      this.node = ReactDOM.findDOMNode(this);
      this.setState(function () {
        return _this2.getRects();
      });
    };

    _proto.getRects = function getRects() {
      if (!this.node) return this.state;
      var node = this.node;
      var parentNode = node.parentNode;
      var rect = node.getBoundingClientRect ? node.getBoundingClientRect() : emptyRect;
      var parentRect = parentNode && parentNode.getBoundingClientRect ? parentNode.getBoundingClientRect() : emptyRect;
      return {
        rect: rect,
        parentRect: parentRect
      };
    };

    _proto.render = function render() {
      return /*#__PURE__*/React.createElement(BaseComponent, _extends$1({
        getRects: this.getRects
      }, this.state, this.props));
    };

    return WrappedComponent;
  }(React.PureComponent), _defineProperty(_class, "displayName", "withBoundingRects(" + (BaseComponent.displayName || '') + ")"), _temp;
}

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$1(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** BrushHandle's are placed along the bounds of the brush and handle Drag events which update the passed brush. */
var BrushHandle = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$1(BrushHandle, _React$Component);

  function BrushHandle() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty$1(_assertThisInitialized$1(_this), "handleDragMove", function (drag) {
      var _this$props = _this.props,
          updateBrush = _this$props.updateBrush,
          type = _this$props.type;
      if (!drag.isDragging) return;
      updateBrush(function (prevBrush) {
        var start = prevBrush.start,
            end = prevBrush.end;
        var move = 0;
        var xMax = Math.max(start.x, end.x);
        var xMin = Math.min(start.x, end.x);
        var yMax = Math.max(start.y, end.y);
        var yMin = Math.min(start.y, end.y);

        switch (type) {
          case 'right':
            move = xMax + drag.dx;
            return _extends$2({}, prevBrush, {
              activeHandle: type,
              extent: _extends$2({}, prevBrush.extent, {
                x0: Math.max(Math.min(move, start.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(move, start.x), prevBrush.bounds.x1)
              })
            });

          case 'left':
            move = xMin + drag.dx;
            return _extends$2({}, prevBrush, {
              activeHandle: type,
              extent: _extends$2({}, prevBrush.extent, {
                x0: Math.min(move, end.x),
                x1: Math.max(move, end.x)
              })
            });

          case 'bottom':
            move = yMax + drag.dy;
            return _extends$2({}, prevBrush, {
              activeHandle: type,
              extent: _extends$2({}, prevBrush.extent, {
                y0: Math.min(move, start.y),
                y1: Math.max(move, start.y)
              })
            });

          case 'top':
            move = yMin + drag.dy;
            return _extends$2({}, prevBrush, {
              activeHandle: type,
              extent: _extends$2({}, prevBrush.extent, {
                y0: Math.min(move, end.y),
                y1: Math.max(move, end.y)
              })
            });

          default:
            return prevBrush;
        }
      });
    });

    _defineProperty$1(_assertThisInitialized$1(_this), "handleDragEnd", function () {
      var _this$props2 = _this.props,
          updateBrush = _this$props2.updateBrush,
          onBrushEnd = _this$props2.onBrushEnd;
      updateBrush(function (prevBrush) {
        var start = prevBrush.start,
            end = prevBrush.end,
            extent = prevBrush.extent;
        start.x = Math.min(extent.x0, extent.x1);
        start.y = Math.min(extent.y0, extent.y0);
        end.x = Math.max(extent.x0, extent.x1);
        end.y = Math.max(extent.y0, extent.y1);

        var nextBrush = _extends$2({}, prevBrush, {
          start: start,
          end: end,
          activeHandle: null,
          isBrushing: false,
          extent: {
            x0: Math.min(start.x, end.x),
            x1: Math.max(start.x, end.x),
            y0: Math.min(start.y, end.y),
            y1: Math.max(start.y, end.y)
          }
        });

        if (onBrushEnd) {
          onBrushEnd(nextBrush);
        }

        return nextBrush;
      });
    });

    return _this;
  }

  var _proto = BrushHandle.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        stageWidth = _this$props3.stageWidth,
        stageHeight = _this$props3.stageHeight,
        brush = _this$props3.brush,
        type = _this$props3.type,
        handle = _this$props3.handle;
    var x = handle.x,
        y = handle.y,
        width = handle.width,
        height = handle.height;
    var cursor = type === 'right' || type === 'left' ? 'ew-resize' : 'ns-resize';
    return /*#__PURE__*/React.createElement(Drag$1, {
      width: stageWidth,
      height: stageHeight,
      onDragMove: this.handleDragMove,
      onDragEnd: this.handleDragEnd,
      resetOnStart: true
    }, function (_ref) {
      var dragStart = _ref.dragStart,
          dragEnd = _ref.dragEnd,
          dragMove = _ref.dragMove,
          isDragging = _ref.isDragging;
      return /*#__PURE__*/React.createElement("g", null, isDragging && /*#__PURE__*/React.createElement("rect", {
        fill: "transparent",
        width: stageWidth,
        height: stageHeight,
        style: {
          cursor: cursor
        },
        onMouseMove: dragMove,
        onMouseUp: dragEnd,
        onMouseLeave: dragEnd
      }), /*#__PURE__*/React.createElement("rect", {
        x: x,
        y: y,
        width: width,
        height: height,
        fill: "transparent",
        className: "vx-brush-handle-" + type,
        onMouseDown: dragStart,
        onMouseMove: dragMove,
        onMouseUp: dragEnd,
        style: {
          cursor: cursor,
          pointerEvents: !!brush.activeHandle || !!brush.isBrushing ? 'none' : 'all'
        }
      }));
    });
  };

  return BrushHandle;
}(React.Component);

_defineProperty$1(BrushHandle, "propTypes", {
  stageWidth: _pt.number.isRequired,
  stageHeight: _pt.number.isRequired,
  updateBrush: _pt.func.isRequired,
  onBrushEnd: _pt.func,
  handle: _pt.shape({
    x: _pt.number.isRequired,
    y: _pt.number.isRequired,
    width: _pt.number.isRequired,
    height: _pt.number.isRequired
  }).isRequired
});

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

function _assertThisInitialized$2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$2(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BrushCorner = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$2(BrushCorner, _React$Component);

  function BrushCorner() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty$2(_assertThisInitialized$2(_this), "cornerDragMove", function (drag) {
      var _this$props = _this.props,
          updateBrush = _this$props.updateBrush,
          type = _this$props.type;
      if (!drag.isDragging) return;
      updateBrush(function (prevBrush) {
        var start = prevBrush.start,
            end = prevBrush.end;
        var xMax = Math.max(start.x, end.x);
        var xMin = Math.min(start.x, end.x);
        var yMax = Math.max(start.y, end.y);
        var yMin = Math.min(start.y, end.y);
        var moveX = 0;
        var moveY = 0;

        switch (type) {
          case 'topRight':
            moveX = xMax + drag.dx;
            moveY = yMin + drag.dy;
            return _extends$3({}, prevBrush, {
              activeHandle: type,
              extent: _extends$3({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, start.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, start.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, end.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, end.y), prevBrush.bounds.y1)
              })
            });

          case 'topLeft':
            moveX = xMin + drag.dx;
            moveY = yMin + drag.dy;
            return _extends$3({}, prevBrush, {
              activeHandle: type,
              extent: _extends$3({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, end.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, end.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, end.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, end.y), prevBrush.bounds.y1)
              })
            });

          case 'bottomLeft':
            moveX = xMin + drag.dx;
            moveY = yMax + drag.dy;
            return _extends$3({}, prevBrush, {
              activeHandle: type,
              extent: _extends$3({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, end.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, end.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, start.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, start.y), prevBrush.bounds.y1)
              })
            });

          case 'bottomRight':
            moveX = xMax + drag.dx;
            moveY = yMax + drag.dy;
            return _extends$3({}, prevBrush, {
              activeHandle: type,
              extent: _extends$3({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, start.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, start.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, start.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, start.y), prevBrush.bounds.y1)
              })
            });

          default:
            return prevBrush;
        }
      });
    });

    _defineProperty$2(_assertThisInitialized$2(_this), "cornerDragEnd", function () {
      var _this$props2 = _this.props,
          updateBrush = _this$props2.updateBrush,
          onBrushEnd = _this$props2.onBrushEnd;
      updateBrush(function (prevBrush) {
        var start = prevBrush.start,
            end = prevBrush.end,
            extent = prevBrush.extent;
        start.x = Math.min(extent.x0, extent.x1);
        start.y = Math.min(extent.y0, extent.y0);
        end.x = Math.max(extent.x0, extent.x1);
        end.y = Math.max(extent.y0, extent.y1);

        var nextBrush = _extends$3({}, prevBrush, {
          start: start,
          end: end,
          activeHandle: null,
          domain: {
            x0: Math.min(start.x, end.x),
            x1: Math.max(start.x, end.x),
            y0: Math.min(start.y, end.y),
            y1: Math.max(start.y, end.y)
          }
        });

        if (onBrushEnd) {
          onBrushEnd(nextBrush);
        }

        return nextBrush;
      });
    });

    return _this;
  }

  var _proto = BrushCorner.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        type = _this$props3.type,
        brush = _this$props3.brush,
        stageWidth = _this$props3.stageWidth,
        stageHeight = _this$props3.stageHeight,
        styleProp = _this$props3.style,
        corner = _this$props3.corner;
    var cursor = styleProp && styleProp.cursor || (type === 'topLeft' || type === 'bottomRight' ? 'nwse-resize' : 'nesw-resize');
    var pointerEvents = brush.activeHandle || brush.isBrushing ? 'none' : 'all';
    return /*#__PURE__*/React.createElement(Drag$1, {
      width: stageWidth,
      height: stageHeight,
      onDragMove: this.cornerDragMove,
      onDragEnd: this.cornerDragEnd,
      resetOnStart: true
    }, function (_ref) {
      var dragMove = _ref.dragMove,
          dragEnd = _ref.dragEnd,
          dragStart = _ref.dragStart,
          isDragging = _ref.isDragging;
      return /*#__PURE__*/React.createElement("g", null, isDragging && /*#__PURE__*/React.createElement("rect", {
        fill: "transparent",
        width: stageWidth,
        height: stageHeight,
        style: {
          cursor: cursor
        },
        onMouseMove: dragMove,
        onMouseUp: dragEnd
      }), /*#__PURE__*/React.createElement("rect", _extends$3({
        fill: "transparent",
        onMouseDown: dragStart,
        onMouseMove: dragMove,
        onMouseUp: dragEnd,
        className: "vx-brush-corner-" + type,
        style: _extends$3({
          cursor: cursor,
          pointerEvents: pointerEvents
        }, styleProp)
      }, corner)));
    });
  };

  return BrushCorner;
}(React.Component);

_defineProperty$2(BrushCorner, "propTypes", {
  stageWidth: _pt.number.isRequired,
  stageHeight: _pt.number.isRequired,
  updateBrush: _pt.func.isRequired,
  onBrushEnd: _pt.func,
  corner: _pt.shape({
    x: _pt.number.isRequired,
    y: _pt.number.isRequired,
    width: _pt.number.isRequired,
    height: _pt.number.isRequired
  }).isRequired
});

_defineProperty$2(BrushCorner, "defaultProps", {
  style: {}
});

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

function _assertThisInitialized$3(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$3(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var DRAGGING_OVERLAY_STYLES = {
  cursor: 'move'
};

var BrushSelection = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$3(BrushSelection, _React$Component);

  function BrushSelection() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty$3(_assertThisInitialized$3(_this), "selectionDragMove", function (drag) {
      var updateBrush = _this.props.updateBrush;
      updateBrush(function (prevBrush) {
        var _prevBrush$start = prevBrush.start,
            x0 = _prevBrush$start.x,
            y0 = _prevBrush$start.y;
        var _prevBrush$end = prevBrush.end,
            x1 = _prevBrush$end.x,
            y1 = _prevBrush$end.y;
        var validDx = drag.dx > 0 ? Math.min(drag.dx, prevBrush.bounds.x1 - x1) : Math.max(drag.dx, prevBrush.bounds.x0 - x0);
        var validDy = drag.dy > 0 ? Math.min(drag.dy, prevBrush.bounds.y1 - y1) : Math.max(drag.dy, prevBrush.bounds.y0 - y0);
        return _extends$4({}, prevBrush, {
          isBrushing: true,
          extent: _extends$4({}, prevBrush.extent, {
            x0: x0 + validDx,
            x1: x1 + validDx,
            y0: y0 + validDy,
            y1: y1 + validDy
          })
        });
      });
    });

    _defineProperty$3(_assertThisInitialized$3(_this), "selectionDragEnd", function () {
      var _this$props = _this.props,
          updateBrush = _this$props.updateBrush,
          onBrushEnd = _this$props.onBrushEnd;
      updateBrush(function (prevBrush) {
        var nextBrush = _extends$4({}, prevBrush, {
          isBrushing: false,
          start: _extends$4({}, prevBrush.start, {
            x: Math.min(prevBrush.extent.x0, prevBrush.extent.x1),
            y: Math.min(prevBrush.extent.y0, prevBrush.extent.y1)
          }),
          end: _extends$4({}, prevBrush.end, {
            x: Math.max(prevBrush.extent.x0, prevBrush.extent.x1),
            y: Math.max(prevBrush.extent.y0, prevBrush.extent.y1)
          })
        });

        if (onBrushEnd) {
          onBrushEnd(nextBrush);
        }

        return nextBrush;
      });
    });

    return _this;
  }

  var _proto = BrushSelection.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        width = _this$props2.width,
        height = _this$props2.height,
        stageWidth = _this$props2.stageWidth,
        stageHeight = _this$props2.stageHeight,
        brush = _this$props2.brush,
        disableDraggingSelection = _this$props2.disableDraggingSelection,
        _onMouseLeave = _this$props2.onMouseLeave,
        _onMouseMove = _this$props2.onMouseMove,
        _onMouseUp = _this$props2.onMouseUp,
        _onClick = _this$props2.onClick,
        selectedBoxStyle = _this$props2.selectedBoxStyle;
    return /*#__PURE__*/React.createElement(Drag$1, {
      width: width,
      height: height,
      resetOnStart: true,
      onDragMove: this.selectionDragMove,
      onDragEnd: this.selectionDragEnd
    }, function (_ref) {
      var isDragging = _ref.isDragging,
          dragStart = _ref.dragStart,
          dragEnd = _ref.dragEnd,
          dragMove = _ref.dragMove;
      return /*#__PURE__*/React.createElement("g", null, isDragging && /*#__PURE__*/React.createElement("rect", {
        width: stageWidth,
        height: stageHeight,
        fill: "transparent",
        onMouseUp: dragEnd,
        onMouseMove: dragMove,
        onMouseLeave: dragEnd,
        style: DRAGGING_OVERLAY_STYLES
      }), /*#__PURE__*/React.createElement("rect", _extends$4({
        x: Math.min(brush.extent.x0, brush.extent.x1),
        y: Math.min(brush.extent.y0, brush.extent.y1),
        width: width,
        height: height,
        className: "vx-brush-selection",
        onMouseDown: disableDraggingSelection ? undefined : dragStart,
        onMouseLeave: function onMouseLeave(event) {
          if (_onMouseLeave) _onMouseLeave(event);
        },
        onMouseMove: function onMouseMove(event) {
          dragMove(event);
          if (_onMouseMove) _onMouseMove(event);
        },
        onMouseUp: function onMouseUp(event) {
          dragEnd(event);
          if (_onMouseUp) _onMouseUp(event);
        },
        onClick: function onClick(event) {
          if (_onClick) _onClick(event);
        },
        style: {
          pointerEvents: brush.isBrushing || brush.activeHandle ? 'none' : 'all',
          cursor: disableDraggingSelection ? undefined : 'move'
        }
      }, selectedBoxStyle)));
    });
  };

  return BrushSelection;
}(React.Component);

_defineProperty$3(BrushSelection, "propTypes", {
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  stageWidth: _pt.number.isRequired,
  stageHeight: _pt.number.isRequired,
  updateBrush: _pt.func.isRequired,
  onBrushEnd: _pt.func,
  disableDraggingSelection: _pt.bool.isRequired,
  onMouseLeave: _pt.func,
  onMouseMove: _pt.func,
  onMouseUp: _pt.func,
  onClick: _pt.func
});

_defineProperty$3(BrushSelection, "defaultProps", {
  onMouseLeave: null,
  onMouseUp: null,
  onMouseMove: null,
  onClick: null
});

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

function _assertThisInitialized$4(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$4(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var BRUSH_OVERLAY_STYLES = {
  cursor: 'crosshair'
};

var BaseBrush = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$4(BaseBrush, _React$Component);

  function BaseBrush(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty$4(_assertThisInitialized$4(_this), "mouseUpTime", 0);

    _defineProperty$4(_assertThisInitialized$4(_this), "mouseDownTime", 0);

    _defineProperty$4(_assertThisInitialized$4(_this), "getExtent", function (start, end) {
      var _this$props = _this.props,
          brushDirection = _this$props.brushDirection,
          width = _this$props.width,
          height = _this$props.height;
      var x0 = brushDirection === 'vertical' ? 0 : Math.min(start.x, end.x);
      var x1 = brushDirection === 'vertical' ? width : Math.max(start.x, end.x);
      var y0 = brushDirection === 'horizontal' ? 0 : Math.min(start.y, end.y);
      var y1 = brushDirection === 'horizontal' ? height : Math.max(start.y, end.y);
      return {
        x0: x0,
        x1: x1,
        y0: y0,
        y1: y1
      };
    });

    _defineProperty$4(_assertThisInitialized$4(_this), "handleDragStart", function (draw) {
      var _this$props2 = _this.props,
          onBrushStart = _this$props2.onBrushStart,
          left = _this$props2.left,
          top = _this$props2.top,
          inheritedMargin = _this$props2.inheritedMargin;
      var marginLeft = inheritedMargin && inheritedMargin.left ? inheritedMargin.left : 0;
      var marginTop = inheritedMargin && inheritedMargin.top ? inheritedMargin.top : 0;
      var start = {
        x: (draw.x || 0) + draw.dx - left - marginLeft,
        y: (draw.y || 0) + draw.dy - top - marginTop
      };

      var end = _extends$5({}, start);

      if (onBrushStart) {
        onBrushStart(start);
      }

      _this.updateBrush(function (prevBrush) {
        return _extends$5({}, prevBrush, {
          start: start,
          end: end,
          extent: {
            x0: -1,
            x1: -1,
            y0: -1,
            y1: -1
          },
          isBrushing: true
        });
      });
    });

    _defineProperty$4(_assertThisInitialized$4(_this), "handleDragMove", function (draw) {
      var _this$props3 = _this.props,
          left = _this$props3.left,
          top = _this$props3.top,
          inheritedMargin = _this$props3.inheritedMargin;
      if (!draw.isDragging) return;
      var marginLeft = inheritedMargin && inheritedMargin.left || 0;
      var marginTop = inheritedMargin && inheritedMargin.top || 0;
      var end = {
        x: (draw.x || 0) + draw.dx - left - marginLeft,
        y: (draw.y || 0) + draw.dy - top - marginTop
      };

      _this.updateBrush(function (prevBrush) {
        var start = prevBrush.start;

        var extent = _this.getExtent(start, end);

        return _extends$5({}, prevBrush, {
          end: end,
          extent: extent
        });
      });
    });

    _defineProperty$4(_assertThisInitialized$4(_this), "handleDragEnd", function () {
      var isBrushing = _this.state.isBrushing;

      if (isBrushing) {
        var _this$props4 = _this.props,
            onBrushEnd = _this$props4.onBrushEnd,
            resetOnEnd = _this$props4.resetOnEnd;

        _this.updateBrush(function (prevBrush) {
          var extent = prevBrush.extent;

          var newState = _extends$5({}, prevBrush, {
            start: {
              x: extent.x0,
              y: extent.y0
            },
            end: {
              x: extent.x1,
              y: extent.y1
            },
            isBrushing: false,
            activeHandle: null
          });

          if (onBrushEnd) {
            onBrushEnd(newState);
          }

          if (resetOnEnd) {
            _this.reset();
          }

          return newState;
        });
      }
    });

    _defineProperty$4(_assertThisInitialized$4(_this), "getBrushWidth", function () {
      var extent = _this.state.extent;
      var x0 = extent.x0,
          x1 = extent.x1;
      return Math.max(Math.max(x0, x1) - Math.min(x0, x1), 0);
    });

    _defineProperty$4(_assertThisInitialized$4(_this), "getBrushHeight", function () {
      var extent = _this.state.extent;
      var y1 = extent.y1,
          y0 = extent.y0;
      return Math.max(Math.max(y0, y1) - Math.min(y0, y1), 0);
    });

    _defineProperty$4(_assertThisInitialized$4(_this), "handles", function () {
      var handleSize = _this.props.handleSize;
      var extent = _this.state.extent;
      var x0 = extent.x0,
          x1 = extent.x1,
          y0 = extent.y0,
          y1 = extent.y1;
      var offset = handleSize / 2;

      var width = _this.getBrushWidth();

      var height = _this.getBrushHeight();

      return {
        top: {
          x: x0 - offset,
          y: y0 - offset,
          height: handleSize,
          width: width + handleSize
        },
        bottom: {
          x: x0 - offset,
          y: y1 - offset,
          height: handleSize,
          width: width + handleSize
        },
        right: {
          x: x1 - offset,
          y: y0 - offset,
          height: height + handleSize,
          width: handleSize
        },
        left: {
          x: x0 - offset,
          y: y0 - offset,
          height: height + handleSize,
          width: handleSize
        }
      };
    });

    _defineProperty$4(_assertThisInitialized$4(_this), "corners", function () {
      var handleSize = _this.props.handleSize;
      var extent = _this.state.extent;
      var x0 = extent.x0,
          x1 = extent.x1,
          y0 = extent.y0,
          y1 = extent.y1;
      var offset = handleSize / 2;
      var width = handleSize;
      var height = handleSize;
      return {
        topLeft: {
          x: Math.min(x0, x1) - offset,
          y: Math.min(y0, y1) - offset,
          width: width,
          height: height
        },
        topRight: {
          x: Math.max(x0, x1) - offset,
          y: Math.min(y0, y1) - offset,
          width: width,
          height: height
        },
        bottomLeft: {
          x: Math.min(x0, x1) - offset,
          y: Math.max(y0, y1) - offset,
          width: width,
          height: height
        },
        bottomRight: {
          x: Math.max(x0, x1) - offset,
          y: Math.max(y0, y1) - offset,
          width: width,
          height: height
        }
      };
    });

    _defineProperty$4(_assertThisInitialized$4(_this), "updateBrush", function (updater) {
      var onChange = _this.props.onChange;

      _this.setState(updater, function () {
        if (onChange) {
          onChange(_this.state);
        }
      });
    });

    _defineProperty$4(_assertThisInitialized$4(_this), "reset", function () {
      var _this$props5 = _this.props,
          width = _this$props5.width,
          height = _this$props5.height;

      _this.updateBrush(function () {
        return {
          start: {
            x: 0,
            y: 0
          },
          end: {
            x: 0,
            y: 0
          },
          extent: {
            x0: -1,
            x1: -1,
            y0: -1,
            y1: -1
          },
          bounds: {
            x0: 0,
            x1: width,
            y0: 0,
            y1: height
          },
          isBrushing: false,
          activeHandle: null
        };
      });
    });

    _this.state = _extends$5({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      }
    }, _this.props.initialBrushPosition, {
      extent: _this.props.initialBrushPosition ? _this.getExtent(_this.props.initialBrushPosition.start, _this.props.initialBrushPosition.end) : {
        x0: -1,
        x1: -1,
        y0: -1,
        y1: -1
      },
      bounds: {
        x0: 0,
        x1: _this.props.width,
        y0: 0,
        y1: _this.props.height
      },
      isBrushing: false,
      activeHandle: null
    });
    return _this;
  }

  var _proto = BaseBrush.prototype;

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener('mouseup', this.handleDragEnd);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleDragEnd);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(function () {
        return {
          bounds: {
            x0: 0,
            x1: _this2.props.width,
            y0: 0,
            y1: _this2.props.height
          }
        };
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$state = this.state,
        start = _this$state.start,
        end = _this$state.end;
    var _this$props6 = this.props,
        top = _this$props6.top,
        left = _this$props6.left,
        stageWidth = _this$props6.width,
        stageHeight = _this$props6.height,
        _onMouseLeave = _this$props6.onMouseLeave,
        _onMouseUp = _this$props6.onMouseUp,
        _onMouseMove = _this$props6.onMouseMove,
        onBrushEnd = _this$props6.onBrushEnd,
        _onClick = _this$props6.onClick,
        resizeTriggerAreas = _this$props6.resizeTriggerAreas,
        selectedBoxStyle = _this$props6.selectedBoxStyle,
        disableDraggingSelection = _this$props6.disableDraggingSelection,
        clickSensitivity = _this$props6.clickSensitivity;
    var handles = this.handles();
    var corners = this.corners();
    var width = this.getBrushWidth();
    var height = this.getBrushHeight();
    var resizeTriggerAreaSet = new Set(resizeTriggerAreas);
    return /*#__PURE__*/React.createElement(Group$1, {
      className: "vx-brush",
      top: top,
      left: left
    }, /*#__PURE__*/React.createElement(Drag$1, {
      width: stageWidth,
      height: stageHeight,
      resetOnStart: true,
      onDragStart: this.handleDragStart,
      onDragMove: this.handleDragMove,
      onDragEnd: this.handleDragEnd
    }, function (_ref) {
      var dragStart = _ref.dragStart,
          isDragging = _ref.isDragging,
          dragMove = _ref.dragMove,
          dragEnd = _ref.dragEnd;
      return /*#__PURE__*/React.createElement(Bar$1, {
        className: "vx-brush-overlay",
        fill: "transparent",
        x: 0,
        y: 0,
        width: stageWidth,
        height: stageHeight,
        onDoubleClick: function onDoubleClick() {
          return _this3.reset();
        },
        onClick: function onClick(event) {
          var duration = _this3.mouseUpTime - _this3.mouseDownTime;
          if (_onClick && duration < clickSensitivity) _onClick(event);
        },
        onMouseDown: function onMouseDown(event) {
          _this3.mouseDownTime = Date.now();
          dragStart(event);
        },
        onMouseLeave: function onMouseLeave(event) {
          if (_onMouseLeave) _onMouseLeave(event);
        },
        onMouseMove: function onMouseMove(event) {
          if (!isDragging && _onMouseMove) _onMouseMove(event);
          if (isDragging) dragMove(event);
        },
        onMouseUp: function onMouseUp(event) {
          _this3.mouseUpTime = Date.now();
          if (_onMouseUp) _onMouseUp(event);
          dragEnd(event);
        },
        style: BRUSH_OVERLAY_STYLES
      });
    }), start && end && /*#__PURE__*/React.createElement(BrushSelection, {
      updateBrush: this.updateBrush,
      width: width,
      height: height,
      stageWidth: stageWidth,
      stageHeight: stageHeight,
      brush: _extends$5({}, this.state),
      disableDraggingSelection: disableDraggingSelection,
      onBrushEnd: onBrushEnd,
      onMouseLeave: _onMouseLeave,
      onMouseMove: _onMouseMove,
      onMouseUp: _onMouseUp,
      onClick: _onClick,
      selectedBoxStyle: selectedBoxStyle
    }), start && end && Object.keys(handles).filter(function (handleKey) {
      return resizeTriggerAreaSet.has(handleKey);
    }).map(function (handleKey) {
      var handle = handles[handleKey];
      return handle && /*#__PURE__*/React.createElement(BrushHandle, {
        key: "handle-" + handleKey,
        type: handleKey,
        handle: handle,
        stageWidth: stageWidth,
        stageHeight: stageHeight,
        updateBrush: _this3.updateBrush,
        brush: _this3.state,
        onBrushEnd: onBrushEnd
      });
    }), start && end && Object.keys(corners).filter(function (cornerKey) {
      return resizeTriggerAreaSet.has(cornerKey);
    }).map(function (cornerKey) {
      var corner = corners[cornerKey];
      return corner && /*#__PURE__*/React.createElement(BrushCorner, {
        key: "corner-" + cornerKey,
        type: cornerKey,
        brush: _this3.state,
        updateBrush: _this3.updateBrush,
        stageWidth: stageWidth,
        stageHeight: stageHeight,
        corner: corner,
        onBrushEnd: onBrushEnd
      });
    }));
  };

  return BaseBrush;
}(React.Component);

_defineProperty$4(BaseBrush, "propTypes", {
  brushDirection: _pt.oneOf(['horizontal', 'vertical', 'both']),
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  left: _pt.number.isRequired,
  top: _pt.number.isRequired,
  onChange: _pt.func,
  handleSize: _pt.number,
  resizeTriggerAreas: _pt.array,
  onBrushStart: _pt.func,
  onBrushEnd: _pt.func,
  onMouseLeave: _pt.func,
  onMouseUp: _pt.func,
  onMouseMove: _pt.func,
  onClick: _pt.func,
  clickSensitivity: _pt.number,
  disableDraggingSelection: _pt.bool,
  resetOnEnd: _pt.bool
});

_defineProperty$4(BaseBrush, "defaultProps", {
  brushDirection: 'both',
  inheritedMargin: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  onChange: null,
  handleSize: 4,
  resizeTriggerAreas: ['left', 'right'],
  onBrushStart: null,
  onBrushEnd: null,
  onMouseLeave: null,
  onMouseUp: null,
  onMouseMove: null,
  onClick: null,
  disableDraggingSelection: false,
  clickSensitivity: 200,
  resetOnEnd: false,
  initialBrushPosition: null
});

function scaleInvert(scale, value) {
  // Test if the scale is an ordinalScale or not,
  // Since an ordinalScale doesn't support invert function.
  if (!scale.invert) {
    var _scale$range = scale.range(),
        start = _scale$range[0],
        end = _scale$range[1];

    var i = 0; // ordinal should have step

    var width = scale.step() * (end - start) / Math.abs(end - start);

    if (width > 0) {
      while (value > start + width * (i + 1)) {
        i += 1;
      }
    } else {
      while (value < start + width * (i + 1)) {
        i += 1;
      }
    }

    return i;
  }

  return scale.invert(value);
}
function getDomainFromExtent(scale, start, end, tolerentDelta) {
  var domain;
  var invertedStart = scaleInvert(scale, start + (start < end ? -tolerentDelta : tolerentDelta));
  var invertedEnd = scaleInvert(scale, end + (end < start ? -tolerentDelta : tolerentDelta));
  var minValue = Math.min(invertedStart, invertedEnd);
  var maxValue = Math.max(invertedStart, invertedEnd);

  if (scale.invert) {
    domain = {
      start: minValue,
      end: maxValue
    };
  } else {
    var values = [];
    var scaleDomain = scale.domain();

    for (var i = minValue; i <= maxValue; i += 1) {
      values.push(scaleDomain[i]);
    }

    domain = {
      values: values
    };
  }

  return domain;
}

function _assertThisInitialized$5(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$5(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var SAFE_PIXEL = 2;
var DEFAULT_COLOR = 'steelblue';

var Brush = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$5(Brush, _React$Component);

  function Brush() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty$5(_assertThisInitialized$5(_this), "handleChange", function (brush) {
      var onChange = _this.props.onChange;
      if (!onChange) return;
      var x0 = brush.extent.x0;

      if (typeof x0 === 'undefined' || x0 < 0) {
        onChange(null);
        return;
      }

      var domain = _this.convertRangeToDomain(brush);

      onChange(domain);
    });

    _defineProperty$5(_assertThisInitialized$5(_this), "handleBrushStart", function (point) {
      var onBrushStart = _this.props.onBrushStart;
      if (!onBrushStart) return;
      var x = point.x,
          y = point.y;
      var _this$props = _this.props,
          xScale = _this$props.xScale,
          yScale = _this$props.yScale;
      var invertedX = scaleInvert(xScale, x);
      var invertedY = scaleInvert(yScale, y);
      onBrushStart({
        x: xScale.invert ? invertedX : xScale.domain()[invertedX],
        y: yScale.invert ? invertedY : yScale.domain()[invertedY]
      });
    });

    _defineProperty$5(_assertThisInitialized$5(_this), "handleBrushEnd", function (brush) {
      var onBrushEnd = _this.props.onBrushEnd;
      if (!onBrushEnd) return;
      var x0 = brush.extent.x0;

      if (typeof x0 === 'undefined' || x0 < 0) {
        onBrushEnd(null);
        return;
      }

      var domain = _this.convertRangeToDomain(brush);

      onBrushEnd(domain);
    });

    return _this;
  }

  var _proto = Brush.prototype;

  _proto.convertRangeToDomain = function convertRangeToDomain(brush) {
    var _this$props2 = this.props,
        xScale = _this$props2.xScale,
        yScale = _this$props2.yScale;
    var _brush$extent = brush.extent,
        x0 = _brush$extent.x0,
        x1 = _brush$extent.x1,
        y0 = _brush$extent.y0,
        y1 = _brush$extent.y1;
    var xDomain = getDomainFromExtent(xScale, x0 || 0, x1 || 0, SAFE_PIXEL);
    var yDomain = getDomainFromExtent(yScale, y0 || 0, y1 || 0, SAFE_PIXEL);
    var domain = {
      x0: xDomain.start || 0,
      x1: xDomain.end || 0,
      xValues: xDomain.values,
      y0: yDomain.start || 0,
      y1: yDomain.end || 0,
      yValues: yDomain.values
    };
    return domain;
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        xScale = _this$props3.xScale,
        yScale = _this$props3.yScale,
        height = _this$props3.height,
        width = _this$props3.width,
        margin = _this$props3.margin,
        brushDirection = _this$props3.brushDirection,
        initialBrushPosition = _this$props3.initialBrushPosition,
        resizeTriggerAreas = _this$props3.resizeTriggerAreas,
        brushRegion = _this$props3.brushRegion,
        yAxisOrientation = _this$props3.yAxisOrientation,
        xAxisOrientation = _this$props3.xAxisOrientation,
        selectedBoxStyle = _this$props3.selectedBoxStyle,
        disableDraggingSelection = _this$props3.disableDraggingSelection,
        resetOnEnd = _this$props3.resetOnEnd,
        onMouseLeave = _this$props3.onMouseLeave,
        onMouseMove = _this$props3.onMouseMove,
        onClick = _this$props3.onClick,
        handleSize = _this$props3.handleSize;
    if (!xScale || !yScale) return null;
    var brushRegionWidth;
    var brushRegionHeight;
    var left;
    var top;
    var marginLeft = margin && margin.left ? margin.left : 0;
    var marginTop = margin && margin.top ? margin.top : 0;
    var marginRight = margin && margin.right ? margin.right : 0;
    var marginBottom = margin && margin.bottom ? margin.bottom : 0;

    if (brushRegion === 'chart') {
      left = 0;
      top = 0;
      brushRegionWidth = width;
      brushRegionHeight = height;
    } else if (brushRegion === 'yAxis') {
      top = 0;
      brushRegionHeight = height;

      if (yAxisOrientation === 'right') {
        left = width;
        brushRegionWidth = marginRight;
      } else {
        left = -marginLeft;
        brushRegionWidth = marginLeft;
      }
    } else {
      left = 0;
      brushRegionWidth = width;

      if (xAxisOrientation === 'bottom') {
        top = height;
        brushRegionHeight = marginBottom;
      } else {
        top = -marginTop;
        brushRegionHeight = marginTop;
      }
    }

    return /*#__PURE__*/React.createElement(BaseBrush, {
      width: brushRegionWidth,
      height: brushRegionHeight,
      left: left,
      top: top,
      inheritedMargin: margin,
      initialBrushPosition: initialBrushPosition,
      onChange: this.handleChange,
      onBrushEnd: this.handleBrushEnd,
      onBrushStart: this.handleBrushStart,
      handleSize: handleSize,
      resizeTriggerAreas: resizeTriggerAreas,
      brushDirection: brushDirection,
      selectedBoxStyle: selectedBoxStyle,
      disableDraggingSelection: disableDraggingSelection,
      resetOnEnd: resetOnEnd,
      onMouseLeave: onMouseLeave,
      onMouseMove: onMouseMove,
      onClick: onClick
    });
  };

  return Brush;
}(React.Component);

_defineProperty$5(Brush, "propTypes", {
  height: _pt.number,
  width: _pt.number,
  onChange: _pt.func,
  onBrushEnd: _pt.func,
  brushDirection: _pt.oneOf(['vertical', 'horizontal', 'both']),
  resizeTriggerAreas: _pt.array,
  brushRegion: _pt.oneOf(['xAxis', 'yAxis', 'chart']),
  yAxisOrientation: _pt.oneOf(['left', 'right']),
  xAxisOrientation: _pt.oneOf(['top', 'bottom']),
  disableDraggingSelection: _pt.bool,
  resetOnEnd: _pt.bool,
  handleSize: _pt.number
});

_defineProperty$5(Brush, "defaultProps", {
  xScale: null,
  yScale: null,
  onChange: null,
  height: 0,
  width: 0,
  selectedBoxStyle: {
    fill: DEFAULT_COLOR,
    fillOpacity: 0.2,
    stroke: DEFAULT_COLOR,
    strokeWidth: 1,
    strokeOpacity: 0.8
  },
  margin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  handleSize: 4,
  brushDirection: 'horizontal',
  initialBrushPosition: null,
  resizeTriggerAreas: ['left', 'right'],
  brushRegion: 'chart',
  yAxisOrientation: 'right',
  xAxisOrientation: 'bottom',
  onBrushStart: null,
  onBrushEnd: null,
  disableDraggingSelection: false,
  resetOnEnd: false,
  onMouseMove: null,
  onMouseLeave: null,
  onClick: null
});

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ClipPath(_ref) {
  var id = _ref.id,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose(_ref, ["id", "children"]);

  return /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", _extends$6({
    id: id
  }, restProps), children));
}
ClipPath.propTypes = {
  id: _pt.string.isRequired,
  children: _pt.node
};

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function CircleClipPath(_ref) {
  var id = _ref.id,
      cx = _ref.cx,
      cy = _ref.cy,
      r = _ref.r,
      restProps = _objectWithoutPropertiesLoose$1(_ref, ["id", "cx", "cy", "r"]);

  return /*#__PURE__*/React.createElement(ClipPath, {
    id: id
  }, /*#__PURE__*/React.createElement("circle", _extends$7({
    cx: cx,
    cy: cy,
    r: r
  }, restProps)));
}
CircleClipPath.propTypes = {
  id: _pt.string.isRequired,
  cx: _pt.oneOfType([_pt.string, _pt.number]),
  cy: _pt.oneOfType([_pt.string, _pt.number]),
  r: _pt.oneOfType([_pt.string, _pt.number])
};

function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }

function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function RectClipPath(_ref) {
  var id = _ref.id,
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 0 : _ref$y,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 1 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 1 : _ref$height,
      restProps = _objectWithoutPropertiesLoose$2(_ref, ["id", "x", "y", "width", "height"]);

  return /*#__PURE__*/React.createElement(ClipPath, {
    id: id
  }, /*#__PURE__*/React.createElement("rect", _extends$8({
    x: x,
    y: y,
    width: width,
    height: height
  }, restProps)));
}
RectClipPath.propTypes = {
  id: _pt.string.isRequired,
  x: _pt.oneOfType([_pt.string, _pt.number]),
  y: _pt.oneOfType([_pt.string, _pt.number]),
  width: _pt.oneOfType([_pt.string, _pt.number]),
  height: _pt.oneOfType([_pt.string, _pt.number])
};

function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }

function _assertThisInitialized$6(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$6(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Drag = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$6(Drag, _React$Component);

  function Drag() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty$6(_assertThisInitialized$6(_this), "state", {
      x: undefined,
      y: undefined,
      dx: 0,
      dy: 0,
      isDragging: false
    });

    _defineProperty$6(_assertThisInitialized$6(_this), "handleDragStart", function (event) {
      var _this$props = _this.props,
          onDragStart = _this$props.onDragStart,
          resetOnStart = _this$props.resetOnStart;
      event.persist();

      _this.setState(function (_ref) {
        var dx = _ref.dx,
            dy = _ref.dy;
        var point = localPoint$2(event) || {
          x: 0,
          y: 0
        };
        return {
          isDragging: true,
          dx: resetOnStart ? 0 : dx,
          dy: resetOnStart ? 0 : dy,
          x: resetOnStart ? point.x : point.x - dx,
          y: resetOnStart ? point.y : point.y - dy
        };
      }, onDragStart && function () {
        onDragStart(_extends$9({}, _this.state, {
          event: event
        }));
      });
    });

    _defineProperty$6(_assertThisInitialized$6(_this), "handleDragMove", function (event) {
      var onDragMove = _this.props.onDragMove;
      event.persist();

      _this.setState(function (_ref2) {
        var x = _ref2.x,
            y = _ref2.y,
            isDragging = _ref2.isDragging;
        var point = localPoint$2(event) || {
          x: 0,
          y: 0
        };
        return isDragging ? {
          isDragging: true,
          dx: point.x - (x || 0),
          dy: point.y - (y || 0)
        } : null;
      }, onDragMove && function () {
        if (_this.state.isDragging) onDragMove(_extends$9({}, _this.state, {
          event: event
        }));
      });
    });

    _defineProperty$6(_assertThisInitialized$6(_this), "handleDragEnd", function (event) {
      var onDragEnd = _this.props.onDragEnd;
      event.persist();

      _this.setState({
        isDragging: false
      }, onDragEnd && function () {
        onDragEnd(_extends$9({}, _this.state, {
          event: event
        }));
      });
    });

    return _this;
  }

  var _proto = Drag.prototype;

  _proto.render = function render() {
    var _this$state = this.state,
        x = _this$state.x,
        y = _this$state.y,
        dx = _this$state.dx,
        dy = _this$state.dy,
        isDragging = _this$state.isDragging;
    var _this$props2 = this.props,
        children = _this$props2.children,
        width = _this$props2.width,
        height = _this$props2.height,
        captureDragArea = _this$props2.captureDragArea;
    return /*#__PURE__*/React.createElement(React.Fragment, null, isDragging && captureDragArea && /*#__PURE__*/React.createElement("rect", {
      width: width,
      height: height,
      onMouseMove: this.handleDragMove,
      onMouseUp: this.handleDragEnd,
      fill: "transparent"
    }), children({
      x: x,
      y: y,
      dx: dx,
      dy: dy,
      isDragging: isDragging,
      dragEnd: this.handleDragEnd,
      dragMove: this.handleDragMove,
      dragStart: this.handleDragStart
    }));
  };

  return Drag;
}(React.Component);

_defineProperty$6(Drag, "propTypes", {
  children: _pt.func.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  captureDragArea: _pt.bool,
  resetOnStart: _pt.bool,
  onDragEnd: _pt.func,
  onDragMove: _pt.func,
  onDragStart: _pt.func
});

_defineProperty$6(Drag, "defaultProps", {
  captureDragArea: true,
  resetOnStart: false
});

/** Given at an array of items, moves the item at the specified index to the end of the array. */
function raise(items, raiseIndex) {
  var array = [].concat(items);
  var lastIndex = array.length - 1;

  var _array$splice = array.splice(raiseIndex, 1),
      raiseItem = _array$splice[0];

  array.splice(lastIndex, 0, raiseItem);
  return array;
}

function isElement(elem) {
  return !!elem && elem instanceof Element;
} // functional definition of isSVGElement. Note that SVGSVGElements are HTMLElements

function isSVGElement(elem) {
  return !!elem && (elem instanceof SVGElement || 'ownerSVGElement' in elem);
} // functional definition of SVGGElement

function isSVGSVGElement(elem) {
  return !!elem && 'createSVGPoint' in elem;
}
function isSVGGraphicsElement(elem) {
  return !!elem && 'getScreenCTM' in elem;
} // functional definition of TouchEvent

function isTouchEvent(event) {
  return !!event && 'changedTouches' in event;
} // functional definition of event

function isEvent(event) {
  return !!event && (event instanceof Event || 'nativeEvent' in event && event.nativeEvent instanceof Event);
}

function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }
var DEFAULT_POINT = {
  x: 0,
  y: 0
};
function getXAndYFromEvent(event) {
  if (!event) return _extends$a({}, DEFAULT_POINT);

  if (isTouchEvent(event)) {
    return event.changedTouches.length > 0 ? {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientX
    } : _extends$a({}, DEFAULT_POINT);
  }

  return {
    x: event.clientX,
    y: event.clientY
  };
}

function localPoint(node, event) {
  if (!node || !event) return null;
  var coords = getXAndYFromEvent(event); // find top-most SVG

  var svg = isSVGElement(node) ? node.ownerSVGElement : node;
  var screenCTM = isSVGGraphicsElement(svg) ? svg.getScreenCTM() : null;

  if (isSVGSVGElement(svg) && screenCTM) {
    var point = svg.createSVGPoint();
    point.x = coords.x;
    point.y = coords.y;
    point = point.matrixTransform(screenCTM.inverse());
    return new Point$1({
      x: point.x,
      y: point.y
    });
  } // fall back to bounding box


  var rect = node.getBoundingClientRect();
  return new Point$1({
    x: coords.x - rect.left - node.clientLeft,
    y: coords.y - rect.top - node.clientTop
  });
}

/** Handles two signatures for backwards compatibility. */

function localPoint$1(nodeOrEvent, maybeEvent) {
  // localPoint(node, event)
  if (isElement(nodeOrEvent) && maybeEvent) {
    return localPoint(nodeOrEvent, maybeEvent);
  } // localPoint(event)


  if (isEvent(nodeOrEvent)) {
    var event = nodeOrEvent;
    var node = event.target;
    if (node) return localPoint(node, event);
  }

  return null;
}

function _extends$b() { _extends$b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }

function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Graticule(_ref) {
  var graticule = _ref.graticule,
      lines = _ref.lines,
      outline = _ref.outline,
      extent = _ref.extent,
      extentMajor = _ref.extentMajor,
      extentMinor = _ref.extentMinor,
      step = _ref.step,
      stepMajor = _ref.stepMajor,
      stepMinor = _ref.stepMinor,
      precision = _ref.precision,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$3(_ref, ["graticule", "lines", "outline", "extent", "extentMajor", "extentMinor", "step", "stepMajor", "stepMinor", "precision", "children"]);

  var currGraticule = geoGraticule();
  if (extent) currGraticule.extent(extent);
  if (extentMajor) currGraticule.extentMajor(extentMajor);
  if (extentMinor) currGraticule.extentMinor(extentMinor);
  if (step) currGraticule.step(step);
  if (stepMajor) currGraticule.stepMajor(stepMajor);
  if (stepMinor) currGraticule.stepMinor(stepMinor);
  if (precision) currGraticule.precision(precision);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    graticule: currGraticule
  }));
  return /*#__PURE__*/React.createElement(Group$1, {
    className: "vx-geo-graticule"
  }, graticule && /*#__PURE__*/React.createElement("path", _extends$b({
    d: graticule(currGraticule()),
    fill: "none",
    stroke: "black"
  }, restProps)), lines && currGraticule.lines().map(function (line, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("path", _extends$b({
      d: lines(line),
      fill: "none",
      stroke: "black"
    }, restProps)));
  }), outline && /*#__PURE__*/React.createElement("path", _extends$b({
    d: outline(currGraticule.outline()),
    fill: "none",
    stroke: "black"
  }, restProps)));
}
Graticule.propTypes = {
  graticule: _pt.func,
  lines: _pt.func,
  outline: _pt.func,
  children: _pt.func,
  precision: _pt.number
};

function _extends$c() { _extends$c = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }

function _objectWithoutPropertiesLoose$4(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var projectionMapping = {
  orthographic: function orthographic() {
    return geoOrthographic();
  },
  albers: function albers() {
    return geoAlbers();
  },
  albersUsa: function albersUsa() {
    return geoAlbersUsa();
  },
  mercator: function mercator() {
    return geoMercator();
  },
  naturalEarth: function naturalEarth() {
    return geoNaturalEarth1();
  },
  equalEarth: function equalEarth() {
    return geoEqualEarth();
  }
};

/**
 * Component for all projections.
 */
function Projection(_ref) {
  var data = _ref.data,
      _ref$projection = _ref.projection,
      projection = _ref$projection === void 0 ? 'mercator' : _ref$projection,
      projectionFunc = _ref.projectionFunc,
      clipAngle = _ref.clipAngle,
      clipExtent = _ref.clipExtent,
      scale = _ref.scale,
      translate = _ref.translate,
      center = _ref.center,
      rotate = _ref.rotate,
      precision = _ref.precision,
      fitExtent = _ref.fitExtent,
      fitSize = _ref.fitSize,
      centroid = _ref.centroid,
      graticule = _ref.graticule,
      graticuleLines = _ref.graticuleLines,
      graticuleOutline = _ref.graticuleOutline,
      className = _ref.className,
      innerRef = _ref.innerRef,
      pointRadius = _ref.pointRadius,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$4(_ref, ["data", "projection", "projectionFunc", "clipAngle", "clipExtent", "scale", "translate", "center", "rotate", "precision", "fitExtent", "fitSize", "centroid", "graticule", "graticuleLines", "graticuleOutline", "className", "innerRef", "pointRadius", "children"]);

  var maybeCustomProjection = typeof projection === 'string' ? projectionMapping[projection] : projection;
  var currProjection = maybeCustomProjection();
  if (clipAngle) currProjection.clipAngle(clipAngle);
  if (clipExtent) currProjection.clipExtent(clipExtent);
  if (scale) currProjection.scale(scale);
  if (translate) currProjection.translate(translate);
  if (center) currProjection.center(center);
  if (rotate) currProjection.rotate(rotate);
  if (precision) currProjection.precision(precision);
  if (fitExtent) currProjection.fitExtent.apply(currProjection, fitExtent);
  if (fitSize) currProjection.fitSize.apply(currProjection, fitSize);
  var path = geoPath().projection(currProjection);
  if (pointRadius) path.pointRadius(pointRadius);
  var features = data.map(function (feature, i) {
    return {
      feature: feature,
      type: projection,
      projection: currProjection,
      index: i,
      centroid: path.centroid(feature),
      path: path(feature)
    };
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path,
    features: features
  }));
  return /*#__PURE__*/React.createElement(Group$1, {
    className: "vx-geo"
  }, graticule && !graticule.foreground && /*#__PURE__*/React.createElement(Graticule, _extends$c({
    graticule: function graticule(ml) {
      return path(ml) || '';
    }
  }, graticule)), graticuleLines && !graticuleLines.foreground && /*#__PURE__*/React.createElement(Graticule, _extends$c({
    lines: function lines(l) {
      return path(l) || '';
    }
  }, graticuleLines)), graticuleOutline && !graticuleOutline.foreground && /*#__PURE__*/React.createElement(Graticule, _extends$c({
    outline: function outline(p) {
      return path(p) || '';
    }
  }, graticuleOutline)), features.map(function (feature, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: projection + "-" + i
    }, /*#__PURE__*/React.createElement("path", _extends$c({
      className: cx("vx-geo-" + projection, className),
      d: feature.path || '',
      ref: innerRef && innerRef(feature, i)
    }, restProps)), centroid && centroid(feature.centroid, feature));
  }), projectionFunc && projectionFunc(currProjection), graticule && graticule.foreground && /*#__PURE__*/React.createElement(Graticule, _extends$c({
    graticule: function graticule(ml) {
      return path(ml) || '';
    }
  }, graticule)), graticuleLines && graticuleLines.foreground && /*#__PURE__*/React.createElement(Graticule, _extends$c({
    lines: function lines(l) {
      return path(l) || '';
    }
  }, graticuleLines)), graticuleOutline && graticuleOutline.foreground && /*#__PURE__*/React.createElement(Graticule, _extends$c({
    outline: function outline(p) {
      return path(p) || '';
    }
  }, graticuleOutline)));
}
Projection.propTypes = {
  data: _pt.array.isRequired,
  projectionFunc: _pt.func,
  clipAngle: _pt.number,
  scale: _pt.number,
  precision: _pt.number,
  centroid: _pt.func,
  className: _pt.string,
  children: _pt.func,
  innerRef: _pt.func,
  pointRadius: _pt.number
};

function _extends$d() { _extends$d = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }

/**
 * All props pass through to `<Projection projection="albers" {...props} />`
 */
function Albers(props) {
  return /*#__PURE__*/React.createElement(Projection, _extends$d({
    projection: "albers"
  }, props));
}

function _extends$e() { _extends$e = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }

/**
 * All props pass through to `<Projection projection="albersUsa" {...props} />`
 */
function AlbersUsa(props) {
  return /*#__PURE__*/React.createElement(Projection, _extends$e({
    projection: "albersUsa"
  }, props));
}

function _extends$f() { _extends$f = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }

/**
 * All props pass through to `<Projection projection="mercator" {...props} />`
 */
function Mercator(props) {
  return /*#__PURE__*/React.createElement(Projection, _extends$f({
    projection: "mercator"
  }, props));
}

function _extends$g() { _extends$g = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }

/**
 * All props pass through to `<Projection projection="orthographic" {...props} />`
 */
function Orthographic(props) {
  return /*#__PURE__*/React.createElement(Projection, _extends$g({
    projection: "orthographic"
  }, props));
}

function _extends$h() { _extends$h = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$h.apply(this, arguments); }

/**
 * All props pass through to `<Projection projection="naturalEarth" {...props} />`
 */
function NaturalEarth(props) {
  return /*#__PURE__*/React.createElement(Projection, _extends$h({
    projection: "naturalEarth"
  }, props));
}

function _extends$i() { _extends$i = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$i.apply(this, arguments); }

/**
 * All props pass through to `<Projection projection="equalEarth" {...props} />`
 */
function EqualEarth(props) {
  return /*#__PURE__*/React.createElement(Projection, _extends$i({
    projection: "equalEarth"
  }, props));
}

/**
 * All props pass through to `<Projection projection={customProjection} {...props} />`
 */
function CustomProjection(props) {
  return /*#__PURE__*/React.createElement(Projection, props);
}

function Glyph(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      className = _ref.className,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(Group$1, {
    className: cx('vx-glyph', className),
    top: top,
    left: left
  }, children);
}
Glyph.propTypes = {
  top: _pt.number,
  left: _pt.number,
  className: _pt.string,
  children: _pt.node
};

function _extends$j() { _extends$j = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$j.apply(this, arguments); }

function _objectWithoutPropertiesLoose$5(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GlyphDot(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      className = _ref.className,
      restProps = _objectWithoutPropertiesLoose$5(_ref, ["top", "left", "className"]);

  return /*#__PURE__*/React.createElement(Glyph, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement("circle", _extends$j({
    className: cx('vx-glyph-dot', className)
  }, restProps)));
}
GlyphDot.propTypes = {
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  r: _pt.number,
  cx: _pt.number,
  cy: _pt.number
};

function _extends$k() { _extends$k = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$k.apply(this, arguments); }

function _objectWithoutPropertiesLoose$6(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GlyphCross(_ref) {
  var children = _ref.children,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      size = _ref.size,
      restProps = _objectWithoutPropertiesLoose$6(_ref, ["children", "className", "top", "left", "size"]);

  var path = symbol();
  path.type(symbolCross); // TS can't differentiate the method overload here

  if (typeof size === 'number') path.size(size);else if (size) path.size(size);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement(Glyph, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement("path", _extends$k({
    className: cx('vx-glyph-cross', className),
    d: path() || ''
  }, restProps)));
}
GlyphCross.propTypes = {
  children: _pt.func,
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  size: _pt.oneOfType([_pt.number, _pt.func])
};

function _extends$l() { _extends$l = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$l.apply(this, arguments); }

function _objectWithoutPropertiesLoose$7(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GlyphDiamond(_ref) {
  var children = _ref.children,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      size = _ref.size,
      restProps = _objectWithoutPropertiesLoose$7(_ref, ["children", "className", "top", "left", "size"]);

  var path = symbol();
  path.type(symbolDiamond); // TS can't differentiate the method overload here

  if (typeof size === 'number') path.size(size);else if (size) path.size(size);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement(Glyph, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement("path", _extends$l({
    className: cx('vx-glyph-diamond', className),
    d: path() || ''
  }, restProps)));
}
GlyphDiamond.propTypes = {
  children: _pt.func,
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  size: _pt.oneOfType([_pt.number, _pt.func])
};

function _extends$m() { _extends$m = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$m.apply(this, arguments); }

function _objectWithoutPropertiesLoose$8(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GlyphStar(_ref) {
  var children = _ref.children,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      size = _ref.size,
      restProps = _objectWithoutPropertiesLoose$8(_ref, ["children", "className", "top", "left", "size"]);

  var path = symbol();
  path.type(symbolStar); // TS can't differentiate the method overload here

  if (typeof size === 'number') path.size(size);else if (size) path.size(size);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement(Glyph, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement("path", _extends$m({
    className: cx('vx-glyph-star', className),
    d: path() || ''
  }, restProps)));
}
GlyphStar.propTypes = {
  children: _pt.func,
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  size: _pt.oneOfType([_pt.number, _pt.func])
};

function _extends$n() { _extends$n = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$n.apply(this, arguments); }

function _objectWithoutPropertiesLoose$9(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GlyphTriangle(_ref) {
  var children = _ref.children,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      size = _ref.size,
      restProps = _objectWithoutPropertiesLoose$9(_ref, ["children", "className", "top", "left", "size"]);

  var path = symbol();
  path.type(symbolTriangle); // TS can't differentiate the method overload here

  if (typeof size === 'number') path.size(size);else if (size) path.size(size);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement(Glyph, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement("path", _extends$n({
    className: cx('vx-glyph-triangle', className),
    d: path() || ''
  }, restProps)));
}
GlyphTriangle.propTypes = {
  children: _pt.func,
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  size: _pt.oneOfType([_pt.number, _pt.func])
};

function _extends$o() { _extends$o = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$o.apply(this, arguments); }

function _objectWithoutPropertiesLoose$a(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GlyphWye(_ref) {
  var children = _ref.children,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      size = _ref.size,
      restProps = _objectWithoutPropertiesLoose$a(_ref, ["children", "className", "top", "left", "size"]);

  var path = symbol();
  path.type(symbolWye); // TS can't differentiate the method overload here

  if (typeof size === 'number') path.size(size);else if (size) path.size(size);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement(Glyph, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement("path", _extends$o({
    className: cx('vx-glyph-wye', className),
    d: path() || ''
  }, restProps)));
}
GlyphWye.propTypes = {
  children: _pt.func,
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  size: _pt.oneOfType([_pt.number, _pt.func])
};

function _extends$p() { _extends$p = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$p.apply(this, arguments); }

function _objectWithoutPropertiesLoose$b(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GlyphSquare(_ref) {
  var children = _ref.children,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      size = _ref.size,
      restProps = _objectWithoutPropertiesLoose$b(_ref, ["children", "className", "top", "left", "size"]);

  var path = symbol();
  path.type(symbolSquare); // TS can't differentiate the method overload here

  if (typeof size === 'number') path.size(size);else if (size) path.size(size);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement(Glyph, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement("path", _extends$p({
    className: cx('vx-glyph-square', className),
    d: path() || ''
  }, restProps)));
}
GlyphSquare.propTypes = {
  children: _pt.func,
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  size: _pt.oneOfType([_pt.number, _pt.func])
};

function _extends$q() { _extends$q = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$q.apply(this, arguments); }

function _objectWithoutPropertiesLoose$c(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GlyphCircle(_ref) {
  var children = _ref.children,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      size = _ref.size,
      restProps = _objectWithoutPropertiesLoose$c(_ref, ["children", "className", "top", "left", "size"]);

  var path = symbol();
  path.type(symbolCircle); // TS can't differentiate the method overload here

  if (typeof size === 'number') path.size(size);else if (size) path.size(size);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement(Glyph, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement("path", _extends$q({
    className: cx('vx-glyph-circle', className),
    d: path() || ''
  }, restProps)));
}
GlyphCircle.propTypes = {
  children: _pt.func,
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  size: _pt.oneOfType([_pt.number, _pt.func])
};

function _extends$r() { _extends$r = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$r.apply(this, arguments); }

function _objectWithoutPropertiesLoose$d(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function LinearGradient(_ref) {
  var children = _ref.children,
      id = _ref.id,
      from = _ref.from,
      to = _ref.to,
      _x1 = _ref.x1,
      _y1 = _ref.y1,
      _x2 = _ref.x2,
      _y2 = _ref.y2,
      _ref$fromOffset = _ref.fromOffset,
      fromOffset = _ref$fromOffset === void 0 ? '0%' : _ref$fromOffset,
      _ref$fromOpacity = _ref.fromOpacity,
      fromOpacity = _ref$fromOpacity === void 0 ? 1 : _ref$fromOpacity,
      _ref$toOffset = _ref.toOffset,
      toOffset = _ref$toOffset === void 0 ? '100%' : _ref$toOffset,
      _ref$toOpacity = _ref.toOpacity,
      toOpacity = _ref$toOpacity === void 0 ? 1 : _ref$toOpacity,
      rotate = _ref.rotate,
      transform = _ref.transform,
      _ref$vertical = _ref.vertical,
      vertical = _ref$vertical === void 0 ? true : _ref$vertical,
      restProps = _objectWithoutPropertiesLoose$d(_ref, ["children", "id", "from", "to", "x1", "y1", "x2", "y2", "fromOffset", "fromOpacity", "toOffset", "toOpacity", "rotate", "transform", "vertical"]);

  var x1 = _x1;
  var x2 = _x2;
  var y1 = _y1;
  var y2 = _y2;

  if (vertical && !x1 && !x2 && !y1 && !y2) {
    x1 = '0';
    x2 = '0';
    y1 = '0';
    y2 = '1';
  }

  return /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", _extends$r({
    id: id,
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    gradientTransform: rotate ? "rotate(" + rotate + ")" : transform
  }, restProps), !!children && children, !children && /*#__PURE__*/React.createElement("stop", {
    offset: fromOffset,
    stopColor: from,
    stopOpacity: fromOpacity
  }), !children && /*#__PURE__*/React.createElement("stop", {
    offset: toOffset,
    stopColor: to,
    stopOpacity: toOpacity
  })));
}
LinearGradient.propTypes = {
  id: _pt.string.isRequired,
  from: _pt.string,
  to: _pt.string,
  x1: _pt.oneOfType([_pt.string, _pt.number]),
  x2: _pt.oneOfType([_pt.string, _pt.number]),
  y1: _pt.oneOfType([_pt.string, _pt.number]),
  y2: _pt.oneOfType([_pt.string, _pt.number]),
  fromOffset: _pt.oneOfType([_pt.string, _pt.number]),
  fromOpacity: _pt.oneOfType([_pt.string, _pt.number]),
  toOffset: _pt.oneOfType([_pt.string, _pt.number]),
  toOpacity: _pt.oneOfType([_pt.string, _pt.number]),
  rotate: _pt.oneOfType([_pt.string, _pt.number]),
  transform: _pt.string,
  children: _pt.node,
  vertical: _pt.bool
};

function _extends$s() { _extends$s = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$s.apply(this, arguments); }

function _objectWithoutPropertiesLoose$e(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
// passed as rest props to radialGradient
function RadialGradient(_ref) {
  var children = _ref.children,
      id = _ref.id,
      from = _ref.from,
      to = _ref.to,
      _ref$fromOffset = _ref.fromOffset,
      fromOffset = _ref$fromOffset === void 0 ? '0%' : _ref$fromOffset,
      _ref$fromOpacity = _ref.fromOpacity,
      fromOpacity = _ref$fromOpacity === void 0 ? 1 : _ref$fromOpacity,
      _ref$toOffset = _ref.toOffset,
      toOffset = _ref$toOffset === void 0 ? '100%' : _ref$toOffset,
      _ref$toOpacity = _ref.toOpacity,
      toOpacity = _ref$toOpacity === void 0 ? 1 : _ref$toOpacity,
      rotate = _ref.rotate,
      transform = _ref.transform,
      restProps = _objectWithoutPropertiesLoose$e(_ref, ["children", "id", "from", "to", "fromOffset", "fromOpacity", "toOffset", "toOpacity", "rotate", "transform"]);

  return /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", _extends$s({
    id: id,
    gradientTransform: rotate ? "rotate(" + rotate + ")" : transform
  }, restProps), !!children && children, !children && /*#__PURE__*/React.createElement("stop", {
    offset: fromOffset,
    stopColor: from,
    stopOpacity: fromOpacity
  }), !children && /*#__PURE__*/React.createElement("stop", {
    offset: toOffset,
    stopColor: to,
    stopOpacity: toOpacity
  })));
}

function _extends$t() { _extends$t = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$t.apply(this, arguments); }

function _objectWithoutPropertiesLoose$f(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientDarkGreen(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#184E86' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#57CA85' : _ref$to,
      restProps = _objectWithoutPropertiesLoose$f(_ref, ["from", "to"]);

  return /*#__PURE__*/React.createElement(LinearGradient, _extends$t({
    from: from,
    to: to
  }, restProps));
}

function _extends$u() { _extends$u = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$u.apply(this, arguments); }

function _objectWithoutPropertiesLoose$g(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientLightgreenGreen(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#42E695' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#3BB2B8' : _ref$to,
      restProps = _objectWithoutPropertiesLoose$g(_ref, ["from", "to"]);

  return /*#__PURE__*/React.createElement(LinearGradient, _extends$u({
    from: from,
    to: to
  }, restProps));
}

function _extends$v() { _extends$v = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$v.apply(this, arguments); }

function _objectWithoutPropertiesLoose$h(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientOrangeRed(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#FCE38A' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#F38181' : _ref$to,
      restProps = _objectWithoutPropertiesLoose$h(_ref, ["from", "to"]);

  return /*#__PURE__*/React.createElement(LinearGradient, _extends$v({
    from: from,
    to: to
  }, restProps));
}

function _extends$w() { _extends$w = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$w.apply(this, arguments); }

function _objectWithoutPropertiesLoose$i(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientPinkBlue(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#F02FC2' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#6094EA' : _ref$to,
      restProps = _objectWithoutPropertiesLoose$i(_ref, ["from", "to"]);

  return /*#__PURE__*/React.createElement(LinearGradient, _extends$w({
    from: from,
    to: to
  }, restProps));
}

function _extends$x() { _extends$x = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$x.apply(this, arguments); }

function _objectWithoutPropertiesLoose$j(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientPinkRed(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#F54EA2' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#FF7676' : _ref$to,
      restProps = _objectWithoutPropertiesLoose$j(_ref, ["from", "to"]);

  return /*#__PURE__*/React.createElement(LinearGradient, _extends$x({
    from: from,
    to: to
  }, restProps));
}

function _extends$y() { _extends$y = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$y.apply(this, arguments); }

function _objectWithoutPropertiesLoose$k(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientPurpleOrange(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#7117EA' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#EA6060' : _ref$to,
      restProps = _objectWithoutPropertiesLoose$k(_ref, ["from", "to"]);

  return /*#__PURE__*/React.createElement(LinearGradient, _extends$y({
    from: from,
    to: to
  }, restProps));
}

function _extends$z() { _extends$z = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$z.apply(this, arguments); }

function _objectWithoutPropertiesLoose$l(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientPurpleRed(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#622774' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#C53364' : _ref$to,
      restProps = _objectWithoutPropertiesLoose$l(_ref, ["from", "to"]);

  return /*#__PURE__*/React.createElement(LinearGradient, _extends$z({
    from: from,
    to: to
  }, restProps));
}

function _extends$A() { _extends$A = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$A.apply(this, arguments); }

function _objectWithoutPropertiesLoose$m(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientPurpleTeal(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#5B247A' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#1BCEDF' : _ref$to,
      restProps = _objectWithoutPropertiesLoose$m(_ref, ["from", "to"]);

  return /*#__PURE__*/React.createElement(LinearGradient, _extends$A({
    from: from,
    to: to
  }, restProps));
}

function _extends$B() { _extends$B = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$B.apply(this, arguments); }

function _objectWithoutPropertiesLoose$n(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientSteelPurple(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#65799B' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#5E2563' : _ref$to,
      restProps = _objectWithoutPropertiesLoose$n(_ref, ["from", "to"]);

  return /*#__PURE__*/React.createElement(LinearGradient, _extends$B({
    from: from,
    to: to
  }, restProps));
}

function _extends$C() { _extends$C = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$C.apply(this, arguments); }

function _objectWithoutPropertiesLoose$o(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientTealBlue(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#17EAD9' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#6078EA' : _ref$to,
      restProps = _objectWithoutPropertiesLoose$o(_ref, ["from", "to"]);

  return /*#__PURE__*/React.createElement(LinearGradient, _extends$C({
    from: from,
    to: to
  }, restProps));
}

function _extends$D() { _extends$D = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$D.apply(this, arguments); }

function _objectWithoutPropertiesLoose$p(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GridRows(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      scale = _ref.scale,
      width = _ref.width,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? '#eaf0f6' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      className = _ref.className,
      _ref$numTicks = _ref.numTicks,
      numTicks = _ref$numTicks === void 0 ? 10 : _ref$numTicks,
      lineStyle = _ref.lineStyle,
      offset = _ref.offset,
      tickValues = _ref.tickValues,
      restProps = _objectWithoutPropertiesLoose$p(_ref, ["top", "left", "scale", "width", "stroke", "strokeWidth", "strokeDasharray", "className", "numTicks", "lineStyle", "offset", "tickValues"]);

  var ticks = tickValues || (scale.ticks ? scale.ticks(numTicks) : scale.domain());
  return /*#__PURE__*/React.createElement(Group$1, {
    className: cx('vx-rows', className),
    top: top,
    left: left
  }, ticks.map(function (d, i) {
    var y = offset ? (scale(d) || 0) + offset : scale(d) || 0;
    var fromPoint = new Point$1({
      x: 0,
      y: y
    });
    var toPoint = new Point$1({
      x: width,
      y: y
    });
    return /*#__PURE__*/React.createElement(Line$1, _extends$D({
      key: "row-line-" + d + "-" + i,
      from: fromPoint,
      to: toPoint,
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      style: lineStyle
    }, restProps));
  }));
}
GridRows.propTypes = {
  width: _pt.number.isRequired
};

function _extends$E() { _extends$E = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$E.apply(this, arguments); }

function _objectWithoutPropertiesLoose$q(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GridColumns(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      scale = _ref.scale,
      height = _ref.height,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? '#eaf0f6' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      className = _ref.className,
      _ref$numTicks = _ref.numTicks,
      numTicks = _ref$numTicks === void 0 ? 10 : _ref$numTicks,
      lineStyle = _ref.lineStyle,
      offset = _ref.offset,
      tickValues = _ref.tickValues,
      restProps = _objectWithoutPropertiesLoose$q(_ref, ["top", "left", "scale", "height", "stroke", "strokeWidth", "strokeDasharray", "className", "numTicks", "lineStyle", "offset", "tickValues"]);

  var ticks = tickValues || (scale.ticks ? scale.ticks(numTicks) : scale.domain());
  return /*#__PURE__*/React.createElement(Group$1, {
    className: cx('vx-columns', className),
    top: top,
    left: left
  }, ticks.map(function (d, i) {
    var x = offset ? (scale(d) || 0) + offset : scale(d) || 0;
    var fromPoint = new Point$1({
      x: x,
      y: 0
    });
    var toPoint = new Point$1({
      x: x,
      y: height
    });
    return /*#__PURE__*/React.createElement(Line$1, _extends$E({
      key: "column-line-" + d + "-" + i,
      from: fromPoint,
      to: toPoint,
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      style: lineStyle
    }, restProps));
  }));
}
GridColumns.propTypes = {
  height: _pt.number.isRequired
};

function _extends$F() { _extends$F = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$F.apply(this, arguments); }

function _objectWithoutPropertiesLoose$r(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Grid(_ref) {
  var top = _ref.top,
      left = _ref.left,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      width = _ref.width,
      height = _ref.height,
      className = _ref.className,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      numTicksRows = _ref.numTicksRows,
      numTicksColumns = _ref.numTicksColumns,
      rowLineStyle = _ref.rowLineStyle,
      columnLineStyle = _ref.columnLineStyle,
      xOffset = _ref.xOffset,
      yOffset = _ref.yOffset,
      rowTickValues = _ref.rowTickValues,
      columnTickValues = _ref.columnTickValues,
      restProps = _objectWithoutPropertiesLoose$r(_ref, ["top", "left", "xScale", "yScale", "width", "height", "className", "stroke", "strokeWidth", "strokeDasharray", "numTicksRows", "numTicksColumns", "rowLineStyle", "columnLineStyle", "xOffset", "yOffset", "rowTickValues", "columnTickValues"]);

  return /*#__PURE__*/React.createElement(Group$1, {
    className: cx('vx-grid', className),
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement(GridRows, _extends$F({
    className: className,
    scale: yScale,
    width: width,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    numTicks: numTicksRows,
    lineStyle: rowLineStyle,
    offset: yOffset,
    tickValues: rowTickValues
  }, restProps)), /*#__PURE__*/React.createElement(GridColumns, _extends$F({
    className: className,
    scale: xScale,
    height: height,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    numTicks: numTicksColumns,
    lineStyle: columnLineStyle,
    offset: xOffset,
    tickValues: columnTickValues
  }, restProps)));
}

function _extends$G() { _extends$G = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$G.apply(this, arguments); }

function _objectWithoutPropertiesLoose$s(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Group(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      transform = _ref.transform,
      className = _ref.className,
      children = _ref.children,
      innerRef = _ref.innerRef,
      restProps = _objectWithoutPropertiesLoose$s(_ref, ["top", "left", "transform", "className", "children", "innerRef"]);

  return /*#__PURE__*/React.createElement("g", _extends$G({
    ref: innerRef,
    className: cx('vx-group', className),
    transform: transform || "translate(" + left + ", " + top + ")"
  }, restProps), children);
}
Group.propTypes = {
  top: _pt.number,
  left: _pt.number,
  transform: _pt.string,
  className: _pt.string,
  children: _pt.node,
  innerRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object])
};

function _extends$H() { _extends$H = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$H.apply(this, arguments); }

function _objectWithoutPropertiesLoose$t(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function HeatmapCircle(_ref) {
  var className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 1 : _ref$gap,
      _ref$radius = _ref.radius,
      radius = _ref$radius === void 0 ? 6 : _ref$radius,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      _ref$colorScale = _ref.colorScale,
      colorScale = _ref$colorScale === void 0 ? function () {
    return undefined;
  } : _ref$colorScale,
      _ref$opacityScale = _ref.opacityScale,
      opacityScale = _ref$opacityScale === void 0 ? function () {
    return 1;
  } : _ref$opacityScale,
      _ref$bins = _ref.bins,
      bins = _ref$bins === void 0 ? function (column) {
    return column && column.bins;
  } : _ref$bins,
      _ref$count = _ref.count,
      count = _ref$count === void 0 ? function (cell) {
    return cell && cell.count;
  } : _ref$count,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$t(_ref, ["className", "top", "left", "data", "gap", "radius", "xScale", "yScale", "colorScale", "opacityScale", "bins", "count", "children"]);

  var innerRadius = radius - gap;
  var heatmap = data.map(function (columnDatum, column) {
    var x = xScale(column);
    return bins(columnDatum).map(function (bin, row) {
      var countValue = count(bin);
      return {
        bin: bin,
        row: row,
        column: column,
        datum: columnDatum,
        radius: radius,
        gap: gap,
        count: countValue,
        cx: radius + x,
        cy: yScale(row) + gap + radius,
        r: innerRadius,
        opacity: opacityScale(countValue),
        color: colorScale(countValue)
      };
    });
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(heatmap));
  return /*#__PURE__*/React.createElement(Group$1, {
    className: "vx-heatmap-circles",
    top: top,
    left: left
  }, heatmap.map(function (columns) {
    return columns.map(function (bin) {
      return /*#__PURE__*/React.createElement("circle", _extends$H({
        key: "heatmap-tile-circle-" + bin.row + "-" + bin.column,
        className: cx('vx-heatmap-circle', className),
        r: bin.r,
        cx: bin.cx,
        cy: bin.cy,
        fill: bin.color,
        fillOpacity: bin.opacity
      }, restProps));
    });
  }));
}
HeatmapCircle.propTypes = {
  data: _pt.array,
  left: _pt.number,
  top: _pt.number,
  gap: _pt.number,
  radius: _pt.number,
  xScale: _pt.func.isRequired,
  yScale: _pt.func.isRequired,
  bins: _pt.func,
  count: _pt.func,
  className: _pt.string,
  children: _pt.func
};

function _extends$I() { _extends$I = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$I.apply(this, arguments); }

function _objectWithoutPropertiesLoose$u(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function HeatmapRect(_ref) {
  var className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$binWidth = _ref.binWidth,
      binWidth = _ref$binWidth === void 0 ? 6 : _ref$binWidth,
      _ref$binHeight = _ref.binHeight,
      binHeight = _ref$binHeight === void 0 ? 6 : _ref$binHeight,
      _ref$x = _ref.x0,
      x0 = _ref$x === void 0 ? 0 : _ref$x,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 1 : _ref$gap,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      _ref$colorScale = _ref.colorScale,
      colorScale = _ref$colorScale === void 0 ? function () {
    return undefined;
  } : _ref$colorScale,
      _ref$opacityScale = _ref.opacityScale,
      opacityScale = _ref$opacityScale === void 0 ? function () {
    return 1;
  } : _ref$opacityScale,
      _ref$bins = _ref.bins,
      bins = _ref$bins === void 0 ? function (d) {
    return d && d.bins;
  } : _ref$bins,
      _ref$count = _ref.count,
      count = _ref$count === void 0 ? function (d) {
    return d && d.count;
  } : _ref$count,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$u(_ref, ["className", "top", "left", "data", "binWidth", "binHeight", "x0", "gap", "xScale", "yScale", "colorScale", "opacityScale", "bins", "count", "children"]);

  var width = binWidth - gap;
  var height = binHeight - gap;
  var heatmap = data.map(function (datum, column) {
    var x = xScale(column);
    return bins(datum).map(function (bin, row) {
      var countValue = count(bin);
      return {
        bin: bin,
        row: row,
        column: column,
        datum: datum,
        width: width,
        height: height,
        gap: gap,
        count: countValue,
        x: x + x0,
        y: yScale(row) + gap,
        color: colorScale(countValue),
        opacity: opacityScale(countValue)
      };
    });
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(heatmap));
  return /*#__PURE__*/React.createElement(Group$1, {
    className: "vx-heatmap-rects",
    top: top,
    left: left
  }, heatmap.map(function (_bins) {
    return _bins.map(function (bin) {
      return /*#__PURE__*/React.createElement("rect", _extends$I({
        key: "heatmap-tile-rect-" + bin.row + "-" + bin.column,
        className: cx('vx-heatmap-rect', className),
        width: bin.width,
        height: bin.height,
        x: bin.x,
        y: bin.y,
        fill: bin.color,
        fillOpacity: bin.opacity
      }, restProps));
    });
  }));
}
HeatmapRect.propTypes = {
  data: _pt.array,
  left: _pt.number,
  top: _pt.number,
  binWidth: _pt.number,
  binHeight: _pt.number,
  x0: _pt.number,
  gap: _pt.number,
  xScale: _pt.func.isRequired,
  yScale: _pt.func.isRequired,
  bins: _pt.func,
  count: _pt.func,
  className: _pt.string,
  children: _pt.func
};

var DEFAULT_LINK = {
  source: {
    x: 0,
    y: 0
  },
  target: {
    x: 0,
    y: 0
  }
};
function HierarchyDefaultLink(_ref) {
  var _ref$link = _ref.link,
      link = _ref$link === void 0 ? DEFAULT_LINK : _ref$link;
  return /*#__PURE__*/React.createElement("line", {
    x1: link.source.x,
    y1: link.source.y,
    x2: link.target.x,
    y2: link.target.y,
    strokeWidth: 2,
    stroke: "#999",
    strokeOpacity: 0.6
  });
}
HierarchyDefaultLink.propTypes = {
  link: _pt.shape({
    source: _pt.shape({
      x: _pt.number.isRequired,
      y: _pt.number.isRequired
    }).isRequired,
    target: _pt.shape({
      x: _pt.number.isRequired,
      y: _pt.number.isRequired
    }).isRequired
  })
};

function HierarchyDefaultNode(_ref) {
  var _ref$node = _ref.node,
      node = _ref$node === void 0 ? {
    x: 0,
    y: 0,
    r: 15
  } : _ref$node;
  return /*#__PURE__*/React.createElement("circle", {
    cx: node.x,
    cy: node.y,
    r: node.r || 15,
    fill: "#21D4FD"
  });
}
HierarchyDefaultNode.propTypes = {
  node: _pt.shape({
    x: _pt.number.isRequired,
    y: _pt.number.isRequired,
    r: _pt.number
  })
};

function Tree(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      size = _ref.size,
      nodeSize = _ref.nodeSize,
      separation = _ref.separation,
      children = _ref.children,
      _ref$linkComponent = _ref.linkComponent,
      linkComponent = _ref$linkComponent === void 0 ? HierarchyDefaultLink : _ref$linkComponent,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? HierarchyDefaultNode : _ref$nodeComponent;
  var tree$1 = tree();
  if (size) tree$1.size(size);
  if (nodeSize) tree$1.nodeSize(nodeSize);
  if (separation) tree$1.separation(separation);
  var data = tree$1(root);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(data));
  return /*#__PURE__*/React.createElement(Group$1, {
    top: top,
    left: left,
    className: cx('vx-tree', className)
  }, linkComponent && data.links().map(function (link, i) {
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "tree-link-" + i
    }, React.createElement(linkComponent, {
      link: link
    }));
  }), nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "tree-node-" + i
    }, React.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Tree.propTypes = {
  children: _pt.func,
  top: _pt.number,
  left: _pt.number,
  className: _pt.string,
  separation: _pt.func
};

function HierarchyDefaultRectNode(_ref) {
  var _ref$node = _ref.node,
      x0 = _ref$node.x0,
      x1 = _ref$node.x1,
      y0 = _ref$node.y0,
      y1 = _ref$node.y1;
  return /*#__PURE__*/React.createElement("rect", {
    x: x0,
    y: y0,
    width: Math.abs(x1 - x0),
    height: Math.abs(y1 - y0),
    fill: "#21D4FD"
  });
}
HierarchyDefaultRectNode.propTypes = {
  node: _pt.shape({
    x0: _pt.number.isRequired,
    x1: _pt.number.isRequired,
    y0: _pt.number.isRequired,
    y1: _pt.number.isRequired
  }).isRequired
};

/**
 * This is a workaround for TypeScript not inferring the correct
 * method overload/signature for some d3 shape methods.
 */
function setNumberOrNumberAccessor(func, value) {
  if (typeof value === 'number') func(value);else func(value);
}

function Treemap(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      tile = _ref.tile,
      size = _ref.size,
      round = _ref.round,
      padding = _ref.padding,
      paddingInner = _ref.paddingInner,
      paddingOuter = _ref.paddingOuter,
      paddingTop = _ref.paddingTop,
      paddingRight = _ref.paddingRight,
      paddingBottom = _ref.paddingBottom,
      paddingLeft = _ref.paddingLeft,
      children = _ref.children,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? HierarchyDefaultRectNode : _ref$nodeComponent;
  var treemap$1 = treemap();
  if (tile) treemap$1.tile(tile);
  if (size) treemap$1.size(size);
  if (round) treemap$1.round(round);
  if (padding) setNumberOrNumberAccessor(treemap$1.padding, padding);
  if (paddingInner) setNumberOrNumberAccessor(treemap$1.paddingInner, paddingInner);
  if (paddingOuter) setNumberOrNumberAccessor(treemap$1.paddingOuter, paddingOuter);
  if (paddingTop) setNumberOrNumberAccessor(treemap$1.paddingTop, paddingTop);
  if (paddingRight) setNumberOrNumberAccessor(treemap$1.paddingRight, paddingRight);
  if (paddingBottom) setNumberOrNumberAccessor(treemap$1.paddingBottom, paddingBottom);
  if (paddingLeft) setNumberOrNumberAccessor(treemap$1.paddingLeft, paddingLeft);
  var data = treemap$1(root);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(data));
  return /*#__PURE__*/React.createElement(Group$1, {
    top: top,
    left: left,
    className: cx('vx-treemap', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "treemap-node-" + i
    }, React.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Treemap.propTypes = {
  children: _pt.func,
  top: _pt.number,
  left: _pt.number,
  className: _pt.string,
  round: _pt.bool,
  padding: _pt.oneOfType([_pt.number, _pt.func]),
  paddingInner: _pt.oneOfType([_pt.number, _pt.func]),
  paddingOuter: _pt.oneOfType([_pt.number, _pt.func]),
  paddingTop: _pt.oneOfType([_pt.number, _pt.func]),
  paddingRight: _pt.oneOfType([_pt.number, _pt.func]),
  paddingBottom: _pt.oneOfType([_pt.number, _pt.func]),
  paddingLeft: _pt.oneOfType([_pt.number, _pt.func])
};

function Cluster(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      size = _ref.size,
      nodeSize = _ref.nodeSize,
      separation = _ref.separation,
      children = _ref.children,
      _ref$linkComponent = _ref.linkComponent,
      linkComponent = _ref$linkComponent === void 0 ? HierarchyDefaultLink : _ref$linkComponent,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? HierarchyDefaultNode : _ref$nodeComponent;
  var cluster$1 = cluster();
  if (size) cluster$1.size(size);
  if (nodeSize !== undefined) cluster$1.nodeSize(nodeSize);
  if (separation) cluster$1.separation(separation);
  var data = cluster$1(root);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(data));
  return /*#__PURE__*/React.createElement(Group$1, {
    top: top,
    left: left,
    className: cx('vx-cluster', className)
  }, linkComponent && data.links().map(function (link, i) {
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "cluster-link-" + i
    }, React.createElement(linkComponent, {
      link: link
    }));
  }), nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "cluster-node-" + i
    }, React.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Cluster.propTypes = {
  children: _pt.func,
  top: _pt.number,
  left: _pt.number,
  className: _pt.string,
  separation: _pt.func
};

function Pack(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      radius = _ref.radius,
      size = _ref.size,
      padding = _ref.padding,
      children = _ref.children,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? HierarchyDefaultNode : _ref$nodeComponent;
  var pack$1 = pack();
  if (size) pack$1.size(size);
  if (radius !== undefined) pack$1.radius(radius);
  if (padding) pack$1.padding(padding);
  var data = pack$1(root);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(data));
  return /*#__PURE__*/React.createElement(Group$1, {
    top: top,
    left: left,
    className: cx('vx-pack', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "pack-node-" + i
    }, React.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Pack.propTypes = {
  children: _pt.func,
  top: _pt.number,
  left: _pt.number,
  className: _pt.string,
  radius: _pt.func,
  padding: _pt.number
};

function Partition(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      size = _ref.size,
      round = _ref.round,
      padding = _ref.padding,
      children = _ref.children,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? HierarchyDefaultRectNode : _ref$nodeComponent;
  var partition$1 = partition();
  if (size) partition$1.size(size);
  if (round) partition$1.round(round);
  if (padding) partition$1.padding(padding);
  var data = partition$1(root);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(data));
  return /*#__PURE__*/React.createElement(Group$1, {
    top: top,
    left: left,
    className: cx('vx-partition', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "partition-node-" + i
    }, React.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Partition.propTypes = {
  children: _pt.func,
  top: _pt.number,
  left: _pt.number,
  className: _pt.string,
  round: _pt.bool,
  padding: _pt.number
};

function _extends$J() { _extends$J = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$J.apply(this, arguments); }

function _objectWithoutPropertiesLoose$v(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function LegendItem(_ref) {
  var _ref$flexDirection = _ref.flexDirection,
      flexDirection = _ref$flexDirection === void 0 ? 'row' : _ref$flexDirection,
      _ref$alignItems = _ref.alignItems,
      alignItems = _ref$alignItems === void 0 ? 'center' : _ref$alignItems,
      _ref$margin = _ref.margin,
      margin = _ref$margin === void 0 ? '0' : _ref$margin,
      _ref$display = _ref.display,
      display = _ref$display === void 0 ? 'flex' : _ref$display,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$v(_ref, ["flexDirection", "alignItems", "margin", "display", "children"]);

  return /*#__PURE__*/React.createElement("div", _extends$J({
    className: "vx-legend-item",
    style: {
      display: display,
      alignItems: alignItems,
      flexDirection: flexDirection,
      margin: margin
    }
  }, restProps), children);
}
LegendItem.propTypes = {
  alignItems: _pt.string,
  margin: _pt.oneOfType([_pt.string, _pt.number]),
  children: _pt.node,
  display: _pt.string
};

function _extends$K() { _extends$K = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$K.apply(this, arguments); }

function _objectWithoutPropertiesLoose$w(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function LegendLabel(_ref) {
  var _ref$flex = _ref.flex,
      flex = _ref$flex === void 0 ? '1' : _ref$flex,
      label = _ref.label,
      _ref$margin = _ref.margin,
      margin = _ref$margin === void 0 ? '5px 0' : _ref$margin,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'left' : _ref$align,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$w(_ref, ["flex", "label", "margin", "align", "children"]);

  return /*#__PURE__*/React.createElement("div", _extends$K({
    className: "vx-legend-label",
    style: {
      justifyContent: align,
      display: 'flex',
      flex: flex,
      margin: margin
    }
  }, restProps), children || label);
}
LegendLabel.propTypes = {
  align: _pt.string,
  label: _pt.node,
  flex: _pt.oneOfType([_pt.string, _pt.number]),
  margin: _pt.oneOfType([_pt.string, _pt.number]),
  children: _pt.node
};

function _extends$L() { _extends$L = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$L.apply(this, arguments); }
function ShapeRect(_ref) {
  var fill = _ref.fill,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style;
  return /*#__PURE__*/React.createElement("div", {
    style: _extends$L({
      width: width,
      height: height,
      background: fill
    }, style)
  });
}
ShapeRect.propTypes = {
  fill: _pt.string,
  width: _pt.oneOfType([_pt.string, _pt.number]),
  height: _pt.oneOfType([_pt.string, _pt.number])
};

function ShapeCircle(_ref) {
  var fill = _ref.fill,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style;
  var cleanWidth = typeof width === 'string' || typeof width === 'undefined' ? 0 : width;
  var cleanHeight = typeof height === 'string' || typeof height === 'undefined' ? 0 : height;
  var size = Math.max(cleanWidth, cleanHeight);
  var radius = size / 2;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size
  }, /*#__PURE__*/React.createElement(Group$1, {
    top: radius,
    left: radius
  }, /*#__PURE__*/React.createElement("circle", {
    r: radius,
    fill: String(fill),
    style: style
  })));
}
ShapeCircle.propTypes = {
  fill: _pt.string,
  width: _pt.oneOfType([_pt.string, _pt.number]),
  height: _pt.oneOfType([_pt.string, _pt.number])
};

function _extends$M() { _extends$M = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$M.apply(this, arguments); }

var NO_OP = function NO_OP() {
  return undefined;
};

function renderShape(_ref) {
  var _ref$shape = _ref.shape,
      shape = _ref$shape === void 0 ? 'rect' : _ref$shape,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? NO_OP : _ref$fill,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? NO_OP : _ref$size,
      width = _ref.width,
      height = _ref.height,
      label = _ref.label,
      _ref$shapeStyle = _ref.shapeStyle,
      shapeStyle = _ref$shapeStyle === void 0 ? NO_OP : _ref$shapeStyle;
  var props = {
    width: width,
    height: height,
    label: label,
    fill: fill(_extends$M({}, label)),
    size: size(_extends$M({}, label)),
    style: shapeStyle(_extends$M({}, label))
  };

  if (typeof shape === 'string') {
    if (shape === 'rect') {
      return React.createElement(ShapeRect, props);
    }

    return React.createElement(ShapeCircle, props);
  }

  if (React.isValidElement(shape)) {
    return React.cloneElement(shape, props);
  }

  if (shape) {
    return React.createElement(shape, props);
  }

  return null;
}

function _extends$N() { _extends$N = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$N.apply(this, arguments); }
function LegendShape(_ref) {
  var _ref$shape = _ref.shape,
      shape = _ref$shape === void 0 ? ShapeRect : _ref$shape,
      width = _ref.width,
      height = _ref.height,
      margin = _ref.margin,
      label = _ref.label,
      fill = _ref.fill,
      size = _ref.size,
      shapeStyle = _ref.shapeStyle;
  return /*#__PURE__*/React.createElement("div", {
    className: "vx-legend-shape",
    style: {
      display: 'flex',
      width: size ? size(_extends$N({}, label)) : width,
      height: size ? size(_extends$N({}, label)) : height,
      margin: margin
    }
  }, renderShape({
    shape: shape,
    label: label,
    width: width,
    height: height,
    fill: fill,
    shapeStyle: shapeStyle
  }));
}
LegendShape.propTypes = {
  margin: _pt.oneOfType([_pt.string, _pt.number]),
  fill: _pt.func,
  size: _pt.func,
  shapeStyle: _pt.func,
  width: _pt.oneOfType([_pt.string, _pt.number]),
  height: _pt.oneOfType([_pt.string, _pt.number])
};

/** Returns an object's value if defined, or the object. */
function valueOrIdentity(_) {
  if (_ && typeof _ === 'object' && 'value' in _ && typeof _.value !== 'undefined') return _.value;
  return _;
}
/** Returns an object's value if defined, or the object, coerced to a string. */

function valueOrIdentityString(_) {
  return String(valueOrIdentity(_));
}

/** Returns a function which takes a Datum and index as input, and returns a formatted label object. */
function labelTransformFactory(_ref) {
  var scale = _ref.scale,
      labelFormat = _ref.labelFormat;
  return function (d, i) {
    return {
      datum: d,
      index: i,
      text: "" + labelFormat(d, i),
      // @ts-ignore
      value: scale(d)
    };
  };
}

function _extends$O() { _extends$O = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$O.apply(this, arguments); }

function _objectWithoutPropertiesLoose$x(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var defaultStyle = {
  display: 'flex'
};
function Legend(_ref) {
  var className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? defaultStyle : _ref$style,
      scale = _ref.scale,
      shape = _ref.shape,
      inputDomain = _ref.domain,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? valueOrIdentityString : _ref$fill,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? valueOrIdentityString : _ref$size,
      _ref$labelFormat = _ref.labelFormat,
      labelFormat = _ref$labelFormat === void 0 ? valueOrIdentity : _ref$labelFormat,
      _ref$labelTransform = _ref.labelTransform,
      labelTransform = _ref$labelTransform === void 0 ? labelTransformFactory : _ref$labelTransform,
      _ref$shapeWidth = _ref.shapeWidth,
      shapeWidth = _ref$shapeWidth === void 0 ? 15 : _ref$shapeWidth,
      _ref$shapeHeight = _ref.shapeHeight,
      shapeHeight = _ref$shapeHeight === void 0 ? 15 : _ref$shapeHeight,
      _ref$shapeMargin = _ref.shapeMargin,
      shapeMargin = _ref$shapeMargin === void 0 ? '2px 4px 2px 0' : _ref$shapeMargin,
      shapeStyle = _ref.shapeStyle,
      _ref$labelAlign = _ref.labelAlign,
      labelAlign = _ref$labelAlign === void 0 ? 'left' : _ref$labelAlign,
      _ref$labelFlex = _ref.labelFlex,
      labelFlex = _ref$labelFlex === void 0 ? '1' : _ref$labelFlex,
      _ref$labelMargin = _ref.labelMargin,
      labelMargin = _ref$labelMargin === void 0 ? '0 4px' : _ref$labelMargin,
      _ref$itemMargin = _ref.itemMargin,
      itemMargin = _ref$itemMargin === void 0 ? '0' : _ref$itemMargin,
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'column' : _ref$direction,
      _ref$itemDirection = _ref.itemDirection,
      itemDirection = _ref$itemDirection === void 0 ? 'row' : _ref$itemDirection,
      children = _ref.children,
      legendItemProps = _objectWithoutPropertiesLoose$x(_ref, ["className", "style", "scale", "shape", "domain", "fill", "size", "labelFormat", "labelTransform", "shapeWidth", "shapeHeight", "shapeMargin", "shapeStyle", "labelAlign", "labelFlex", "labelMargin", "itemMargin", "direction", "itemDirection", "children"]);

  // `Scale extends ScaleType` constraint is tricky
  //  could consider removing `scale` altogether in the future and making `domain: Datum[]` required
  // @ts-ignore doesn't like `.domain()`
  var domain = inputDomain || ('domain' in scale ? scale.domain() : []);
  var labelFormatter = labelTransform({
    scale: scale,
    labelFormat: labelFormat
  });
  var labels = domain.map(labelFormatter);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(labels));
  return /*#__PURE__*/React.createElement("div", {
    className: cx('vx-legend', className),
    style: _extends$O({}, style, {
      flexDirection: direction
    })
  }, labels.map(function (label, i) {
    return /*#__PURE__*/React.createElement(LegendItem, _extends$O({
      key: "legend-" + label.text + "-" + i,
      margin: itemMargin,
      flexDirection: itemDirection
    }, legendItemProps), /*#__PURE__*/React.createElement(LegendShape, {
      shape: shape,
      height: shapeHeight,
      width: shapeWidth,
      margin: shapeMargin,
      label: label,
      fill: fill,
      size: size,
      shapeStyle: shapeStyle
    }), /*#__PURE__*/React.createElement(LegendLabel, {
      label: label.text,
      flex: labelFlex,
      margin: labelMargin,
      align: labelAlign
    }));
  }));
}
Legend.propTypes = {
  children: _pt.func,
  className: _pt.string,
  domain: _pt.array,
  shapeWidth: _pt.oneOfType([_pt.string, _pt.number]),
  shapeHeight: _pt.oneOfType([_pt.string, _pt.number]),
  shapeMargin: _pt.oneOfType([_pt.string, _pt.number]),
  labelAlign: _pt.string,
  labelFlex: _pt.oneOfType([_pt.string, _pt.number]),
  labelMargin: _pt.oneOfType([_pt.string, _pt.number]),
  itemMargin: _pt.oneOfType([_pt.string, _pt.number]),
  fill: _pt.func,
  size: _pt.func,
  shapeStyle: _pt.func
};

function _extends$P() { _extends$P = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$P.apply(this, arguments); }

function _objectWithoutPropertiesLoose$y(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function labelFormatterFactoryFactory(_ref) {
  var labelDelimiter = _ref.labelDelimiter;
  return function (_ref2) {
    var scale = _ref2.scale,
        labelFormat = _ref2.labelFormat;
    return function (datum, index) {
      var _scale$invertExtent = scale.invertExtent(scale(datum)),
          x0 = _scale$invertExtent[0],
          x1 = _scale$invertExtent[1];

      return {
        extent: [x0, x1],
        text: labelFormat(x0, index) + " " + labelDelimiter + " " + labelFormat(x1, index),
        value: scale(x0),
        datum: datum,
        index: index
      };
    };
  };
}
/** A Quantile scale takes a number input and returns an Output. */


function LegendQuantile(_ref3) {
  var inputDomain = _ref3.domain,
      scale = _ref3.scale,
      _ref3$labelFormat = _ref3.labelFormat,
      labelFormat = _ref3$labelFormat === void 0 ? function (x) {
    return x;
  } : _ref3$labelFormat,
      inputLabelTransform = _ref3.labelTransform,
      _ref3$labelDelimiter = _ref3.labelDelimiter,
      labelDelimiter = _ref3$labelDelimiter === void 0 ? '-' : _ref3$labelDelimiter,
      restProps = _objectWithoutPropertiesLoose$y(_ref3, ["domain", "scale", "labelFormat", "labelTransform", "labelDelimiter"]);

  // transform range into input values because it may contain more elements
  var domain = inputDomain || scale.range().map(function (output) {
    return scale.invertExtent(output)[0];
  });
  var labelTransform = inputLabelTransform || labelFormatterFactoryFactory({
    labelDelimiter: labelDelimiter
  });
  return /*#__PURE__*/React.createElement(Legend, _extends$P({
    scale: scale,
    domain: domain,
    labelFormat: labelFormat,
    labelTransform: labelTransform
  }, restProps));
}
LegendQuantile.propTypes = {
  labelDelimiter: _pt.string
};

function _extends$Q() { _extends$Q = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$Q.apply(this, arguments); }

function _objectWithoutPropertiesLoose$z(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function defaultDomain(_ref) {
  var _ref$steps = _ref.steps,
      steps = _ref$steps === void 0 ? 5 : _ref$steps,
      scale = _ref.scale;
  var domain = scale.domain();
  var start = domain[0];
  var end = domain[domain.length - 1];
  var step = (end - start) / (steps - 1);
  return new Array(steps).fill(1).reduce(function (acc, cur, i) {
    acc.push(start + i * step);
    return acc;
  }, []);
}
/** Linear scales map from continuous inputs to continuous outputs. */

function LegendLinear(_ref2) {
  var scale = _ref2.scale,
      inputDomain = _ref2.domain,
      _ref2$steps = _ref2.steps,
      steps = _ref2$steps === void 0 ? 5 : _ref2$steps,
      restProps = _objectWithoutPropertiesLoose$z(_ref2, ["scale", "domain", "steps"]);

  var domain = inputDomain || defaultDomain({
    steps: steps,
    scale: scale
  });
  return /*#__PURE__*/React.createElement(Legend, _extends$Q({
    scale: scale,
    domain: domain
  }, restProps));
}
LegendLinear.propTypes = {
  steps: _pt.number
};

/** Ordinal scales map from strings to an Output type. */
function LegendOrdinal(props) {
  return /*#__PURE__*/React.createElement(Legend, props);
}

function _extends$R() { _extends$R = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$R.apply(this, arguments); }

function _objectWithoutPropertiesLoose$A(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var formatZero = function formatZero(label) {
  return label === 0 ? '0' : label || '';
};

/** Default transform implicitly assumes that Datum is of type number. */
function defaultTransform(_ref) {
  var labelDelimiter = _ref.labelDelimiter,
      labelLower = _ref.labelLower,
      labelUpper = _ref.labelUpper;
  return function (_ref2) {
    var scale = _ref2.scale,
        labelFormat = _ref2.labelFormat;
    var scaleRange = scale.range();
    var scaleDomain = scale.domain();
    return function (d, i) {
      var _ref3 = scaleRange.length >= i ? scale.invertExtent(scaleRange[i]) : [undefined, undefined],
          d0 = _ref3[0],
          d1 = _ref3[1];

      var delimiter = " " + labelDelimiter + " ";
      var text = '';
      var value;

      if (d0 == null && typeof d1 === 'number') {
        // lower threshold e.g., [undefined, number]
        delimiter = labelLower || delimiter;
        value = d1 - 1;
        text = "" + delimiter + formatZero(labelFormat(d1, i));
      } else if (d0 != null && d1 != null) {
        // threshold step
        value = d;
        text = "" + formatZero(labelFormat(d0, i)) + delimiter + formatZero(labelFormat(d1, i));
      } else if (typeof d0 === 'number' && d1 == null) {
        // upper threshold e.g., [number, undefined]
        delimiter = labelUpper || delimiter;
        value = d0 + scaleDomain[1]; // x0,x1 are from the domain, so the domain is numeric if d0 is

        text = "" + delimiter + formatZero(labelFormat(d0, i));
      }

      return {
        extent: [d0, d1],
        value: scale(value || d),
        text: text,
        datum: d,
        index: i
      };
    };
  };
}

function LegendThreshold(_ref4) {
  var scale = _ref4.scale,
      inputDomain = _ref4.domain,
      _ref4$labelFormat = _ref4.labelFormat,
      labelFormat = _ref4$labelFormat === void 0 ? function (d) {
    return d;
  } : _ref4$labelFormat,
      inputLabelTransform = _ref4.labelTransform,
      _ref4$labelDelimiter = _ref4.labelDelimiter,
      labelDelimiter = _ref4$labelDelimiter === void 0 ? 'to' : _ref4$labelDelimiter,
      _ref4$labelLower = _ref4.labelLower,
      labelLower = _ref4$labelLower === void 0 ? 'Less than ' : _ref4$labelLower,
      _ref4$labelUpper = _ref4.labelUpper,
      labelUpper = _ref4$labelUpper === void 0 ? 'More than ' : _ref4$labelUpper,
      restProps = _objectWithoutPropertiesLoose$A(_ref4, ["scale", "domain", "labelFormat", "labelTransform", "labelDelimiter", "labelLower", "labelUpper"]);

  // d3 docs specify that for n values in a domain, there should be n+1 values in the range
  // https://github.com/d3/d3-scale#threshold_domain
  // therefore if a domain is not specified we transform the range into input values
  // because it should contain more elements
  var domain = inputDomain || scale.range().map(function (output) {
    return scale.invertExtent(output)[0];
  });
  var labelTransform = inputLabelTransform || defaultTransform({
    labelDelimiter: labelDelimiter,
    labelLower: labelLower,
    labelUpper: labelUpper
  });
  return /*#__PURE__*/React.createElement(Legend, _extends$R({
    scale: scale,
    domain: domain,
    labelFormat: labelFormat,
    labelTransform: labelTransform
  }, restProps));
}
LegendThreshold.propTypes = {
  labelDelimiter: _pt.string,
  labelLower: _pt.string,
  labelUpper: _pt.string
};

function _extends$S() { _extends$S = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$S.apply(this, arguments); }

function _objectWithoutPropertiesLoose$B(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function defaultDomain$1(_ref) {
  var steps = _ref.steps,
      scale = _ref.scale;
  var domain = scale.domain();
  var start = domain[0];
  var end = domain[domain.length - 1];

  if (typeof start === 'number' && typeof end === 'number') {
    var step = (end - start) / (steps - 1);
    return new Array(steps).fill(1).reduce(function (acc, cur, i) {
      acc.push(start + i * step);
      return acc;
    }, []);
  }

  return [];
}

function LegendSize(_ref2) {
  var scale = _ref2.scale,
      inputDomain = _ref2.domain,
      _ref2$steps = _ref2.steps,
      steps = _ref2$steps === void 0 ? 5 : _ref2$steps,
      _ref2$labelFormat = _ref2.labelFormat,
      labelFormat = _ref2$labelFormat === void 0 ? function (x) {
    return x;
  } : _ref2$labelFormat,
      _ref2$labelTransform = _ref2.labelTransform,
      labelTransform = _ref2$labelTransform === void 0 ? labelTransformFactory : _ref2$labelTransform,
      restProps = _objectWithoutPropertiesLoose$B(_ref2, ["scale", "domain", "steps", "labelFormat", "labelTransform"]);

  var domain = inputDomain || defaultDomain$1({
    steps: steps,
    scale: scale
  });
  return /*#__PURE__*/React.createElement(Legend, _extends$S({
    scale: scale,
    domain: domain,
    labelFormat: labelFormat,
    labelTransform: labelTransform
  }, restProps));
}
LegendSize.propTypes = {
  steps: _pt.number
};

function Marker(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      from = _ref.from,
      to = _ref.to,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? 'magenta' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 2 : _ref$strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      transform = _ref.transform,
      label = _ref.label,
      _ref$labelAnchor = _ref.labelAnchor,
      labelAnchor = _ref$labelAnchor === void 0 ? 'left' : _ref$labelAnchor,
      _ref$labelDx = _ref.labelDx,
      labelDx = _ref$labelDx === void 0 ? 0 : _ref$labelDx,
      _ref$labelDy = _ref.labelDy,
      labelDy = _ref$labelDy === void 0 ? 0 : _ref$labelDy,
      labelFill = _ref.labelFill,
      _ref$labelFontSize = _ref.labelFontSize,
      labelFontSize = _ref$labelFontSize === void 0 ? 10 : _ref$labelFontSize,
      _ref$labelStroke = _ref.labelStroke,
      labelStroke = _ref$labelStroke === void 0 ? 'white' : _ref$labelStroke,
      _ref$labelStrokeWidth = _ref.labelStrokeWidth,
      labelStrokeWidth = _ref$labelStrokeWidth === void 0 ? 3 : _ref$labelStrokeWidth,
      _ref$labelPaintOrder = _ref.labelPaintOrder,
      labelPaintOrder = _ref$labelPaintOrder === void 0 ? 'stroke' : _ref$labelPaintOrder,
      className = _ref.className;
  return /*#__PURE__*/React.createElement(Group$1, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement(Line$1, {
    className: cx('vx-marker-line', className),
    from: from,
    to: to,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    transform: transform
  }), label && /*#__PURE__*/React.createElement("text", {
    x: from ? from.x : 0,
    y: from ? from.y : 0,
    dx: labelDx,
    dy: labelDy,
    fontSize: labelFontSize,
    fill: labelFill || stroke,
    stroke: labelStroke,
    strokeWidth: labelStrokeWidth,
    textAnchor: labelAnchor,
    paintOrder: labelPaintOrder
  }, label));
}
Marker.propTypes = {
  top: _pt.number,
  left: _pt.number,
  from: _pt.shape({
    x: _pt.number,
    y: _pt.number
  }),
  to: _pt.shape({
    x: _pt.number,
    y: _pt.number
  }),
  stroke: _pt.string,
  strokeWidth: _pt.number,
  strokeDasharray: _pt.string,
  transform: _pt.string,
  label: _pt.node,
  labelAnchor: _pt.string,
  labelDx: _pt.oneOfType([_pt.string, _pt.number]),
  labelDy: _pt.oneOfType([_pt.string, _pt.number]),
  labelFill: _pt.string,
  labelStroke: _pt.string,
  labelStrokeWidth: _pt.oneOfType([_pt.string, _pt.number]),
  labelFontSize: _pt.oneOfType([_pt.string, _pt.number]),
  labelPaintOrder: _pt.string,
  className: _pt.string
};

function genDateValue(length) {
  return new Array(length).fill(1).map(function (_, idx) {
    return {
      date: new Date(Date.now() - idx * 3600000),
      // eslint-disable-next-line no-bitwise
      value: Math.max(250, Math.random() * 3000 | 0)
    };
  });
}

var random = randomNormal(0, 0.2);
var sqrt3 = Math.sqrt(3);

function range(length) {
  return new Array(length).fill(1);
}

function genPointsRange(length, _ref) {
  var offsetX = _ref[0],
      offsetY = _ref[1],
      index = _ref[2];
  return range(length).map(function () {
    return [random() + offsetX, random() + offsetY, index];
  });
}
function genPoints(count) {
  if (count === void 0) {
    count = 300;
  }

  return [].concat(genPointsRange(count, [sqrt3, 1, 0]), genPointsRange(count, [-sqrt3, 1, 1]), genPointsRange(count, [0, -1, 2]));
}

var defaultCount = function defaultCount(idx, number) {
  return Math.random() * (25 * (number - idx));
};

var defaultBin = function defaultBin(idx, length) {
  return idx * 150;
};

function genBin(length, bin, count) {
  if (bin === void 0) {
    bin = defaultBin;
  }

  if (count === void 0) {
    count = defaultCount;
  }

  return new Array(length).fill(1).reduce(function (data, d, i) {
    return data.concat([{
      bin: bin(i, length),
      count: count(i, length)
    }]);
  }, []);
}

function genBins(length, height, bin, count) {
  return new Array(length).fill(1).reduce(function (arr, _, i) {
    return arr.concat([{
      bin: i,
      bins: genBin(height, bin, count)
    }]);
  }, []);
}

function genPhyllotaxis(_ref) {
  var radius = _ref.radius,
      width = _ref.width,
      height = _ref.height;
  var theta = Math.PI * (3 - Math.sqrt(5));
  return function (idx) {
    var r = radius * Math.sqrt(idx);
    var a = theta * idx;
    return {
      x: width / 2 + r * Math.cos(a),
      y: height / 2 + r * Math.sin(a)
    };
  };
}

var random$1 = randomNormal(4, 3);

var randomOffset = function randomOffset() {
  return Math.random() * 10;
};

var sampleSize = 1000;
function genStats(number) {
  var data = [];

  var _loop = function _loop(i) {
    var points = [];
    var offset = randomOffset();

    for (var j = 0; j < sampleSize; j += 1) {
      points.push(offset + random$1());
    }

    points.sort(function (a, b) {
      return a - b;
    });
    var firstQuartile = points[Math.round(sampleSize / 4)];
    var thirdQuartile = points[Math.round(3 * sampleSize / 4)];
    var IQR = thirdQuartile - firstQuartile;
    var min = firstQuartile - 1.5 * IQR;
    var max = thirdQuartile + 1.5 * IQR;
    var outliers = points.filter(function (p) {
      return p < min || p > max;
    });
    var binWidth = 2 * IQR * Math.pow(sampleSize - outliers.length, -1 / 3);
    var binNum = Math.round((max - min) / binWidth);
    var actualBinWidth = (max - min) / binNum;
    var bins = new Array(binNum + 2).fill(0);
    var values = new Array(binNum + 2).fill(min);

    for (var ii = 1; ii <= binNum; ii += 1) {
      values[ii] += actualBinWidth * (ii - 0.5);
    }

    values[values.length - 1] = max;
    points.filter(function (p) {
      return p >= min && p <= max;
    }).forEach(function (p) {
      bins[Math.floor((p - min) / actualBinWidth) + 1] += 1;
    });
    var binData = values.map(function (v, index) {
      return {
        value: v,
        count: bins[index]
      };
    });
    var boxPlot = {
      x: "Statistics " + i,
      min: min,
      firstQuartile: firstQuartile,
      median: points[Math.round(sampleSize / 2)],
      thirdQuartile: thirdQuartile,
      max: max,
      outliers: outliers
    };
    data.push({
      boxPlot: boxPlot,
      binData: binData
    });
  };

  for (var i = 0; i < number; i += 1) {
    _loop(i);
  }

  return data;
}

var appleStock = [{
  date: '2007-04-24T07:00:00.000Z',
  close: 93.24
}, {
  date: '2007-04-25T07:00:00.000Z',
  close: 95.35
}, {
  date: '2007-04-26T07:00:00.000Z',
  close: 98.84
}, {
  date: '2007-04-27T07:00:00.000Z',
  close: 99.92
}, {
  date: '2007-04-30T07:00:00.000Z',
  close: 99.8
}, {
  date: '2007-05-01T07:00:00.000Z',
  close: 99.47
}, {
  date: '2007-05-02T07:00:00.000Z',
  close: 100.39
}, {
  date: '2007-05-03T07:00:00.000Z',
  close: 100.4
}, {
  date: '2007-05-04T07:00:00.000Z',
  close: 100.81
}, {
  date: '2007-05-07T07:00:00.000Z',
  close: 103.92
}, {
  date: '2007-05-08T07:00:00.000Z',
  close: 105.06
}, {
  date: '2007-05-09T07:00:00.000Z',
  close: 106.88
}, {
  date: '2007-05-10T07:00:00.000Z',
  close: 107.34
}, {
  date: '2007-05-11T07:00:00.000Z',
  close: 108.74
}, {
  date: '2007-05-14T07:00:00.000Z',
  close: 109.36
}, {
  date: '2007-05-15T07:00:00.000Z',
  close: 107.52
}, {
  date: '2007-05-16T07:00:00.000Z',
  close: 107.34
}, {
  date: '2007-05-17T07:00:00.000Z',
  close: 109.44
}, {
  date: '2007-05-18T07:00:00.000Z',
  close: 110.02
}, {
  date: '2007-05-21T07:00:00.000Z',
  close: 111.98
}, {
  date: '2007-05-22T07:00:00.000Z',
  close: 113.54
}, {
  date: '2007-05-23T07:00:00.000Z',
  close: 112.89
}, {
  date: '2007-05-24T07:00:00.000Z',
  close: 110.69
}, {
  date: '2007-05-25T07:00:00.000Z',
  close: 113.62
}, {
  date: '2007-05-29T07:00:00.000Z',
  close: 114.35
}, {
  date: '2007-05-30T07:00:00.000Z',
  close: 118.77
}, {
  date: '2007-05-31T07:00:00.000Z',
  close: 121.19
}, {
  date: '2007-06-01T07:00:00.000Z',
  close: 118.4
}, {
  date: '2007-06-04T07:00:00.000Z',
  close: 121.33
}, {
  date: '2007-06-05T07:00:00.000Z',
  close: 122.67
}, {
  date: '2007-06-06T07:00:00.000Z',
  close: 123.64
}, {
  date: '2007-06-07T07:00:00.000Z',
  close: 124.07
}, {
  date: '2007-06-08T07:00:00.000Z',
  close: 124.49
}, {
  date: '2007-06-11T07:00:00.000Z',
  close: 120.19
}, {
  date: '2007-06-12T07:00:00.000Z',
  close: 120.38
}, {
  date: '2007-06-13T07:00:00.000Z',
  close: 117.5
}, {
  date: '2007-06-14T07:00:00.000Z',
  close: 118.75
}, {
  date: '2007-06-15T07:00:00.000Z',
  close: 120.5
}, {
  date: '2007-06-18T07:00:00.000Z',
  close: 125.09
}, {
  date: '2007-06-19T07:00:00.000Z',
  close: 123.66
}, {
  date: '2007-06-20T07:00:00.000Z',
  close: 121.55
}, {
  date: '2007-06-21T07:00:00.000Z',
  close: 123.9
}, {
  date: '2007-06-22T07:00:00.000Z',
  close: 123
}, {
  date: '2007-06-25T07:00:00.000Z',
  close: 122.34
}, {
  date: '2007-06-26T07:00:00.000Z',
  close: 119.65
}, {
  date: '2007-06-27T07:00:00.000Z',
  close: 121.89
}, {
  date: '2007-06-28T07:00:00.000Z',
  close: 120.56
}, {
  date: '2007-06-29T07:00:00.000Z',
  close: 122.04
}, {
  date: '2007-07-02T07:00:00.000Z',
  close: 121.26
}, {
  date: '2007-07-03T07:00:00.000Z',
  close: 127.17
}, {
  date: '2007-07-05T07:00:00.000Z',
  close: 132.75
}, {
  date: '2007-07-06T07:00:00.000Z',
  close: 132.3
}, {
  date: '2007-07-09T07:00:00.000Z',
  close: 130.33
}, {
  date: '2007-07-10T07:00:00.000Z',
  close: 132.35
}, {
  date: '2007-07-11T07:00:00.000Z',
  close: 132.39
}, {
  date: '2007-07-12T07:00:00.000Z',
  close: 134.07
}, {
  date: '2007-07-13T07:00:00.000Z',
  close: 137.73
}, {
  date: '2007-07-16T07:00:00.000Z',
  close: 138.1
}, {
  date: '2007-07-17T07:00:00.000Z',
  close: 138.91
}, {
  date: '2007-07-18T07:00:00.000Z',
  close: 138.12
}, {
  date: '2007-07-19T07:00:00.000Z',
  close: 140
}, {
  date: '2007-07-20T07:00:00.000Z',
  close: 143.75
}, {
  date: '2007-07-23T07:00:00.000Z',
  close: 143.7
}, {
  date: '2007-07-24T07:00:00.000Z',
  close: 134.89
}, {
  date: '2007-07-25T07:00:00.000Z',
  close: 137.26
}, {
  date: '2007-07-26T07:00:00.000Z',
  close: 146
}, {
  date: '2007-07-27T07:00:00.000Z',
  close: 143.85
}, {
  date: '2007-07-30T07:00:00.000Z',
  close: 141.43
}, {
  date: '2007-07-31T07:00:00.000Z',
  close: 131.76
}, {
  date: '2007-08-01T07:00:00.000Z',
  close: 135
}, {
  date: '2007-08-02T07:00:00.000Z',
  close: 136.49
}, {
  date: '2007-08-03T07:00:00.000Z',
  close: 131.85
}, {
  date: '2007-08-06T07:00:00.000Z',
  close: 135.25
}, {
  date: '2007-08-07T07:00:00.000Z',
  close: 135.03
}, {
  date: '2007-08-08T07:00:00.000Z',
  close: 134.01
}, {
  date: '2007-08-09T07:00:00.000Z',
  close: 126.39
}, {
  date: '2007-08-10T07:00:00.000Z',
  close: 125
}, {
  date: '2007-08-13T07:00:00.000Z',
  close: 127.79
}, {
  date: '2007-08-14T07:00:00.000Z',
  close: 124.03
}, {
  date: '2007-08-15T07:00:00.000Z',
  close: 119.9
}, {
  date: '2007-08-16T07:00:00.000Z',
  close: 117.05
}, {
  date: '2007-08-17T07:00:00.000Z',
  close: 122.06
}, {
  date: '2007-08-20T07:00:00.000Z',
  close: 122.22
}, {
  date: '2007-08-21T07:00:00.000Z',
  close: 127.57
}, {
  date: '2007-08-22T07:00:00.000Z',
  close: 132.51
}, {
  date: '2007-08-23T07:00:00.000Z',
  close: 131.07
}, {
  date: '2007-08-24T07:00:00.000Z',
  close: 135.3
}, {
  date: '2007-08-27T07:00:00.000Z',
  close: 132.25
}, {
  date: '2007-08-28T07:00:00.000Z',
  close: 126.82
}, {
  date: '2007-08-29T07:00:00.000Z',
  close: 134.08
}, {
  date: '2007-08-30T07:00:00.000Z',
  close: 136.25
}, {
  date: '2007-08-31T07:00:00.000Z',
  close: 138.48
}, {
  date: '2007-09-04T07:00:00.000Z',
  close: 144.16
}, {
  date: '2007-09-05T07:00:00.000Z',
  close: 136.76
}, {
  date: '2007-09-06T07:00:00.000Z',
  close: 135.01
}, {
  date: '2007-09-07T07:00:00.000Z',
  close: 131.77
}, {
  date: '2007-09-10T07:00:00.000Z',
  close: 136.71
}, {
  date: '2007-09-11T07:00:00.000Z',
  close: 135.49
}, {
  date: '2007-09-12T07:00:00.000Z',
  close: 136.85
}, {
  date: '2007-09-13T07:00:00.000Z',
  close: 137.2
}, {
  date: '2007-09-14T07:00:00.000Z',
  close: 138.81
}, {
  date: '2007-09-17T07:00:00.000Z',
  close: 138.41
}, {
  date: '2007-09-18T07:00:00.000Z',
  close: 140.92
}, {
  date: '2007-09-19T07:00:00.000Z',
  close: 140.77
}, {
  date: '2007-09-20T07:00:00.000Z',
  close: 140.31
}, {
  date: '2007-09-21T07:00:00.000Z',
  close: 144.15
}, {
  date: '2007-09-24T07:00:00.000Z',
  close: 148.28
}, {
  date: '2007-09-25T07:00:00.000Z',
  close: 153.18
}, {
  date: '2007-09-26T07:00:00.000Z',
  close: 152.77
}, {
  date: '2007-09-27T07:00:00.000Z',
  close: 154.5
}, {
  date: '2007-09-28T07:00:00.000Z',
  close: 153.47
}, {
  date: '2007-10-01T07:00:00.000Z',
  close: 156.34
}, {
  date: '2007-10-02T07:00:00.000Z',
  close: 158.45
}, {
  date: '2007-10-03T07:00:00.000Z',
  close: 157.92
}, {
  date: '2007-10-04T07:00:00.000Z',
  close: 156.24
}, {
  date: '2007-10-05T07:00:00.000Z',
  close: 161.45
}, {
  date: '2007-10-08T07:00:00.000Z',
  close: 167.91
}, {
  date: '2007-10-09T07:00:00.000Z',
  close: 167.86
}, {
  date: '2007-10-10T07:00:00.000Z',
  close: 166.79
}, {
  date: '2007-10-11T07:00:00.000Z',
  close: 162.23
}, {
  date: '2007-10-12T07:00:00.000Z',
  close: 167.25
}, {
  date: '2007-10-15T07:00:00.000Z',
  close: 166.98
}, {
  date: '2007-10-16T07:00:00.000Z',
  close: 169.58
}, {
  date: '2007-10-17T07:00:00.000Z',
  close: 172.75
}, {
  date: '2007-10-18T07:00:00.000Z',
  close: 173.5
}, {
  date: '2007-10-19T07:00:00.000Z',
  close: 170.42
}, {
  date: '2007-10-22T07:00:00.000Z',
  close: 174.36
}, {
  date: '2007-10-23T07:00:00.000Z',
  close: 186.16
}, {
  date: '2007-10-24T07:00:00.000Z',
  close: 185.93
}, {
  date: '2007-10-25T07:00:00.000Z',
  close: 182.78
}, {
  date: '2007-10-26T07:00:00.000Z',
  close: 184.7
}, {
  date: '2007-10-29T07:00:00.000Z',
  close: 185.09
}, {
  date: '2007-10-30T07:00:00.000Z',
  close: 187
}, {
  date: '2007-10-31T07:00:00.000Z',
  close: 189.95
}, {
  date: '2007-11-01T07:00:00.000Z',
  close: 187.44
}, {
  date: '2007-11-02T07:00:00.000Z',
  close: 187.87
}, {
  date: '2007-11-05T08:00:00.000Z',
  close: 186.18
}, {
  date: '2007-11-06T08:00:00.000Z',
  close: 191.79
}, {
  date: '2007-11-07T08:00:00.000Z',
  close: 186.3
}, {
  date: '2007-11-08T08:00:00.000Z',
  close: 175.47
}, {
  date: '2007-11-09T08:00:00.000Z',
  close: 165.37
}, {
  date: '2007-11-12T08:00:00.000Z',
  close: 153.76
}, {
  date: '2007-11-13T08:00:00.000Z',
  close: 169.96
}, {
  date: '2007-11-14T08:00:00.000Z',
  close: 166.11
}, {
  date: '2007-11-15T08:00:00.000Z',
  close: 164.3
}, {
  date: '2007-11-16T08:00:00.000Z',
  close: 166.39
}, {
  date: '2007-11-19T08:00:00.000Z',
  close: 163.95
}, {
  date: '2007-11-20T08:00:00.000Z',
  close: 168.85
}, {
  date: '2007-11-21T08:00:00.000Z',
  close: 168.46
}, {
  date: '2007-11-23T08:00:00.000Z',
  close: 171.54
}, {
  date: '2007-11-26T08:00:00.000Z',
  close: 172.54
}, {
  date: '2007-11-27T08:00:00.000Z',
  close: 174.81
}, {
  date: '2007-11-28T08:00:00.000Z',
  close: 180.22
}, {
  date: '2007-11-29T08:00:00.000Z',
  close: 184.29
}, {
  date: '2007-11-30T08:00:00.000Z',
  close: 182.22
}, {
  date: '2007-12-03T08:00:00.000Z',
  close: 178.86
}, {
  date: '2007-12-04T08:00:00.000Z',
  close: 179.81
}, {
  date: '2007-12-05T08:00:00.000Z',
  close: 185.5
}, {
  date: '2007-12-06T08:00:00.000Z',
  close: 189.95
}, {
  date: '2007-12-07T08:00:00.000Z',
  close: 194.3
}, {
  date: '2007-12-10T08:00:00.000Z',
  close: 194.21
}, {
  date: '2007-12-11T08:00:00.000Z',
  close: 188.54
}, {
  date: '2007-12-12T08:00:00.000Z',
  close: 190.86
}, {
  date: '2007-12-13T08:00:00.000Z',
  close: 191.83
}, {
  date: '2007-12-14T08:00:00.000Z',
  close: 190.39
}, {
  date: '2007-12-17T08:00:00.000Z',
  close: 184.4
}, {
  date: '2007-12-18T08:00:00.000Z',
  close: 182.98
}, {
  date: '2007-12-19T08:00:00.000Z',
  close: 183.12
}, {
  date: '2007-12-20T08:00:00.000Z',
  close: 187.21
}, {
  date: '2007-12-21T08:00:00.000Z',
  close: 193.91
}, {
  date: '2007-12-24T08:00:00.000Z',
  close: 198.8
}, {
  date: '2007-12-26T08:00:00.000Z',
  close: 198.95
}, {
  date: '2007-12-27T08:00:00.000Z',
  close: 198.57
}, {
  date: '2007-12-28T08:00:00.000Z',
  close: 199.83
}, {
  date: '2007-12-31T08:00:00.000Z',
  close: 198.08
}, {
  date: '2008-01-02T08:00:00.000Z',
  close: 194.84
}, {
  date: '2008-01-03T08:00:00.000Z',
  close: 194.93
}, {
  date: '2008-01-04T08:00:00.000Z',
  close: 180.05
}, {
  date: '2008-01-07T08:00:00.000Z',
  close: 177.64
}, {
  date: '2008-01-08T08:00:00.000Z',
  close: 171.25
}, {
  date: '2008-01-09T08:00:00.000Z',
  close: 179.4
}, {
  date: '2008-01-10T08:00:00.000Z',
  close: 178.02
}, {
  date: '2008-01-11T08:00:00.000Z',
  close: 172.69
}, {
  date: '2008-01-14T08:00:00.000Z',
  close: 178.78
}, {
  date: '2008-01-15T08:00:00.000Z',
  close: 169.04
}, {
  date: '2008-01-16T08:00:00.000Z',
  close: 159.64
}, {
  date: '2008-01-17T08:00:00.000Z',
  close: 160.89
}, {
  date: '2008-01-18T08:00:00.000Z',
  close: 161.36
}, {
  date: '2008-01-22T08:00:00.000Z',
  close: 155.64
}, {
  date: '2008-01-23T08:00:00.000Z',
  close: 139.07
}, {
  date: '2008-01-24T08:00:00.000Z',
  close: 135.6
}, {
  date: '2008-01-25T08:00:00.000Z',
  close: 130.01
}, {
  date: '2008-01-28T08:00:00.000Z',
  close: 130.01
}, {
  date: '2008-01-29T08:00:00.000Z',
  close: 131.54
}, {
  date: '2008-01-30T08:00:00.000Z',
  close: 132.18
}, {
  date: '2008-01-31T08:00:00.000Z',
  close: 135.36
}, {
  date: '2008-02-01T08:00:00.000Z',
  close: 133.75
}, {
  date: '2008-02-04T08:00:00.000Z',
  close: 131.65
}, {
  date: '2008-02-05T08:00:00.000Z',
  close: 129.36
}, {
  date: '2008-02-06T08:00:00.000Z',
  close: 122
}, {
  date: '2008-02-07T08:00:00.000Z',
  close: 121.24
}, {
  date: '2008-02-08T08:00:00.000Z',
  close: 125.48
}, {
  date: '2008-02-11T08:00:00.000Z',
  close: 129.45
}, {
  date: '2008-02-12T08:00:00.000Z',
  close: 124.86
}, {
  date: '2008-02-13T08:00:00.000Z',
  close: 129.4
}, {
  date: '2008-02-14T08:00:00.000Z',
  close: 127.46
}, {
  date: '2008-02-15T08:00:00.000Z',
  close: 124.63
}, {
  date: '2008-02-19T08:00:00.000Z',
  close: 122.18
}, {
  date: '2008-02-20T08:00:00.000Z',
  close: 123.82
}, {
  date: '2008-02-21T08:00:00.000Z',
  close: 121.54
}, {
  date: '2008-02-22T08:00:00.000Z',
  close: 119.46
}, {
  date: '2008-02-25T08:00:00.000Z',
  close: 119.74
}, {
  date: '2008-02-26T08:00:00.000Z',
  close: 119.15
}, {
  date: '2008-02-27T08:00:00.000Z',
  close: 122.96
}, {
  date: '2008-02-28T08:00:00.000Z',
  close: 129.91
}, {
  date: '2008-02-29T08:00:00.000Z',
  close: 125.02
}, {
  date: '2008-03-03T08:00:00.000Z',
  close: 121.73
}, {
  date: '2008-03-04T08:00:00.000Z',
  close: 124.62
}, {
  date: '2008-03-05T08:00:00.000Z',
  close: 124.49
}, {
  date: '2008-03-06T08:00:00.000Z',
  close: 120.93
}, {
  date: '2008-03-07T08:00:00.000Z',
  close: 122.25
}, {
  date: '2008-03-10T07:00:00.000Z',
  close: 119.69
}, {
  date: '2008-03-11T07:00:00.000Z',
  close: 127.35
}, {
  date: '2008-03-12T07:00:00.000Z',
  close: 126.03
}, {
  date: '2008-03-13T07:00:00.000Z',
  close: 127.94
}, {
  date: '2008-03-14T07:00:00.000Z',
  close: 126.61
}, {
  date: '2008-03-17T07:00:00.000Z',
  close: 126.73
}, {
  date: '2008-03-18T07:00:00.000Z',
  close: 132.82
}, {
  date: '2008-03-19T07:00:00.000Z',
  close: 129.67
}, {
  date: '2008-03-20T07:00:00.000Z',
  close: 133.27
}, {
  date: '2008-03-24T07:00:00.000Z',
  close: 139.53
}, {
  date: '2008-03-25T07:00:00.000Z',
  close: 140.98
}, {
  date: '2008-03-26T07:00:00.000Z',
  close: 145.06
}, {
  date: '2008-03-27T07:00:00.000Z',
  close: 140.25
}, {
  date: '2008-03-28T07:00:00.000Z',
  close: 143.01
}, {
  date: '2008-03-31T07:00:00.000Z',
  close: 143.5
}, {
  date: '2008-04-01T07:00:00.000Z',
  close: 149.53
}, {
  date: '2008-04-02T07:00:00.000Z',
  close: 147.49
}, {
  date: '2008-04-03T07:00:00.000Z',
  close: 151.61
}, {
  date: '2008-04-04T07:00:00.000Z',
  close: 153.08
}, {
  date: '2008-04-07T07:00:00.000Z',
  close: 155.89
}, {
  date: '2008-04-08T07:00:00.000Z',
  close: 152.84
}, {
  date: '2008-04-09T07:00:00.000Z',
  close: 151.44
}, {
  date: '2008-04-10T07:00:00.000Z',
  close: 154.55
}, {
  date: '2008-04-11T07:00:00.000Z',
  close: 147.14
}, {
  date: '2008-04-14T07:00:00.000Z',
  close: 147.78
}, {
  date: '2008-04-15T07:00:00.000Z',
  close: 148.38
}, {
  date: '2008-04-16T07:00:00.000Z',
  close: 153.7
}, {
  date: '2008-04-17T07:00:00.000Z',
  close: 154.49
}, {
  date: '2008-04-18T07:00:00.000Z',
  close: 161.04
}, {
  date: '2008-04-21T07:00:00.000Z',
  close: 168.16
}, {
  date: '2008-04-22T07:00:00.000Z',
  close: 160.2
}, {
  date: '2008-04-23T07:00:00.000Z',
  close: 162.89
}, {
  date: '2008-04-24T07:00:00.000Z',
  close: 168.94
}, {
  date: '2008-04-25T07:00:00.000Z',
  close: 169.73
}, {
  date: '2008-04-28T07:00:00.000Z',
  close: 172.24
}, {
  date: '2008-04-29T07:00:00.000Z',
  close: 175.05
}, {
  date: '2008-04-30T07:00:00.000Z',
  close: 173.95
}, {
  date: '2008-05-01T07:00:00.000Z',
  close: 180
}, {
  date: '2008-05-02T07:00:00.000Z',
  close: 180.94
}, {
  date: '2008-05-05T07:00:00.000Z',
  close: 184.73
}, {
  date: '2008-05-06T07:00:00.000Z',
  close: 186.66
}, {
  date: '2008-05-07T07:00:00.000Z',
  close: 182.59
}, {
  date: '2008-05-08T07:00:00.000Z',
  close: 185.06
}, {
  date: '2008-05-09T07:00:00.000Z',
  close: 183.45
}, {
  date: '2008-05-12T07:00:00.000Z',
  close: 188.16
}, {
  date: '2008-05-13T07:00:00.000Z',
  close: 189.96
}, {
  date: '2008-05-14T07:00:00.000Z',
  close: 186.26
}, {
  date: '2008-05-15T07:00:00.000Z',
  close: 189.73
}, {
  date: '2008-05-16T07:00:00.000Z',
  close: 187.62
}, {
  date: '2008-05-19T07:00:00.000Z',
  close: 183.6
}, {
  date: '2008-05-20T07:00:00.000Z',
  close: 185.9
}, {
  date: '2008-05-21T07:00:00.000Z',
  close: 178.19
}, {
  date: '2008-05-22T07:00:00.000Z',
  close: 177.05
}, {
  date: '2008-05-23T07:00:00.000Z',
  close: 181.17
}, {
  date: '2008-05-27T07:00:00.000Z',
  close: 186.43
}, {
  date: '2008-05-28T07:00:00.000Z',
  close: 187.01
}, {
  date: '2008-05-29T07:00:00.000Z',
  close: 186.69
}, {
  date: '2008-05-30T07:00:00.000Z',
  close: 188.75
}, {
  date: '2008-06-02T07:00:00.000Z',
  close: 186.1
}, {
  date: '2008-06-03T07:00:00.000Z',
  close: 185.37
}, {
  date: '2008-06-04T07:00:00.000Z',
  close: 185.19
}, {
  date: '2008-06-05T07:00:00.000Z',
  close: 189.43
}, {
  date: '2008-06-06T07:00:00.000Z',
  close: 185.64
}, {
  date: '2008-06-09T07:00:00.000Z',
  close: 181.61
}, {
  date: '2008-06-10T07:00:00.000Z',
  close: 185.64
}, {
  date: '2008-06-11T07:00:00.000Z',
  close: 180.81
}, {
  date: '2008-06-12T07:00:00.000Z',
  close: 173.26
}, {
  date: '2008-06-13T07:00:00.000Z',
  close: 172.37
}, {
  date: '2008-06-16T07:00:00.000Z',
  close: 176.84
}, {
  date: '2008-06-17T07:00:00.000Z',
  close: 181.43
}, {
  date: '2008-06-18T07:00:00.000Z',
  close: 178.75
}, {
  date: '2008-06-19T07:00:00.000Z',
  close: 180.9
}, {
  date: '2008-06-20T07:00:00.000Z',
  close: 175.27
}, {
  date: '2008-06-23T07:00:00.000Z',
  close: 173.16
}, {
  date: '2008-06-24T07:00:00.000Z',
  close: 173.25
}, {
  date: '2008-06-25T07:00:00.000Z',
  close: 177.39
}, {
  date: '2008-06-26T07:00:00.000Z',
  close: 168.26
}, {
  date: '2008-06-27T07:00:00.000Z',
  close: 170.09
}, {
  date: '2008-06-30T07:00:00.000Z',
  close: 167.44
}, {
  date: '2008-07-01T07:00:00.000Z',
  close: 174.68
}, {
  date: '2008-07-02T07:00:00.000Z',
  close: 168.18
}, {
  date: '2008-07-03T07:00:00.000Z',
  close: 170.12
}, {
  date: '2008-07-07T07:00:00.000Z',
  close: 175.16
}, {
  date: '2008-07-08T07:00:00.000Z',
  close: 179.55
}, {
  date: '2008-07-09T07:00:00.000Z',
  close: 174.25
}, {
  date: '2008-07-10T07:00:00.000Z',
  close: 176.63
}, {
  date: '2008-07-11T07:00:00.000Z',
  close: 172.58
}, {
  date: '2008-07-14T07:00:00.000Z',
  close: 173.88
}, {
  date: '2008-07-15T07:00:00.000Z',
  close: 169.64
}, {
  date: '2008-07-16T07:00:00.000Z',
  close: 172.81
}, {
  date: '2008-07-17T07:00:00.000Z',
  close: 171.81
}, {
  date: '2008-07-18T07:00:00.000Z',
  close: 165.15
}, {
  date: '2008-07-21T07:00:00.000Z',
  close: 166.29
}, {
  date: '2008-07-22T07:00:00.000Z',
  close: 162.02
}, {
  date: '2008-07-23T07:00:00.000Z',
  close: 166.26
}, {
  date: '2008-07-24T07:00:00.000Z',
  close: 159.03
}, {
  date: '2008-07-25T07:00:00.000Z',
  close: 162.12
}, {
  date: '2008-07-28T07:00:00.000Z',
  close: 154.4
}, {
  date: '2008-07-29T07:00:00.000Z',
  close: 157.08
}, {
  date: '2008-07-30T07:00:00.000Z',
  close: 159.88
}, {
  date: '2008-07-31T07:00:00.000Z',
  close: 158.95
}, {
  date: '2008-08-01T07:00:00.000Z',
  close: 156.66
}, {
  date: '2008-08-04T07:00:00.000Z',
  close: 153.23
}, {
  date: '2008-08-05T07:00:00.000Z',
  close: 160.64
}, {
  date: '2008-08-06T07:00:00.000Z',
  close: 164.19
}, {
  date: '2008-08-07T07:00:00.000Z',
  close: 163.57
}, {
  date: '2008-08-08T07:00:00.000Z',
  close: 169.55
}, {
  date: '2008-08-11T07:00:00.000Z',
  close: 173.56
}, {
  date: '2008-08-12T07:00:00.000Z',
  close: 176.73
}, {
  date: '2008-08-13T07:00:00.000Z',
  close: 179.3
}, {
  date: '2008-08-14T07:00:00.000Z',
  close: 179.32
}, {
  date: '2008-08-15T07:00:00.000Z',
  close: 175.74
}, {
  date: '2008-08-18T07:00:00.000Z',
  close: 175.39
}, {
  date: '2008-08-19T07:00:00.000Z',
  close: 173.53
}, {
  date: '2008-08-20T07:00:00.000Z',
  close: 175.84
}, {
  date: '2008-08-21T07:00:00.000Z',
  close: 174.29
}, {
  date: '2008-08-22T07:00:00.000Z',
  close: 176.79
}, {
  date: '2008-08-25T07:00:00.000Z',
  close: 172.55
}, {
  date: '2008-08-26T07:00:00.000Z',
  close: 173.64
}, {
  date: '2008-08-27T07:00:00.000Z',
  close: 174.67
}, {
  date: '2008-08-28T07:00:00.000Z',
  close: 173.74
}, {
  date: '2008-08-29T07:00:00.000Z',
  close: 169.53
}, {
  date: '2008-09-02T07:00:00.000Z',
  close: 166.19
}, {
  date: '2008-09-03T07:00:00.000Z',
  close: 166.96
}, {
  date: '2008-09-04T07:00:00.000Z',
  close: 161.22
}, {
  date: '2008-09-05T07:00:00.000Z',
  close: 160.18
}, {
  date: '2008-09-08T07:00:00.000Z',
  close: 157.92
}, {
  date: '2008-09-09T07:00:00.000Z',
  close: 151.68
}, {
  date: '2008-09-10T07:00:00.000Z',
  close: 151.61
}, {
  date: '2008-09-11T07:00:00.000Z',
  close: 152.65
}, {
  date: '2008-09-12T07:00:00.000Z',
  close: 148.94
}, {
  date: '2008-09-15T07:00:00.000Z',
  close: 140.36
}, {
  date: '2008-09-16T07:00:00.000Z',
  close: 139.88
}, {
  date: '2008-09-17T07:00:00.000Z',
  close: 127.83
}, {
  date: '2008-09-18T07:00:00.000Z',
  close: 134.09
}, {
  date: '2008-09-19T07:00:00.000Z',
  close: 140.91
}, {
  date: '2008-09-22T07:00:00.000Z',
  close: 131.05
}, {
  date: '2008-09-23T07:00:00.000Z',
  close: 126.84
}, {
  date: '2008-09-24T07:00:00.000Z',
  close: 128.71
}, {
  date: '2008-09-25T07:00:00.000Z',
  close: 131.93
}, {
  date: '2008-09-26T07:00:00.000Z',
  close: 128.24
}, {
  date: '2008-09-29T07:00:00.000Z',
  close: 105.26
}, {
  date: '2008-09-30T07:00:00.000Z',
  close: 113.66
}, {
  date: '2008-10-01T07:00:00.000Z',
  close: 109.12
}, {
  date: '2008-10-02T07:00:00.000Z',
  close: 100.1
}, {
  date: '2008-10-03T07:00:00.000Z',
  close: 97.07
}, {
  date: '2008-10-06T07:00:00.000Z',
  close: 98.14
}, {
  date: '2008-10-07T07:00:00.000Z',
  close: 89.16
}, {
  date: '2008-10-08T07:00:00.000Z',
  close: 89.79
}, {
  date: '2008-10-09T07:00:00.000Z',
  close: 88.74
}, {
  date: '2008-10-10T07:00:00.000Z',
  close: 96.8
}, {
  date: '2008-10-13T07:00:00.000Z',
  close: 110.26
}, {
  date: '2008-10-14T07:00:00.000Z',
  close: 104.08
}, {
  date: '2008-10-15T07:00:00.000Z',
  close: 97.95
}, {
  date: '2008-10-16T07:00:00.000Z',
  close: 101.89
}, {
  date: '2008-10-17T07:00:00.000Z',
  close: 97.4
}, {
  date: '2008-10-20T07:00:00.000Z',
  close: 98.44
}, {
  date: '2008-10-21T07:00:00.000Z',
  close: 91.49
}, {
  date: '2008-10-22T07:00:00.000Z',
  close: 96.87
}, {
  date: '2008-10-23T07:00:00.000Z',
  close: 98.23
}, {
  date: '2008-10-24T07:00:00.000Z',
  close: 96.38
}, {
  date: '2008-10-27T07:00:00.000Z',
  close: 92.09
}, {
  date: '2008-10-28T07:00:00.000Z',
  close: 99.91
}, {
  date: '2008-10-29T07:00:00.000Z',
  close: 104.55
}, {
  date: '2008-10-30T07:00:00.000Z',
  close: 111.04
}, {
  date: '2008-10-31T07:00:00.000Z',
  close: 107.59
}, {
  date: '2008-11-03T08:00:00.000Z',
  close: 106.96
}, {
  date: '2008-11-04T08:00:00.000Z',
  close: 110.99
}, {
  date: '2008-11-05T08:00:00.000Z',
  close: 103.3
}, {
  date: '2008-11-06T08:00:00.000Z',
  close: 99.1
}, {
  date: '2008-11-07T08:00:00.000Z',
  close: 98.24
}, {
  date: '2008-11-10T08:00:00.000Z',
  close: 95.88
}, {
  date: '2008-11-11T08:00:00.000Z',
  close: 94.77
}, {
  date: '2008-11-12T08:00:00.000Z',
  close: 90.12
}, {
  date: '2008-11-13T08:00:00.000Z',
  close: 96.44
}, {
  date: '2008-11-14T08:00:00.000Z',
  close: 90.24
}, {
  date: '2008-11-17T08:00:00.000Z',
  close: 88.14
}, {
  date: '2008-11-18T08:00:00.000Z',
  close: 89.91
}, {
  date: '2008-11-19T08:00:00.000Z',
  close: 86.29
}, {
  date: '2008-11-20T08:00:00.000Z',
  close: 80.49
}, {
  date: '2008-11-21T08:00:00.000Z',
  close: 82.58
}, {
  date: '2008-11-24T08:00:00.000Z',
  close: 92.95
}, {
  date: '2008-11-25T08:00:00.000Z',
  close: 90.8
}, {
  date: '2008-11-26T08:00:00.000Z',
  close: 95
}, {
  date: '2008-11-27T08:00:00.000Z',
  close: 95
}, {
  date: '2008-11-28T08:00:00.000Z',
  close: 92.67
}, {
  date: '2008-12-01T08:00:00.000Z',
  close: 88.93
}, {
  date: '2008-12-02T08:00:00.000Z',
  close: 92.47
}, {
  date: '2008-12-03T08:00:00.000Z',
  close: 95.9
}, {
  date: '2008-12-04T08:00:00.000Z',
  close: 91.41
}, {
  date: '2008-12-05T08:00:00.000Z',
  close: 94
}, {
  date: '2008-12-08T08:00:00.000Z',
  close: 99.72
}, {
  date: '2008-12-09T08:00:00.000Z',
  close: 100.06
}, {
  date: '2008-12-10T08:00:00.000Z',
  close: 98.21
}, {
  date: '2008-12-11T08:00:00.000Z',
  close: 95
}, {
  date: '2008-12-12T08:00:00.000Z',
  close: 98.27
}, {
  date: '2008-12-15T08:00:00.000Z',
  close: 94.75
}, {
  date: '2008-12-16T08:00:00.000Z',
  close: 95.43
}, {
  date: '2008-12-17T08:00:00.000Z',
  close: 89.16
}, {
  date: '2008-12-18T08:00:00.000Z',
  close: 89.43
}, {
  date: '2008-12-19T08:00:00.000Z',
  close: 90
}, {
  date: '2008-12-22T08:00:00.000Z',
  close: 85.74
}, {
  date: '2008-12-23T08:00:00.000Z',
  close: 86.38
}, {
  date: '2008-12-24T08:00:00.000Z',
  close: 85.04
}, {
  date: '2008-12-25T08:00:00.000Z',
  close: 85.04
}, {
  date: '2008-12-26T08:00:00.000Z',
  close: 85.81
}, {
  date: '2008-12-29T08:00:00.000Z',
  close: 86.61
}, {
  date: '2008-12-30T08:00:00.000Z',
  close: 86.29
}, {
  date: '2008-12-31T08:00:00.000Z',
  close: 85.35
}, {
  date: '2009-01-01T08:00:00.000Z',
  close: 85.35
}, {
  date: '2009-01-02T08:00:00.000Z',
  close: 90.75
}, {
  date: '2009-01-05T08:00:00.000Z',
  close: 94.58
}, {
  date: '2009-01-06T08:00:00.000Z',
  close: 93.02
}, {
  date: '2009-01-07T08:00:00.000Z',
  close: 91.01
}, {
  date: '2009-01-08T08:00:00.000Z',
  close: 92.7
}, {
  date: '2009-01-09T08:00:00.000Z',
  close: 90.58
}, {
  date: '2009-01-12T08:00:00.000Z',
  close: 88.66
}, {
  date: '2009-01-13T08:00:00.000Z',
  close: 87.71
}, {
  date: '2009-01-14T08:00:00.000Z',
  close: 85.33
}, {
  date: '2009-01-15T08:00:00.000Z',
  close: 83.38
}, {
  date: '2009-01-16T08:00:00.000Z',
  close: 82.33
}, {
  date: '2009-01-20T08:00:00.000Z',
  close: 78.2
}, {
  date: '2009-01-21T08:00:00.000Z',
  close: 82.83
}, {
  date: '2009-01-22T08:00:00.000Z',
  close: 88.36
}, {
  date: '2009-01-23T08:00:00.000Z',
  close: 88.36
}, {
  date: '2009-01-26T08:00:00.000Z',
  close: 89.64
}, {
  date: '2009-01-27T08:00:00.000Z',
  close: 90.73
}, {
  date: '2009-01-28T08:00:00.000Z',
  close: 94.2
}, {
  date: '2009-01-29T08:00:00.000Z',
  close: 93
}, {
  date: '2009-01-30T08:00:00.000Z',
  close: 90.13
}, {
  date: '2009-02-02T08:00:00.000Z',
  close: 91.51
}, {
  date: '2009-02-03T08:00:00.000Z',
  close: 92.98
}, {
  date: '2009-02-04T08:00:00.000Z',
  close: 93.55
}, {
  date: '2009-02-05T08:00:00.000Z',
  close: 96.46
}, {
  date: '2009-02-06T08:00:00.000Z',
  close: 99.72
}, {
  date: '2009-02-09T08:00:00.000Z',
  close: 102.51
}, {
  date: '2009-02-10T08:00:00.000Z',
  close: 97.83
}, {
  date: '2009-02-11T08:00:00.000Z',
  close: 96.82
}, {
  date: '2009-02-12T08:00:00.000Z',
  close: 99.27
}, {
  date: '2009-02-13T08:00:00.000Z',
  close: 99.16
}, {
  date: '2009-02-17T08:00:00.000Z',
  close: 94.53
}, {
  date: '2009-02-18T08:00:00.000Z',
  close: 94.37
}, {
  date: '2009-02-19T08:00:00.000Z',
  close: 90.64
}, {
  date: '2009-02-20T08:00:00.000Z',
  close: 91.2
}, {
  date: '2009-02-23T08:00:00.000Z',
  close: 86.95
}, {
  date: '2009-02-24T08:00:00.000Z',
  close: 90.25
}, {
  date: '2009-02-25T08:00:00.000Z',
  close: 91.16
}, {
  date: '2009-02-26T08:00:00.000Z',
  close: 89.19
}, {
  date: '2009-02-27T08:00:00.000Z',
  close: 89.31
}, {
  date: '2009-03-02T08:00:00.000Z',
  close: 87.94
}, {
  date: '2009-03-03T08:00:00.000Z',
  close: 88.37
}, {
  date: '2009-03-04T08:00:00.000Z',
  close: 91.17
}, {
  date: '2009-03-05T08:00:00.000Z',
  close: 88.84
}, {
  date: '2009-03-06T08:00:00.000Z',
  close: 85.3
}, {
  date: '2009-03-09T07:00:00.000Z',
  close: 83.11
}, {
  date: '2009-03-10T07:00:00.000Z',
  close: 88.63
}, {
  date: '2009-03-11T07:00:00.000Z',
  close: 92.68
}, {
  date: '2009-03-12T07:00:00.000Z',
  close: 96.35
}, {
  date: '2009-03-13T07:00:00.000Z',
  close: 95.93
}, {
  date: '2009-03-16T07:00:00.000Z',
  close: 95.42
}, {
  date: '2009-03-17T07:00:00.000Z',
  close: 99.66
}, {
  date: '2009-03-18T07:00:00.000Z',
  close: 101.52
}, {
  date: '2009-03-19T07:00:00.000Z',
  close: 101.62
}, {
  date: '2009-03-20T07:00:00.000Z',
  close: 101.59
}, {
  date: '2009-03-23T07:00:00.000Z',
  close: 107.66
}, {
  date: '2009-03-24T07:00:00.000Z',
  close: 106.5
}, {
  date: '2009-03-25T07:00:00.000Z',
  close: 106.49
}, {
  date: '2009-03-26T07:00:00.000Z',
  close: 109.87
}, {
  date: '2009-03-27T07:00:00.000Z',
  close: 106.85
}, {
  date: '2009-03-30T07:00:00.000Z',
  close: 104.49
}, {
  date: '2009-03-31T07:00:00.000Z',
  close: 105.12
}, {
  date: '2009-04-01T07:00:00.000Z',
  close: 108.69
}, {
  date: '2009-04-02T07:00:00.000Z',
  close: 112.71
}, {
  date: '2009-04-03T07:00:00.000Z',
  close: 115.99
}, {
  date: '2009-04-06T07:00:00.000Z',
  close: 118.45
}, {
  date: '2009-04-07T07:00:00.000Z',
  close: 115
}, {
  date: '2009-04-08T07:00:00.000Z',
  close: 116.32
}, {
  date: '2009-04-09T07:00:00.000Z',
  close: 119.57
}, {
  date: '2009-04-10T07:00:00.000Z',
  close: 119.57
}, {
  date: '2009-04-13T07:00:00.000Z',
  close: 120.22
}, {
  date: '2009-04-14T07:00:00.000Z',
  close: 118.31
}, {
  date: '2009-04-15T07:00:00.000Z',
  close: 117.64
}, {
  date: '2009-04-16T07:00:00.000Z',
  close: 121.45
}, {
  date: '2009-04-17T07:00:00.000Z',
  close: 123.42
}, {
  date: '2009-04-20T07:00:00.000Z',
  close: 120.5
}, {
  date: '2009-04-21T07:00:00.000Z',
  close: 121.76
}, {
  date: '2009-04-22T07:00:00.000Z',
  close: 121.51
}, {
  date: '2009-04-23T07:00:00.000Z',
  close: 125.4
}, {
  date: '2009-04-24T07:00:00.000Z',
  close: 123.9
}, {
  date: '2009-04-27T07:00:00.000Z',
  close: 124.73
}, {
  date: '2009-04-28T07:00:00.000Z',
  close: 123.9
}, {
  date: '2009-04-29T07:00:00.000Z',
  close: 125.14
}, {
  date: '2009-04-30T07:00:00.000Z',
  close: 125.83
}, {
  date: '2009-05-01T07:00:00.000Z',
  close: 127.24
}, {
  date: '2009-05-04T07:00:00.000Z',
  close: 132.07
}, {
  date: '2009-05-05T07:00:00.000Z',
  close: 132.71
}, {
  date: '2009-05-06T07:00:00.000Z',
  close: 132.5
}, {
  date: '2009-05-07T07:00:00.000Z',
  close: 129.06
}, {
  date: '2009-05-08T07:00:00.000Z',
  close: 129.19
}, {
  date: '2009-05-11T07:00:00.000Z',
  close: 129.57
}, {
  date: '2009-05-12T07:00:00.000Z',
  close: 124.42
}, {
  date: '2009-05-13T07:00:00.000Z',
  close: 119.49
}, {
  date: '2009-05-14T07:00:00.000Z',
  close: 122.95
}, {
  date: '2009-05-15T07:00:00.000Z',
  close: 122.42
}, {
  date: '2009-05-18T07:00:00.000Z',
  close: 126.65
}, {
  date: '2009-05-19T07:00:00.000Z',
  close: 127.45
}, {
  date: '2009-05-20T07:00:00.000Z',
  close: 125.87
}, {
  date: '2009-05-21T07:00:00.000Z',
  close: 124.18
}, {
  date: '2009-05-22T07:00:00.000Z',
  close: 122.5
}, {
  date: '2009-05-26T07:00:00.000Z',
  close: 130.78
}, {
  date: '2009-05-27T07:00:00.000Z',
  close: 133.05
}, {
  date: '2009-05-28T07:00:00.000Z',
  close: 135.07
}, {
  date: '2009-05-29T07:00:00.000Z',
  close: 135.81
}, {
  date: '2009-06-01T07:00:00.000Z',
  close: 139.35
}, {
  date: '2009-06-02T07:00:00.000Z',
  close: 139.49
}, {
  date: '2009-06-03T07:00:00.000Z',
  close: 140.95
}, {
  date: '2009-06-04T07:00:00.000Z',
  close: 143.74
}, {
  date: '2009-06-05T07:00:00.000Z',
  close: 144.67
}, {
  date: '2009-06-08T07:00:00.000Z',
  close: 143.85
}, {
  date: '2009-06-09T07:00:00.000Z',
  close: 142.72
}, {
  date: '2009-06-10T07:00:00.000Z',
  close: 140.25
}, {
  date: '2009-06-11T07:00:00.000Z',
  close: 139.95
}, {
  date: '2009-06-12T07:00:00.000Z',
  close: 136.97
}, {
  date: '2009-06-15T07:00:00.000Z',
  close: 136.09
}, {
  date: '2009-06-16T07:00:00.000Z',
  close: 136.35
}, {
  date: '2009-06-17T07:00:00.000Z',
  close: 135.58
}, {
  date: '2009-06-18T07:00:00.000Z',
  close: 135.88
}, {
  date: '2009-06-19T07:00:00.000Z',
  close: 139.48
}, {
  date: '2009-06-22T07:00:00.000Z',
  close: 137.37
}, {
  date: '2009-06-23T07:00:00.000Z',
  close: 134.01
}, {
  date: '2009-06-24T07:00:00.000Z',
  close: 136.22
}, {
  date: '2009-06-25T07:00:00.000Z',
  close: 139.86
}, {
  date: '2009-06-26T07:00:00.000Z',
  close: 142.44
}, {
  date: '2009-06-29T07:00:00.000Z',
  close: 141.97
}, {
  date: '2009-06-30T07:00:00.000Z',
  close: 142.43
}, {
  date: '2009-07-01T07:00:00.000Z',
  close: 142.83
}, {
  date: '2009-07-02T07:00:00.000Z',
  close: 140.02
}, {
  date: '2009-07-03T07:00:00.000Z',
  close: 140.02
}, {
  date: '2009-07-06T07:00:00.000Z',
  close: 138.61
}, {
  date: '2009-07-07T07:00:00.000Z',
  close: 135.4
}, {
  date: '2009-07-08T07:00:00.000Z',
  close: 137.22
}, {
  date: '2009-07-09T07:00:00.000Z',
  close: 136.36
}, {
  date: '2009-07-10T07:00:00.000Z',
  close: 138.52
}, {
  date: '2009-07-13T07:00:00.000Z',
  close: 142.34
}, {
  date: '2009-07-14T07:00:00.000Z',
  close: 142.27
}, {
  date: '2009-07-15T07:00:00.000Z',
  close: 146.88
}, {
  date: '2009-07-16T07:00:00.000Z',
  close: 147.52
}, {
  date: '2009-07-17T07:00:00.000Z',
  close: 151.75
}, {
  date: '2009-07-20T07:00:00.000Z',
  close: 152.91
}, {
  date: '2009-07-21T07:00:00.000Z',
  close: 151.51
}, {
  date: '2009-07-22T07:00:00.000Z',
  close: 156.74
}, {
  date: '2009-07-23T07:00:00.000Z',
  close: 157.82
}, {
  date: '2009-07-24T07:00:00.000Z',
  close: 159.99
}, {
  date: '2009-07-27T07:00:00.000Z',
  close: 160.1
}, {
  date: '2009-07-28T07:00:00.000Z',
  close: 160
}, {
  date: '2009-07-29T07:00:00.000Z',
  close: 160.03
}, {
  date: '2009-07-30T07:00:00.000Z',
  close: 162.79
}, {
  date: '2009-07-31T07:00:00.000Z',
  close: 163.39
}, {
  date: '2009-08-03T07:00:00.000Z',
  close: 166.43
}, {
  date: '2009-08-04T07:00:00.000Z',
  close: 165.55
}, {
  date: '2009-08-05T07:00:00.000Z',
  close: 165.11
}, {
  date: '2009-08-06T07:00:00.000Z',
  close: 163.91
}, {
  date: '2009-08-07T07:00:00.000Z',
  close: 165.51
}, {
  date: '2009-08-10T07:00:00.000Z',
  close: 164.72
}, {
  date: '2009-08-12T07:00:00.000Z',
  close: 165.31
}, {
  date: '2009-08-13T07:00:00.000Z',
  close: 168.42
}, {
  date: '2009-08-14T07:00:00.000Z',
  close: 166.78
}, {
  date: '2009-08-17T07:00:00.000Z',
  close: 159.59
}, {
  date: '2009-08-18T07:00:00.000Z',
  close: 164
}, {
  date: '2009-08-19T07:00:00.000Z',
  close: 164.6
}, {
  date: '2009-08-20T07:00:00.000Z',
  close: 166.33
}, {
  date: '2009-08-21T07:00:00.000Z',
  close: 169.22
}, {
  date: '2009-08-24T07:00:00.000Z',
  close: 169.06
}, {
  date: '2009-08-25T07:00:00.000Z',
  close: 169.4
}, {
  date: '2009-08-26T07:00:00.000Z',
  close: 167.41
}, {
  date: '2009-08-27T07:00:00.000Z',
  close: 169.45
}, {
  date: '2009-08-28T07:00:00.000Z',
  close: 170.05
}, {
  date: '2009-08-31T07:00:00.000Z',
  close: 168.21
}, {
  date: '2009-09-01T07:00:00.000Z',
  close: 165.3
}, {
  date: '2009-09-02T07:00:00.000Z',
  close: 165.18
}, {
  date: '2009-09-03T07:00:00.000Z',
  close: 166.55
}, {
  date: '2009-09-04T07:00:00.000Z',
  close: 170.31
}, {
  date: '2009-09-08T07:00:00.000Z',
  close: 172.93
}, {
  date: '2009-09-09T07:00:00.000Z',
  close: 171.14
}, {
  date: '2009-09-10T07:00:00.000Z',
  close: 172.56
}, {
  date: '2009-09-11T07:00:00.000Z',
  close: 172.16
}, {
  date: '2009-09-14T07:00:00.000Z',
  close: 173.72
}, {
  date: '2009-09-15T07:00:00.000Z',
  close: 175.16
}, {
  date: '2009-09-16T07:00:00.000Z',
  close: 181.87
}, {
  date: '2009-09-17T07:00:00.000Z',
  close: 184.55
}, {
  date: '2009-09-18T07:00:00.000Z',
  close: 185.02
}, {
  date: '2009-09-21T07:00:00.000Z',
  close: 184.02
}, {
  date: '2009-09-22T07:00:00.000Z',
  close: 184.48
}, {
  date: '2009-09-23T07:00:00.000Z',
  close: 185.5
}, {
  date: '2009-09-24T07:00:00.000Z',
  close: 183.82
}, {
  date: '2009-09-25T07:00:00.000Z',
  close: 182.37
}, {
  date: '2009-09-28T07:00:00.000Z',
  close: 186.15
}, {
  date: '2009-09-29T07:00:00.000Z',
  close: 185.38
}, {
  date: '2009-09-30T07:00:00.000Z',
  close: 185.35
}, {
  date: '2009-10-01T07:00:00.000Z',
  close: 180.86
}, {
  date: '2009-10-02T07:00:00.000Z',
  close: 184.9
}, {
  date: '2009-10-05T07:00:00.000Z',
  close: 186.02
}, {
  date: '2009-10-06T07:00:00.000Z',
  close: 190.01
}, {
  date: '2009-10-07T07:00:00.000Z',
  close: 190.25
}, {
  date: '2009-10-08T07:00:00.000Z',
  close: 189.27
}, {
  date: '2009-10-09T07:00:00.000Z',
  close: 190.47
}, {
  date: '2009-10-12T07:00:00.000Z',
  close: 190.81
}, {
  date: '2009-10-13T07:00:00.000Z',
  close: 190.02
}, {
  date: '2009-10-14T07:00:00.000Z',
  close: 191.29
}, {
  date: '2009-10-15T07:00:00.000Z',
  close: 190.56
}, {
  date: '2009-10-16T07:00:00.000Z',
  close: 188.05
}, {
  date: '2009-10-19T07:00:00.000Z',
  close: 189.86
}, {
  date: '2009-10-20T07:00:00.000Z',
  close: 198.76
}, {
  date: '2009-10-21T07:00:00.000Z',
  close: 204.92
}, {
  date: '2009-10-22T07:00:00.000Z',
  close: 205.2
}, {
  date: '2009-10-23T07:00:00.000Z',
  close: 203.94
}, {
  date: '2009-10-26T07:00:00.000Z',
  close: 202.48
}, {
  date: '2009-10-27T07:00:00.000Z',
  close: 197.37
}, {
  date: '2009-10-28T07:00:00.000Z',
  close: 192.4
}, {
  date: '2009-10-29T07:00:00.000Z',
  close: 196.35
}, {
  date: '2009-10-30T07:00:00.000Z',
  close: 188.5
}, {
  date: '2009-11-02T08:00:00.000Z',
  close: 189.31
}, {
  date: '2009-11-03T08:00:00.000Z',
  close: 188.75
}, {
  date: '2009-11-04T08:00:00.000Z',
  close: 190.81
}, {
  date: '2009-11-05T08:00:00.000Z',
  close: 194.03
}, {
  date: '2009-11-06T08:00:00.000Z',
  close: 194.34
}, {
  date: '2009-11-09T08:00:00.000Z',
  close: 201.46
}, {
  date: '2009-11-10T08:00:00.000Z',
  close: 202.98
}, {
  date: '2009-11-11T08:00:00.000Z',
  close: 203.25
}, {
  date: '2009-11-12T08:00:00.000Z',
  close: 201.99
}, {
  date: '2009-11-13T08:00:00.000Z',
  close: 204.45
}, {
  date: '2009-11-16T08:00:00.000Z',
  close: 206.63
}, {
  date: '2009-11-17T08:00:00.000Z',
  close: 207
}, {
  date: '2009-11-18T08:00:00.000Z',
  close: 205.96
}, {
  date: '2009-11-19T08:00:00.000Z',
  close: 200.51
}, {
  date: '2009-11-20T08:00:00.000Z',
  close: 199.92
}, {
  date: '2009-11-23T08:00:00.000Z',
  close: 205.88
}, {
  date: '2009-11-24T08:00:00.000Z',
  close: 204.44
}, {
  date: '2009-11-25T08:00:00.000Z',
  close: 204.19
}, {
  date: '2009-11-26T08:00:00.000Z',
  close: 204.19
}, {
  date: '2009-11-27T08:00:00.000Z',
  close: 200.59
}, {
  date: '2009-11-30T08:00:00.000Z',
  close: 199.91
}, {
  date: '2009-12-01T08:00:00.000Z',
  close: 196.97
}, {
  date: '2009-12-02T08:00:00.000Z',
  close: 196.23
}, {
  date: '2009-12-03T08:00:00.000Z',
  close: 196.48
}, {
  date: '2009-12-04T08:00:00.000Z',
  close: 193.32
}, {
  date: '2009-12-07T08:00:00.000Z',
  close: 188.95
}, {
  date: '2009-12-08T08:00:00.000Z',
  close: 189.87
}, {
  date: '2009-12-09T08:00:00.000Z',
  close: 197.8
}, {
  date: '2009-12-10T08:00:00.000Z',
  close: 196.43
}, {
  date: '2009-12-11T08:00:00.000Z',
  close: 194.67
}, {
  date: '2009-12-14T08:00:00.000Z',
  close: 196.98
}, {
  date: '2009-12-15T08:00:00.000Z',
  close: 194.17
}, {
  date: '2009-12-16T08:00:00.000Z',
  close: 195.03
}, {
  date: '2009-12-17T08:00:00.000Z',
  close: 191.86
}, {
  date: '2009-12-18T08:00:00.000Z',
  close: 195.43
}, {
  date: '2009-12-21T08:00:00.000Z',
  close: 198.23
}, {
  date: '2009-12-22T08:00:00.000Z',
  close: 200.36
}, {
  date: '2009-12-23T08:00:00.000Z',
  close: 202.1
}, {
  date: '2009-12-24T08:00:00.000Z',
  close: 209.04
}, {
  date: '2009-12-25T08:00:00.000Z',
  close: 209.04
}, {
  date: '2009-12-28T08:00:00.000Z',
  close: 211.61
}, {
  date: '2009-12-29T08:00:00.000Z',
  close: 209.1
}, {
  date: '2009-12-30T08:00:00.000Z',
  close: 211.64
}, {
  date: '2009-12-31T08:00:00.000Z',
  close: 210.73
}, {
  date: '2010-01-01T08:00:00.000Z',
  close: 210.73
}, {
  date: '2010-01-04T08:00:00.000Z',
  close: 214.01
}, {
  date: '2010-01-05T08:00:00.000Z',
  close: 214.38
}, {
  date: '2010-01-06T08:00:00.000Z',
  close: 210.97
}, {
  date: '2010-01-07T08:00:00.000Z',
  close: 210.58
}, {
  date: '2010-01-08T08:00:00.000Z',
  close: 211.98
}, {
  date: '2010-01-11T08:00:00.000Z',
  close: 210.11
}, {
  date: '2010-01-12T08:00:00.000Z',
  close: 207.72
}, {
  date: '2010-01-13T08:00:00.000Z',
  close: 210.65
}, {
  date: '2010-01-14T08:00:00.000Z',
  close: 209.43
}, {
  date: '2010-01-15T08:00:00.000Z',
  close: 205.93
}, {
  date: '2010-01-18T08:00:00.000Z',
  close: 205.93
}, {
  date: '2010-01-19T08:00:00.000Z',
  close: 215.04
}, {
  date: '2010-01-20T08:00:00.000Z',
  close: 211.72
}, {
  date: '2010-01-21T08:00:00.000Z',
  close: 208.07
}, {
  date: '2010-01-22T08:00:00.000Z',
  close: 197.75
}, {
  date: '2010-01-25T08:00:00.000Z',
  close: 203.08
}, {
  date: '2010-01-26T08:00:00.000Z',
  close: 205.94
}, {
  date: '2010-01-27T08:00:00.000Z',
  close: 207.88
}, {
  date: '2010-01-28T08:00:00.000Z',
  close: 199.29
}, {
  date: '2010-01-29T08:00:00.000Z',
  close: 192.06
}, {
  date: '2010-02-01T08:00:00.000Z',
  close: 194.73
}, {
  date: '2010-02-02T08:00:00.000Z',
  close: 195.86
}, {
  date: '2010-02-03T08:00:00.000Z',
  close: 199.23
}, {
  date: '2010-02-04T08:00:00.000Z',
  close: 192.05
}, {
  date: '2010-02-05T08:00:00.000Z',
  close: 195.46
}, {
  date: '2010-02-08T08:00:00.000Z',
  close: 194.12
}, {
  date: '2010-02-09T08:00:00.000Z',
  close: 196.19
}, {
  date: '2010-02-10T08:00:00.000Z',
  close: 195.12
}, {
  date: '2010-02-11T08:00:00.000Z',
  close: 198.67
}, {
  date: '2010-02-12T08:00:00.000Z',
  close: 200.38
}, {
  date: '2010-02-15T08:00:00.000Z',
  close: 200.38
}, {
  date: '2010-02-16T08:00:00.000Z',
  close: 203.4
}, {
  date: '2010-02-17T08:00:00.000Z',
  close: 202.55
}, {
  date: '2010-02-18T08:00:00.000Z',
  close: 202.93
}, {
  date: '2010-02-19T08:00:00.000Z',
  close: 201.67
}, {
  date: '2010-02-22T08:00:00.000Z',
  close: 200.42
}, {
  date: '2010-02-23T08:00:00.000Z',
  close: 197.06
}, {
  date: '2010-02-24T08:00:00.000Z',
  close: 200.66
}, {
  date: '2010-02-25T08:00:00.000Z',
  close: 202
}, {
  date: '2010-02-26T08:00:00.000Z',
  close: 204.62
}, {
  date: '2010-03-01T08:00:00.000Z',
  close: 208.99
}, {
  date: '2010-03-02T08:00:00.000Z',
  close: 208.85
}, {
  date: '2010-03-03T08:00:00.000Z',
  close: 209.33
}, {
  date: '2010-03-04T08:00:00.000Z',
  close: 210.71
}, {
  date: '2010-03-05T08:00:00.000Z',
  close: 218.95
}, {
  date: '2010-03-08T08:00:00.000Z',
  close: 219.08
}, {
  date: '2010-03-09T08:00:00.000Z',
  close: 223.02
}, {
  date: '2010-03-10T08:00:00.000Z',
  close: 224.84
}, {
  date: '2010-03-11T08:00:00.000Z',
  close: 225.5
}, {
  date: '2010-03-12T08:00:00.000Z',
  close: 226.6
}, {
  date: '2010-03-15T07:00:00.000Z',
  close: 223.84
}, {
  date: '2010-03-16T07:00:00.000Z',
  close: 224.45
}, {
  date: '2010-03-17T07:00:00.000Z',
  close: 224.12
}, {
  date: '2010-03-18T07:00:00.000Z',
  close: 224.65
}, {
  date: '2010-03-19T07:00:00.000Z',
  close: 222.25
}, {
  date: '2010-03-22T07:00:00.000Z',
  close: 224.75
}, {
  date: '2010-03-23T07:00:00.000Z',
  close: 228.36
}, {
  date: '2010-03-24T07:00:00.000Z',
  close: 229.37
}, {
  date: '2010-03-25T07:00:00.000Z',
  close: 226.65
}, {
  date: '2010-03-26T07:00:00.000Z',
  close: 230.9
}, {
  date: '2010-03-29T07:00:00.000Z',
  close: 232.39
}, {
  date: '2010-03-30T07:00:00.000Z',
  close: 235.84
}, {
  date: '2010-03-31T07:00:00.000Z',
  close: 235
}, {
  date: '2010-04-01T07:00:00.000Z',
  close: 235.97
}, {
  date: '2010-04-02T07:00:00.000Z',
  close: 235.97
}, {
  date: '2010-04-05T07:00:00.000Z',
  close: 238.49
}, {
  date: '2010-04-06T07:00:00.000Z',
  close: 239.54
}, {
  date: '2010-04-07T07:00:00.000Z',
  close: 240.6
}, {
  date: '2010-04-08T07:00:00.000Z',
  close: 239.95
}, {
  date: '2010-04-09T07:00:00.000Z',
  close: 241.79
}, {
  date: '2010-04-12T07:00:00.000Z',
  close: 242.29
}, {
  date: '2010-04-13T07:00:00.000Z',
  close: 242.43
}, {
  date: '2010-04-14T07:00:00.000Z',
  close: 245.69
}, {
  date: '2010-04-15T07:00:00.000Z',
  close: 248.92
}, {
  date: '2010-04-16T07:00:00.000Z',
  close: 247.4
}, {
  date: '2010-04-19T07:00:00.000Z',
  close: 247.07
}, {
  date: '2010-04-20T07:00:00.000Z',
  close: 244.59
}, {
  date: '2010-04-21T07:00:00.000Z',
  close: 259.22
}, {
  date: '2010-04-22T07:00:00.000Z',
  close: 266.47
}, {
  date: '2010-04-23T07:00:00.000Z',
  close: 270.83
}, {
  date: '2010-04-26T07:00:00.000Z',
  close: 269.5
}, {
  date: '2010-04-27T07:00:00.000Z',
  close: 262.04
}, {
  date: '2010-04-28T07:00:00.000Z',
  close: 261.6
}, {
  date: '2010-04-29T07:00:00.000Z',
  close: 268.64
}, {
  date: '2010-04-30T07:00:00.000Z',
  close: 261.09
}, {
  date: '2010-05-03T07:00:00.000Z',
  close: 266.35
}, {
  date: '2010-05-04T07:00:00.000Z',
  close: 258.68
}, {
  date: '2010-05-05T07:00:00.000Z',
  close: 255.98
}, {
  date: '2010-05-06T07:00:00.000Z',
  close: 246.25
}, {
  date: '2010-05-07T07:00:00.000Z',
  close: 235.86
}, {
  date: '2010-05-10T07:00:00.000Z',
  close: 253.99
}, {
  date: '2010-05-11T07:00:00.000Z',
  close: 256.52
}, {
  date: '2010-05-12T07:00:00.000Z',
  close: 262.09
}, {
  date: '2010-05-13T07:00:00.000Z',
  close: 258.36
}, {
  date: '2010-05-14T07:00:00.000Z',
  close: 253.82
}, {
  date: '2010-05-17T07:00:00.000Z',
  close: 254.22
}, {
  date: '2010-05-18T07:00:00.000Z',
  close: 252.36
}, {
  date: '2010-05-19T07:00:00.000Z',
  close: 248.34
}, {
  date: '2010-05-20T07:00:00.000Z',
  close: 237.76
}, {
  date: '2010-05-21T07:00:00.000Z',
  close: 242.32
}, {
  date: '2010-05-24T07:00:00.000Z',
  close: 246.76
}, {
  date: '2010-05-25T07:00:00.000Z',
  close: 245.22
}, {
  date: '2010-05-26T07:00:00.000Z',
  close: 244.11
}, {
  date: '2010-05-27T07:00:00.000Z',
  close: 253.35
}, {
  date: '2010-05-28T07:00:00.000Z',
  close: 256.88
}, {
  date: '2010-05-31T07:00:00.000Z',
  close: 256.88
}, {
  date: '2010-06-01T07:00:00.000Z',
  close: 260.83
}, {
  date: '2010-06-02T07:00:00.000Z',
  close: 263.95
}, {
  date: '2010-06-03T07:00:00.000Z',
  close: 263.12
}, {
  date: '2010-06-04T07:00:00.000Z',
  close: 255.96
}, {
  date: '2010-06-07T07:00:00.000Z',
  close: 250.94
}, {
  date: '2010-06-08T07:00:00.000Z',
  close: 249.33
}, {
  date: '2010-06-09T07:00:00.000Z',
  close: 243.2
}, {
  date: '2010-06-10T07:00:00.000Z',
  close: 250.51
}, {
  date: '2010-06-11T07:00:00.000Z',
  close: 253.51
}, {
  date: '2010-06-14T07:00:00.000Z',
  close: 254.28
}, {
  date: '2010-06-15T07:00:00.000Z',
  close: 259.69
}, {
  date: '2010-06-16T07:00:00.000Z',
  close: 267.25
}, {
  date: '2010-06-17T07:00:00.000Z',
  close: 271.87
}, {
  date: '2010-06-18T07:00:00.000Z',
  close: 274.07
}, {
  date: '2010-06-21T07:00:00.000Z',
  close: 270.17
}, {
  date: '2010-06-22T07:00:00.000Z',
  close: 273.85
}, {
  date: '2010-06-23T07:00:00.000Z',
  close: 270.97
}, {
  date: '2010-06-24T07:00:00.000Z',
  close: 269
}, {
  date: '2010-06-25T07:00:00.000Z',
  close: 266.7
}, {
  date: '2010-06-28T07:00:00.000Z',
  close: 268.3
}, {
  date: '2010-06-29T07:00:00.000Z',
  close: 256.17
}, {
  date: '2010-06-30T07:00:00.000Z',
  close: 251.53
}, {
  date: '2010-07-01T07:00:00.000Z',
  close: 248.48
}, {
  date: '2010-07-02T07:00:00.000Z',
  close: 246.94
}, {
  date: '2010-07-05T07:00:00.000Z',
  close: 246.94
}, {
  date: '2010-07-06T07:00:00.000Z',
  close: 248.63
}, {
  date: '2010-07-07T07:00:00.000Z',
  close: 258.66
}, {
  date: '2010-07-08T07:00:00.000Z',
  close: 258.09
}, {
  date: '2010-07-09T07:00:00.000Z',
  close: 259.62
}, {
  date: '2010-07-12T07:00:00.000Z',
  close: 257.28
}, {
  date: '2010-07-13T07:00:00.000Z',
  close: 251.8
}, {
  date: '2010-07-14T07:00:00.000Z',
  close: 252.73
}, {
  date: '2010-07-15T07:00:00.000Z',
  close: 251.45
}, {
  date: '2010-07-16T07:00:00.000Z',
  close: 249.9
}, {
  date: '2010-07-19T07:00:00.000Z',
  close: 245.58
}, {
  date: '2010-07-20T07:00:00.000Z',
  close: 251.89
}, {
  date: '2010-07-21T07:00:00.000Z',
  close: 254.24
}, {
  date: '2010-07-22T07:00:00.000Z',
  close: 259.02
}, {
  date: '2010-07-23T07:00:00.000Z',
  close: 259.94
}, {
  date: '2010-07-26T07:00:00.000Z',
  close: 259.28
}, {
  date: '2010-07-27T07:00:00.000Z',
  close: 264.08
}, {
  date: '2010-07-28T07:00:00.000Z',
  close: 260.96
}, {
  date: '2010-07-29T07:00:00.000Z',
  close: 258.11
}, {
  date: '2010-07-30T07:00:00.000Z',
  close: 257.25
}, {
  date: '2010-08-02T07:00:00.000Z',
  close: 261.85
}, {
  date: '2010-08-03T07:00:00.000Z',
  close: 261.93
}, {
  date: '2010-08-04T07:00:00.000Z',
  close: 262.98
}, {
  date: '2010-08-05T07:00:00.000Z',
  close: 261.7
}, {
  date: '2010-08-06T07:00:00.000Z',
  close: 260.09
}, {
  date: '2010-08-09T07:00:00.000Z',
  close: 261.75
}, {
  date: '2010-08-10T07:00:00.000Z',
  close: 259.41
}, {
  date: '2010-08-11T07:00:00.000Z',
  close: 250.19
}, {
  date: '2010-08-12T07:00:00.000Z',
  close: 251.79
}, {
  date: '2010-08-13T07:00:00.000Z',
  close: 249.1
}, {
  date: '2010-08-16T07:00:00.000Z',
  close: 247.64
}, {
  date: '2010-08-17T07:00:00.000Z',
  close: 251.97
}, {
  date: '2010-08-18T07:00:00.000Z',
  close: 253.07
}, {
  date: '2010-08-19T07:00:00.000Z',
  close: 249.88
}, {
  date: '2010-08-20T07:00:00.000Z',
  close: 249.64
}, {
  date: '2010-08-23T07:00:00.000Z',
  close: 245.8
}, {
  date: '2010-08-24T07:00:00.000Z',
  close: 239.93
}, {
  date: '2010-08-25T07:00:00.000Z',
  close: 242.89
}, {
  date: '2010-08-26T07:00:00.000Z',
  close: 240.28
}, {
  date: '2010-08-27T07:00:00.000Z',
  close: 241.62
}, {
  date: '2010-08-30T07:00:00.000Z',
  close: 242.5
}, {
  date: '2010-08-31T07:00:00.000Z',
  close: 243.1
}, {
  date: '2010-09-01T07:00:00.000Z',
  close: 250.33
}, {
  date: '2010-09-02T07:00:00.000Z',
  close: 252.17
}, {
  date: '2010-09-03T07:00:00.000Z',
  close: 258.77
}, {
  date: '2010-09-06T07:00:00.000Z',
  close: 258.77
}, {
  date: '2010-09-07T07:00:00.000Z',
  close: 257.81
}, {
  date: '2010-09-08T07:00:00.000Z',
  close: 262.92
}, {
  date: '2010-09-09T07:00:00.000Z',
  close: 263.07
}, {
  date: '2010-09-10T07:00:00.000Z',
  close: 263.41
}, {
  date: '2010-09-13T07:00:00.000Z',
  close: 267.04
}, {
  date: '2010-09-14T07:00:00.000Z',
  close: 268.06
}, {
  date: '2010-09-15T07:00:00.000Z',
  close: 270.22
}, {
  date: '2010-09-16T07:00:00.000Z',
  close: 276.57
}, {
  date: '2010-09-17T07:00:00.000Z',
  close: 275.37
}, {
  date: '2010-09-20T07:00:00.000Z',
  close: 283.23
}, {
  date: '2010-09-21T07:00:00.000Z',
  close: 283.77
}, {
  date: '2010-09-22T07:00:00.000Z',
  close: 287.75
}, {
  date: '2010-09-23T07:00:00.000Z',
  close: 288.92
}, {
  date: '2010-09-24T07:00:00.000Z',
  close: 292.32
}, {
  date: '2010-09-27T07:00:00.000Z',
  close: 291.16
}, {
  date: '2010-09-28T07:00:00.000Z',
  close: 286.86
}, {
  date: '2010-09-29T07:00:00.000Z',
  close: 287.37
}, {
  date: '2010-09-30T07:00:00.000Z',
  close: 283.75
}, {
  date: '2010-10-01T07:00:00.000Z',
  close: 282.52
}, {
  date: '2010-10-04T07:00:00.000Z',
  close: 278.64
}, {
  date: '2010-10-05T07:00:00.000Z',
  close: 288.94
}, {
  date: '2010-10-06T07:00:00.000Z',
  close: 289.19
}, {
  date: '2010-10-07T07:00:00.000Z',
  close: 289.22
}, {
  date: '2010-10-08T07:00:00.000Z',
  close: 294.07
}, {
  date: '2010-10-11T07:00:00.000Z',
  close: 295.36
}, {
  date: '2010-10-12T07:00:00.000Z',
  close: 298.54
}, {
  date: '2010-10-13T07:00:00.000Z',
  close: 300.14
}, {
  date: '2010-10-14T07:00:00.000Z',
  close: 302.31
}, {
  date: '2010-10-15T07:00:00.000Z',
  close: 314.74
}, {
  date: '2010-10-18T07:00:00.000Z',
  close: 318
}, {
  date: '2010-10-19T07:00:00.000Z',
  close: 309.49
}, {
  date: '2010-10-20T07:00:00.000Z',
  close: 310.53
}, {
  date: '2010-10-21T07:00:00.000Z',
  close: 309.52
}, {
  date: '2010-10-22T07:00:00.000Z',
  close: 307.47
}, {
  date: '2010-10-25T07:00:00.000Z',
  close: 308.84
}, {
  date: '2010-10-26T07:00:00.000Z',
  close: 308.05
}, {
  date: '2010-10-27T07:00:00.000Z',
  close: 307.83
}, {
  date: '2010-10-28T07:00:00.000Z',
  close: 305.24
}, {
  date: '2010-10-29T07:00:00.000Z',
  close: 300.98
}, {
  date: '2010-11-01T07:00:00.000Z',
  close: 304.18
}, {
  date: '2010-11-02T07:00:00.000Z',
  close: 309.36
}, {
  date: '2010-11-03T07:00:00.000Z',
  close: 312.8
}, {
  date: '2010-11-04T07:00:00.000Z',
  close: 318.27
}, {
  date: '2010-11-05T07:00:00.000Z',
  close: 317.13
}, {
  date: '2010-11-08T08:00:00.000Z',
  close: 318.62
}, {
  date: '2010-11-09T08:00:00.000Z',
  close: 316.08
}, {
  date: '2010-11-10T08:00:00.000Z',
  close: 318.03
}, {
  date: '2010-11-11T08:00:00.000Z',
  close: 316.66
}, {
  date: '2010-11-12T08:00:00.000Z',
  close: 308.03
}, {
  date: '2010-11-15T08:00:00.000Z',
  close: 307.04
}, {
  date: '2010-11-16T08:00:00.000Z',
  close: 301.59
}, {
  date: '2010-11-17T08:00:00.000Z',
  close: 300.5
}, {
  date: '2010-11-18T08:00:00.000Z',
  close: 308.43
}, {
  date: '2010-11-19T08:00:00.000Z',
  close: 306.73
}, {
  date: '2010-11-22T08:00:00.000Z',
  close: 313.36
}, {
  date: '2010-11-23T08:00:00.000Z',
  close: 308.73
}, {
  date: '2010-11-24T08:00:00.000Z',
  close: 314.8
}, {
  date: '2010-11-26T08:00:00.000Z',
  close: 315
}, {
  date: '2010-11-29T08:00:00.000Z',
  close: 316.87
}, {
  date: '2010-11-30T08:00:00.000Z',
  close: 311.15
}, {
  date: '2010-12-01T08:00:00.000Z',
  close: 316.4
}, {
  date: '2010-12-02T08:00:00.000Z',
  close: 318.15
}, {
  date: '2010-12-03T08:00:00.000Z',
  close: 317.44
}, {
  date: '2010-12-06T08:00:00.000Z',
  close: 320.15
}, {
  date: '2010-12-07T08:00:00.000Z',
  close: 318.21
}, {
  date: '2010-12-08T08:00:00.000Z',
  close: 321.01
}, {
  date: '2010-12-09T08:00:00.000Z',
  close: 319.76
}, {
  date: '2010-12-10T08:00:00.000Z',
  close: 320.56
}, {
  date: '2010-12-13T08:00:00.000Z',
  close: 321.67
}, {
  date: '2010-12-14T08:00:00.000Z',
  close: 320.29
}, {
  date: '2010-12-15T08:00:00.000Z',
  close: 320.36
}, {
  date: '2010-12-16T08:00:00.000Z',
  close: 321.25
}, {
  date: '2010-12-17T08:00:00.000Z',
  close: 320.61
}, {
  date: '2010-12-20T08:00:00.000Z',
  close: 322.21
}, {
  date: '2010-12-21T08:00:00.000Z',
  close: 324.2
}, {
  date: '2010-12-22T08:00:00.000Z',
  close: 325.16
}, {
  date: '2010-12-23T08:00:00.000Z',
  close: 323.6
}, {
  date: '2010-12-27T08:00:00.000Z',
  close: 324.68
}, {
  date: '2010-12-28T08:00:00.000Z',
  close: 325.47
}, {
  date: '2010-12-29T08:00:00.000Z',
  close: 325.29
}, {
  date: '2010-12-30T08:00:00.000Z',
  close: 323.66
}, {
  date: '2010-12-31T08:00:00.000Z',
  close: 322.56
}, {
  date: '2011-01-03T08:00:00.000Z',
  close: 329.57
}, {
  date: '2011-01-04T08:00:00.000Z',
  close: 331.29
}, {
  date: '2011-01-05T08:00:00.000Z',
  close: 334
}, {
  date: '2011-01-06T08:00:00.000Z',
  close: 333.73
}, {
  date: '2011-01-07T08:00:00.000Z',
  close: 336.12
}, {
  date: '2011-01-10T08:00:00.000Z',
  close: 342.46
}, {
  date: '2011-01-11T08:00:00.000Z',
  close: 341.64
}, {
  date: '2011-01-12T08:00:00.000Z',
  close: 344.42
}, {
  date: '2011-01-13T08:00:00.000Z',
  close: 345.68
}, {
  date: '2011-01-14T08:00:00.000Z',
  close: 348.48
}, {
  date: '2011-01-18T08:00:00.000Z',
  close: 340.65
}, {
  date: '2011-01-19T08:00:00.000Z',
  close: 338.84
}, {
  date: '2011-01-20T08:00:00.000Z',
  close: 332.68
}, {
  date: '2011-01-21T08:00:00.000Z',
  close: 326.72
}, {
  date: '2011-01-24T08:00:00.000Z',
  close: 337.45
}, {
  date: '2011-01-25T08:00:00.000Z',
  close: 341.4
}, {
  date: '2011-01-26T08:00:00.000Z',
  close: 343.85
}, {
  date: '2011-01-27T08:00:00.000Z',
  close: 343.21
}, {
  date: '2011-01-28T08:00:00.000Z',
  close: 336.1
}, {
  date: '2011-01-31T08:00:00.000Z',
  close: 339.32
}, {
  date: '2011-02-01T08:00:00.000Z',
  close: 345.03
}, {
  date: '2011-02-02T08:00:00.000Z',
  close: 344.32
}, {
  date: '2011-02-03T08:00:00.000Z',
  close: 343.44
}, {
  date: '2011-02-04T08:00:00.000Z',
  close: 346.5
}, {
  date: '2011-02-07T08:00:00.000Z',
  close: 351.88
}, {
  date: '2011-02-08T08:00:00.000Z',
  close: 355.2
}, {
  date: '2011-02-09T08:00:00.000Z',
  close: 358.16
}, {
  date: '2011-02-10T08:00:00.000Z',
  close: 354.54
}, {
  date: '2011-02-11T08:00:00.000Z',
  close: 356.85
}, {
  date: '2011-02-14T08:00:00.000Z',
  close: 359.18
}, {
  date: '2011-02-15T08:00:00.000Z',
  close: 359.9
}, {
  date: '2011-02-16T08:00:00.000Z',
  close: 363.13
}, {
  date: '2011-02-17T08:00:00.000Z',
  close: 358.3
}, {
  date: '2011-02-18T08:00:00.000Z',
  close: 350.56
}, {
  date: '2011-02-22T08:00:00.000Z',
  close: 338.61
}, {
  date: '2011-02-23T08:00:00.000Z',
  close: 342.62
}, {
  date: '2011-02-24T08:00:00.000Z',
  close: 342.88
}, {
  date: '2011-02-25T08:00:00.000Z',
  close: 348.16
}, {
  date: '2011-02-28T08:00:00.000Z',
  close: 353.21
}, {
  date: '2011-03-01T08:00:00.000Z',
  close: 349.31
}, {
  date: '2011-03-02T08:00:00.000Z',
  close: 352.12
}, {
  date: '2011-03-03T08:00:00.000Z',
  close: 359.56
}, {
  date: '2011-03-04T08:00:00.000Z',
  close: 360
}, {
  date: '2011-03-07T08:00:00.000Z',
  close: 355.36
}, {
  date: '2011-03-08T08:00:00.000Z',
  close: 355.76
}, {
  date: '2011-03-09T08:00:00.000Z',
  close: 352.47
}, {
  date: '2011-03-10T08:00:00.000Z',
  close: 346.67
}, {
  date: '2011-03-11T08:00:00.000Z',
  close: 351.99
}, {
  date: '2011-03-14T07:00:00.000Z',
  close: 353.56
}, {
  date: '2011-03-15T07:00:00.000Z',
  close: 345.43
}, {
  date: '2011-03-16T07:00:00.000Z',
  close: 330.01
}, {
  date: '2011-03-17T07:00:00.000Z',
  close: 334.64
}, {
  date: '2011-03-18T07:00:00.000Z',
  close: 330.67
}, {
  date: '2011-03-21T07:00:00.000Z',
  close: 339.3
}, {
  date: '2011-03-22T07:00:00.000Z',
  close: 341.2
}, {
  date: '2011-03-23T07:00:00.000Z',
  close: 339.19
}, {
  date: '2011-03-24T07:00:00.000Z',
  close: 344.97
}, {
  date: '2011-03-25T07:00:00.000Z',
  close: 351.54
}, {
  date: '2011-03-28T07:00:00.000Z',
  close: 350.44
}, {
  date: '2011-03-29T07:00:00.000Z',
  close: 350.96
}, {
  date: '2011-03-30T07:00:00.000Z',
  close: 348.63
}, {
  date: '2011-03-31T07:00:00.000Z',
  close: 348.51
}, {
  date: '2011-04-01T07:00:00.000Z',
  close: 344.56
}, {
  date: '2011-04-04T07:00:00.000Z',
  close: 341.19
}, {
  date: '2011-04-05T07:00:00.000Z',
  close: 338.89
}, {
  date: '2011-04-06T07:00:00.000Z',
  close: 338.04
}, {
  date: '2011-04-07T07:00:00.000Z',
  close: 338.08
}, {
  date: '2011-04-08T07:00:00.000Z',
  close: 335.06
}, {
  date: '2011-04-11T07:00:00.000Z',
  close: 330.8
}, {
  date: '2011-04-12T07:00:00.000Z',
  close: 332.4
}, {
  date: '2011-04-13T07:00:00.000Z',
  close: 336.13
}, {
  date: '2011-04-14T07:00:00.000Z',
  close: 332.42
}, {
  date: '2011-04-15T07:00:00.000Z',
  close: 327.46
}, {
  date: '2011-04-18T07:00:00.000Z',
  close: 331.85
}, {
  date: '2011-04-19T07:00:00.000Z',
  close: 337.86
}, {
  date: '2011-04-20T07:00:00.000Z',
  close: 342.41
}, {
  date: '2011-04-21T07:00:00.000Z',
  close: 350.7
}, {
  date: '2011-04-25T07:00:00.000Z',
  close: 353.01
}, {
  date: '2011-04-26T07:00:00.000Z',
  close: 350.42
}, {
  date: '2011-04-27T07:00:00.000Z',
  close: 350.15
}, {
  date: '2011-04-28T07:00:00.000Z',
  close: 346.75
}, {
  date: '2011-04-29T07:00:00.000Z',
  close: 350.13
}, {
  date: '2011-05-02T07:00:00.000Z',
  close: 346.28
}, {
  date: '2011-05-03T07:00:00.000Z',
  close: 348.2
}, {
  date: '2011-05-04T07:00:00.000Z',
  close: 349.57
}, {
  date: '2011-05-05T07:00:00.000Z',
  close: 346.75
}, {
  date: '2011-05-06T07:00:00.000Z',
  close: 346.66
}, {
  date: '2011-05-09T07:00:00.000Z',
  close: 347.6
}, {
  date: '2011-05-10T07:00:00.000Z',
  close: 349.45
}, {
  date: '2011-05-11T07:00:00.000Z',
  close: 347.23
}, {
  date: '2011-05-12T07:00:00.000Z',
  close: 346.57
}, {
  date: '2011-05-13T07:00:00.000Z',
  close: 340.5
}, {
  date: '2011-05-16T07:00:00.000Z',
  close: 333.3
}, {
  date: '2011-05-17T07:00:00.000Z',
  close: 336.14
}, {
  date: '2011-05-18T07:00:00.000Z',
  close: 339.87
}, {
  date: '2011-05-19T07:00:00.000Z',
  close: 340.53
}, {
  date: '2011-05-20T07:00:00.000Z',
  close: 335.22
}, {
  date: '2011-05-23T07:00:00.000Z',
  close: 334.4
}, {
  date: '2011-05-24T07:00:00.000Z',
  close: 332.19
}, {
  date: '2011-05-25T07:00:00.000Z',
  close: 336.78
}, {
  date: '2011-05-26T07:00:00.000Z',
  close: 335
}, {
  date: '2011-05-27T07:00:00.000Z',
  close: 337.41
}, {
  date: '2011-05-31T07:00:00.000Z',
  close: 347.83
}, {
  date: '2011-06-01T07:00:00.000Z',
  close: 345.51
}, {
  date: '2011-06-02T07:00:00.000Z',
  close: 346.1
}, {
  date: '2011-06-03T07:00:00.000Z',
  close: 343.44
}, {
  date: '2011-06-06T07:00:00.000Z',
  close: 338.04
}, {
  date: '2011-06-07T07:00:00.000Z',
  close: 332.04
}, {
  date: '2011-06-08T07:00:00.000Z',
  close: 332.24
}, {
  date: '2011-06-09T07:00:00.000Z',
  close: 331.49
}, {
  date: '2011-06-10T07:00:00.000Z',
  close: 325.9
}, {
  date: '2011-06-13T07:00:00.000Z',
  close: 326.6
}, {
  date: '2011-06-14T07:00:00.000Z',
  close: 332.44
}, {
  date: '2011-06-15T07:00:00.000Z',
  close: 326.75
}, {
  date: '2011-06-16T07:00:00.000Z',
  close: 325.16
}, {
  date: '2011-06-17T07:00:00.000Z',
  close: 320.26
}, {
  date: '2011-06-20T07:00:00.000Z',
  close: 315.32
}, {
  date: '2011-06-21T07:00:00.000Z',
  close: 325.3
}, {
  date: '2011-06-22T07:00:00.000Z',
  close: 322.61
}, {
  date: '2011-06-23T07:00:00.000Z',
  close: 331.23
}, {
  date: '2011-06-24T07:00:00.000Z',
  close: 326.35
}, {
  date: '2011-06-27T07:00:00.000Z',
  close: 332.04
}, {
  date: '2011-06-28T07:00:00.000Z',
  close: 335.26
}, {
  date: '2011-06-29T07:00:00.000Z',
  close: 334.04
}, {
  date: '2011-06-30T07:00:00.000Z',
  close: 335.67
}, {
  date: '2011-07-01T07:00:00.000Z',
  close: 343.26
}, {
  date: '2011-07-05T07:00:00.000Z',
  close: 349.43
}, {
  date: '2011-07-06T07:00:00.000Z',
  close: 351.76
}, {
  date: '2011-07-07T07:00:00.000Z',
  close: 357.2
}, {
  date: '2011-07-08T07:00:00.000Z',
  close: 359.71
}, {
  date: '2011-07-11T07:00:00.000Z',
  close: 354
}, {
  date: '2011-07-12T07:00:00.000Z',
  close: 353.75
}, {
  date: '2011-07-13T07:00:00.000Z',
  close: 358.02
}, {
  date: '2011-07-14T07:00:00.000Z',
  close: 357.77
}, {
  date: '2011-07-15T07:00:00.000Z',
  close: 364.92
}, {
  date: '2011-07-18T07:00:00.000Z',
  close: 373.8
}, {
  date: '2011-07-19T07:00:00.000Z',
  close: 376.85
}, {
  date: '2011-07-20T07:00:00.000Z',
  close: 386.9
}, {
  date: '2011-07-21T07:00:00.000Z',
  close: 387.29
}, {
  date: '2011-07-22T07:00:00.000Z',
  close: 393.3
}, {
  date: '2011-07-25T07:00:00.000Z',
  close: 398.5
}, {
  date: '2011-07-26T07:00:00.000Z',
  close: 403.41
}, {
  date: '2011-07-27T07:00:00.000Z',
  close: 392.59
}, {
  date: '2011-07-28T07:00:00.000Z',
  close: 391.82
}, {
  date: '2011-07-29T07:00:00.000Z',
  close: 390.48
}, {
  date: '2011-08-01T07:00:00.000Z',
  close: 396.75
}, {
  date: '2011-08-02T07:00:00.000Z',
  close: 388.91
}, {
  date: '2011-08-03T07:00:00.000Z',
  close: 392.57
}, {
  date: '2011-08-04T07:00:00.000Z',
  close: 377.37
}, {
  date: '2011-08-05T07:00:00.000Z',
  close: 373.62
}, {
  date: '2011-08-08T07:00:00.000Z',
  close: 353.21
}, {
  date: '2011-08-09T07:00:00.000Z',
  close: 374.01
}, {
  date: '2011-08-10T07:00:00.000Z',
  close: 363.69
}, {
  date: '2011-08-11T07:00:00.000Z',
  close: 373.7
}, {
  date: '2011-08-12T07:00:00.000Z',
  close: 376.99
}, {
  date: '2011-08-15T07:00:00.000Z',
  close: 383.41
}, {
  date: '2011-08-16T07:00:00.000Z',
  close: 380.48
}, {
  date: '2011-08-17T07:00:00.000Z',
  close: 380.44
}, {
  date: '2011-08-18T07:00:00.000Z',
  close: 366.05
}, {
  date: '2011-08-19T07:00:00.000Z',
  close: 356.03
}, {
  date: '2011-08-22T07:00:00.000Z',
  close: 356.44
}, {
  date: '2011-08-23T07:00:00.000Z',
  close: 373.6
}, {
  date: '2011-08-24T07:00:00.000Z',
  close: 376.18
}, {
  date: '2011-08-25T07:00:00.000Z',
  close: 373.72
}, {
  date: '2011-08-26T07:00:00.000Z',
  close: 383.58
}, {
  date: '2011-08-29T07:00:00.000Z',
  close: 389.97
}, {
  date: '2011-08-30T07:00:00.000Z',
  close: 389.99
}, {
  date: '2011-08-31T07:00:00.000Z',
  close: 384.83
}, {
  date: '2011-09-01T07:00:00.000Z',
  close: 381.03
}, {
  date: '2011-09-02T07:00:00.000Z',
  close: 374.05
}, {
  date: '2011-09-06T07:00:00.000Z',
  close: 379.74
}, {
  date: '2011-09-07T07:00:00.000Z',
  close: 383.93
}, {
  date: '2011-09-08T07:00:00.000Z',
  close: 384.14
}, {
  date: '2011-09-09T07:00:00.000Z',
  close: 377.48
}, {
  date: '2011-09-12T07:00:00.000Z',
  close: 379.94
}, {
  date: '2011-09-13T07:00:00.000Z',
  close: 384.62
}, {
  date: '2011-09-14T07:00:00.000Z',
  close: 389.3
}, {
  date: '2011-09-15T07:00:00.000Z',
  close: 392.96
}, {
  date: '2011-09-16T07:00:00.000Z',
  close: 400.5
}, {
  date: '2011-09-19T07:00:00.000Z',
  close: 411.63
}, {
  date: '2011-09-20T07:00:00.000Z',
  close: 413.45
}, {
  date: '2011-09-21T07:00:00.000Z',
  close: 412.14
}, {
  date: '2011-09-22T07:00:00.000Z',
  close: 401.82
}, {
  date: '2011-09-23T07:00:00.000Z',
  close: 404.3
}, {
  date: '2011-09-26T07:00:00.000Z',
  close: 403.17
}, {
  date: '2011-09-27T07:00:00.000Z',
  close: 399.26
}, {
  date: '2011-09-28T07:00:00.000Z',
  close: 397.01
}, {
  date: '2011-09-29T07:00:00.000Z',
  close: 390.57
}, {
  date: '2011-09-30T07:00:00.000Z',
  close: 381.32
}, {
  date: '2011-10-03T07:00:00.000Z',
  close: 374.6
}, {
  date: '2011-10-04T07:00:00.000Z',
  close: 372.5
}, {
  date: '2011-10-05T07:00:00.000Z',
  close: 378.25
}, {
  date: '2011-10-06T07:00:00.000Z',
  close: 377.37
}, {
  date: '2011-10-07T07:00:00.000Z',
  close: 369.8
}, {
  date: '2011-10-10T07:00:00.000Z',
  close: 388.81
}, {
  date: '2011-10-11T07:00:00.000Z',
  close: 400.29
}, {
  date: '2011-10-12T07:00:00.000Z',
  close: 402.19
}, {
  date: '2011-10-13T07:00:00.000Z',
  close: 408.43
}, {
  date: '2011-10-14T07:00:00.000Z',
  close: 422
}, {
  date: '2011-10-17T07:00:00.000Z',
  close: 419.99
}, {
  date: '2011-10-18T07:00:00.000Z',
  close: 422.24
}, {
  date: '2011-10-19T07:00:00.000Z',
  close: 398.62
}, {
  date: '2011-10-20T07:00:00.000Z',
  close: 395.31
}, {
  date: '2011-10-21T07:00:00.000Z',
  close: 392.87
}, {
  date: '2011-10-24T07:00:00.000Z',
  close: 405.77
}, {
  date: '2011-10-25T07:00:00.000Z',
  close: 397.77
}, {
  date: '2011-10-26T07:00:00.000Z',
  close: 400.6
}, {
  date: '2011-10-27T07:00:00.000Z',
  close: 404.69
}, {
  date: '2011-10-28T07:00:00.000Z',
  close: 404.95
}, {
  date: '2011-10-31T07:00:00.000Z',
  close: 404.78
}, {
  date: '2011-11-01T07:00:00.000Z',
  close: 396.51
}, {
  date: '2011-11-02T07:00:00.000Z',
  close: 397.41
}, {
  date: '2011-11-03T07:00:00.000Z',
  close: 403.07
}, {
  date: '2011-11-04T07:00:00.000Z',
  close: 400.24
}, {
  date: '2011-11-07T08:00:00.000Z',
  close: 399.73
}, {
  date: '2011-11-08T08:00:00.000Z',
  close: 406.23
}, {
  date: '2011-11-09T08:00:00.000Z',
  close: 395.28
}, {
  date: '2011-11-10T08:00:00.000Z',
  close: 385.22
}, {
  date: '2011-11-11T08:00:00.000Z',
  close: 384.62
}, {
  date: '2011-11-14T08:00:00.000Z',
  close: 379.26
}, {
  date: '2011-11-15T08:00:00.000Z',
  close: 388.83
}, {
  date: '2011-11-16T08:00:00.000Z',
  close: 384.77
}, {
  date: '2011-11-17T08:00:00.000Z',
  close: 377.41
}, {
  date: '2011-11-18T08:00:00.000Z',
  close: 374.94
}, {
  date: '2011-11-21T08:00:00.000Z',
  close: 369.01
}, {
  date: '2011-11-22T08:00:00.000Z',
  close: 376.51
}, {
  date: '2011-11-23T08:00:00.000Z',
  close: 366.99
}, {
  date: '2011-11-25T08:00:00.000Z',
  close: 363.57
}, {
  date: '2011-11-28T08:00:00.000Z',
  close: 376.12
}, {
  date: '2011-11-29T08:00:00.000Z',
  close: 373.2
}, {
  date: '2011-11-30T08:00:00.000Z',
  close: 382.2
}, {
  date: '2011-12-01T08:00:00.000Z',
  close: 387.93
}, {
  date: '2011-12-02T08:00:00.000Z',
  close: 389.7
}, {
  date: '2011-12-05T08:00:00.000Z',
  close: 393.01
}, {
  date: '2011-12-06T08:00:00.000Z',
  close: 390.95
}, {
  date: '2011-12-07T08:00:00.000Z',
  close: 389.09
}, {
  date: '2011-12-08T08:00:00.000Z',
  close: 390.66
}, {
  date: '2011-12-09T08:00:00.000Z',
  close: 393.62
}, {
  date: '2011-12-12T08:00:00.000Z',
  close: 391.84
}, {
  date: '2011-12-13T08:00:00.000Z',
  close: 388.81
}, {
  date: '2011-12-14T08:00:00.000Z',
  close: 380.19
}, {
  date: '2011-12-15T08:00:00.000Z',
  close: 378.94
}, {
  date: '2011-12-16T08:00:00.000Z',
  close: 381.02
}, {
  date: '2011-12-19T08:00:00.000Z',
  close: 382.21
}, {
  date: '2011-12-20T08:00:00.000Z',
  close: 395.95
}, {
  date: '2011-12-21T08:00:00.000Z',
  close: 396.44
}, {
  date: '2011-12-22T08:00:00.000Z',
  close: 398.55
}, {
  date: '2011-12-23T08:00:00.000Z',
  close: 403.43
}, {
  date: '2011-12-27T08:00:00.000Z',
  close: 406.53
}, {
  date: '2011-12-28T08:00:00.000Z',
  close: 402.64
}, {
  date: '2011-12-29T08:00:00.000Z',
  close: 405.12
}, {
  date: '2011-12-30T08:00:00.000Z',
  close: 405
}, {
  date: '2012-01-03T08:00:00.000Z',
  close: 411.23
}, {
  date: '2012-01-04T08:00:00.000Z',
  close: 413.44
}, {
  date: '2012-01-05T08:00:00.000Z',
  close: 418.03
}, {
  date: '2012-01-06T08:00:00.000Z',
  close: 422.4
}, {
  date: '2012-01-09T08:00:00.000Z',
  close: 421.73
}, {
  date: '2012-01-10T08:00:00.000Z',
  close: 423.24
}, {
  date: '2012-01-11T08:00:00.000Z',
  close: 422.55
}, {
  date: '2012-01-12T08:00:00.000Z',
  close: 421.39
}, {
  date: '2012-01-13T08:00:00.000Z',
  close: 419.81
}, {
  date: '2012-01-17T08:00:00.000Z',
  close: 424.7
}, {
  date: '2012-01-18T08:00:00.000Z',
  close: 429.11
}, {
  date: '2012-01-19T08:00:00.000Z',
  close: 427.75
}, {
  date: '2012-01-20T08:00:00.000Z',
  close: 420.3
}, {
  date: '2012-01-23T08:00:00.000Z',
  close: 427.41
}, {
  date: '2012-01-24T08:00:00.000Z',
  close: 420.41
}, {
  date: '2012-01-25T08:00:00.000Z',
  close: 446.66
}, {
  date: '2012-01-26T08:00:00.000Z',
  close: 444.63
}, {
  date: '2012-01-27T08:00:00.000Z',
  close: 447.28
}, {
  date: '2012-01-30T08:00:00.000Z',
  close: 453.01
}, {
  date: '2012-01-31T08:00:00.000Z',
  close: 456.48
}, {
  date: '2012-02-01T08:00:00.000Z',
  close: 456.19
}, {
  date: '2012-02-02T08:00:00.000Z',
  close: 455.12
}, {
  date: '2012-02-03T08:00:00.000Z',
  close: 459.68
}, {
  date: '2012-02-06T08:00:00.000Z',
  close: 463.97
}, {
  date: '2012-02-07T08:00:00.000Z',
  close: 468.83
}, {
  date: '2012-02-08T08:00:00.000Z',
  close: 476.68
}, {
  date: '2012-02-09T08:00:00.000Z',
  close: 493.17
}, {
  date: '2012-02-10T08:00:00.000Z',
  close: 493.42
}, {
  date: '2012-02-13T08:00:00.000Z',
  close: 502.6
}, {
  date: '2012-02-14T08:00:00.000Z',
  close: 509.46
}, {
  date: '2012-02-15T08:00:00.000Z',
  close: 497.67
}, {
  date: '2012-02-16T08:00:00.000Z',
  close: 502.21
}, {
  date: '2012-02-17T08:00:00.000Z',
  close: 502.12
}, {
  date: '2012-02-21T08:00:00.000Z',
  close: 514.85
}, {
  date: '2012-02-22T08:00:00.000Z',
  close: 513.04
}, {
  date: '2012-02-23T08:00:00.000Z',
  close: 516.39
}, {
  date: '2012-02-24T08:00:00.000Z',
  close: 522.41
}, {
  date: '2012-02-27T08:00:00.000Z',
  close: 525.76
}, {
  date: '2012-02-28T08:00:00.000Z',
  close: 535.41
}, {
  date: '2012-02-29T08:00:00.000Z',
  close: 542.44
}, {
  date: '2012-03-01T08:00:00.000Z',
  close: 544.47
}, {
  date: '2012-03-02T08:00:00.000Z',
  close: 545.18
}, {
  date: '2012-03-05T08:00:00.000Z',
  close: 533.16
}, {
  date: '2012-03-06T08:00:00.000Z',
  close: 530.26
}, {
  date: '2012-03-07T08:00:00.000Z',
  close: 530.69
}, {
  date: '2012-03-08T08:00:00.000Z',
  close: 541.99
}, {
  date: '2012-03-09T08:00:00.000Z',
  close: 545.17
}, {
  date: '2012-03-12T07:00:00.000Z',
  close: 552
}, {
  date: '2012-03-13T07:00:00.000Z',
  close: 568.1
}, {
  date: '2012-03-14T07:00:00.000Z',
  close: 589.58
}, {
  date: '2012-03-15T07:00:00.000Z',
  close: 585.56
}, {
  date: '2012-03-16T07:00:00.000Z',
  close: 585.57
}, {
  date: '2012-03-19T07:00:00.000Z',
  close: 601.1
}, {
  date: '2012-03-20T07:00:00.000Z',
  close: 605.96
}, {
  date: '2012-03-21T07:00:00.000Z',
  close: 602.5
}, {
  date: '2012-03-22T07:00:00.000Z',
  close: 599.34
}, {
  date: '2012-03-23T07:00:00.000Z',
  close: 596.05
}, {
  date: '2012-03-26T07:00:00.000Z',
  close: 606.98
}, {
  date: '2012-03-27T07:00:00.000Z',
  close: 614.48
}, {
  date: '2012-03-28T07:00:00.000Z',
  close: 617.62
}, {
  date: '2012-03-29T07:00:00.000Z',
  close: 609.86
}, {
  date: '2012-03-30T07:00:00.000Z',
  close: 599.55
}, {
  date: '2012-04-02T07:00:00.000Z',
  close: 618.63
}, {
  date: '2012-04-03T07:00:00.000Z',
  close: 629.32
}, {
  date: '2012-04-04T07:00:00.000Z',
  close: 624.31
}, {
  date: '2012-04-05T07:00:00.000Z',
  close: 633.68
}, {
  date: '2012-04-09T07:00:00.000Z',
  close: 636.23
}, {
  date: '2012-04-10T07:00:00.000Z',
  close: 628.44
}, {
  date: '2012-04-11T07:00:00.000Z',
  close: 626.2
}, {
  date: '2012-04-12T07:00:00.000Z',
  close: 622.77
}, {
  date: '2012-04-13T07:00:00.000Z',
  close: 605.23
}, {
  date: '2012-04-16T07:00:00.000Z',
  close: 580.13
}, {
  date: '2012-04-17T07:00:00.000Z',
  close: 609.7
}, {
  date: '2012-04-18T07:00:00.000Z',
  close: 608.34
}, {
  date: '2012-04-19T07:00:00.000Z',
  close: 587.44
}, {
  date: '2012-04-20T07:00:00.000Z',
  close: 572.98
}, {
  date: '2012-04-23T07:00:00.000Z',
  close: 571.7
}, {
  date: '2012-04-24T07:00:00.000Z',
  close: 560.28
}, {
  date: '2012-04-25T07:00:00.000Z',
  close: 610
}, {
  date: '2012-04-26T07:00:00.000Z',
  close: 607.7
}, {
  date: '2012-04-27T07:00:00.000Z',
  close: 603
}, {
  date: '2012-04-30T07:00:00.000Z',
  close: 583.98
}, {
  date: '2012-05-01T07:00:00.000Z',
  close: 582.13
}];

var letterFrequency = [{
  letter: 'A',
  frequency: 0.08167
}, {
  letter: 'B',
  frequency: 0.01492
}, {
  letter: 'C',
  frequency: 0.02782
}, {
  letter: 'D',
  frequency: 0.04253
}, {
  letter: 'E',
  frequency: 0.12702
}, {
  letter: 'F',
  frequency: 0.02288
}, {
  letter: 'G',
  frequency: 0.02015
}, {
  letter: 'H',
  frequency: 0.06094
}, {
  letter: 'I',
  frequency: 0.06966
}, {
  letter: 'J',
  frequency: 0.00153
}, {
  letter: 'K',
  frequency: 0.00772
}, {
  letter: 'L',
  frequency: 0.04025
}, {
  letter: 'M',
  frequency: 0.02406
}, {
  letter: 'N',
  frequency: 0.06749
}, {
  letter: 'O',
  frequency: 0.07507
}, {
  letter: 'P',
  frequency: 0.01929
}, {
  letter: 'Q',
  frequency: 0.00095
}, {
  letter: 'R',
  frequency: 0.05987
}, {
  letter: 'S',
  frequency: 0.06327
}, {
  letter: 'T',
  frequency: 0.09056
}, {
  letter: 'U',
  frequency: 0.02758
}, {
  letter: 'V',
  frequency: 0.00978
}, {
  letter: 'W',
  frequency: 0.0236
}, {
  letter: 'X',
  frequency: 0.0015
}, {
  letter: 'Y',
  frequency: 0.01974
}, {
  letter: 'Z',
  frequency: 0.00074
}];

var browserUsage = [{
  date: '2015 Jun 15',
  'Google Chrome': '48.09',
  'Internet Explorer': '24.14',
  Firefox: '18.82',
  Safari: '7.46',
  'Microsoft Edge': '0.03',
  Opera: '1.32',
  Mozilla: '0.12',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 16',
  'Google Chrome': '48',
  'Internet Explorer': '24.19',
  Firefox: '18.96',
  Safari: '7.36',
  'Microsoft Edge': '0.03',
  Opera: '1.32',
  Mozilla: '0.12',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 17',
  'Google Chrome': '47.87',
  'Internet Explorer': '24.44',
  Firefox: '18.91',
  Safari: '7.27',
  'Microsoft Edge': '0.03',
  Opera: '1.36',
  Mozilla: '0.12',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 18',
  'Google Chrome': '48.22',
  'Internet Explorer': '23.83',
  Firefox: '19.16',
  Safari: '7.24',
  'Microsoft Edge': '0.04',
  Opera: '1.39',
  Mozilla: '0.12',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 19',
  'Google Chrome': '47.91',
  'Internet Explorer': '23.86',
  Firefox: '19.35',
  Safari: '7.31',
  'Microsoft Edge': '0.04',
  Opera: '1.41',
  Mozilla: '0.12',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 20',
  'Google Chrome': '48.78',
  'Internet Explorer': '21.14',
  Firefox: '19.66',
  Safari: '8.42',
  'Microsoft Edge': '0.05',
  Opera: '1.83',
  Mozilla: '0.1',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 21',
  'Google Chrome': '49.43',
  'Internet Explorer': '20.55',
  Firefox: '19.42',
  Safari: '8.66',
  'Microsoft Edge': '0.05',
  Opera: '1.75',
  Mozilla: '0.12',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 22',
  'Google Chrome': '48.98',
  'Internet Explorer': '23.47',
  Firefox: '18.84',
  Safari: '7.25',
  'Microsoft Edge': '0.04',
  Opera: '1.28',
  Mozilla: '0.12',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 23',
  'Google Chrome': '48.69',
  'Internet Explorer': '23.76',
  Firefox: '18.89',
  Safari: '7.22',
  'Microsoft Edge': '0.04',
  Opera: '1.27',
  Mozilla: '0.11',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 24',
  'Google Chrome': '49.17',
  'Internet Explorer': '23.35',
  Firefox: '18.91',
  Safari: '7.09',
  'Microsoft Edge': '0.04',
  Opera: '1.32',
  Mozilla: '0.12',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 25',
  'Google Chrome': '49.32',
  'Internet Explorer': '23.39',
  Firefox: '18.76',
  Safari: '7.03',
  'Microsoft Edge': '0.04',
  Opera: '1.34',
  Mozilla: '0.11',
  'Other/Unknown': '0'
}, {
  date: '2015 Jun 26',
  'Google Chrome': '49.39',
  'Internet Explorer': '23.11',
  Firefox: '18.84',
  Safari: '7.14',
  'Microsoft Edge': '0.04',
  Opera: '1.37',
  Mozilla: '0.1',
  'Other/Unknown': '0'
}, {
  date: '2015 Jun 27',
  'Google Chrome': '49.77',
  'Internet Explorer': '20.68',
  Firefox: '19.23',
  Safari: '8.46',
  'Microsoft Edge': '0.05',
  Opera: '1.71',
  Mozilla: '0.09',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 28',
  'Google Chrome': '50.07',
  'Internet Explorer': '20.41',
  Firefox: '18.91',
  Safari: '8.77',
  'Microsoft Edge': '0.05',
  Opera: '1.69',
  Mozilla: '0.1',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 29',
  'Google Chrome': '49.32',
  'Internet Explorer': '23.3',
  Firefox: '18.54',
  Safari: '7.4',
  'Microsoft Edge': '0.04',
  Opera: '1.27',
  Mozilla: '0.11',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jun 30',
  'Google Chrome': '49.99',
  'Internet Explorer': '22.94',
  Firefox: '18.45',
  Safari: '7.07',
  'Microsoft Edge': '0.07',
  Opera: '1.32',
  Mozilla: '0.13',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Jul 1',
  'Google Chrome': '50.22',
  'Internet Explorer': '22.79',
  Firefox: '18.46',
  Safari: '6.95',
  'Microsoft Edge': '0.07',
  Opera: '1.37',
  Mozilla: '0.12',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Jul 2',
  'Google Chrome': '50.33',
  'Internet Explorer': '22.59',
  Firefox: '18.74',
  Safari: '6.69',
  'Microsoft Edge': '0.07',
  Opera: '1.45',
  Mozilla: '0.12',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Jul 3',
  'Google Chrome': '50.4',
  'Internet Explorer': '21.29',
  Firefox: '19.28',
  Safari: '7.28',
  'Microsoft Edge': '0.08',
  Opera: '1.54',
  Mozilla: '0.11',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Jul 4',
  'Google Chrome': '50.83',
  'Internet Explorer': '20.02',
  Firefox: '19.12',
  Safari: '7.99',
  'Microsoft Edge': '0.08',
  Opera: '1.82',
  Mozilla: '0.11',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Jul 5',
  'Google Chrome': '51.6',
  'Internet Explorer': '19.6',
  Firefox: '18.43',
  Safari: '8.58',
  'Microsoft Edge': '0.07',
  Opera: '1.62',
  Mozilla: '0.1',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 6',
  'Google Chrome': '50.53',
  'Internet Explorer': '22.64',
  Firefox: '18.04',
  Safari: '7.33',
  'Microsoft Edge': '0.07',
  Opera: '1.27',
  Mozilla: '0.11',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 7',
  'Google Chrome': '50.01',
  'Internet Explorer': '23.02',
  Firefox: '18.32',
  Safari: '7.25',
  'Microsoft Edge': '0.07',
  Opera: '1.25',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 8',
  'Google Chrome': '49.52',
  'Internet Explorer': '23.17',
  Firefox: '18.55',
  Safari: '7.31',
  'Microsoft Edge': '0.07',
  Opera: '1.32',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 9',
  'Google Chrome': '49.31',
  'Internet Explorer': '23.24',
  Firefox: '18.7',
  Safari: '7.22',
  'Microsoft Edge': '0.08',
  Opera: '1.39',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 10',
  'Google Chrome': '48.4',
  'Internet Explorer': '23.68',
  Firefox: '18.97',
  Safari: '7.37',
  'Microsoft Edge': '0.09',
  Opera: '1.43',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 11',
  'Google Chrome': '48.87',
  'Internet Explorer': '21.22',
  Firefox: '19.33',
  Safari: '8.65',
  'Microsoft Edge': '0.1',
  Opera: '1.76',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 12',
  'Google Chrome': '49.4',
  'Internet Explorer': '20.87',
  Firefox: '18.84',
  Safari: '8.99',
  'Microsoft Edge': '0.09',
  Opera: '1.73',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 13',
  'Google Chrome': '49.12',
  'Internet Explorer': '23.35',
  Firefox: '18.49',
  Safari: '7.51',
  'Microsoft Edge': '0.07',
  Opera: '1.39',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 14',
  'Google Chrome': '49.36',
  'Internet Explorer': '23.2',
  Firefox: '18.48',
  Safari: '7.48',
  'Microsoft Edge': '0.08',
  Opera: '1.35',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 15',
  'Google Chrome': '48.88',
  'Internet Explorer': '23.73',
  Firefox: '18.46',
  Safari: '7.44',
  'Microsoft Edge': '0.09',
  Opera: '1.34',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 16',
  'Google Chrome': '48.76',
  'Internet Explorer': '23.77',
  Firefox: '18.5',
  Safari: '7.43',
  'Microsoft Edge': '0.09',
  Opera: '1.4',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 17',
  'Google Chrome': '47.58',
  'Internet Explorer': '24.54',
  Firefox: '18.76',
  Safari: '7.53',
  'Microsoft Edge': '0.09',
  Opera: '1.43',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 18',
  'Google Chrome': '48.06',
  'Internet Explorer': '21.89',
  Firefox: '19.14',
  Safari: '8.99',
  'Microsoft Edge': '0.11',
  Opera: '1.74',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 19',
  'Google Chrome': '48.39',
  'Internet Explorer': '21.5',
  Firefox: '19',
  Safari: '9.23',
  'Microsoft Edge': '0.11',
  Opera: '1.7',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 20',
  'Google Chrome': '48.32',
  'Internet Explorer': '23.91',
  Firefox: '18.62',
  Safari: '7.68',
  'Microsoft Edge': '0.09',
  Opera: '1.32',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 21',
  'Google Chrome': '47.81',
  'Internet Explorer': '24.98',
  Firefox: '18.34',
  Safari: '7.52',
  'Microsoft Edge': '0.08',
  Opera: '1.2',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 22',
  'Google Chrome': '48.28',
  'Internet Explorer': '24.4',
  Firefox: '18.45',
  Safari: '7.44',
  'Microsoft Edge': '0.08',
  Opera: '1.29',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 23',
  'Google Chrome': '48.41',
  'Internet Explorer': '24.2',
  Firefox: '18.57',
  Safari: '7.35',
  'Microsoft Edge': '0.08',
  Opera: '1.31',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 24',
  'Google Chrome': '48.22',
  'Internet Explorer': '23.96',
  Firefox: '18.67',
  Safari: '7.55',
  'Microsoft Edge': '0.1',
  Opera: '1.42',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 25',
  'Google Chrome': '48.11',
  'Internet Explorer': '21.86',
  Firefox: '19.28',
  Safari: '8.88',
  'Microsoft Edge': '0.1',
  Opera: '1.65',
  Mozilla: '0.08',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Jul 26',
  'Google Chrome': '48.27',
  'Internet Explorer': '21.57',
  Firefox: '19',
  Safari: '9.38',
  'Microsoft Edge': '0.11',
  Opera: '1.59',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 27',
  'Google Chrome': '48.5',
  'Internet Explorer': '23.72',
  Firefox: '18.59',
  Safari: '7.76',
  'Microsoft Edge': '0.1',
  Opera: '1.27',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Jul 28',
  'Google Chrome': '48.48',
  'Internet Explorer': '23.95',
  Firefox: '18.46',
  Safari: '7.61',
  'Microsoft Edge': '0.12',
  Opera: '1.31',
  Mozilla: '0.07',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Jul 29',
  'Google Chrome': '48.33',
  'Internet Explorer': '23.77',
  Firefox: '18.56',
  Safari: '7.51',
  'Microsoft Edge': '0.42',
  Opera: '1.33',
  Mozilla: '0.06',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Jul 30',
  'Google Chrome': '47.8',
  'Internet Explorer': '24.06',
  Firefox: '18.6',
  Safari: '7.46',
  'Microsoft Edge': '0.7',
  Opera: '1.3',
  Mozilla: '0.07',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Jul 31',
  'Google Chrome': '48.41',
  'Internet Explorer': '22.9',
  Firefox: '18.88',
  Safari: '7.48',
  'Microsoft Edge': '0.84',
  Opera: '1.41',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 1',
  'Google Chrome': '48.8',
  'Internet Explorer': '20.29',
  Firefox: '19.16',
  Safari: '8.75',
  'Microsoft Edge': '1.16',
  Opera: '1.75',
  Mozilla: '0.07',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Aug 2',
  'Google Chrome': '48.95',
  'Internet Explorer': '20.27',
  Firefox: '18.81',
  Safari: '9',
  'Microsoft Edge': '1.23',
  Opera: '1.65',
  Mozilla: '0.08',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Aug 3',
  'Google Chrome': '49.07',
  'Internet Explorer': '22.67',
  Firefox: '18.35',
  Safari: '7.59',
  'Microsoft Edge': '0.93',
  Opera: '1.31',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 4',
  'Google Chrome': '49.18',
  'Internet Explorer': '22.72',
  Firefox: '18.31',
  Safari: '7.44',
  'Microsoft Edge': '0.95',
  Opera: '1.32',
  Mozilla: '0.07',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Aug 5',
  'Google Chrome': '49.56',
  'Internet Explorer': '22.37',
  Firefox: '18.28',
  Safari: '7.38',
  'Microsoft Edge': '0.99',
  Opera: '1.34',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 6',
  'Google Chrome': '49.77',
  'Internet Explorer': '21.81',
  Firefox: '18.28',
  Safari: '7.67',
  'Microsoft Edge': '1.12',
  Opera: '1.28',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 7',
  'Google Chrome': '48.73',
  'Internet Explorer': '22.63',
  Firefox: '18.42',
  Safari: '7.5',
  'Microsoft Edge': '1.26',
  Opera: '1.39',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 8',
  'Google Chrome': '49.6',
  'Internet Explorer': '18.97',
  Firefox: '19.11',
  Safari: '8.79',
  'Microsoft Edge': '1.69',
  Opera: '1.74',
  Mozilla: '0.09',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Aug 9',
  'Google Chrome': '49.68',
  'Internet Explorer': '18.85',
  Firefox: '18.71',
  Safari: '9.23',
  'Microsoft Edge': '1.72',
  Opera: '1.72',
  Mozilla: '0.08',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Aug 10',
  'Google Chrome': '49.11',
  'Internet Explorer': '22.54',
  Firefox: '17.97',
  Safari: '7.64',
  'Microsoft Edge': '1.28',
  Opera: '1.39',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 11',
  'Google Chrome': '49.21',
  'Internet Explorer': '22.59',
  Firefox: '17.96',
  Safari: '7.56',
  'Microsoft Edge': '1.27',
  Opera: '1.35',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 12',
  'Google Chrome': '48.95',
  'Internet Explorer': '22.68',
  Firefox: '18.21',
  Safari: '7.44',
  'Microsoft Edge': '1.3',
  Opera: '1.35',
  Mozilla: '0.06',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Aug 13',
  'Google Chrome': '49.31',
  'Internet Explorer': '22.28',
  Firefox: '18.19',
  Safari: '7.32',
  'Microsoft Edge': '1.31',
  Opera: '1.51',
  Mozilla: '0.06',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Aug 14',
  'Google Chrome': '49.08',
  'Internet Explorer': '21.98',
  Firefox: '18.38',
  Safari: '7.47',
  'Microsoft Edge': '1.43',
  Opera: '1.56',
  Mozilla: '0.07',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Aug 15',
  'Google Chrome': '49.1',
  'Internet Explorer': '19.47',
  Firefox: '18.77',
  Safari: '8.85',
  'Microsoft Edge': '1.87',
  Opera: '1.86',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 16',
  'Google Chrome': '49.5',
  'Internet Explorer': '19.33',
  Firefox: '18.42',
  Safari: '9.12',
  'Microsoft Edge': '1.83',
  Opera: '1.72',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 17',
  'Google Chrome': '49.42',
  'Internet Explorer': '22.12',
  Firefox: '18.06',
  Safari: '7.5',
  'Microsoft Edge': '1.36',
  Opera: '1.44',
  Mozilla: '0.08',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Aug 18',
  'Google Chrome': '49.46',
  'Internet Explorer': '22.16',
  Firefox: '18.05',
  Safari: '7.43',
  'Microsoft Edge': '1.41',
  Opera: '1.41',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 19',
  'Google Chrome': '49.51',
  'Internet Explorer': '22.21',
  Firefox: '17.93',
  Safari: '7.46',
  'Microsoft Edge': '1.39',
  Opera: '1.42',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 20',
  'Google Chrome': '49.43',
  'Internet Explorer': '22.38',
  Firefox: '17.91',
  Safari: '7.31',
  'Microsoft Edge': '1.42',
  Opera: '1.47',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 21',
  'Google Chrome': '49.44',
  'Internet Explorer': '21.79',
  Firefox: '18.3',
  Safari: '7.39',
  'Microsoft Edge': '1.51',
  Opera: '1.47',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 22',
  'Google Chrome': '49.79',
  'Internet Explorer': '19.29',
  Firefox: '18.51',
  Safari: '8.67',
  'Microsoft Edge': '1.91',
  Opera: '1.74',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 23',
  'Google Chrome': '50.12',
  'Internet Explorer': '18.91',
  Firefox: '18.1',
  Safari: '9.11',
  'Microsoft Edge': '1.89',
  Opera: '1.8',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 24',
  'Google Chrome': '49.34',
  'Internet Explorer': '22.2',
  Firefox: '18.01',
  Safari: '7.62',
  'Microsoft Edge': '1.48',
  Opera: '1.29',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Aug 25',
  'Google Chrome': '49.21',
  'Internet Explorer': '22.51',
  Firefox: '17.91',
  Safari: '7.47',
  'Microsoft Edge': '1.47',
  Opera: '1.38',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 26',
  'Google Chrome': '49.06',
  'Internet Explorer': '22.58',
  Firefox: '17.92',
  Safari: '7.52',
  'Microsoft Edge': '1.47',
  Opera: '1.39',
  Mozilla: '0.04',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 27',
  'Google Chrome': '48.89',
  'Internet Explorer': '22.63',
  Firefox: '17.98',
  Safari: '7.57',
  'Microsoft Edge': '1.51',
  Opera: '1.35',
  Mozilla: '0.06',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Aug 28',
  'Google Chrome': '48.69',
  'Internet Explorer': '22.44',
  Firefox: '18.2',
  Safari: '7.56',
  'Microsoft Edge': '1.61',
  Opera: '1.43',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 29',
  'Google Chrome': '48.64',
  'Internet Explorer': '19.87',
  Firefox: '18.43',
  Safari: '9.16',
  'Microsoft Edge': '2.07',
  Opera: '1.74',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 30',
  'Google Chrome': '49.72',
  'Internet Explorer': '18.84',
  Firefox: '17.88',
  Safari: '9.76',
  'Microsoft Edge': '2.03',
  Opera: '1.69',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Aug 31',
  'Google Chrome': '49.43',
  'Internet Explorer': '21.94',
  Firefox: '17.82',
  Safari: '7.87',
  'Microsoft Edge': '1.57',
  Opera: '1.31',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 1',
  'Google Chrome': '49.65',
  'Internet Explorer': '21.91',
  Firefox: '17.95',
  Safari: '7.52',
  'Microsoft Edge': '1.52',
  Opera: '1.39',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 2',
  'Google Chrome': '49.73',
  'Internet Explorer': '21.85',
  Firefox: '18.02',
  Safari: '7.49',
  'Microsoft Edge': '1.53',
  Opera: '1.3',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 3',
  'Google Chrome': '49.59',
  'Internet Explorer': '21.97',
  Firefox: '17.88',
  Safari: '7.6',
  'Microsoft Edge': '1.58',
  Opera: '1.31',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 4',
  'Google Chrome': '49.52',
  'Internet Explorer': '21.64',
  Firefox: '18.06',
  Safari: '7.62',
  'Microsoft Edge': '1.67',
  Opera: '1.41',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 5',
  'Google Chrome': '50.28',
  'Internet Explorer': '18.93',
  Firefox: '18.19',
  Safari: '8.71',
  'Microsoft Edge': '2.13',
  Opera: '1.69',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 6',
  'Google Chrome': '50.25',
  'Internet Explorer': '18.67',
  Firefox: '18.2',
  Safari: '9.04',
  'Microsoft Edge': '2.09',
  Opera: '1.67',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 7',
  'Google Chrome': '49.83',
  'Internet Explorer': '19.8',
  Firefox: '18.39',
  Safari: '8.63',
  'Microsoft Edge': '1.86',
  Opera: '1.43',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 8',
  'Google Chrome': '50',
  'Internet Explorer': '21.8',
  Firefox: '17.62',
  Safari: '7.66',
  'Microsoft Edge': '1.55',
  Opera: '1.31',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 9',
  'Google Chrome': '49.81',
  'Internet Explorer': '21.89',
  Firefox: '17.58',
  Safari: '7.83',
  'Microsoft Edge': '1.59',
  Opera: '1.25',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 10',
  'Google Chrome': '49.65',
  'Internet Explorer': '21.93',
  Firefox: '17.74',
  Safari: '7.82',
  'Microsoft Edge': '1.6',
  Opera: '1.19',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 11',
  'Google Chrome': '49.75',
  'Internet Explorer': '21.71',
  Firefox: '17.88',
  Safari: '7.64',
  'Microsoft Edge': '1.67',
  Opera: '1.29',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 12',
  'Google Chrome': '49.86',
  'Internet Explorer': '19.04',
  Firefox: '17.96',
  Safari: '9.3',
  'Microsoft Edge': '2.21',
  Opera: '1.56',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 13',
  'Google Chrome': '50.1',
  'Internet Explorer': '18.71',
  Firefox: '17.76',
  Safari: '9.69',
  'Microsoft Edge': '2.19',
  Opera: '1.49',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 14',
  'Google Chrome': '49.91',
  'Internet Explorer': '21.55',
  Firefox: '17.87',
  Safari: '7.74',
  'Microsoft Edge': '1.66',
  Opera: '1.21',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 15',
  'Google Chrome': '50.1',
  'Internet Explorer': '21.34',
  Firefox: '17.96',
  Safari: '7.63',
  'Microsoft Edge': '1.66',
  Opera: '1.25',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 16',
  'Google Chrome': '50.6',
  'Internet Explorer': '21.53',
  Firefox: '17.44',
  Safari: '7.56',
  'Microsoft Edge': '1.59',
  Opera: '1.23',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 17',
  'Google Chrome': '50.59',
  'Internet Explorer': '21.59',
  Firefox: '17.55',
  Safari: '7.37',
  'Microsoft Edge': '1.6',
  Opera: '1.24',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 18',
  'Google Chrome': '50.57',
  'Internet Explorer': '21.75',
  Firefox: '17.43',
  Safari: '7.17',
  'Microsoft Edge': '1.7',
  Opera: '1.32',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Sep 19',
  'Google Chrome': '51.33',
  'Internet Explorer': '18.77',
  Firefox: '17.63',
  Safari: '8.37',
  'Microsoft Edge': '2.17',
  Opera: '1.66',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 20',
  'Google Chrome': '51.41',
  'Internet Explorer': '18.15',
  Firefox: '17.55',
  Safari: '9.09',
  'Microsoft Edge': '2.17',
  Opera: '1.58',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 21',
  'Google Chrome': '50.76',
  'Internet Explorer': '21.38',
  Firefox: '17.41',
  Safari: '7.52',
  'Microsoft Edge': '1.67',
  Opera: '1.22',
  Mozilla: '0.04',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 22',
  'Google Chrome': '50.6',
  'Internet Explorer': '21.48',
  Firefox: '17.55',
  Safari: '7.41',
  'Microsoft Edge': '1.7',
  Opera: '1.22',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Sep 23',
  'Google Chrome': '50.56',
  'Internet Explorer': '21.5',
  Firefox: '17.52',
  Safari: '7.42',
  'Microsoft Edge': '1.71',
  Opera: '1.25',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Sep 24',
  'Google Chrome': '50.66',
  'Internet Explorer': '21.34',
  Firefox: '17.52',
  Safari: '7.45',
  'Microsoft Edge': '1.7',
  Opera: '1.29',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Sep 25',
  'Google Chrome': '50.87',
  'Internet Explorer': '20.84',
  Firefox: '17.84',
  Safari: '7.24',
  'Microsoft Edge': '1.78',
  Opera: '1.39',
  Mozilla: '0.04',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 26',
  'Google Chrome': '51.66',
  'Internet Explorer': '17.77',
  Firefox: '18.01',
  Safari: '8.52',
  'Microsoft Edge': '2.28',
  Opera: '1.71',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 27',
  'Google Chrome': '51.99',
  'Internet Explorer': '17.24',
  Firefox: '17.71',
  Safari: '9.17',
  'Microsoft Edge': '2.25',
  Opera: '1.6',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Sep 28',
  'Google Chrome': '50.77',
  'Internet Explorer': '21.23',
  Firefox: '17.52',
  Safari: '7.49',
  'Microsoft Edge': '1.73',
  Opera: '1.22',
  Mozilla: '0.03',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 29',
  'Google Chrome': '50.75',
  'Internet Explorer': '21.39',
  Firefox: '17.47',
  Safari: '7.38',
  'Microsoft Edge': '1.74',
  Opera: '1.22',
  Mozilla: '0.04',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Sep 30',
  'Google Chrome': '50.8',
  'Internet Explorer': '21.34',
  Firefox: '17.4',
  Safari: '7.46',
  'Microsoft Edge': '1.74',
  Opera: '1.23',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 1',
  'Google Chrome': '50.82',
  'Internet Explorer': '21.39',
  Firefox: '17.19',
  Safari: '7.55',
  'Microsoft Edge': '1.78',
  Opera: '1.24',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 2',
  'Google Chrome': '50.93',
  'Internet Explorer': '21.17',
  Firefox: '17.32',
  Safari: '7.38',
  'Microsoft Edge': '1.86',
  Opera: '1.32',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 3',
  'Google Chrome': '51.69',
  'Internet Explorer': '18.12',
  Firefox: '17.51',
  Safari: '8.61',
  'Microsoft Edge': '2.34',
  Opera: '1.68',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 4',
  'Google Chrome': '52.06',
  'Internet Explorer': '17.59',
  Firefox: '17.18',
  Safari: '9.25',
  'Microsoft Edge': '2.32',
  Opera: '1.58',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 5',
  'Google Chrome': '51.4',
  'Internet Explorer': '20.73',
  Firefox: '17.24',
  Safari: '7.56',
  'Microsoft Edge': '1.81',
  Opera: '1.22',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 6',
  'Google Chrome': '51.81',
  'Internet Explorer': '20.35',
  Firefox: '17.31',
  Safari: '7.46',
  'Microsoft Edge': '1.79',
  Opera: '1.25',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 7',
  'Google Chrome': '51.98',
  'Internet Explorer': '20.18',
  Firefox: '17.29',
  Safari: '7.49',
  'Microsoft Edge': '1.76',
  Opera: '1.27',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 8',
  'Google Chrome': '50.97',
  'Internet Explorer': '20.56',
  Firefox: '17.72',
  Safari: '7.63',
  'Microsoft Edge': '1.79',
  Opera: '1.3',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 9',
  'Google Chrome': '50.94',
  'Internet Explorer': '20.42',
  Firefox: '17.8',
  Safari: '7.52',
  'Microsoft Edge': '1.88',
  Opera: '1.4',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 10',
  'Google Chrome': '51.02',
  'Internet Explorer': '17.74',
  Firefox: '18.26',
  Safari: '8.79',
  'Microsoft Edge': '2.38',
  Opera: '1.75',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 11',
  'Google Chrome': '52.07',
  'Internet Explorer': '16.83',
  Firefox: '17.77',
  Safari: '9.23',
  'Microsoft Edge': '2.32',
  Opera: '1.72',
  Mozilla: '0.04',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Oct 12',
  'Google Chrome': '50.9',
  'Internet Explorer': '19.94',
  Firefox: '17.55',
  Safari: '8.27',
  'Microsoft Edge': '1.94',
  Opera: '1.35',
  Mozilla: '0.04',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Oct 13',
  'Google Chrome': '51.52',
  'Internet Explorer': '19.66',
  Firefox: '17.71',
  Safari: '7.76',
  'Microsoft Edge': '1.78',
  Opera: '1.51',
  Mozilla: '0.04',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Oct 14',
  'Google Chrome': '51.75',
  'Internet Explorer': '19.37',
  Firefox: '17.85',
  Safari: '7.72',
  'Microsoft Edge': '1.82',
  Opera: '1.44',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 15',
  'Google Chrome': '51.37',
  'Internet Explorer': '19.66',
  Firefox: '17.92',
  Safari: '7.68',
  'Microsoft Edge': '1.87',
  Opera: '1.46',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 16',
  'Google Chrome': '51.29',
  'Internet Explorer': '19.56',
  Firefox: '18.06',
  Safari: '7.62',
  'Microsoft Edge': '1.91',
  Opera: '1.52',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 17',
  'Google Chrome': '52.47',
  'Internet Explorer': '15.8',
  Firefox: '18.39',
  Safari: '8.96',
  'Microsoft Edge': '2.46',
  Opera: '1.88',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 18',
  'Google Chrome': '51.88',
  'Internet Explorer': '16.03',
  Firefox: '18.07',
  Safari: '9.75',
  'Microsoft Edge': '2.42',
  Opera: '1.79',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 19',
  'Google Chrome': '51.48',
  'Internet Explorer': '19.69',
  Firefox: '17.68',
  Safari: '7.87',
  'Microsoft Edge': '1.83',
  Opera: '1.41',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 20',
  'Google Chrome': '51.58',
  'Internet Explorer': '19.73',
  Firefox: '17.63',
  Safari: '7.85',
  'Microsoft Edge': '1.8',
  Opera: '1.38',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 21',
  'Google Chrome': '52.04',
  'Internet Explorer': '20.14',
  Firefox: '16.99',
  Safari: '7.63',
  'Microsoft Edge': '1.81',
  Opera: '1.34',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 22',
  'Google Chrome': '51.62',
  'Internet Explorer': '20.1',
  Firefox: '17.28',
  Safari: '7.75',
  'Microsoft Edge': '1.86',
  Opera: '1.35',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 23',
  'Google Chrome': '51.87',
  'Internet Explorer': '19.88',
  Firefox: '17.17',
  Safari: '7.64',
  'Microsoft Edge': '1.94',
  Opera: '1.45',
  Mozilla: '0.04',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Oct 24',
  'Google Chrome': '52.62',
  'Internet Explorer': '16.25',
  Firefox: '17.52',
  Safari: '9.28',
  'Microsoft Edge': '2.5',
  Opera: '1.78',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 25',
  'Google Chrome': '52.64',
  'Internet Explorer': '16.1',
  Firefox: '17.4',
  Safari: '9.69',
  'Microsoft Edge': '2.46',
  Opera: '1.67',
  Mozilla: '0.04',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Oct 26',
  'Google Chrome': '52.29',
  'Internet Explorer': '19.72',
  Firefox: '17',
  Safari: '7.81',
  'Microsoft Edge': '1.88',
  Opera: '1.26',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 27',
  'Google Chrome': '51.88',
  'Internet Explorer': '20.08',
  Firefox: '17.1',
  Safari: '7.73',
  'Microsoft Edge': '1.87',
  Opera: '1.3',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 28',
  'Google Chrome': '51.92',
  'Internet Explorer': '19.48',
  Firefox: '17.49',
  Safari: '7.86',
  'Microsoft Edge': '1.93',
  Opera: '1.28',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 29',
  'Google Chrome': '51.56',
  'Internet Explorer': '19.74',
  Firefox: '17.83',
  Safari: '7.64',
  'Microsoft Edge': '1.9',
  Opera: '1.31',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 30',
  'Google Chrome': '51.8',
  'Internet Explorer': '19.42',
  Firefox: '17.86',
  Safari: '7.5',
  'Microsoft Edge': '1.99',
  Opera: '1.38',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2015 Oct 31',
  'Google Chrome': '52.67',
  'Internet Explorer': '16.22',
  Firefox: '18.22',
  Safari: '8.62',
  'Microsoft Edge': '2.46',
  Opera: '1.76',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 1',
  'Google Chrome': '52.4',
  'Internet Explorer': '15.92',
  Firefox: '17.77',
  Safari: '9.7',
  'Microsoft Edge': '2.48',
  Opera: '1.62',
  Mozilla: '0.1',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 2',
  'Google Chrome': '51.9',
  'Internet Explorer': '19.56',
  Firefox: '17.26',
  Safari: '7.93',
  'Microsoft Edge': '1.96',
  Opera: '1.32',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 3',
  'Google Chrome': '51.95',
  'Internet Explorer': '19.83',
  Firefox: '17.41',
  Safari: '7.53',
  'Microsoft Edge': '1.89',
  Opera: '1.33',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 4',
  'Google Chrome': '52.25',
  'Internet Explorer': '19.61',
  Firefox: '17.24',
  Safari: '7.57',
  'Microsoft Edge': '1.83',
  Opera: '1.44',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 5',
  'Google Chrome': '51.98',
  'Internet Explorer': '19.9',
  Firefox: '17.2',
  Safari: '7.63',
  'Microsoft Edge': '1.87',
  Opera: '1.35',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 6',
  'Google Chrome': '51.38',
  'Internet Explorer': '20.09',
  Firefox: '17.39',
  Safari: '7.74',
  'Microsoft Edge': '1.97',
  Opera: '1.36',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 7',
  'Google Chrome': '52.45',
  'Internet Explorer': '16.46',
  Firefox: '17.38',
  Safari: '9.32',
  'Microsoft Edge': '2.6',
  Opera: '1.7',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Nov 8',
  'Google Chrome': '52.61',
  'Internet Explorer': '16.12',
  Firefox: '16.97',
  Safari: '9.97',
  'Microsoft Edge': '2.55',
  Opera: '1.69',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Nov 9',
  'Google Chrome': '51.65',
  'Internet Explorer': '20.18',
  Firefox: '16.67',
  Safari: '8.21',
  'Microsoft Edge': '1.96',
  Opera: '1.28',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 10',
  'Google Chrome': '51.95',
  'Internet Explorer': '19.99',
  Firefox: '16.46',
  Safari: '8.29',
  'Microsoft Edge': '1.95',
  Opera: '1.29',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Nov 11',
  'Google Chrome': '52.74',
  'Internet Explorer': '18.91',
  Firefox: '16.38',
  Safari: '8.49',
  'Microsoft Edge': '2.04',
  Opera: '1.37',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Nov 12',
  'Google Chrome': '52.16',
  'Internet Explorer': '19.88',
  Firefox: '16.54',
  Safari: '8.03',
  'Microsoft Edge': '1.99',
  Opera: '1.35',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 13',
  'Google Chrome': '52.17',
  'Internet Explorer': '19.7',
  Firefox: '16.65',
  Safari: '7.98',
  'Microsoft Edge': '2.09',
  Opera: '1.35',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 14',
  'Google Chrome': '52.81',
  'Internet Explorer': '16.25',
  Firefox: '17.02',
  Safari: '9.53',
  'Microsoft Edge': '2.71',
  Opera: '1.62',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 15',
  'Google Chrome': '52.89',
  'Internet Explorer': '15.65',
  Firefox: '16.97',
  Safari: '10.25',
  'Microsoft Edge': '2.62',
  Opera: '1.56',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 16',
  'Google Chrome': '52.68',
  'Internet Explorer': '19.59',
  Firefox: '16.23',
  Safari: '8.22',
  'Microsoft Edge': '2',
  Opera: '1.24',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 17',
  'Google Chrome': '52.6',
  'Internet Explorer': '19.62',
  Firefox: '16.38',
  Safari: '8.12',
  'Microsoft Edge': '1.96',
  Opera: '1.28',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 18',
  'Google Chrome': '52.35',
  'Internet Explorer': '19.79',
  Firefox: '16.39',
  Safari: '8.12',
  'Microsoft Edge': '1.99',
  Opera: '1.33',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 19',
  'Google Chrome': '52.37',
  'Internet Explorer': '19.81',
  Firefox: '16.46',
  Safari: '8',
  'Microsoft Edge': '2',
  Opera: '1.31',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 20',
  'Google Chrome': '52.2',
  'Internet Explorer': '19.55',
  Firefox: '16.74',
  Safari: '7.96',
  'Microsoft Edge': '2.11',
  Opera: '1.39',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 21',
  'Google Chrome': '52.7',
  'Internet Explorer': '16.03',
  Firefox: '17.04',
  Safari: '9.83',
  'Microsoft Edge': '2.72',
  Opera: '1.62',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 22',
  'Google Chrome': '52.72',
  'Internet Explorer': '15.75',
  Firefox: '16.9',
  Safari: '10.36',
  'Microsoft Edge': '2.68',
  Opera: '1.54',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 23',
  'Google Chrome': '52.35',
  'Internet Explorer': '19.53',
  Firefox: '16.53',
  Safari: '8.21',
  'Microsoft Edge': '2.04',
  Opera: '1.28',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 24',
  'Google Chrome': '52.33',
  'Internet Explorer': '19.53',
  Firefox: '16.75',
  Safari: '7.96',
  'Microsoft Edge': '2.03',
  Opera: '1.34',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 25',
  'Google Chrome': '52.34',
  'Internet Explorer': '19.04',
  Firefox: '17.02',
  Safari: '7.82',
  'Microsoft Edge': '2.07',
  Opera: '1.64',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 26',
  'Google Chrome': '53.29',
  'Internet Explorer': '17.12',
  Firefox: '17.42',
  Safari: '8.12',
  'Microsoft Edge': '2.27',
  Opera: '1.7',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 27',
  'Google Chrome': '52.46',
  'Internet Explorer': '17.83',
  Firefox: '17.12',
  Safari: '8.58',
  'Microsoft Edge': '2.49',
  Opera: '1.46',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 28',
  'Google Chrome': '52.84',
  'Internet Explorer': '15.74',
  Firefox: '17.03',
  Safari: '9.7',
  'Microsoft Edge': '2.97',
  Opera: '1.67',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 29',
  'Google Chrome': '52.8',
  'Internet Explorer': '15.57',
  Firefox: '16.72',
  Safari: '10.32',
  'Microsoft Edge': '2.91',
  Opera: '1.63',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Nov 30',
  'Google Chrome': '52.71',
  'Internet Explorer': '19.08',
  Firefox: '16.21',
  Safari: '8.49',
  'Microsoft Edge': '2.22',
  Opera: '1.24',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 1',
  'Google Chrome': '52.41',
  'Internet Explorer': '19.62',
  Firefox: '16.28',
  Safari: '8.11',
  'Microsoft Edge': '2.25',
  Opera: '1.29',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 2',
  'Google Chrome': '52.64',
  'Internet Explorer': '19.41',
  Firefox: '16.18',
  Safari: '8.1',
  'Microsoft Edge': '2.31',
  Opera: '1.31',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 3',
  'Google Chrome': '52.37',
  'Internet Explorer': '19.3',
  Firefox: '16.4',
  Safari: '8.23',
  'Microsoft Edge': '2.31',
  Opera: '1.35',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 4',
  'Google Chrome': '52.15',
  'Internet Explorer': '19.2',
  Firefox: '16.72',
  Safari: '7.98',
  'Microsoft Edge': '2.46',
  Opera: '1.44',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 5',
  'Google Chrome': '52.15',
  'Internet Explorer': '15.77',
  Firefox: '17.33',
  Safari: '9.82',
  'Microsoft Edge': '3.18',
  Opera: '1.68',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 6',
  'Google Chrome': '52.92',
  'Internet Explorer': '15.33',
  Firefox: '16.65',
  Safari: '10.31',
  'Microsoft Edge': '3.06',
  Opera: '1.67',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 7',
  'Google Chrome': '52.59',
  'Internet Explorer': '19.15',
  Firefox: '16.25',
  Safari: '8.36',
  'Microsoft Edge': '2.34',
  Opera: '1.26',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 8',
  'Google Chrome': '52.57',
  'Internet Explorer': '19.12',
  Firefox: '16.38',
  Safari: '8.21',
  'Microsoft Edge': '2.38',
  Opera: '1.28',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Dec 9',
  'Google Chrome': '52.47',
  'Internet Explorer': '19.47',
  Firefox: '16.41',
  Safari: '7.98',
  'Microsoft Edge': '2.31',
  Opera: '1.3',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 10',
  'Google Chrome': '52.22',
  'Internet Explorer': '20',
  Firefox: '16.4',
  Safari: '7.73',
  'Microsoft Edge': '2.35',
  Opera: '1.25',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 11',
  'Google Chrome': '51.97',
  'Internet Explorer': '19.54',
  Firefox: '16.69',
  Safari: '7.91',
  'Microsoft Edge': '2.49',
  Opera: '1.34',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 12',
  'Google Chrome': '52.03',
  'Internet Explorer': '16.49',
  Firefox: '16.84',
  Safari: '9.67',
  'Microsoft Edge': '3.18',
  Opera: '1.68',
  Mozilla: '0.1',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Dec 13',
  'Google Chrome': '52.17',
  'Internet Explorer': '16.22',
  Firefox: '16.61',
  Safari: '10.18',
  'Microsoft Edge': '3.16',
  Opera: '1.57',
  Mozilla: '0.08',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 14',
  'Google Chrome': '51.48',
  'Internet Explorer': '20.71',
  Firefox: '16.04',
  Safari: '8.12',
  'Microsoft Edge': '2.39',
  Opera: '1.21',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 15',
  'Google Chrome': '51.64',
  'Internet Explorer': '20.54',
  Firefox: '16.11',
  Safari: '8.05',
  'Microsoft Edge': '2.37',
  Opera: '1.23',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 16',
  'Google Chrome': '51.32',
  'Internet Explorer': '21.04',
  Firefox: '16.04',
  Safari: '7.9',
  'Microsoft Edge': '2.45',
  Opera: '1.2',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 17',
  'Google Chrome': '51.03',
  'Internet Explorer': '21.29',
  Firefox: '16.13',
  Safari: '7.77',
  'Microsoft Edge': '2.46',
  Opera: '1.25',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 18',
  'Google Chrome': '50.9',
  'Internet Explorer': '20.71',
  Firefox: '16.59',
  Safari: '7.73',
  'Microsoft Edge': '2.6',
  Opera: '1.38',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Dec 19',
  'Google Chrome': '51.36',
  'Internet Explorer': '17.02',
  Firefox: '17.13',
  Safari: '9.36',
  'Microsoft Edge': '3.29',
  Opera: '1.75',
  Mozilla: '0.09',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Dec 20',
  'Google Chrome': '52.24',
  'Internet Explorer': '16.39',
  Firefox: '17.18',
  Safari: '9.39',
  'Microsoft Edge': '3.13',
  Opera: '1.58',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Dec 21',
  'Google Chrome': '51.44',
  'Internet Explorer': '20.62',
  Firefox: '16.64',
  Safari: '7.45',
  'Microsoft Edge': '2.51',
  Opera: '1.28',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Dec 22',
  'Google Chrome': '51.44',
  'Internet Explorer': '20.64',
  Firefox: '16.72',
  Safari: '7.23',
  'Microsoft Edge': '2.58',
  Opera: '1.33',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 23',
  'Google Chrome': '50.69',
  'Internet Explorer': '21.15',
  Firefox: '16.69',
  Safari: '7.24',
  'Microsoft Edge': '2.7',
  Opera: '1.46',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Dec 24',
  'Google Chrome': '50.13',
  'Internet Explorer': '20.14',
  Firefox: '16.68',
  Safari: '8',
  'Microsoft Edge': '3.1',
  Opera: '1.85',
  Mozilla: '0.08',
  'Other/Unknown': '0.02'
}, {
  date: '2015 Dec 25',
  'Google Chrome': '50.55',
  'Internet Explorer': '17.4',
  Firefox: '16.92',
  Safari: '9.19',
  'Microsoft Edge': '3.73',
  Opera: '2.1',
  Mozilla: '0.09',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Dec 26',
  'Google Chrome': '50.12',
  'Internet Explorer': '17.8',
  Firefox: '16.92',
  Safari: '9.44',
  'Microsoft Edge': '3.72',
  Opera: '1.9',
  Mozilla: '0.09',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 27',
  'Google Chrome': '50.68',
  'Internet Explorer': '17.25',
  Firefox: '16.89',
  Safari: '9.55',
  'Microsoft Edge': '3.73',
  Opera: '1.81',
  Mozilla: '0.09',
  'Other/Unknown': '0'
}, {
  date: '2015 Dec 28',
  'Google Chrome': '49.89',
  'Internet Explorer': '21.09',
  Firefox: '16.22',
  Safari: '8.13',
  'Microsoft Edge': '3.21',
  Opera: '1.39',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Dec 29',
  'Google Chrome': '50.27',
  'Internet Explorer': '20.86',
  Firefox: '16.25',
  Safari: '7.95',
  'Microsoft Edge': '3.22',
  Opera: '1.37',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Dec 30',
  'Google Chrome': '49.85',
  'Internet Explorer': '21.28',
  Firefox: '16.26',
  Safari: '7.87',
  'Microsoft Edge': '3.29',
  Opera: '1.37',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2015 Dec 31',
  'Google Chrome': '49.4',
  'Internet Explorer': '20.41',
  Firefox: '16.43',
  Safari: '8.52',
  'Microsoft Edge': '3.57',
  Opera: '1.59',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Jan 1',
  'Google Chrome': '50.07',
  'Internet Explorer': '16.61',
  Firefox: '17.36',
  Safari: '10.09',
  'Microsoft Edge': '4.01',
  Opera: '1.76',
  Mozilla: '0.09',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Jan 2',
  'Google Chrome': '50.72',
  'Internet Explorer': '16.66',
  Firefox: '17.22',
  Safari: '9.67',
  'Microsoft Edge': '3.91',
  Opera: '1.74',
  Mozilla: '0.08',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 3',
  'Google Chrome': '51.23',
  'Internet Explorer': '16.46',
  Firefox: '16.95',
  Safari: '9.87',
  'Microsoft Edge': '3.75',
  Opera: '1.67',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 4',
  'Google Chrome': '51.26',
  'Internet Explorer': '20.36',
  Firefox: '16.35',
  Safari: '7.84',
  'Microsoft Edge': '2.85',
  Opera: '1.29',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 5',
  'Google Chrome': '51.32',
  'Internet Explorer': '20.21',
  Firefox: '16.35',
  Safari: '7.89',
  'Microsoft Edge': '2.79',
  Opera: '1.36',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 6',
  'Google Chrome': '51.81',
  'Internet Explorer': '19.86',
  Firefox: '16.2',
  Safari: '7.93',
  'Microsoft Edge': '2.76',
  Opera: '1.38',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 7',
  'Google Chrome': '51.85',
  'Internet Explorer': '19.82',
  Firefox: '16.31',
  Safari: '7.81',
  'Microsoft Edge': '2.76',
  Opera: '1.4',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 8',
  'Google Chrome': '50.99',
  'Internet Explorer': '20.36',
  Firefox: '16.55',
  Safari: '7.64',
  'Microsoft Edge': '2.9',
  Opera: '1.49',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Jan 9',
  'Google Chrome': '51.5',
  'Internet Explorer': '16.58',
  Firefox: '17.03',
  Safari: '9.38',
  'Microsoft Edge': '3.57',
  Opera: '1.86',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Jan 10',
  'Google Chrome': '51.88',
  'Internet Explorer': '15.91',
  Firefox: '17',
  Safari: '9.79',
  'Microsoft Edge': '3.52',
  Opera: '1.81',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Jan 11',
  'Google Chrome': '51.91',
  'Internet Explorer': '19.73',
  Firefox: '16.3',
  Safari: '7.93',
  'Microsoft Edge': '2.72',
  Opera: '1.37',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 12',
  'Google Chrome': '51.99',
  'Internet Explorer': '19.63',
  Firefox: '16.35',
  Safari: '7.84',
  'Microsoft Edge': '2.74',
  Opera: '1.39',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Jan 13',
  'Google Chrome': '52.31',
  'Internet Explorer': '19.26',
  Firefox: '16.25',
  Safari: '7.95',
  'Microsoft Edge': '2.85',
  Opera: '1.33',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 14',
  'Google Chrome': '52.07',
  'Internet Explorer': '19.64',
  Firefox: '16.1',
  Safari: '7.95',
  'Microsoft Edge': '2.87',
  Opera: '1.32',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 15',
  'Google Chrome': '52.21',
  'Internet Explorer': '18.83',
  Firefox: '16.42',
  Safari: '7.98',
  'Microsoft Edge': '3.04',
  Opera: '1.46',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Jan 16',
  'Google Chrome': '52.65',
  'Internet Explorer': '15.51',
  Firefox: '16.86',
  Safari: '9.5',
  'Microsoft Edge': '3.66',
  Opera: '1.75',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 17',
  'Google Chrome': '52.48',
  'Internet Explorer': '15.69',
  Firefox: '16.61',
  Safari: '9.84',
  'Microsoft Edge': '3.66',
  Opera: '1.66',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 18',
  'Google Chrome': '52.07',
  'Internet Explorer': '18.91',
  Firefox: '16.31',
  Safari: '8.36',
  'Microsoft Edge': '3',
  Opera: '1.3',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 19',
  'Google Chrome': '52.51',
  'Internet Explorer': '19.48',
  Firefox: '16.08',
  Safari: '7.91',
  'Microsoft Edge': '2.72',
  Opera: '1.25',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 20',
  'Google Chrome': '52.82',
  'Internet Explorer': '19.01',
  Firefox: '16.14',
  Safari: '7.97',
  'Microsoft Edge': '2.76',
  Opera: '1.25',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Jan 21',
  'Google Chrome': '52.76',
  'Internet Explorer': '19.26',
  Firefox: '16.12',
  Safari: '7.79',
  'Microsoft Edge': '2.74',
  Opera: '1.3',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 22',
  'Google Chrome': '52.56',
  'Internet Explorer': '18.8',
  Firefox: '16.33',
  Safari: '7.9',
  'Microsoft Edge': '2.95',
  Opera: '1.4',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 23',
  'Google Chrome': '52.38',
  'Internet Explorer': '15.76',
  Firefox: '16.79',
  Safari: '9.5',
  'Microsoft Edge': '3.78',
  Opera: '1.72',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 24',
  'Google Chrome': '53.12',
  'Internet Explorer': '15.22',
  Firefox: '16.55',
  Safari: '9.83',
  'Microsoft Edge': '3.57',
  Opera: '1.65',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 25',
  'Google Chrome': '52.55',
  'Internet Explorer': '19.12',
  Firefox: '16.15',
  Safari: '7.94',
  'Microsoft Edge': '2.89',
  Opera: '1.32',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 26',
  'Google Chrome': '52.45',
  'Internet Explorer': '19.49',
  Firefox: '16.03',
  Safari: '7.83',
  'Microsoft Edge': '2.87',
  Opera: '1.28',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 27',
  'Google Chrome': '52.64',
  'Internet Explorer': '19.42',
  Firefox: '16.06',
  Safari: '7.7',
  'Microsoft Edge': '2.84',
  Opera: '1.29',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 28',
  'Google Chrome': '51.95',
  'Internet Explorer': '19.87',
  Firefox: '16.15',
  Safari: '7.77',
  'Microsoft Edge': '2.92',
  Opera: '1.32',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 29',
  'Google Chrome': '51.03',
  'Internet Explorer': '20',
  Firefox: '16.6',
  Safari: '7.85',
  'Microsoft Edge': '3.07',
  Opera: '1.4',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Jan 30',
  'Google Chrome': '50.97',
  'Internet Explorer': '16.86',
  Firefox: '17.28',
  Safari: '9.36',
  'Microsoft Edge': '3.71',
  Opera: '1.76',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Jan 31',
  'Google Chrome': '52.36',
  'Internet Explorer': '15.75',
  Firefox: '16.71',
  Safari: '9.85',
  'Microsoft Edge': '3.63',
  Opera: '1.63',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 1',
  'Google Chrome': '52.62',
  'Internet Explorer': '19.09',
  Firefox: '16.1',
  Safari: '7.98',
  'Microsoft Edge': '2.88',
  Opera: '1.28',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 2',
  'Google Chrome': '52.48',
  'Internet Explorer': '19.25',
  Firefox: '16.25',
  Safari: '7.83',
  'Microsoft Edge': '2.85',
  Opera: '1.29',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 3',
  'Google Chrome': '52.47',
  'Internet Explorer': '19.16',
  Firefox: '16.16',
  Safari: '7.94',
  'Microsoft Edge': '2.91',
  Opera: '1.31',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 4',
  'Google Chrome': '51.91',
  'Internet Explorer': '19.77',
  Firefox: '16.12',
  Safari: '7.83',
  'Microsoft Edge': '3',
  Opera: '1.31',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 5',
  'Google Chrome': '51.76',
  'Internet Explorer': '19.36',
  Firefox: '16.44',
  Safari: '7.78',
  'Microsoft Edge': '3.15',
  Opera: '1.44',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 6',
  'Google Chrome': '52.11',
  'Internet Explorer': '15.66',
  Firefox: '16.99',
  Safari: '9.43',
  'Microsoft Edge': '3.96',
  Opera: '1.78',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 7',
  'Google Chrome': '52.41',
  'Internet Explorer': '15.14',
  Firefox: '17.12',
  Safari: '9.69',
  'Microsoft Edge': '3.81',
  Opera: '1.77',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 8',
  'Google Chrome': '51.83',
  'Internet Explorer': '19.4',
  Firefox: '15.93',
  Safari: '8.38',
  'Microsoft Edge': '3.13',
  Opera: '1.27',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 9',
  'Google Chrome': '52.01',
  'Internet Explorer': '19.2',
  Firefox: '16.01',
  Safari: '8.25',
  'Microsoft Edge': '3.09',
  Opera: '1.37',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 10',
  'Google Chrome': '52.92',
  'Internet Explorer': '18.52',
  Firefox: '15.94',
  Safari: '8.23',
  'Microsoft Edge': '2.93',
  Opera: '1.41',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 11',
  'Google Chrome': '52.71',
  'Internet Explorer': '18.9',
  Firefox: '16.17',
  Safari: '7.94',
  'Microsoft Edge': '2.88',
  Opera: '1.35',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 12',
  'Google Chrome': '52.37',
  'Internet Explorer': '18.63',
  Firefox: '16.65',
  Safari: '7.84',
  'Microsoft Edge': '3.01',
  Opera: '1.45',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 13',
  'Google Chrome': '52.73',
  'Internet Explorer': '14.69',
  Firefox: '17.33',
  Safari: '9.38',
  'Microsoft Edge': '3.92',
  Opera: '1.87',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 14',
  'Google Chrome': '52.73',
  'Internet Explorer': '14.91',
  Firefox: '17.06',
  Safari: '9.67',
  'Microsoft Edge': '3.85',
  Opera: '1.71',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 15',
  'Google Chrome': '52.68',
  'Internet Explorer': '17.65',
  Firefox: '16.58',
  Safari: '8.54',
  'Microsoft Edge': '3.2',
  Opera: '1.31',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 16',
  'Google Chrome': '53.18',
  'Internet Explorer': '18.24',
  Firefox: '16.32',
  Safari: '7.98',
  'Microsoft Edge': '2.93',
  Opera: '1.3',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 17',
  'Google Chrome': '52.8',
  'Internet Explorer': '18.68',
  Firefox: '16.37',
  Safari: '7.83',
  'Microsoft Edge': '2.97',
  Opera: '1.3',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 18',
  'Google Chrome': '52.85',
  'Internet Explorer': '18.74',
  Firefox: '16.32',
  Safari: '7.74',
  'Microsoft Edge': '2.93',
  Opera: '1.37',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 19',
  'Google Chrome': '52.5',
  'Internet Explorer': '18.49',
  Firefox: '16.7',
  Safari: '7.75',
  'Microsoft Edge': '3.08',
  Opera: '1.43',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 20',
  'Google Chrome': '52.15',
  'Internet Explorer': '15.14',
  Firefox: '17.4',
  Safari: '9.45',
  'Microsoft Edge': '3.89',
  Opera: '1.9',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 21',
  'Google Chrome': '52.1',
  'Internet Explorer': '14.95',
  Firefox: '17.14',
  Safari: '10.17',
  'Microsoft Edge': '3.9',
  Opera: '1.66',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 22',
  'Google Chrome': '52.35',
  'Internet Explorer': '18.91',
  Firefox: '16.41',
  Safari: '8.05',
  'Microsoft Edge': '2.97',
  Opera: '1.25',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 23',
  'Google Chrome': '52',
  'Internet Explorer': '19.19',
  Firefox: '16.48',
  Safari: '8.07',
  'Microsoft Edge': '2.97',
  Opera: '1.25',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 24',
  'Google Chrome': '52.27',
  'Internet Explorer': '18.8',
  Firefox: '16.71',
  Safari: '7.93',
  'Microsoft Edge': '2.96',
  Opera: '1.28',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 25',
  'Google Chrome': '52.2',
  'Internet Explorer': '18.84',
  Firefox: '16.71',
  Safari: '7.91',
  'Microsoft Edge': '2.98',
  Opera: '1.31',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 26',
  'Google Chrome': '52.28',
  'Internet Explorer': '18.37',
  Firefox: '16.95',
  Safari: '7.86',
  'Microsoft Edge': '3.09',
  Opera: '1.39',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 27',
  'Google Chrome': '52.63',
  'Internet Explorer': '14.89',
  Firefox: '17.29',
  Safari: '9.44',
  'Microsoft Edge': '3.9',
  Opera: '1.77',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Feb 28',
  'Google Chrome': '52.74',
  'Internet Explorer': '14.98',
  Firefox: '16.83',
  Safari: '9.89',
  'Microsoft Edge': '3.85',
  Opera: '1.64',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Feb 29',
  'Google Chrome': '53.2',
  'Internet Explorer': '18.53',
  Firefox: '16.18',
  Safari: '7.88',
  'Microsoft Edge': '3',
  Opera: '1.17',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 1',
  'Google Chrome': '53.27',
  'Internet Explorer': '18.36',
  Firefox: '16.23',
  Safari: '7.99',
  'Microsoft Edge': '2.92',
  Opera: '1.18',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 2',
  'Google Chrome': '53.37',
  'Internet Explorer': '18.14',
  Firefox: '16.21',
  Safari: '8.14',
  'Microsoft Edge': '2.89',
  Opera: '1.19',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 3',
  'Google Chrome': '53.03',
  'Internet Explorer': '18.51',
  Firefox: '16.26',
  Safari: '7.98',
  'Microsoft Edge': '2.97',
  Opera: '1.22',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 4',
  'Google Chrome': '52.47',
  'Internet Explorer': '18.63',
  Firefox: '16.48',
  Safari: '7.92',
  'Microsoft Edge': '3.13',
  Opera: '1.32',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 5',
  'Google Chrome': '52.43',
  'Internet Explorer': '14.9',
  Firefox: '17.03',
  Safari: '9.82',
  'Microsoft Edge': '4.04',
  Opera: '1.72',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Mar 6',
  'Google Chrome': '52.86',
  'Internet Explorer': '14.56',
  Firefox: '16.85',
  Safari: '10.1',
  'Microsoft Edge': '3.95',
  Opera: '1.63',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 7',
  'Google Chrome': '52.59',
  'Internet Explorer': '18.9',
  Firefox: '16.25',
  Safari: '7.99',
  'Microsoft Edge': '3.01',
  Opera: '1.22',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 8',
  'Google Chrome': '52.75',
  'Internet Explorer': '18.59',
  Firefox: '16.36',
  Safari: '7.99',
  'Microsoft Edge': '3.01',
  Opera: '1.24',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 9',
  'Google Chrome': '53.16',
  'Internet Explorer': '18.21',
  Firefox: '16.39',
  Safari: '7.89',
  'Microsoft Edge': '3.05',
  Opera: '1.26',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 10',
  'Google Chrome': '52.99',
  'Internet Explorer': '18.49',
  Firefox: '16.45',
  Safari: '7.7',
  'Microsoft Edge': '3.04',
  Opera: '1.28',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 11',
  'Google Chrome': '52.42',
  'Internet Explorer': '18.46',
  Firefox: '16.68',
  Safari: '7.81',
  'Microsoft Edge': '3.22',
  Opera: '1.36',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 12',
  'Google Chrome': '51.86',
  'Internet Explorer': '15.55',
  Firefox: '17.13',
  Safari: '9.46',
  'Microsoft Edge': '4.16',
  Opera: '1.78',
  Mozilla: '0.06',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Mar 13',
  'Google Chrome': '51.95',
  'Internet Explorer': '15.09',
  Firefox: '17.03',
  Safari: '10.04',
  'Microsoft Edge': '4.17',
  Opera: '1.66',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 14',
  'Google Chrome': '51.94',
  'Internet Explorer': '19.4',
  Firefox: '16.23',
  Safari: '8.01',
  'Microsoft Edge': '3.16',
  Opera: '1.21',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 15',
  'Google Chrome': '52.49',
  'Internet Explorer': '18.73',
  Firefox: '16.42',
  Safari: '7.96',
  'Microsoft Edge': '3.11',
  Opera: '1.23',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Mar 16',
  'Google Chrome': '52.41',
  'Internet Explorer': '18.66',
  Firefox: '16.61',
  Safari: '7.85',
  'Microsoft Edge': '3.17',
  Opera: '1.26',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 17',
  'Google Chrome': '52.26',
  'Internet Explorer': '19.15',
  Firefox: '16.53',
  Safari: '7.58',
  'Microsoft Edge': '3.15',
  Opera: '1.29',
  Mozilla: '0.04',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Mar 18',
  'Google Chrome': '51.98',
  'Internet Explorer': '18.86',
  Firefox: '16.76',
  Safari: '7.69',
  'Microsoft Edge': '3.3',
  Opera: '1.37',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 19',
  'Google Chrome': '51.89',
  'Internet Explorer': '15.61',
  Firefox: '17',
  Safari: '9.39',
  'Microsoft Edge': '4.21',
  Opera: '1.79',
  Mozilla: '0.11',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Mar 20',
  'Google Chrome': '51.86',
  'Internet Explorer': '15.29',
  Firefox: '16.87',
  Safari: '9.91',
  'Microsoft Edge': '4.27',
  Opera: '1.71',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Mar 21',
  'Google Chrome': '52.74',
  'Internet Explorer': '18.37',
  Firefox: '16.28',
  Safari: '7.99',
  'Microsoft Edge': '3.22',
  Opera: '1.35',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 22',
  'Google Chrome': '52.93',
  'Internet Explorer': '18.46',
  Firefox: '16.22',
  Safari: '7.76',
  'Microsoft Edge': '3.12',
  Opera: '1.45',
  Mozilla: '0.05',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Mar 23',
  'Google Chrome': '52.65',
  'Internet Explorer': '18.47',
  Firefox: '16.28',
  Safari: '7.76',
  'Microsoft Edge': '3.22',
  Opera: '1.58',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 24',
  'Google Chrome': '52.53',
  'Internet Explorer': '18.25',
  Firefox: '16.21',
  Safari: '8.03',
  'Microsoft Edge': '3.36',
  Opera: '1.58',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 25',
  'Google Chrome': '52.15',
  'Internet Explorer': '16.95',
  Firefox: '16.75',
  Safari: '8.7',
  'Microsoft Edge': '3.76',
  Opera: '1.64',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 26',
  'Google Chrome': '52.24',
  'Internet Explorer': '15.04',
  Firefox: '17.07',
  Safari: '9.52',
  'Microsoft Edge': '4.23',
  Opera: '1.85',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 27',
  'Google Chrome': '52.56',
  'Internet Explorer': '14.27',
  Firefox: '16.98',
  Safari: '10.11',
  'Microsoft Edge': '4.26',
  Opera: '1.78',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 28',
  'Google Chrome': '53.31',
  'Internet Explorer': '17.05',
  Firefox: '16.2',
  Safari: '8.49',
  'Microsoft Edge': '3.48',
  Opera: '1.43',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 29',
  'Google Chrome': '52.98',
  'Internet Explorer': '17.82',
  Firefox: '16.37',
  Safari: '8.09',
  'Microsoft Edge': '3.23',
  Opera: '1.48',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 30',
  'Google Chrome': '53.07',
  'Internet Explorer': '17.84',
  Firefox: '16.37',
  Safari: '7.96',
  'Microsoft Edge': '3.27',
  Opera: '1.45',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Mar 31',
  'Google Chrome': '53.4',
  'Internet Explorer': '17.73',
  Firefox: '16.24',
  Safari: '7.84',
  'Microsoft Edge': '3.3',
  Opera: '1.43',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 1',
  'Google Chrome': '52.72',
  'Internet Explorer': '18.26',
  Firefox: '16.4',
  Safari: '7.72',
  'Microsoft Edge': '3.4',
  Opera: '1.47',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 2',
  'Google Chrome': '52.99',
  'Internet Explorer': '14.44',
  Firefox: '16.96',
  Safari: '9.33',
  'Microsoft Edge': '4.35',
  Opera: '1.87',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 3',
  'Google Chrome': '53.29',
  'Internet Explorer': '14.13',
  Firefox: '16.7',
  Safari: '9.8',
  'Microsoft Edge': '4.2',
  Opera: '1.82',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 4',
  'Google Chrome': '53.65',
  'Internet Explorer': '17.74',
  Firefox: '16.06',
  Safari: '7.79',
  'Microsoft Edge': '3.22',
  Opera: '1.5',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 5',
  'Google Chrome': '53.21',
  'Internet Explorer': '18.25',
  Firefox: '16.05',
  Safari: '7.71',
  'Microsoft Edge': '3.21',
  Opera: '1.54',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 6',
  'Google Chrome': '53.29',
  'Internet Explorer': '18.24',
  Firefox: '16.02',
  Safari: '7.52',
  'Microsoft Edge': '3.28',
  Opera: '1.6',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 7',
  'Google Chrome': '52.77',
  'Internet Explorer': '18.33',
  Firefox: '16.26',
  Safari: '7.56',
  'Microsoft Edge': '3.35',
  Opera: '1.69',
  Mozilla: '0.03',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 8',
  'Google Chrome': '52.41',
  'Internet Explorer': '18.15',
  Firefox: '16.82',
  Safari: '7.65',
  'Microsoft Edge': '3.5',
  Opera: '1.42',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 9',
  'Google Chrome': '52.03',
  'Internet Explorer': '15.11',
  Firefox: '17.19',
  Safari: '9.37',
  'Microsoft Edge': '4.48',
  Opera: '1.77',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 10',
  'Google Chrome': '52.62',
  'Internet Explorer': '14.85',
  Firefox: '16.78',
  Safari: '9.63',
  'Microsoft Edge': '4.42',
  Opera: '1.66',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 11',
  'Google Chrome': '52.54',
  'Internet Explorer': '18.79',
  Firefox: '16.17',
  Safari: '7.73',
  'Microsoft Edge': '3.37',
  Opera: '1.34',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 12',
  'Google Chrome': '53.2',
  'Internet Explorer': '18.04',
  Firefox: '16.1',
  Safari: '7.61',
  'Microsoft Edge': '3.34',
  Opera: '1.65',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 13',
  'Google Chrome': '53.01',
  'Internet Explorer': '17.89',
  Firefox: '16.22',
  Safari: '7.67',
  'Microsoft Edge': '3.39',
  Opera: '1.72',
  Mozilla: '0.1',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 14',
  'Google Chrome': '53.2',
  'Internet Explorer': '18.06',
  Firefox: '16.08',
  Safari: '7.53',
  'Microsoft Edge': '3.3',
  Opera: '1.68',
  Mozilla: '0.15',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 15',
  'Google Chrome': '52.96',
  'Internet Explorer': '17.82',
  Firefox: '16.32',
  Safari: '7.52',
  'Microsoft Edge': '3.46',
  Opera: '1.81',
  Mozilla: '0.12',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 16',
  'Google Chrome': '52.52',
  'Internet Explorer': '14.52',
  Firefox: '17.23',
  Safari: '9.32',
  'Microsoft Edge': '4.47',
  Opera: '1.81',
  Mozilla: '0.13',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 17',
  'Google Chrome': '52.71',
  'Internet Explorer': '14.25',
  Firefox: '16.94',
  Safari: '9.9',
  'Microsoft Edge': '4.4',
  Opera: '1.7',
  Mozilla: '0.09',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 18',
  'Google Chrome': '53.22',
  'Internet Explorer': '17.85',
  Firefox: '16.08',
  Safari: '7.79',
  'Microsoft Edge': '3.33',
  Opera: '1.66',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 19',
  'Google Chrome': '53.51',
  'Internet Explorer': '17.76',
  Firefox: '16.19',
  Safari: '7.77',
  'Microsoft Edge': '3.27',
  Opera: '1.43',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 20',
  'Google Chrome': '53.62',
  'Internet Explorer': '17.44',
  Firefox: '16.12',
  Safari: '7.81',
  'Microsoft Edge': '3.36',
  Opera: '1.57',
  Mozilla: '0.08',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 21',
  'Google Chrome': '53.4',
  'Internet Explorer': '17.94',
  Firefox: '15.94',
  Safari: '7.59',
  'Microsoft Edge': '3.47',
  Opera: '1.6',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 22',
  'Google Chrome': '52.62',
  'Internet Explorer': '18.57',
  Firefox: '16.13',
  Safari: '7.55',
  'Microsoft Edge': '3.61',
  Opera: '1.46',
  Mozilla: '0.08',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 23',
  'Google Chrome': '52.42',
  'Internet Explorer': '14.46',
  Firefox: '17.12',
  Safari: '9.44',
  'Microsoft Edge': '4.72',
  Opera: '1.75',
  Mozilla: '0.09',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 24',
  'Google Chrome': '53.43',
  'Internet Explorer': '13.62',
  Firefox: '16.79',
  Safari: '9.84',
  'Microsoft Edge': '4.59',
  Opera: '1.66',
  Mozilla: '0.07',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Apr 25',
  'Google Chrome': '53.48',
  'Internet Explorer': '17.72',
  Firefox: '15.98',
  Safari: '7.79',
  'Microsoft Edge': '3.46',
  Opera: '1.5',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 26',
  'Google Chrome': '53.5',
  'Internet Explorer': '17.81',
  Firefox: '16.13',
  Safari: '7.73',
  'Microsoft Edge': '3.4',
  Opera: '1.36',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 27',
  'Google Chrome': '53.68',
  'Internet Explorer': '17.4',
  Firefox: '16.39',
  Safari: '7.76',
  'Microsoft Edge': '3.45',
  Opera: '1.24',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 28',
  'Google Chrome': '53.08',
  'Internet Explorer': '18.16',
  Firefox: '16.31',
  Safari: '7.68',
  'Microsoft Edge': '3.49',
  Opera: '1.21',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Apr 29',
  'Google Chrome': '53.09',
  'Internet Explorer': '17.74',
  Firefox: '16.65',
  Safari: '7.59',
  'Microsoft Edge': '3.56',
  Opera: '1.28',
  Mozilla: '0.09',
  'Other/Unknown': '0'
}, {
  date: '2016 Apr 30',
  'Google Chrome': '53.1',
  'Internet Explorer': '14.09',
  Firefox: '16.82',
  Safari: '9.4',
  'Microsoft Edge': '4.86',
  Opera: '1.65',
  Mozilla: '0.1',
  'Other/Unknown': '0'
}, {
  date: '2016 May 1',
  'Google Chrome': '52.76',
  'Internet Explorer': '13.89',
  Firefox: '16.72',
  Safari: '10.07',
  'Microsoft Edge': '4.88',
  Opera: '1.58',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2016 May 2',
  'Google Chrome': '53.44',
  'Internet Explorer': '17.2',
  Firefox: '16.17',
  Safari: '8.2',
  'Microsoft Edge': '3.67',
  Opera: '1.21',
  Mozilla: '0.1',
  'Other/Unknown': '0'
}, {
  date: '2016 May 3',
  'Google Chrome': '52.97',
  'Internet Explorer': '17.96',
  Firefox: '16.21',
  Safari: '7.85',
  'Microsoft Edge': '3.52',
  Opera: '1.41',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 May 4',
  'Google Chrome': '53.55',
  'Internet Explorer': '17.62',
  Firefox: '16.01',
  Safari: '7.62',
  'Microsoft Edge': '3.57',
  Opera: '1.54',
  Mozilla: '0.08',
  'Other/Unknown': '0'
}, {
  date: '2016 May 5',
  'Google Chrome': '53.76',
  'Internet Explorer': '17.45',
  Firefox: '15.92',
  Safari: '7.6',
  'Microsoft Edge': '3.63',
  Opera: '1.57',
  Mozilla: '0.08',
  'Other/Unknown': '0'
}, {
  date: '2016 May 6',
  'Google Chrome': '52.97',
  'Internet Explorer': '17.61',
  Firefox: '16.28',
  Safari: '7.72',
  'Microsoft Edge': '3.78',
  Opera: '1.55',
  Mozilla: '0.09',
  'Other/Unknown': '0'
}, {
  date: '2016 May 7',
  'Google Chrome': '51.82',
  'Internet Explorer': '14.56',
  Firefox: '17.28',
  Safari: '9.66',
  'Microsoft Edge': '4.86',
  Opera: '1.72',
  Mozilla: '0.1',
  'Other/Unknown': '0'
}, {
  date: '2016 May 8',
  'Google Chrome': '52.46',
  'Internet Explorer': '14.09',
  Firefox: '17.17',
  Safari: '9.79',
  'Microsoft Edge': '4.69',
  Opera: '1.71',
  Mozilla: '0.09',
  'Other/Unknown': '0'
}, {
  date: '2016 May 9',
  'Google Chrome': '53.05',
  'Internet Explorer': '18.2',
  Firefox: '16.1',
  Safari: '7.92',
  'Microsoft Edge': '3.58',
  Opera: '1.08',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 May 10',
  'Google Chrome': '52.83',
  'Internet Explorer': '18.34',
  Firefox: '16.14',
  Safari: '7.77',
  'Microsoft Edge': '3.62',
  Opera: '1.24',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 May 11',
  'Google Chrome': '53.18',
  'Internet Explorer': '17.93',
  Firefox: '16.28',
  Safari: '7.67',
  'Microsoft Edge': '3.6',
  Opera: '1.26',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 May 12',
  'Google Chrome': '52.5',
  'Internet Explorer': '18.46',
  Firefox: '16.41',
  Safari: '7.53',
  'Microsoft Edge': '3.63',
  Opera: '1.4',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 May 13',
  'Google Chrome': '51.81',
  'Internet Explorer': '18.58',
  Firefox: '16.66',
  Safari: '7.6',
  'Microsoft Edge': '3.77',
  Opera: '1.48',
  Mozilla: '0.09',
  'Other/Unknown': '0'
}, {
  date: '2016 May 14',
  'Google Chrome': '50.29',
  'Internet Explorer': '15.33',
  Firefox: '17.99',
  Safari: '9.42',
  'Microsoft Edge': '4.96',
  Opera: '1.91',
  Mozilla: '0.1',
  'Other/Unknown': '0'
}, {
  date: '2016 May 15',
  'Google Chrome': '51.36',
  'Internet Explorer': '14.55',
  Firefox: '17.56',
  Safari: '9.66',
  'Microsoft Edge': '4.91',
  Opera: '1.87',
  Mozilla: '0.08',
  'Other/Unknown': '0'
}, {
  date: '2016 May 16',
  'Google Chrome': '52.3',
  'Internet Explorer': '18.24',
  Firefox: '16.41',
  Safari: '7.76',
  'Microsoft Edge': '3.73',
  Opera: '1.49',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 May 17',
  'Google Chrome': '52.05',
  'Internet Explorer': '18.88',
  Firefox: '16.42',
  Safari: '7.64',
  'Microsoft Edge': '3.57',
  Opera: '1.37',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 May 18',
  'Google Chrome': '51.99',
  'Internet Explorer': '18.87',
  Firefox: '16.43',
  Safari: '7.76',
  'Microsoft Edge': '3.64',
  Opera: '1.24',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 May 19',
  'Google Chrome': '51.67',
  'Internet Explorer': '19.25',
  Firefox: '16.18',
  Safari: '7.96',
  'Microsoft Edge': '3.77',
  Opera: '1.1',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 May 20',
  'Google Chrome': '51.75',
  'Internet Explorer': '18.51',
  Firefox: '16.52',
  Safari: '7.88',
  'Microsoft Edge': '4.09',
  Opera: '1.19',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 May 21',
  'Google Chrome': '51.83',
  'Internet Explorer': '14.13',
  Firefox: '17.6',
  Safari: '9.54',
  'Microsoft Edge': '5.19',
  Opera: '1.62',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 May 22',
  'Google Chrome': '52.46',
  'Internet Explorer': '13.53',
  Firefox: '17.44',
  Safari: '9.82',
  'Microsoft Edge': '5.07',
  Opera: '1.61',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 May 23',
  'Google Chrome': '52.6',
  'Internet Explorer': '18.04',
  Firefox: '16.37',
  Safari: '7.69',
  'Microsoft Edge': '3.95',
  Opera: '1.3',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 May 24',
  'Google Chrome': '52.83',
  'Internet Explorer': '17.85',
  Firefox: '16.46',
  Safari: '7.58',
  'Microsoft Edge': '3.91',
  Opera: '1.32',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 May 25',
  'Google Chrome': '53.16',
  'Internet Explorer': '17.45',
  Firefox: '16.35',
  Safari: '7.6',
  'Microsoft Edge': '3.99',
  Opera: '1.39',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 May 26',
  'Google Chrome': '52.81',
  'Internet Explorer': '17.8',
  Firefox: '16.38',
  Safari: '7.67',
  'Microsoft Edge': '3.95',
  Opera: '1.33',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 May 27',
  'Google Chrome': '52.54',
  'Internet Explorer': '17.27',
  Firefox: '16.86',
  Safari: '7.73',
  'Microsoft Edge': '4.17',
  Opera: '1.35',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 May 28',
  'Google Chrome': '52.58',
  'Internet Explorer': '13.24',
  Firefox: '17.76',
  Safari: '9.27',
  'Microsoft Edge': '5.33',
  Opera: '1.74',
  Mozilla: '0.09',
  'Other/Unknown': '0'
}, {
  date: '2016 May 29',
  'Google Chrome': '52.85',
  'Internet Explorer': '12.95',
  Firefox: '17.78',
  Safari: '9.34',
  'Microsoft Edge': '5.29',
  Opera: '1.72',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 May 30',
  'Google Chrome': '52.89',
  'Internet Explorer': '14.39',
  Firefox: '17.67',
  Safari: '8.53',
  'Microsoft Edge': '4.86',
  Opera: '1.59',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 May 31',
  'Google Chrome': '53.61',
  'Internet Explorer': '17.15',
  Firefox: '16.08',
  Safari: '7.6',
  'Microsoft Edge': '4.13',
  Opera: '1.37',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 1',
  'Google Chrome': '53.58',
  'Internet Explorer': '16.65',
  Firefox: '16.01',
  Safari: '7.99',
  'Microsoft Edge': '4.29',
  Opera: '1.42',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 2',
  'Google Chrome': '52.76',
  'Internet Explorer': '17.4',
  Firefox: '16.35',
  Safari: '7.81',
  'Microsoft Edge': '4.29',
  Opera: '1.33',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 3',
  'Google Chrome': '52.44',
  'Internet Explorer': '16.96',
  Firefox: '16.52',
  Safari: '7.71',
  'Microsoft Edge': '4.6',
  Opera: '1.69',
  Mozilla: '0.08',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 4',
  'Google Chrome': '52.33',
  'Internet Explorer': '12.93',
  Firefox: '17.3',
  Safari: '9.52',
  'Microsoft Edge': '5.88',
  Opera: '1.96',
  Mozilla: '0.08',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 5',
  'Google Chrome': '52.38',
  'Internet Explorer': '12.56',
  Firefox: '17.42',
  Safari: '9.66',
  'Microsoft Edge': '5.76',
  Opera: '2.14',
  Mozilla: '0.08',
  'Other/Unknown': '0.01'
}, {
  date: '2016 Jun 6',
  'Google Chrome': '52.69',
  'Internet Explorer': '17.32',
  Firefox: '16.31',
  Safari: '7.43',
  'Microsoft Edge': '4.18',
  Opera: '2.01',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 7',
  'Google Chrome': '52.95',
  'Internet Explorer': '17.47',
  Firefox: '16.28',
  Safari: '7.65',
  'Microsoft Edge': '4.05',
  Opera: '1.55',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 8',
  'Google Chrome': '52.68',
  'Internet Explorer': '17.66',
  Firefox: '16.3',
  Safari: '7.6',
  'Microsoft Edge': '4.14',
  Opera: '1.56',
  Mozilla: '0.06',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 9',
  'Google Chrome': '52.3',
  'Internet Explorer': '18.02',
  Firefox: '16.25',
  Safari: '7.85',
  'Microsoft Edge': '4.14',
  Opera: '1.38',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 10',
  'Google Chrome': '52.22',
  'Internet Explorer': '17.36',
  Firefox: '16.46',
  Safari: '7.96',
  'Microsoft Edge': '4.44',
  Opera: '1.49',
  Mozilla: '0.07',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 11',
  'Google Chrome': '52.06',
  'Internet Explorer': '13.19',
  Firefox: '17.21',
  Safari: '9.98',
  'Microsoft Edge': '5.78',
  Opera: '1.69',
  Mozilla: '0.09',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 12',
  'Google Chrome': '52.09',
  'Internet Explorer': '12.75',
  Firefox: '16.89',
  Safari: '10.65',
  'Microsoft Edge': '5.96',
  Opera: '1.6',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 13',
  'Google Chrome': '53.18',
  'Internet Explorer': '16.87',
  Firefox: '16.21',
  Safari: '8.15',
  'Microsoft Edge': '4.39',
  Opera: '1.15',
  Mozilla: '0.05',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 14',
  'Google Chrome': '53.45',
  'Internet Explorer': '17.03',
  Firefox: '16.15',
  Safari: '7.8',
  'Microsoft Edge': '4.31',
  Opera: '1.21',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}, {
  date: '2016 Jun 15',
  'Google Chrome': '53.4',
  'Internet Explorer': '18.12',
  Firefox: '16.51',
  Safari: '6.69',
  'Microsoft Edge': '3.84',
  Opera: '1.4',
  Mozilla: '0.04',
  'Other/Unknown': '0'
}];

var groupDateValue = [{
  key: 'Group1',
  value: '37',
  date: '04/23/12'
}, {
  key: 'Group2',
  value: '12',
  date: '04/23/12'
}, {
  key: 'Group3',
  value: '46',
  date: '04/23/12'
}, {
  key: 'Group1',
  value: '32',
  date: '04/24/12'
}, {
  key: 'Group2',
  value: '19',
  date: '04/24/12'
}, {
  key: 'Group3',
  value: '42',
  date: '04/24/12'
}, {
  key: 'Group1',
  value: '45',
  date: '04/25/12'
}, {
  key: 'Group2',
  value: '16',
  date: '04/25/12'
}, {
  key: 'Group3',
  value: '44',
  date: '04/25/12'
}, {
  key: 'Group1',
  value: '24',
  date: '04/26/12'
}, {
  key: 'Group2',
  value: '52',
  date: '04/26/12'
}, {
  key: 'Group3',
  value: '64',
  date: '04/26/12'
}];

var cityTemperature = [{
  date: '20111001',
  'New York': '63.4',
  'San Francisco': '62.7',
  Austin: '72.2'
}, {
  date: '20111002',
  'New York': '58.0',
  'San Francisco': '59.9',
  Austin: '67.7'
}, {
  date: '20111003',
  'New York': '53.3',
  'San Francisco': '59.1',
  Austin: '69.4'
}, {
  date: '20111004',
  'New York': '55.7',
  'San Francisco': '58.8',
  Austin: '68.0'
}, {
  date: '20111005',
  'New York': '64.2',
  'San Francisco': '58.7',
  Austin: '72.4'
}, {
  date: '20111006',
  'New York': '58.8',
  'San Francisco': '57.0',
  Austin: '77.0'
}, {
  date: '20111007',
  'New York': '57.9',
  'San Francisco': '56.7',
  Austin: '82.3'
}, {
  date: '20111008',
  'New York': '61.8',
  'San Francisco': '56.8',
  Austin: '78.9'
}, {
  date: '20111009',
  'New York': '69.3',
  'San Francisco': '56.7',
  Austin: '68.8'
}, {
  date: '20111010',
  'New York': '71.2',
  'San Francisco': '60.1',
  Austin: '68.7'
}, {
  date: '20111011',
  'New York': '68.7',
  'San Francisco': '61.1',
  Austin: '70.3'
}, {
  date: '20111012',
  'New York': '61.8',
  'San Francisco': '61.5',
  Austin: '75.3'
}, {
  date: '20111013',
  'New York': '63.0',
  'San Francisco': '64.3',
  Austin: '76.6'
}, {
  date: '20111014',
  'New York': '66.9',
  'San Francisco': '67.1',
  Austin: '66.6'
}, {
  date: '20111015',
  'New York': '61.7',
  'San Francisco': '64.6',
  Austin: '68.0'
}, {
  date: '20111016',
  'New York': '61.8',
  'San Francisco': '61.6',
  Austin: '70.6'
}, {
  date: '20111017',
  'New York': '62.8',
  'San Francisco': '61.1',
  Austin: '71.1'
}, {
  date: '20111018',
  'New York': '60.8',
  'San Francisco': '59.2',
  Austin: '70.0'
}, {
  date: '20111019',
  'New York': '62.1',
  'San Francisco': '58.9',
  Austin: '61.6'
}, {
  date: '20111020',
  'New York': '65.1',
  'San Francisco': '57.2',
  Austin: '57.4'
}, {
  date: '20111021',
  'New York': '55.6',
  'San Francisco': '56.4',
  Austin: '64.3'
}, {
  date: '20111022',
  'New York': '54.4',
  'San Francisco': '60.7',
  Austin: '72.4'
}, {
  date: '20111023',
  'New York': '54.4',
  'San Francisco': '65.1',
  Austin: '72.4'
}, {
  date: '20111024',
  'New York': '54.8',
  'San Francisco': '60.9',
  Austin: '72.5'
}, {
  date: '20111025',
  'New York': '57.9',
  'San Francisco': '56.1',
  Austin: '72.7'
}, {
  date: '20111026',
  'New York': '54.6',
  'San Francisco': '54.6',
  Austin: '73.4'
}, {
  date: '20111027',
  'New York': '54.4',
  'San Francisco': '56.1',
  Austin: '70.7'
}, {
  date: '20111028',
  'New York': '42.5',
  'San Francisco': '58.1',
  Austin: '56.8'
}, {
  date: '20111029',
  'New York': '40.9',
  'San Francisco': '57.5',
  Austin: '51.0'
}, {
  date: '20111030',
  'New York': '38.6',
  'San Francisco': '57.7',
  Austin: '54.9'
}, {
  date: '20111031',
  'New York': '44.2',
  'San Francisco': '55.1',
  Austin: '58.8'
}, {
  date: '20111101',
  'New York': '49.6',
  'San Francisco': '57.9',
  Austin: '62.6'
}, {
  date: '20111102',
  'New York': '47.2',
  'San Francisco': '64.6',
  Austin: '71.0'
}, {
  date: '20111103',
  'New York': '50.1',
  'San Francisco': '56.2',
  Austin: '58.4'
}, {
  date: '20111104',
  'New York': '50.1',
  'San Francisco': '50.5',
  Austin: '45.1'
}, {
  date: '20111105',
  'New York': '43.5',
  'San Francisco': '51.3',
  Austin: '52.2'
}, {
  date: '20111106',
  'New York': '43.8',
  'San Francisco': '52.6',
  Austin: '73.0'
}, {
  date: '20111107',
  'New York': '48.9',
  'San Francisco': '51.4',
  Austin: '75.4'
}, {
  date: '20111108',
  'New York': '55.5',
  'San Francisco': '50.6',
  Austin: '72.1'
}, {
  date: '20111109',
  'New York': '53.7',
  'San Francisco': '54.6',
  Austin: '56.6'
}, {
  date: '20111110',
  'New York': '57.7',
  'San Francisco': '55.6',
  Austin: '55.4'
}, {
  date: '20111111',
  'New York': '48.5',
  'San Francisco': '53.9',
  Austin: '46.7'
}, {
  date: '20111112',
  'New York': '46.8',
  'San Francisco': '54.0',
  Austin: '62.0'
}, {
  date: '20111113',
  'New York': '51.1',
  'San Francisco': '53.8',
  Austin: '71.6'
}, {
  date: '20111114',
  'New York': '56.8',
  'San Francisco': '53.5',
  Austin: '75.5'
}, {
  date: '20111115',
  'New York': '59.7',
  'San Francisco': '53.4',
  Austin: '72.1'
}, {
  date: '20111116',
  'New York': '56.5',
  'San Francisco': '52.2',
  Austin: '65.7'
}, {
  date: '20111117',
  'New York': '49.6',
  'San Francisco': '52.7',
  Austin: '56.8'
}, {
  date: '20111118',
  'New York': '41.5',
  'San Francisco': '53.1',
  Austin: '49.9'
}, {
  date: '20111119',
  'New York': '44.3',
  'San Francisco': '49.0',
  Austin: '71.7'
}, {
  date: '20111120',
  'New York': '54.0',
  'San Francisco': '50.4',
  Austin: '77.7'
}, {
  date: '20111121',
  'New York': '54.1',
  'San Francisco': '51.1',
  Austin: '76.4'
}, {
  date: '20111122',
  'New York': '49.4',
  'San Francisco': '52.3',
  Austin: '68.8'
}, {
  date: '20111123',
  'New York': '50.0',
  'San Francisco': '54.6',
  Austin: '57.0'
}, {
  date: '20111124',
  'New York': '44.0',
  'San Francisco': '55.1',
  Austin: '55.5'
}, {
  date: '20111125',
  'New York': '50.3',
  'San Francisco': '51.5',
  Austin: '61.6'
}, {
  date: '20111126',
  'New York': '52.1',
  'San Francisco': '53.6',
  Austin: '64.1'
}, {
  date: '20111127',
  'New York': '49.6',
  'San Francisco': '52.3',
  Austin: '51.1'
}, {
  date: '20111128',
  'New York': '57.2',
  'San Francisco': '51.0',
  Austin: '43.0'
}, {
  date: '20111129',
  'New York': '59.1',
  'San Francisco': '49.5',
  Austin: '46.4'
}, {
  date: '20111130',
  'New York': '50.6',
  'San Francisco': '49.8',
  Austin: '48.0'
}, {
  date: '20111201',
  'New York': '44.3',
  'San Francisco': '60.4',
  Austin: '48.1'
}, {
  date: '20111202',
  'New York': '43.9',
  'San Francisco': '62.2',
  Austin: '60.6'
}, {
  date: '20111203',
  'New York': '42.1',
  'San Francisco': '58.3',
  Austin: '62.6'
}, {
  date: '20111204',
  'New York': '43.9',
  'San Francisco': '52.7',
  Austin: '57.1'
}, {
  date: '20111205',
  'New York': '50.2',
  'San Francisco': '51.5',
  Austin: '44.2'
}, {
  date: '20111206',
  'New York': '54.2',
  'San Francisco': '49.9',
  Austin: '37.4'
}, {
  date: '20111207',
  'New York': '54.6',
  'San Francisco': '48.6',
  Austin: '35.0'
}, {
  date: '20111208',
  'New York': '43.4',
  'San Francisco': '46.4',
  Austin: '37.0'
}, {
  date: '20111209',
  'New York': '42.2',
  'San Francisco': '49.8',
  Austin: '45.4'
}, {
  date: '20111210',
  'New York': '45.0',
  'San Francisco': '52.1',
  Austin: '50.7'
}, {
  date: '20111211',
  'New York': '33.8',
  'San Francisco': '48.8',
  Austin: '48.6'
}, {
  date: '20111212',
  'New York': '36.8',
  'San Francisco': '47.4',
  Austin: '52.2'
}, {
  date: '20111213',
  'New York': '38.6',
  'San Francisco': '47.2',
  Austin: '60.8'
}, {
  date: '20111214',
  'New York': '41.9',
  'San Francisco': '46.1',
  Austin: '70.0'
}, {
  date: '20111215',
  'New York': '49.6',
  'San Francisco': '48.8',
  Austin: '64.2'
}, {
  date: '20111216',
  'New York': '50.2',
  'San Francisco': '47.9',
  Austin: '50.9'
}, {
  date: '20111217',
  'New York': '40.6',
  'San Francisco': '49.8',
  Austin: '51.6'
}, {
  date: '20111218',
  'New York': '29.1',
  'San Francisco': '49.1',
  Austin: '55.2'
}, {
  date: '20111219',
  'New York': '33.7',
  'San Francisco': '48.3',
  Austin: '62.1'
}, {
  date: '20111220',
  'New York': '45.8',
  'San Francisco': '49.3',
  Austin: '56.3'
}, {
  date: '20111221',
  'New York': '47.4',
  'San Francisco': '48.4',
  Austin: '47.2'
}, {
  date: '20111222',
  'New York': '54.4',
  'San Francisco': '53.3',
  Austin: '52.3'
}, {
  date: '20111223',
  'New York': '47.8',
  'San Francisco': '47.5',
  Austin: '45.2'
}, {
  date: '20111224',
  'New York': '34.9',
  'San Francisco': '47.9',
  Austin: '43.6'
}, {
  date: '20111225',
  'New York': '35.9',
  'San Francisco': '48.9',
  Austin: '42.9'
}, {
  date: '20111226',
  'New York': '43.6',
  'San Francisco': '45.9',
  Austin: '48.2'
}, {
  date: '20111227',
  'New York': '42.9',
  'San Francisco': '47.2',
  Austin: '45.4'
}, {
  date: '20111228',
  'New York': '46.2',
  'San Francisco': '48.9',
  Austin: '44.2'
}, {
  date: '20111229',
  'New York': '30.8',
  'San Francisco': '50.9',
  Austin: '50.4'
}, {
  date: '20111230',
  'New York': '40.8',
  'San Francisco': '52.9',
  Austin: '52.4'
}, {
  date: '20111231',
  'New York': '49.8',
  'San Francisco': '50.1',
  Austin: '53.5'
}, {
  date: '20120101',
  'New York': '46.3',
  'San Francisco': '53.9',
  Austin: '55.9'
}, {
  date: '20120102',
  'New York': '43.2',
  'San Francisco': '53.1',
  Austin: '48.2'
}, {
  date: '20120103',
  'New York': '30.3',
  'San Francisco': '49.7',
  Austin: '41.0'
}, {
  date: '20120104',
  'New York': '19.2',
  'San Francisco': '52.7',
  Austin: '48.9'
}, {
  date: '20120105',
  'New York': '32.1',
  'San Francisco': '52.6',
  Austin: '54.8'
}, {
  date: '20120106',
  'New York': '41.2',
  'San Francisco': '49.0',
  Austin: '61.2'
}, {
  date: '20120107',
  'New York': '47.0',
  'San Francisco': '51.0',
  Austin: '59.7'
}, {
  date: '20120108',
  'New York': '46.0',
  'San Francisco': '56.8',
  Austin: '52.5'
}, {
  date: '20120109',
  'New York': '34.7',
  'San Francisco': '52.3',
  Austin: '54.0'
}, {
  date: '20120110',
  'New York': '39.4',
  'San Francisco': '51.6',
  Austin: '47.7'
}, {
  date: '20120111',
  'New York': '40.4',
  'San Francisco': '49.8',
  Austin: '49.2'
}, {
  date: '20120112',
  'New York': '45.4',
  'San Francisco': '51.9',
  Austin: '48.4'
}, {
  date: '20120113',
  'New York': '40.7',
  'San Francisco': '53.7',
  Austin: '40.2'
}, {
  date: '20120114',
  'New York': '30.4',
  'San Francisco': '52.9',
  Austin: '43.9'
}, {
  date: '20120115',
  'New York': '23.9',
  'San Francisco': '49.7',
  Austin: '45.2'
}, {
  date: '20120116',
  'New York': '22.6',
  'San Francisco': '45.3',
  Austin: '65.0'
}, {
  date: '20120117',
  'New York': '39.8',
  'San Francisco': '43.6',
  Austin: '68.2'
}, {
  date: '20120118',
  'New York': '43.2',
  'San Francisco': '45.0',
  Austin: '47.5'
}, {
  date: '20120119',
  'New York': '26.3',
  'San Francisco': '47.3',
  Austin: '57.1'
}, {
  date: '20120120',
  'New York': '32.8',
  'San Francisco': '51.4',
  Austin: '61.9'
}, {
  date: '20120121',
  'New York': '27.4',
  'San Francisco': '53.7',
  Austin: '54.6'
}, {
  date: '20120122',
  'New York': '25.0',
  'San Francisco': '48.3',
  Austin: '56.7'
}, {
  date: '20120123',
  'New York': '39.4',
  'San Francisco': '52.9',
  Austin: '54.4'
}, {
  date: '20120124',
  'New York': '48.7',
  'San Francisco': '49.1',
  Austin: '52.7'
}, {
  date: '20120125',
  'New York': '43.0',
  'San Francisco': '52.1',
  Austin: '61.8'
}, {
  date: '20120126',
  'New York': '37.1',
  'San Francisco': '53.6',
  Austin: '55.0'
}, {
  date: '20120127',
  'New York': '48.2',
  'San Francisco': '50.4',
  Austin: '50.7'
}, {
  date: '20120128',
  'New York': '43.7',
  'San Francisco': '50.3',
  Austin: '52.9'
}, {
  date: '20120129',
  'New York': '40.1',
  'San Francisco': '53.8',
  Austin: '44.4'
}, {
  date: '20120130',
  'New York': '38.0',
  'San Francisco': '51.9',
  Austin: '49.1'
}, {
  date: '20120131',
  'New York': '43.5',
  'San Francisco': '50.0',
  Austin: '62.8'
}, {
  date: '20120201',
  'New York': '50.4',
  'San Francisco': '50.0',
  Austin: '64.6'
}, {
  date: '20120202',
  'New York': '45.8',
  'San Francisco': '51.3',
  Austin: '61.1'
}, {
  date: '20120203',
  'New York': '37.5',
  'San Francisco': '51.5',
  Austin: '70.0'
}, {
  date: '20120204',
  'New York': '40.8',
  'San Francisco': '52.0',
  Austin: '61.3'
}, {
  date: '20120205',
  'New York': '36.5',
  'San Francisco': '53.8',
  Austin: '48.2'
}, {
  date: '20120206',
  'New York': '39.1',
  'San Francisco': '54.6',
  Austin: '44.2'
}, {
  date: '20120207',
  'New York': '43.2',
  'San Francisco': '54.3',
  Austin: '51.3'
}, {
  date: '20120208',
  'New York': '36.5',
  'San Francisco': '51.9',
  Austin: '49.2'
}, {
  date: '20120209',
  'New York': '36.5',
  'San Francisco': '53.8',
  Austin: '45.7'
}, {
  date: '20120210',
  'New York': '38.3',
  'San Francisco': '53.9',
  Austin: '54.1'
}, {
  date: '20120211',
  'New York': '36.9',
  'San Francisco': '52.3',
  Austin: '44.9'
}, {
  date: '20120212',
  'New York': '29.7',
  'San Francisco': '50.1',
  Austin: '36.5'
}, {
  date: '20120213',
  'New York': '33.1',
  'San Francisco': '49.5',
  Austin: '44.8'
}, {
  date: '20120214',
  'New York': '39.6',
  'San Francisco': '48.6',
  Austin: '52.3'
}, {
  date: '20120215',
  'New York': '42.3',
  'San Francisco': '49.9',
  Austin: '68.0'
}, {
  date: '20120216',
  'New York': '39.7',
  'San Francisco': '52.4',
  Austin: '54.6'
}, {
  date: '20120217',
  'New York': '46.0',
  'San Francisco': '49.9',
  Austin: '53.8'
}, {
  date: '20120218',
  'New York': '41.2',
  'San Francisco': '51.6',
  Austin: '56.2'
}, {
  date: '20120219',
  'New York': '39.8',
  'San Francisco': '47.8',
  Austin: '50.8'
}, {
  date: '20120220',
  'New York': '38.1',
  'San Francisco': '48.7',
  Austin: '53.0'
}, {
  date: '20120221',
  'New York': '37.1',
  'San Francisco': '49.7',
  Austin: '61.0'
}, {
  date: '20120222',
  'New York': '45.5',
  'San Francisco': '53.4',
  Austin: '68.8'
}, {
  date: '20120223',
  'New York': '50.6',
  'San Francisco': '54.1',
  Austin: '69.4'
}, {
  date: '20120224',
  'New York': '42.7',
  'San Francisco': '55.9',
  Austin: '59.3'
}, {
  date: '20120225',
  'New York': '42.6',
  'San Francisco': '51.7',
  Austin: '47.2'
}, {
  date: '20120226',
  'New York': '36.9',
  'San Francisco': '47.7',
  Austin: '47.7'
}, {
  date: '20120227',
  'New York': '40.9',
  'San Francisco': '45.4',
  Austin: '61.9'
}, {
  date: '20120228',
  'New York': '45.9',
  'San Francisco': '47.0',
  Austin: '67.2'
}, {
  date: '20120229',
  'New York': '40.7',
  'San Francisco': '49.8',
  Austin: '70.1'
}, {
  date: '20120301',
  'New York': '41.3',
  'San Francisco': '48.9',
  Austin: '62.1'
}, {
  date: '20120302',
  'New York': '36.8',
  'San Francisco': '48.1',
  Austin: '72.7'
}, {
  date: '20120303',
  'New York': '47.6',
  'San Francisco': '50.7',
  Austin: '59.0'
}, {
  date: '20120304',
  'New York': '44.2',
  'San Francisco': '55.0',
  Austin: '51.8'
}, {
  date: '20120305',
  'New York': '38.5',
  'San Francisco': '48.8',
  Austin: '55.0'
}, {
  date: '20120306',
  'New York': '32.9',
  'San Francisco': '48.4',
  Austin: '61.8'
}, {
  date: '20120307',
  'New York': '43.3',
  'San Francisco': '49.9',
  Austin: '67.1'
}, {
  date: '20120308',
  'New York': '51.2',
  'San Francisco': '49.2',
  Austin: '72.0'
}, {
  date: '20120309',
  'New York': '47.8',
  'San Francisco': '51.7',
  Austin: '46.4'
}, {
  date: '20120310',
  'New York': '37.2',
  'San Francisco': '49.3',
  Austin: '46.7'
}, {
  date: '20120311',
  'New York': '42.9',
  'San Francisco': '50.0',
  Austin: '56.9'
}, {
  date: '20120312',
  'New York': '48.8',
  'San Francisco': '48.6',
  Austin: '61.9'
}, {
  date: '20120313',
  'New York': '52.6',
  'San Francisco': '53.9',
  Austin: '68.8'
}, {
  date: '20120314',
  'New York': '60.5',
  'San Francisco': '55.2',
  Austin: '71.9'
}, {
  date: '20120315',
  'New York': '47.2',
  'San Francisco': '55.9',
  Austin: '72.0'
}, {
  date: '20120316',
  'New York': '44.7',
  'San Francisco': '54.6',
  Austin: '72.5'
}, {
  date: '20120317',
  'New York': '48.2',
  'San Francisco': '48.2',
  Austin: '71.7'
}, {
  date: '20120318',
  'New York': '48.2',
  'San Francisco': '47.1',
  Austin: '71.1'
}, {
  date: '20120319',
  'New York': '53.1',
  'San Francisco': '45.8',
  Austin: '73.0'
}, {
  date: '20120320',
  'New York': '57.8',
  'San Francisco': '49.7',
  Austin: '63.8'
}, {
  date: '20120321',
  'New York': '57.5',
  'San Francisco': '51.4',
  Austin: '60.0'
}, {
  date: '20120322',
  'New York': '57.3',
  'San Francisco': '51.4',
  Austin: '62.3'
}, {
  date: '20120323',
  'New York': '61.7',
  'San Francisco': '48.4',
  Austin: '61.1'
}, {
  date: '20120324',
  'New York': '55.8',
  'San Francisco': '49.0',
  Austin: '62.0'
}, {
  date: '20120325',
  'New York': '48.4',
  'San Francisco': '46.4',
  Austin: '64.6'
}, {
  date: '20120326',
  'New York': '49.8',
  'San Francisco': '49.7',
  Austin: '66.0'
}, {
  date: '20120327',
  'New York': '39.6',
  'San Francisco': '54.1',
  Austin: '65.8'
}, {
  date: '20120328',
  'New York': '49.7',
  'San Francisco': '54.6',
  Austin: '69.2'
}, {
  date: '20120329',
  'New York': '56.8',
  'San Francisco': '52.3',
  Austin: '69.5'
}, {
  date: '20120330',
  'New York': '46.5',
  'San Francisco': '54.5',
  Austin: '73.5'
}, {
  date: '20120331',
  'New York': '42.2',
  'San Francisco': '56.2',
  Austin: '73.9'
}, {
  date: '20120401',
  'New York': '45.3',
  'San Francisco': '51.1',
  Austin: '75.3'
}, {
  date: '20120402',
  'New York': '48.1',
  'San Francisco': '50.5',
  Austin: '75.4'
}, {
  date: '20120403',
  'New York': '51.2',
  'San Francisco': '52.2',
  Austin: '77.3'
}, {
  date: '20120404',
  'New York': '61.0',
  'San Francisco': '50.6',
  Austin: '67.0'
}, {
  date: '20120405',
  'New York': '50.7',
  'San Francisco': '47.9',
  Austin: '71.1'
}, {
  date: '20120406',
  'New York': '48.0',
  'San Francisco': '47.4',
  Austin: '70.4'
}, {
  date: '20120407',
  'New York': '51.1',
  'San Francisco': '49.4',
  Austin: '73.6'
}, {
  date: '20120408',
  'New York': '55.7',
  'San Francisco': '50.0',
  Austin: '71.1'
}, {
  date: '20120409',
  'New York': '58.3',
  'San Francisco': '51.3',
  Austin: '70.0'
}, {
  date: '20120410',
  'New York': '55.0',
  'San Francisco': '53.8',
  Austin: '69.0'
}, {
  date: '20120411',
  'New York': '49.0',
  'San Francisco': '52.9',
  Austin: '69.2'
}, {
  date: '20120412',
  'New York': '51.7',
  'San Francisco': '53.9',
  Austin: '74.5'
}, {
  date: '20120413',
  'New York': '53.1',
  'San Francisco': '50.2',
  Austin: '73.4'
}, {
  date: '20120414',
  'New York': '55.2',
  'San Francisco': '50.9',
  Austin: '76.0'
}, {
  date: '20120415',
  'New York': '62.3',
  'San Francisco': '51.5',
  Austin: '74.5'
}, {
  date: '20120416',
  'New York': '62.9',
  'San Francisco': '51.9',
  Austin: '63.6'
}, {
  date: '20120417',
  'New York': '69.3',
  'San Francisco': '53.2',
  Austin: '67.3'
}, {
  date: '20120418',
  'New York': '59.0',
  'San Francisco': '53.0',
  Austin: '65.1'
}, {
  date: '20120419',
  'New York': '54.1',
  'San Francisco': '55.1',
  Austin: '67.9'
}, {
  date: '20120420',
  'New York': '56.5',
  'San Francisco': '55.8',
  Austin: '68.9'
}, {
  date: '20120421',
  'New York': '58.2',
  'San Francisco': '58.0',
  Austin: '65.1'
}, {
  date: '20120422',
  'New York': '52.4',
  'San Francisco': '52.8',
  Austin: '65.4'
}, {
  date: '20120423',
  'New York': '51.6',
  'San Francisco': '55.1',
  Austin: '70.1'
}, {
  date: '20120424',
  'New York': '49.3',
  'San Francisco': '57.9',
  Austin: '67.0'
}, {
  date: '20120425',
  'New York': '52.5',
  'San Francisco': '57.5',
  Austin: '75.4'
}, {
  date: '20120426',
  'New York': '50.5',
  'San Francisco': '55.3',
  Austin: '77.5'
}, {
  date: '20120427',
  'New York': '51.9',
  'San Francisco': '53.5',
  Austin: '77.0'
}, {
  date: '20120428',
  'New York': '47.4',
  'San Francisco': '54.7',
  Austin: '77.7'
}, {
  date: '20120429',
  'New York': '54.1',
  'San Francisco': '54.0',
  Austin: '77.7'
}, {
  date: '20120430',
  'New York': '51.9',
  'San Francisco': '53.4',
  Austin: '77.7'
}, {
  date: '20120501',
  'New York': '57.4',
  'San Francisco': '52.7',
  Austin: '77.0'
}, {
  date: '20120502',
  'New York': '53.7',
  'San Francisco': '50.7',
  Austin: '77.9'
}, {
  date: '20120503',
  'New York': '53.1',
  'San Francisco': '52.6',
  Austin: '79.1'
}, {
  date: '20120504',
  'New York': '57.2',
  'San Francisco': '53.4',
  Austin: '80.1'
}, {
  date: '20120505',
  'New York': '57.0',
  'San Francisco': '53.1',
  Austin: '82.1'
}, {
  date: '20120506',
  'New York': '56.6',
  'San Francisco': '56.5',
  Austin: '79.0'
}, {
  date: '20120507',
  'New York': '54.6',
  'San Francisco': '55.3',
  Austin: '79.8'
}, {
  date: '20120508',
  'New York': '57.9',
  'San Francisco': '52.0',
  Austin: '70.0'
}, {
  date: '20120509',
  'New York': '59.2',
  'San Francisco': '52.4',
  Austin: '69.8'
}, {
  date: '20120510',
  'New York': '61.1',
  'San Francisco': '53.4',
  Austin: '71.3'
}, {
  date: '20120511',
  'New York': '59.7',
  'San Francisco': '53.1',
  Austin: '69.4'
}, {
  date: '20120512',
  'New York': '64.1',
  'San Francisco': '49.9',
  Austin: '72.0'
}, {
  date: '20120513',
  'New York': '65.3',
  'San Francisco': '52.0',
  Austin: '72.4'
}, {
  date: '20120514',
  'New York': '64.2',
  'San Francisco': '56.0',
  Austin: '72.5'
}, {
  date: '20120515',
  'New York': '62.0',
  'San Francisco': '53.0',
  Austin: '67.6'
}, {
  date: '20120516',
  'New York': '63.8',
  'San Francisco': '51.0',
  Austin: '69.0'
}, {
  date: '20120517',
  'New York': '64.5',
  'San Francisco': '51.4',
  Austin: '72.7'
}, {
  date: '20120518',
  'New York': '61.0',
  'San Francisco': '52.2',
  Austin: '73.7'
}, {
  date: '20120519',
  'New York': '62.6',
  'San Francisco': '52.4',
  Austin: '77.5'
}, {
  date: '20120520',
  'New York': '66.2',
  'San Francisco': '54.5',
  Austin: '75.8'
}, {
  date: '20120521',
  'New York': '62.7',
  'San Francisco': '52.8',
  Austin: '76.9'
}, {
  date: '20120522',
  'New York': '63.7',
  'San Francisco': '53.9',
  Austin: '78.8'
}, {
  date: '20120523',
  'New York': '66.4',
  'San Francisco': '56.5',
  Austin: '77.7'
}, {
  date: '20120524',
  'New York': '64.5',
  'San Francisco': '54.7',
  Austin: '80.6'
}, {
  date: '20120525',
  'New York': '65.4',
  'San Francisco': '52.5',
  Austin: '81.4'
}, {
  date: '20120526',
  'New York': '69.4',
  'San Francisco': '52.1',
  Austin: '82.3'
}, {
  date: '20120527',
  'New York': '71.9',
  'San Francisco': '52.2',
  Austin: '80.3'
}, {
  date: '20120528',
  'New York': '74.4',
  'San Francisco': '52.9',
  Austin: '80.3'
}, {
  date: '20120529',
  'New York': '75.9',
  'San Francisco': '52.1',
  Austin: '82.2'
}, {
  date: '20120530',
  'New York': '72.9',
  'San Francisco': '52.1',
  Austin: '81.9'
}, {
  date: '20120531',
  'New York': '72.5',
  'San Francisco': '53.3',
  Austin: '82.4'
}, {
  date: '20120601',
  'New York': '67.2',
  'San Francisco': '54.8',
  Austin: '77.9'
}, {
  date: '20120602',
  'New York': '68.3',
  'San Francisco': '54.0',
  Austin: '81.1'
}, {
  date: '20120603',
  'New York': '67.7',
  'San Francisco': '52.3',
  Austin: '82.2'
}, {
  date: '20120604',
  'New York': '61.9',
  'San Francisco': '55.3',
  Austin: '81.2'
}, {
  date: '20120605',
  'New York': '58.3',
  'San Francisco': '53.5',
  Austin: '83.0'
}, {
  date: '20120606',
  'New York': '61.7',
  'San Francisco': '54.1',
  Austin: '83.2'
}, {
  date: '20120607',
  'New York': '66.7',
  'San Francisco': '53.9',
  Austin: '82.1'
}, {
  date: '20120608',
  'New York': '68.7',
  'San Francisco': '54.4',
  Austin: '77.5'
}, {
  date: '20120609',
  'New York': '72.2',
  'San Francisco': '55.0',
  Austin: '77.9'
}, {
  date: '20120610',
  'New York': '72.6',
  'San Francisco': '60.0',
  Austin: '82.9'
}, {
  date: '20120611',
  'New York': '69.2',
  'San Francisco': '57.2',
  Austin: '86.8'
}, {
  date: '20120612',
  'New York': '66.9',
  'San Francisco': '55.1',
  Austin: '85.3'
}, {
  date: '20120613',
  'New York': '66.7',
  'San Francisco': '53.3',
  Austin: '76.9'
}, {
  date: '20120614',
  'New York': '67.7',
  'San Francisco': '53.4',
  Austin: '84.5'
}, {
  date: '20120615',
  'New York': '68.5',
  'San Francisco': '54.6',
  Austin: '84.4'
}, {
  date: '20120616',
  'New York': '67.5',
  'San Francisco': '57.0',
  Austin: '83.8'
}, {
  date: '20120617',
  'New York': '64.2',
  'San Francisco': '55.6',
  Austin: '82.5'
}, {
  date: '20120618',
  'New York': '61.7',
  'San Francisco': '52.5',
  Austin: '82.9'
}, {
  date: '20120619',
  'New York': '66.4',
  'San Francisco': '53.9',
  Austin: '82.5'
}, {
  date: '20120620',
  'New York': '77.9',
  'San Francisco': '55.3',
  Austin: '81.3'
}, {
  date: '20120621',
  'New York': '88.3',
  'San Francisco': '53.3',
  Austin: '80.8'
}, {
  date: '20120622',
  'New York': '82.2',
  'San Francisco': '54.1',
  Austin: '81.7'
}, {
  date: '20120623',
  'New York': '77.0',
  'San Francisco': '55.2',
  Austin: '83.9'
}, {
  date: '20120624',
  'New York': '75.4',
  'San Francisco': '55.8',
  Austin: '85.5'
}, {
  date: '20120625',
  'New York': '70.9',
  'San Francisco': '56.8',
  Austin: '87.2'
}, {
  date: '20120626',
  'New York': '65.9',
  'San Francisco': '57.5',
  Austin: '88.0'
}, {
  date: '20120627',
  'New York': '73.5',
  'San Francisco': '57.7',
  Austin: '89.6'
}, {
  date: '20120628',
  'New York': '77.4',
  'San Francisco': '56.6',
  Austin: '86.7'
}, {
  date: '20120629',
  'New York': '79.6',
  'San Francisco': '56.4',
  Austin: '85.3'
}, {
  date: '20120630',
  'New York': '84.2',
  'San Francisco': '58.4',
  Austin: '81.7'
}, {
  date: '20120701',
  'New York': '81.8',
  'San Francisco': '58.8',
  Austin: '78.5'
}, {
  date: '20120702',
  'New York': '82.5',
  'San Francisco': '56.4',
  Austin: '83.1'
}, {
  date: '20120703',
  'New York': '80.2',
  'San Francisco': '56.5',
  Austin: '83.1'
}, {
  date: '20120704',
  'New York': '77.8',
  'San Francisco': '55.8',
  Austin: '84.5'
}, {
  date: '20120705',
  'New York': '86.1',
  'San Francisco': '54.8',
  Austin: '84.6'
}, {
  date: '20120706',
  'New York': '79.9',
  'San Francisco': '54.9',
  Austin: '84.2'
}, {
  date: '20120707',
  'New York': '83.5',
  'San Francisco': '54.7',
  Austin: '86.7'
}, {
  date: '20120708',
  'New York': '81.5',
  'San Francisco': '52.8',
  Austin: '84.3'
}, {
  date: '20120709',
  'New York': '77.8',
  'San Francisco': '53.7',
  Austin: '83.7'
}, {
  date: '20120710',
  'New York': '76.1',
  'San Francisco': '53.1',
  Austin: '77.1'
}, {
  date: '20120711',
  'New York': '76.3',
  'San Francisco': '52.7',
  Austin: '77.4'
}, {
  date: '20120712',
  'New York': '75.8',
  'San Francisco': '52.0',
  Austin: '80.6'
}, {
  date: '20120713',
  'New York': '77.2',
  'San Francisco': '53.4',
  Austin: '81.4'
}, {
  date: '20120714',
  'New York': '79.3',
  'San Francisco': '54.0',
  Austin: '80.2'
}, {
  date: '20120715',
  'New York': '78.9',
  'San Francisco': '54.0',
  Austin: '81.8'
}, {
  date: '20120716',
  'New York': '79.6',
  'San Francisco': '54.5',
  Austin: '77.3'
}, {
  date: '20120717',
  'New York': '83.3',
  'San Francisco': '56.7',
  Austin: '80.8'
}, {
  date: '20120718',
  'New York': '84.3',
  'San Francisco': '57.5',
  Austin: '81.6'
}, {
  date: '20120719',
  'New York': '75.1',
  'San Francisco': '57.1',
  Austin: '80.9'
}, {
  date: '20120720',
  'New York': '68.4',
  'San Francisco': '58.1',
  Austin: '83.9'
}, {
  date: '20120721',
  'New York': '68.4',
  'San Francisco': '57.6',
  Austin: '85.6'
}, {
  date: '20120722',
  'New York': '72.2',
  'San Francisco': '56.0',
  Austin: '83.6'
}, {
  date: '20120723',
  'New York': '75.6',
  'San Francisco': '56.6',
  Austin: '84.0'
}, {
  date: '20120724',
  'New York': '82.6',
  'San Francisco': '57.8',
  Austin: '83.0'
}, {
  date: '20120725',
  'New York': '78.4',
  'San Francisco': '57.5',
  Austin: '84.8'
}, {
  date: '20120726',
  'New York': '77.0',
  'San Francisco': '56.4',
  Austin: '84.4'
}, {
  date: '20120727',
  'New York': '79.4',
  'San Francisco': '55.3',
  Austin: '84.3'
}, {
  date: '20120728',
  'New York': '77.4',
  'San Francisco': '55.0',
  Austin: '83.9'
}, {
  date: '20120729',
  'New York': '72.5',
  'San Francisco': '55.6',
  Austin: '85.0'
}, {
  date: '20120730',
  'New York': '72.9',
  'San Francisco': '55.6',
  Austin: '84.9'
}, {
  date: '20120731',
  'New York': '73.6',
  'San Francisco': '55.9',
  Austin: '86.3'
}, {
  date: '20120801',
  'New York': '75.0',
  'San Francisco': '55.4',
  Austin: '86.5'
}, {
  date: '20120802',
  'New York': '77.7',
  'San Francisco': '54.4',
  Austin: '85.8'
}, {
  date: '20120803',
  'New York': '79.7',
  'San Francisco': '53.7',
  Austin: '85.3'
}, {
  date: '20120804',
  'New York': '79.6',
  'San Francisco': '54.1',
  Austin: '86.0'
}, {
  date: '20120805',
  'New York': '81.5',
  'San Francisco': '57.8',
  Austin: '84.2'
}, {
  date: '20120806',
  'New York': '80.0',
  'San Francisco': '58.2',
  Austin: '81.9'
}, {
  date: '20120807',
  'New York': '75.7',
  'San Francisco': '58.0',
  Austin: '86.5'
}, {
  date: '20120808',
  'New York': '77.8',
  'San Francisco': '57.0',
  Austin: '86.1'
}, {
  date: '20120809',
  'New York': '78.6',
  'San Francisco': '55.0',
  Austin: '86.8'
}, {
  date: '20120810',
  'New York': '77.8',
  'San Francisco': '54.8',
  Austin: '88.0'
}, {
  date: '20120811',
  'New York': '78.5',
  'San Francisco': '53.0',
  Austin: '85.1'
}, {
  date: '20120812',
  'New York': '78.8',
  'San Francisco': '52.5',
  Austin: '87.4'
}, {
  date: '20120813',
  'New York': '78.6',
  'San Francisco': '53.3',
  Austin: '88.0'
}, {
  date: '20120814',
  'New York': '76.8',
  'San Francisco': '53.9',
  Austin: '88.0'
}, {
  date: '20120815',
  'New York': '76.7',
  'San Francisco': '56.2',
  Austin: '87.2'
}, {
  date: '20120816',
  'New York': '75.9',
  'San Francisco': '57.1',
  Austin: '86.1'
}, {
  date: '20120817',
  'New York': '77.6',
  'San Francisco': '55.3',
  Austin: '86.8'
}, {
  date: '20120818',
  'New York': '72.6',
  'San Francisco': '56.2',
  Austin: '84.9'
}, {
  date: '20120819',
  'New York': '70.4',
  'San Francisco': '54.3',
  Austin: '76.8'
}, {
  date: '20120820',
  'New York': '71.8',
  'San Francisco': '53.1',
  Austin: '80.6'
}, {
  date: '20120821',
  'New York': '73.6',
  'San Francisco': '53.4',
  Austin: '80.0'
}, {
  date: '20120822',
  'New York': '74.7',
  'San Francisco': '54.5',
  Austin: '78.2'
}, {
  date: '20120823',
  'New York': '74.6',
  'San Francisco': '55.7',
  Austin: '79.1'
}, {
  date: '20120824',
  'New York': '76.0',
  'San Francisco': '54.8',
  Austin: '81.9'
}, {
  date: '20120825',
  'New York': '76.2',
  'San Francisco': '53.8',
  Austin: '84.7'
}, {
  date: '20120826',
  'New York': '73.4',
  'San Francisco': '56.5',
  Austin: '83.5'
}, {
  date: '20120827',
  'New York': '74.6',
  'San Francisco': '58.3',
  Austin: '82.1'
}, {
  date: '20120828',
  'New York': '79.4',
  'San Francisco': '58.7',
  Austin: '84.0'
}, {
  date: '20120829',
  'New York': '74.7',
  'San Francisco': '57.5',
  Austin: '85.7'
}, {
  date: '20120830',
  'New York': '73.5',
  'San Francisco': '55.9',
  Austin: '87.2'
}, {
  date: '20120831',
  'New York': '77.9',
  'San Francisco': '55.4',
  Austin: '82.9'
}, {
  date: '20120901',
  'New York': '80.7',
  'San Francisco': '55.7',
  Austin: '84.8'
}, {
  date: '20120902',
  'New York': '75.1',
  'San Francisco': '53.1',
  Austin: '83.9'
}, {
  date: '20120903',
  'New York': '73.5',
  'San Francisco': '53.5',
  Austin: '85.5'
}, {
  date: '20120904',
  'New York': '73.5',
  'San Francisco': '52.5',
  Austin: '86.4'
}, {
  date: '20120905',
  'New York': '77.7',
  'San Francisco': '54.5',
  Austin: '85.8'
}, {
  date: '20120906',
  'New York': '74.2',
  'San Francisco': '56.3',
  Austin: '85.4'
}, {
  date: '20120907',
  'New York': '76.0',
  'San Francisco': '56.4',
  Austin: '85.3'
}, {
  date: '20120908',
  'New York': '77.1',
  'San Francisco': '56.5',
  Austin: '81.9'
}, {
  date: '20120909',
  'New York': '69.7',
  'San Francisco': '56.4',
  Austin: '74.8'
}, {
  date: '20120910',
  'New York': '67.8',
  'San Francisco': '55.4',
  Austin: '71.6'
}, {
  date: '20120911',
  'New York': '64.0',
  'San Francisco': '56.2',
  Austin: '75.9'
}, {
  date: '20120912',
  'New York': '68.1',
  'San Francisco': '55.7',
  Austin: '82.1'
}, {
  date: '20120913',
  'New York': '69.3',
  'San Francisco': '54.3',
  Austin: '80.5'
}, {
  date: '20120914',
  'New York': '70.0',
  'San Francisco': '55.2',
  Austin: '70.0'
}, {
  date: '20120915',
  'New York': '69.3',
  'San Francisco': '54.3',
  Austin: '71.2'
}, {
  date: '20120916',
  'New York': '66.3',
  'San Francisco': '52.9',
  Austin: '70.3'
}, {
  date: '20120917',
  'New York': '67.0',
  'San Francisco': '54.8',
  Austin: '72.1'
}, {
  date: '20120918',
  'New York': '72.8',
  'San Francisco': '54.8',
  Austin: '73.7'
}, {
  date: '20120919',
  'New York': '67.2',
  'San Francisco': '56.8',
  Austin: '72.7'
}, {
  date: '20120920',
  'New York': '62.1',
  'San Francisco': '55.4',
  Austin: '71.7'
}, {
  date: '20120921',
  'New York': '64.0',
  'San Francisco': '55.8',
  Austin: '72.9'
}, {
  date: '20120922',
  'New York': '65.5',
  'San Francisco': '55.9',
  Austin: '73.1'
}, {
  date: '20120923',
  'New York': '65.7',
  'San Francisco': '52.8',
  Austin: '75.6'
}, {
  date: '20120924',
  'New York': '60.4',
  'San Francisco': '54.5',
  Austin: '78.3'
}, {
  date: '20120925',
  'New York': '63.2',
  'San Francisco': '53.3',
  Austin: '78.3'
}, {
  date: '20120926',
  'New York': '68.5',
  'San Francisco': '53.6',
  Austin: '79.6'
}, {
  date: '20120927',
  'New York': '69.2',
  'San Francisco': '52.1',
  Austin: '76.4'
}, {
  date: '20120928',
  'New York': '68.7',
  'San Francisco': '52.6',
  Austin: '77.2'
}, {
  date: '20120929',
  'New York': '62.5',
  'San Francisco': '53.9',
  Austin: '75.2'
}, {
  date: '20120930',
  'New York': '62.3',
  'San Francisco': '55.1',
  Austin: '71.9'
}];

var lesMiserables = {
  nodes: [{
    id: 'Myriel',
    group: 1
  }, {
    id: 'Napoleon',
    group: 1
  }, {
    id: 'Mlle.Baptistine',
    group: 1
  }, {
    id: 'Mme.Magloire',
    group: 1
  }, {
    id: 'CountessdeLo',
    group: 1
  }, {
    id: 'Geborand',
    group: 1
  }, {
    id: 'Champtercier',
    group: 1
  }, {
    id: 'Cravatte',
    group: 1
  }, {
    id: 'Count',
    group: 1
  }, {
    id: 'OldMan',
    group: 1
  }, {
    id: 'Labarre',
    group: 2
  }, {
    id: 'Valjean',
    group: 2
  }, {
    id: 'Marguerite',
    group: 3
  }, {
    id: 'Mme.deR',
    group: 2
  }, {
    id: 'Isabeau',
    group: 2
  }, {
    id: 'Gervais',
    group: 2
  }, {
    id: 'Tholomyes',
    group: 3
  }, {
    id: 'Listolier',
    group: 3
  }, {
    id: 'Fameuil',
    group: 3
  }, {
    id: 'Blacheville',
    group: 3
  }, {
    id: 'Favourite',
    group: 3
  }, {
    id: 'Dahlia',
    group: 3
  }, {
    id: 'Zephine',
    group: 3
  }, {
    id: 'Fantine',
    group: 3
  }, {
    id: 'Mme.Thenardier',
    group: 4
  }, {
    id: 'Thenardier',
    group: 4
  }, {
    id: 'Cosette',
    group: 5
  }, {
    id: 'Javert',
    group: 4
  }, {
    id: 'Fauchelevent',
    group: 0
  }, {
    id: 'Bamatabois',
    group: 2
  }, {
    id: 'Perpetue',
    group: 3
  }, {
    id: 'Simplice',
    group: 2
  }, {
    id: 'Scaufflaire',
    group: 2
  }, {
    id: 'Woman1',
    group: 2
  }, {
    id: 'Judge',
    group: 2
  }, {
    id: 'Champmathieu',
    group: 2
  }, {
    id: 'Brevet',
    group: 2
  }, {
    id: 'Chenildieu',
    group: 2
  }, {
    id: 'Cochepaille',
    group: 2
  }, {
    id: 'Pontmercy',
    group: 4
  }, {
    id: 'Boulatruelle',
    group: 6
  }, {
    id: 'Eponine',
    group: 4
  }, {
    id: 'Anzelma',
    group: 4
  }, {
    id: 'Woman2',
    group: 5
  }, {
    id: 'MotherInnocent',
    group: 0
  }, {
    id: 'Gribier',
    group: 0
  }, {
    id: 'Jondrette',
    group: 7
  }, {
    id: 'Mme.Burgon',
    group: 7
  }, {
    id: 'Gavroche',
    group: 8
  }, {
    id: 'Gillenormand',
    group: 5
  }, {
    id: 'Magnon',
    group: 5
  }, {
    id: 'Mlle.Gillenormand',
    group: 5
  }, {
    id: 'Mme.Pontmercy',
    group: 5
  }, {
    id: 'Mlle.Vaubois',
    group: 5
  }, {
    id: 'Lt.Gillenormand',
    group: 5
  }, {
    id: 'Marius',
    group: 8
  }, {
    id: 'BaronessT',
    group: 5
  }, {
    id: 'Mabeuf',
    group: 8
  }, {
    id: 'Enjolras',
    group: 8
  }, {
    id: 'Combeferre',
    group: 8
  }, {
    id: 'Prouvaire',
    group: 8
  }, {
    id: 'Feuilly',
    group: 8
  }, {
    id: 'Courfeyrac',
    group: 8
  }, {
    id: 'Bahorel',
    group: 8
  }, {
    id: 'Bossuet',
    group: 8
  }, {
    id: 'Joly',
    group: 8
  }, {
    id: 'Grantaire',
    group: 8
  }, {
    id: 'MotherPlutarch',
    group: 9
  }, {
    id: 'Gueulemer',
    group: 4
  }, {
    id: 'Babet',
    group: 4
  }, {
    id: 'Claquesous',
    group: 4
  }, {
    id: 'Montparnasse',
    group: 4
  }, {
    id: 'Toussaint',
    group: 5
  }, {
    id: 'Child1',
    group: 10
  }, {
    id: 'Child2',
    group: 10
  }, {
    id: 'Brujon',
    group: 4
  }, {
    id: 'Mme.Hucheloup',
    group: 8
  }],
  links: [{
    source: 'Napoleon',
    target: 'Myriel',
    value: 1
  }, {
    source: 'Mlle.Baptistine',
    target: 'Myriel',
    value: 8
  }, {
    source: 'Mme.Magloire',
    target: 'Myriel',
    value: 10
  }, {
    source: 'Mme.Magloire',
    target: 'Mlle.Baptistine',
    value: 6
  }, {
    source: 'CountessdeLo',
    target: 'Myriel',
    value: 1
  }, {
    source: 'Geborand',
    target: 'Myriel',
    value: 1
  }, {
    source: 'Champtercier',
    target: 'Myriel',
    value: 1
  }, {
    source: 'Cravatte',
    target: 'Myriel',
    value: 1
  }, {
    source: 'Count',
    target: 'Myriel',
    value: 2
  }, {
    source: 'OldMan',
    target: 'Myriel',
    value: 1
  }, {
    source: 'Valjean',
    target: 'Labarre',
    value: 1
  }, {
    source: 'Valjean',
    target: 'Mme.Magloire',
    value: 3
  }, {
    source: 'Valjean',
    target: 'Mlle.Baptistine',
    value: 3
  }, {
    source: 'Valjean',
    target: 'Myriel',
    value: 5
  }, {
    source: 'Marguerite',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Mme.deR',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Isabeau',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Gervais',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Listolier',
    target: 'Tholomyes',
    value: 4
  }, {
    source: 'Fameuil',
    target: 'Tholomyes',
    value: 4
  }, {
    source: 'Fameuil',
    target: 'Listolier',
    value: 4
  }, {
    source: 'Blacheville',
    target: 'Tholomyes',
    value: 4
  }, {
    source: 'Blacheville',
    target: 'Listolier',
    value: 4
  }, {
    source: 'Blacheville',
    target: 'Fameuil',
    value: 4
  }, {
    source: 'Favourite',
    target: 'Tholomyes',
    value: 3
  }, {
    source: 'Favourite',
    target: 'Listolier',
    value: 3
  }, {
    source: 'Favourite',
    target: 'Fameuil',
    value: 3
  }, {
    source: 'Favourite',
    target: 'Blacheville',
    value: 4
  }, {
    source: 'Dahlia',
    target: 'Tholomyes',
    value: 3
  }, {
    source: 'Dahlia',
    target: 'Listolier',
    value: 3
  }, {
    source: 'Dahlia',
    target: 'Fameuil',
    value: 3
  }, {
    source: 'Dahlia',
    target: 'Blacheville',
    value: 3
  }, {
    source: 'Dahlia',
    target: 'Favourite',
    value: 5
  }, {
    source: 'Zephine',
    target: 'Tholomyes',
    value: 3
  }, {
    source: 'Zephine',
    target: 'Listolier',
    value: 3
  }, {
    source: 'Zephine',
    target: 'Fameuil',
    value: 3
  }, {
    source: 'Zephine',
    target: 'Blacheville',
    value: 3
  }, {
    source: 'Zephine',
    target: 'Favourite',
    value: 4
  }, {
    source: 'Zephine',
    target: 'Dahlia',
    value: 4
  }, {
    source: 'Fantine',
    target: 'Tholomyes',
    value: 3
  }, {
    source: 'Fantine',
    target: 'Listolier',
    value: 3
  }, {
    source: 'Fantine',
    target: 'Fameuil',
    value: 3
  }, {
    source: 'Fantine',
    target: 'Blacheville',
    value: 3
  }, {
    source: 'Fantine',
    target: 'Favourite',
    value: 4
  }, {
    source: 'Fantine',
    target: 'Dahlia',
    value: 4
  }, {
    source: 'Fantine',
    target: 'Zephine',
    value: 4
  }, {
    source: 'Fantine',
    target: 'Marguerite',
    value: 2
  }, {
    source: 'Fantine',
    target: 'Valjean',
    value: 9
  }, {
    source: 'Mme.Thenardier',
    target: 'Fantine',
    value: 2
  }, {
    source: 'Mme.Thenardier',
    target: 'Valjean',
    value: 7
  }, {
    source: 'Thenardier',
    target: 'Mme.Thenardier',
    value: 13
  }, {
    source: 'Thenardier',
    target: 'Fantine',
    value: 1
  }, {
    source: 'Thenardier',
    target: 'Valjean',
    value: 12
  }, {
    source: 'Cosette',
    target: 'Mme.Thenardier',
    value: 4
  }, {
    source: 'Cosette',
    target: 'Valjean',
    value: 31
  }, {
    source: 'Cosette',
    target: 'Tholomyes',
    value: 1
  }, {
    source: 'Cosette',
    target: 'Thenardier',
    value: 1
  }, {
    source: 'Javert',
    target: 'Valjean',
    value: 17
  }, {
    source: 'Javert',
    target: 'Fantine',
    value: 5
  }, {
    source: 'Javert',
    target: 'Thenardier',
    value: 5
  }, {
    source: 'Javert',
    target: 'Mme.Thenardier',
    value: 1
  }, {
    source: 'Javert',
    target: 'Cosette',
    value: 1
  }, {
    source: 'Fauchelevent',
    target: 'Valjean',
    value: 8
  }, {
    source: 'Fauchelevent',
    target: 'Javert',
    value: 1
  }, {
    source: 'Bamatabois',
    target: 'Fantine',
    value: 1
  }, {
    source: 'Bamatabois',
    target: 'Javert',
    value: 1
  }, {
    source: 'Bamatabois',
    target: 'Valjean',
    value: 2
  }, {
    source: 'Perpetue',
    target: 'Fantine',
    value: 1
  }, {
    source: 'Simplice',
    target: 'Perpetue',
    value: 2
  }, {
    source: 'Simplice',
    target: 'Valjean',
    value: 3
  }, {
    source: 'Simplice',
    target: 'Fantine',
    value: 2
  }, {
    source: 'Simplice',
    target: 'Javert',
    value: 1
  }, {
    source: 'Scaufflaire',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Woman1',
    target: 'Valjean',
    value: 2
  }, {
    source: 'Woman1',
    target: 'Javert',
    value: 1
  }, {
    source: 'Judge',
    target: 'Valjean',
    value: 3
  }, {
    source: 'Judge',
    target: 'Bamatabois',
    value: 2
  }, {
    source: 'Champmathieu',
    target: 'Valjean',
    value: 3
  }, {
    source: 'Champmathieu',
    target: 'Judge',
    value: 3
  }, {
    source: 'Champmathieu',
    target: 'Bamatabois',
    value: 2
  }, {
    source: 'Brevet',
    target: 'Judge',
    value: 2
  }, {
    source: 'Brevet',
    target: 'Champmathieu',
    value: 2
  }, {
    source: 'Brevet',
    target: 'Valjean',
    value: 2
  }, {
    source: 'Brevet',
    target: 'Bamatabois',
    value: 1
  }, {
    source: 'Chenildieu',
    target: 'Judge',
    value: 2
  }, {
    source: 'Chenildieu',
    target: 'Champmathieu',
    value: 2
  }, {
    source: 'Chenildieu',
    target: 'Brevet',
    value: 2
  }, {
    source: 'Chenildieu',
    target: 'Valjean',
    value: 2
  }, {
    source: 'Chenildieu',
    target: 'Bamatabois',
    value: 1
  }, {
    source: 'Cochepaille',
    target: 'Judge',
    value: 2
  }, {
    source: 'Cochepaille',
    target: 'Champmathieu',
    value: 2
  }, {
    source: 'Cochepaille',
    target: 'Brevet',
    value: 2
  }, {
    source: 'Cochepaille',
    target: 'Chenildieu',
    value: 2
  }, {
    source: 'Cochepaille',
    target: 'Valjean',
    value: 2
  }, {
    source: 'Cochepaille',
    target: 'Bamatabois',
    value: 1
  }, {
    source: 'Pontmercy',
    target: 'Thenardier',
    value: 1
  }, {
    source: 'Boulatruelle',
    target: 'Thenardier',
    value: 1
  }, {
    source: 'Eponine',
    target: 'Mme.Thenardier',
    value: 2
  }, {
    source: 'Eponine',
    target: 'Thenardier',
    value: 3
  }, {
    source: 'Anzelma',
    target: 'Eponine',
    value: 2
  }, {
    source: 'Anzelma',
    target: 'Thenardier',
    value: 2
  }, {
    source: 'Anzelma',
    target: 'Mme.Thenardier',
    value: 1
  }, {
    source: 'Woman2',
    target: 'Valjean',
    value: 3
  }, {
    source: 'Woman2',
    target: 'Cosette',
    value: 1
  }, {
    source: 'Woman2',
    target: 'Javert',
    value: 1
  }, {
    source: 'MotherInnocent',
    target: 'Fauchelevent',
    value: 3
  }, {
    source: 'MotherInnocent',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Gribier',
    target: 'Fauchelevent',
    value: 2
  }, {
    source: 'Mme.Burgon',
    target: 'Jondrette',
    value: 1
  }, {
    source: 'Gavroche',
    target: 'Mme.Burgon',
    value: 2
  }, {
    source: 'Gavroche',
    target: 'Thenardier',
    value: 1
  }, {
    source: 'Gavroche',
    target: 'Javert',
    value: 1
  }, {
    source: 'Gavroche',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Gillenormand',
    target: 'Cosette',
    value: 3
  }, {
    source: 'Gillenormand',
    target: 'Valjean',
    value: 2
  }, {
    source: 'Magnon',
    target: 'Gillenormand',
    value: 1
  }, {
    source: 'Magnon',
    target: 'Mme.Thenardier',
    value: 1
  }, {
    source: 'Mlle.Gillenormand',
    target: 'Gillenormand',
    value: 9
  }, {
    source: 'Mlle.Gillenormand',
    target: 'Cosette',
    value: 2
  }, {
    source: 'Mlle.Gillenormand',
    target: 'Valjean',
    value: 2
  }, {
    source: 'Mme.Pontmercy',
    target: 'Mlle.Gillenormand',
    value: 1
  }, {
    source: 'Mme.Pontmercy',
    target: 'Pontmercy',
    value: 1
  }, {
    source: 'Mlle.Vaubois',
    target: 'Mlle.Gillenormand',
    value: 1
  }, {
    source: 'Lt.Gillenormand',
    target: 'Mlle.Gillenormand',
    value: 2
  }, {
    source: 'Lt.Gillenormand',
    target: 'Gillenormand',
    value: 1
  }, {
    source: 'Lt.Gillenormand',
    target: 'Cosette',
    value: 1
  }, {
    source: 'Marius',
    target: 'Mlle.Gillenormand',
    value: 6
  }, {
    source: 'Marius',
    target: 'Gillenormand',
    value: 12
  }, {
    source: 'Marius',
    target: 'Pontmercy',
    value: 1
  }, {
    source: 'Marius',
    target: 'Lt.Gillenormand',
    value: 1
  }, {
    source: 'Marius',
    target: 'Cosette',
    value: 21
  }, {
    source: 'Marius',
    target: 'Valjean',
    value: 19
  }, {
    source: 'Marius',
    target: 'Tholomyes',
    value: 1
  }, {
    source: 'Marius',
    target: 'Thenardier',
    value: 2
  }, {
    source: 'Marius',
    target: 'Eponine',
    value: 5
  }, {
    source: 'Marius',
    target: 'Gavroche',
    value: 4
  }, {
    source: 'BaronessT',
    target: 'Gillenormand',
    value: 1
  }, {
    source: 'BaronessT',
    target: 'Marius',
    value: 1
  }, {
    source: 'Mabeuf',
    target: 'Marius',
    value: 1
  }, {
    source: 'Mabeuf',
    target: 'Eponine',
    value: 1
  }, {
    source: 'Mabeuf',
    target: 'Gavroche',
    value: 1
  }, {
    source: 'Enjolras',
    target: 'Marius',
    value: 7
  }, {
    source: 'Enjolras',
    target: 'Gavroche',
    value: 7
  }, {
    source: 'Enjolras',
    target: 'Javert',
    value: 6
  }, {
    source: 'Enjolras',
    target: 'Mabeuf',
    value: 1
  }, {
    source: 'Enjolras',
    target: 'Valjean',
    value: 4
  }, {
    source: 'Combeferre',
    target: 'Enjolras',
    value: 15
  }, {
    source: 'Combeferre',
    target: 'Marius',
    value: 5
  }, {
    source: 'Combeferre',
    target: 'Gavroche',
    value: 6
  }, {
    source: 'Combeferre',
    target: 'Mabeuf',
    value: 2
  }, {
    source: 'Prouvaire',
    target: 'Gavroche',
    value: 1
  }, {
    source: 'Prouvaire',
    target: 'Enjolras',
    value: 4
  }, {
    source: 'Prouvaire',
    target: 'Combeferre',
    value: 2
  }, {
    source: 'Feuilly',
    target: 'Gavroche',
    value: 2
  }, {
    source: 'Feuilly',
    target: 'Enjolras',
    value: 6
  }, {
    source: 'Feuilly',
    target: 'Prouvaire',
    value: 2
  }, {
    source: 'Feuilly',
    target: 'Combeferre',
    value: 5
  }, {
    source: 'Feuilly',
    target: 'Mabeuf',
    value: 1
  }, {
    source: 'Feuilly',
    target: 'Marius',
    value: 1
  }, {
    source: 'Courfeyrac',
    target: 'Marius',
    value: 9
  }, {
    source: 'Courfeyrac',
    target: 'Enjolras',
    value: 17
  }, {
    source: 'Courfeyrac',
    target: 'Combeferre',
    value: 13
  }, {
    source: 'Courfeyrac',
    target: 'Gavroche',
    value: 7
  }, {
    source: 'Courfeyrac',
    target: 'Mabeuf',
    value: 2
  }, {
    source: 'Courfeyrac',
    target: 'Eponine',
    value: 1
  }, {
    source: 'Courfeyrac',
    target: 'Feuilly',
    value: 6
  }, {
    source: 'Courfeyrac',
    target: 'Prouvaire',
    value: 3
  }, {
    source: 'Bahorel',
    target: 'Combeferre',
    value: 5
  }, {
    source: 'Bahorel',
    target: 'Gavroche',
    value: 5
  }, {
    source: 'Bahorel',
    target: 'Courfeyrac',
    value: 6
  }, {
    source: 'Bahorel',
    target: 'Mabeuf',
    value: 2
  }, {
    source: 'Bahorel',
    target: 'Enjolras',
    value: 4
  }, {
    source: 'Bahorel',
    target: 'Feuilly',
    value: 3
  }, {
    source: 'Bahorel',
    target: 'Prouvaire',
    value: 2
  }, {
    source: 'Bahorel',
    target: 'Marius',
    value: 1
  }, {
    source: 'Bossuet',
    target: 'Marius',
    value: 5
  }, {
    source: 'Bossuet',
    target: 'Courfeyrac',
    value: 12
  }, {
    source: 'Bossuet',
    target: 'Gavroche',
    value: 5
  }, {
    source: 'Bossuet',
    target: 'Bahorel',
    value: 4
  }, {
    source: 'Bossuet',
    target: 'Enjolras',
    value: 10
  }, {
    source: 'Bossuet',
    target: 'Feuilly',
    value: 6
  }, {
    source: 'Bossuet',
    target: 'Prouvaire',
    value: 2
  }, {
    source: 'Bossuet',
    target: 'Combeferre',
    value: 9
  }, {
    source: 'Bossuet',
    target: 'Mabeuf',
    value: 1
  }, {
    source: 'Bossuet',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Joly',
    target: 'Bahorel',
    value: 5
  }, {
    source: 'Joly',
    target: 'Bossuet',
    value: 7
  }, {
    source: 'Joly',
    target: 'Gavroche',
    value: 3
  }, {
    source: 'Joly',
    target: 'Courfeyrac',
    value: 5
  }, {
    source: 'Joly',
    target: 'Enjolras',
    value: 5
  }, {
    source: 'Joly',
    target: 'Feuilly',
    value: 5
  }, {
    source: 'Joly',
    target: 'Prouvaire',
    value: 2
  }, {
    source: 'Joly',
    target: 'Combeferre',
    value: 5
  }, {
    source: 'Joly',
    target: 'Mabeuf',
    value: 1
  }, {
    source: 'Joly',
    target: 'Marius',
    value: 2
  }, {
    source: 'Grantaire',
    target: 'Bossuet',
    value: 3
  }, {
    source: 'Grantaire',
    target: 'Enjolras',
    value: 3
  }, {
    source: 'Grantaire',
    target: 'Combeferre',
    value: 1
  }, {
    source: 'Grantaire',
    target: 'Courfeyrac',
    value: 2
  }, {
    source: 'Grantaire',
    target: 'Joly',
    value: 2
  }, {
    source: 'Grantaire',
    target: 'Gavroche',
    value: 1
  }, {
    source: 'Grantaire',
    target: 'Bahorel',
    value: 1
  }, {
    source: 'Grantaire',
    target: 'Feuilly',
    value: 1
  }, {
    source: 'Grantaire',
    target: 'Prouvaire',
    value: 1
  }, {
    source: 'MotherPlutarch',
    target: 'Mabeuf',
    value: 3
  }, {
    source: 'Gueulemer',
    target: 'Thenardier',
    value: 5
  }, {
    source: 'Gueulemer',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Gueulemer',
    target: 'Mme.Thenardier',
    value: 1
  }, {
    source: 'Gueulemer',
    target: 'Javert',
    value: 1
  }, {
    source: 'Gueulemer',
    target: 'Gavroche',
    value: 1
  }, {
    source: 'Gueulemer',
    target: 'Eponine',
    value: 1
  }, {
    source: 'Babet',
    target: 'Thenardier',
    value: 6
  }, {
    source: 'Babet',
    target: 'Gueulemer',
    value: 6
  }, {
    source: 'Babet',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Babet',
    target: 'Mme.Thenardier',
    value: 1
  }, {
    source: 'Babet',
    target: 'Javert',
    value: 2
  }, {
    source: 'Babet',
    target: 'Gavroche',
    value: 1
  }, {
    source: 'Babet',
    target: 'Eponine',
    value: 1
  }, {
    source: 'Claquesous',
    target: 'Thenardier',
    value: 4
  }, {
    source: 'Claquesous',
    target: 'Babet',
    value: 4
  }, {
    source: 'Claquesous',
    target: 'Gueulemer',
    value: 4
  }, {
    source: 'Claquesous',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Claquesous',
    target: 'Mme.Thenardier',
    value: 1
  }, {
    source: 'Claquesous',
    target: 'Javert',
    value: 1
  }, {
    source: 'Claquesous',
    target: 'Eponine',
    value: 1
  }, {
    source: 'Claquesous',
    target: 'Enjolras',
    value: 1
  }, {
    source: 'Montparnasse',
    target: 'Javert',
    value: 1
  }, {
    source: 'Montparnasse',
    target: 'Babet',
    value: 2
  }, {
    source: 'Montparnasse',
    target: 'Gueulemer',
    value: 2
  }, {
    source: 'Montparnasse',
    target: 'Claquesous',
    value: 2
  }, {
    source: 'Montparnasse',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Montparnasse',
    target: 'Gavroche',
    value: 1
  }, {
    source: 'Montparnasse',
    target: 'Eponine',
    value: 1
  }, {
    source: 'Montparnasse',
    target: 'Thenardier',
    value: 1
  }, {
    source: 'Toussaint',
    target: 'Cosette',
    value: 2
  }, {
    source: 'Toussaint',
    target: 'Javert',
    value: 1
  }, {
    source: 'Toussaint',
    target: 'Valjean',
    value: 1
  }, {
    source: 'Child1',
    target: 'Gavroche',
    value: 2
  }, {
    source: 'Child2',
    target: 'Gavroche',
    value: 2
  }, {
    source: 'Child2',
    target: 'Child1',
    value: 3
  }, {
    source: 'Brujon',
    target: 'Babet',
    value: 3
  }, {
    source: 'Brujon',
    target: 'Gueulemer',
    value: 3
  }, {
    source: 'Brujon',
    target: 'Thenardier',
    value: 3
  }, {
    source: 'Brujon',
    target: 'Gavroche',
    value: 1
  }, {
    source: 'Brujon',
    target: 'Eponine',
    value: 1
  }, {
    source: 'Brujon',
    target: 'Claquesous',
    value: 1
  }, {
    source: 'Brujon',
    target: 'Montparnasse',
    value: 1
  }, {
    source: 'Mme.Hucheloup',
    target: 'Bossuet',
    value: 1
  }, {
    source: 'Mme.Hucheloup',
    target: 'Joly',
    value: 1
  }, {
    source: 'Mme.Hucheloup',
    target: 'Grantaire',
    value: 1
  }, {
    source: 'Mme.Hucheloup',
    target: 'Bahorel',
    value: 1
  }, {
    source: 'Mme.Hucheloup',
    target: 'Courfeyrac',
    value: 1
  }, {
    source: 'Mme.Hucheloup',
    target: 'Gavroche',
    value: 1
  }, {
    source: 'Mme.Hucheloup',
    target: 'Enjolras',
    value: 1
  }]
};

var exoplanets = [{
  name: 'Jupiter',
  radius: 10.97,
  distance: 0
}, {
  name: 'Saturn',
  radius: 9.14,
  distance: 0
}, {
  name: 'Uranus',
  radius: 3.98,
  distance: 0
}, {
  name: 'Neptune',
  radius: 3.86,
  distance: 0
}, {
  name: 'Earth',
  radius: 1,
  distance: 0
}, {
  name: 'Venus',
  radius: 0.95,
  distance: 0
}, {
  name: 'Mars',
  radius: 0.532,
  distance: 0
}, {
  name: 'Mercury',
  radius: 0.383,
  distance: 0
}, {
  name: 'Pluto',
  radius: 0.181,
  distance: 0
}, {
  name: '11 Com b',
  radius: 12.64,
  distance: 110.6
}, {
  name: '11 UMi b',
  radius: 12.89,
  distance: 119.5
}, {
  name: '14 And b',
  radius: 13.18,
  distance: 76.4
}, {
  name: '14 Her b',
  radius: 13.24,
  distance: 18.1
}, {
  name: '16 Cyg B b',
  radius: 13.69,
  distance: 21.41
}, {
  name: '18 Del b',
  radius: 12.9,
  distance: 73.1
}, {
  name: '1RXS1609 b',
  radius: 19.04,
  distance: 145
}, {
  name: '24 Sex b',
  radius: 13.62,
  distance: 74.8
}, {
  name: '24 Sex c',
  radius: 13.99,
  distance: 74.8
}, {
  name: '2M 0103(AB) b',
  radius: 12.74,
  distance: 47.2
}, {
  name: '2M 0122-2439 b',
  radius: 12.74,
  distance: 36
}, {
  name: '2M 044144 b',
  radius: 13.04,
  distance: 140
}, {
  name: '2M 0746+20 b',
  radius: 10.86,
  distance: 12.21
}, {
  name: '2M 2140+16 b',
  radius: 10.3,
  distance: 25
}, {
  name: '2M 2206-20 b',
  radius: 14.56,
  distance: 26.67
}, {
  name: '2M1207 b',
  radius: 13.31,
  distance: 52.4
}, {
  name: '30 Ari B b',
  radius: 12.92,
  distance: 39.4
}, {
  name: '4 Uma b',
  radius: 13.06,
  distance: 78.5
}, {
  name: '42 Dra b',
  radius: 13.32,
  distance: 97.3
}, {
  name: '47 Uma b',
  radius: 13.51,
  distance: 13.97
}, {
  name: '47 Uma c',
  radius: 14.21,
  distance: 13.97
}, {
  name: '47 Uma d',
  radius: 13.7,
  distance: 13.97
}, {
  name: '51 Peg b',
  radius: 14.28,
  distance: 14.7
}, {
  name: '55 Cnc b',
  radius: 14.03,
  distance: 12.34
}, {
  name: '55 Cnc c',
  radius: 8.48,
  distance: 12.34
}, {
  name: '55 Cnc d',
  radius: 13.33,
  distance: 12.34
}, {
  name: '55 Cnc e',
  radius: 1.99,
  distance: 12.34
}, {
  name: '55 Cnc f',
  radius: 7.75,
  distance: 12.34
}, {
  name: '6 Lyn b',
  radius: 13.53,
  distance: 56.9
}, {
  name: '61 Vir b',
  radius: 1.89,
  distance: 8.52
}, {
  name: '61 Vir c',
  radius: 4.63,
  distance: 8.52
}, {
  name: '61 Vir d',
  radius: 5.26,
  distance: 8.52
}, {
  name: '7 CMa b',
  radius: 13.5,
  distance: 19.75
}, {
  name: '70 Vir b',
  radius: 13.09,
  distance: 22
}, {
  name: '75 Cet b',
  radius: 13.37,
  distance: 81.5
}, {
  name: '81 Cet b',
  radius: 13.19,
  distance: 97.2
}, {
  name: '91 Aqr b',
  radius: 13.41,
  distance: 45.9
}, {
  name: 'AB Pic b',
  radius: 12.79,
  distance: 47.3
}, {
  name: 'alf Ari b',
  radius: 13.66,
  distance: 20.2
}, {
  name: 'alf Cen B b',
  radius: 1.1,
  distance: 1.3
}, {
  name: 'BD +48 738 b',
  radius: 13.9,
  distance: null
}, {
  name: 'BD+15 2940 b',
  radius: 13.81,
  distance: 585
}, {
  name: 'BD+20 274 c',
  radius: 13.22,
  distance: null
}, {
  name: 'BD-061339 b',
  radius: 3.29,
  distance: 20
}, {
  name: 'BD-061339 c',
  radius: 9.22,
  distance: 20
}, {
  name: 'BD-082823 b',
  radius: 4.04,
  distance: 42.2
}, {
  name: 'BD-082823 c',
  radius: 14.44,
  distance: 42.2
}, {
  name: 'BD-10 3166 b',
  radius: 14.26,
  distance: 66
}, {
  name: 'BD-17 63 b',
  radius: 13.2,
  distance: 34.6
}, {
  name: 'BD14 4559 b',
  radius: 13.75,
  distance: 50
}, {
  name: 'BD20 2457 b',
  radius: 12.6,
  distance: 200
}, {
  name: 'BD20 2457 c',
  radius: 12.82,
  distance: 200
}, {
  name: 'beta Pic b',
  radius: 13.07,
  distance: 19.3
}, {
  name: 'CD-35 2722 b',
  radius: 12.44,
  distance: 21.3
}, {
  name: 'CFBDS 1458 b',
  radius: 13.1,
  distance: 23.1
}, {
  name: 'CHXR 73 b',
  radius: 12.78,
  distance: null
}, {
  name: 'CoRoT-1 b',
  radius: 16.69,
  distance: 460
}, {
  name: 'CoRoT-10 b',
  radius: 10.86,
  distance: 345
}, {
  name: 'CoRoT-11 b',
  radius: 16.02,
  distance: 560
}, {
  name: 'CoRoT-12 b',
  radius: 16.13,
  distance: 1150
}, {
  name: 'CoRoT-13 b',
  radius: 9.91,
  distance: 1310
}, {
  name: 'CoRoT-14 b',
  radius: 12.21,
  distance: 1340
}, {
  name: 'CoRoT-16 b',
  radius: 13.1,
  distance: 840
}, {
  name: 'CoRoT-17 b',
  radius: 11.42,
  distance: 920
}, {
  name: 'CoRoT-18 b',
  radius: 14.67,
  distance: 870
}, {
  name: 'CoRoT-19 b',
  radius: 14.45,
  distance: 800
}, {
  name: 'CoRoT-2 b',
  radius: 16.41,
  distance: 300
}, {
  name: 'CoRoT-20 b',
  radius: 9.41,
  distance: 1230
}, {
  name: 'CoRoT-21 b',
  radius: 14.56,
  distance: null
}, {
  name: 'CoRoT-23 b',
  radius: 12.1,
  distance: 600
}, {
  name: 'CoRoT-25 b',
  radius: 12.1,
  distance: 1000
}, {
  name: 'CoRoT-26 b',
  radius: 14.11,
  distance: 1670
}, {
  name: 'CoRoT-3 b',
  radius: 11.31,
  distance: 680
}, {
  name: 'CoRoT-4 b',
  radius: 13.33,
  distance: null
}, {
  name: 'CoRoT-5 b',
  radius: 14.9,
  distance: 400
}, {
  name: 'CoRoT-6 b',
  radius: 13.06,
  distance: null
}, {
  name: 'CoRoT-7 b',
  radius: 1.67,
  distance: 150
}, {
  name: 'CoRoT-7 c',
  radius: 2.43,
  distance: 150
}, {
  name: 'CoRoT-8 b',
  radius: 6.37,
  distance: 380
}, {
  name: 'CoRoT-9 b',
  radius: 10.53,
  distance: 460
}, {
  name: 'CT Cha b',
  radius: 24.64,
  distance: 165
}, {
  name: 'DH Tau b',
  radius: 12.81,
  distance: null
}, {
  name: 'DP Leo b',
  radius: 13.07,
  distance: null
}, {
  name: 'eps CrB b',
  radius: 13.02,
  distance: 67.9
}, {
  name: 'eps Eridani b',
  radius: 13.73,
  distance: 3.2
}, {
  name: 'eps Tau b',
  radius: 13.03,
  distance: 45
}, {
  name: 'Fomalhaut b',
  radius: 13.61,
  distance: 7.7
}, {
  name: 'FU Tau b',
  radius: 12.74,
  distance: 140
}, {
  name: 'gamma 1 Leo b',
  radius: 12.97,
  distance: 38.5
}, {
  name: 'gamma Cephei b',
  radius: 13.65,
  distance: 13.79
}, {
  name: 'GJ 1214 b',
  radius: 2.67,
  distance: 13
}, {
  name: 'GJ 163 b',
  radius: 3.71,
  distance: 15
}, {
  name: 'GJ 163 c',
  radius: 2.43,
  distance: 15
}, {
  name: 'Gj 163 d',
  radius: 5.58,
  distance: 15
}, {
  name: 'GJ 176 b',
  radius: 2.43,
  distance: 9.42
}, {
  name: 'GJ 3021 b',
  radius: 13.38,
  distance: 17.62
}, {
  name: 'GJ 317 b',
  radius: 13.66,
  distance: 15.1
}, {
  name: 'GJ 317 c',
  radius: 13.61,
  distance: 15.1
}, {
  name: 'GJ 328 b',
  radius: 13.49,
  distance: 19.8
}, {
  name: 'GJ 3470 b',
  radius: 4.19,
  distance: 30.7
}, {
  name: 'GJ 3634 b',
  radius: 2.2,
  distance: 19.8
}, {
  name: 'GJ 433 b',
  radius: 2.01,
  distance: 9.04
}, {
  name: 'GJ 433 c',
  radius: 7.63,
  distance: 9.04
}, {
  name: 'GJ 436 b',
  radius: 4.09,
  distance: 10.2
}, {
  name: 'GJ 504 b',
  radius: 13.24,
  distance: 17.56
}, {
  name: 'GJ 667C b',
  radius: 1.95,
  distance: 7.23
}, {
  name: 'GJ 667C c',
  radius: 1.74,
  distance: 7.23
}, {
  name: 'GJ 667C d',
  radius: 2.19,
  distance: 7.23
}, {
  name: 'GJ 667C e',
  radius: 1.52,
  distance: 7.23
}, {
  name: 'GJ 667C f',
  radius: 1.52,
  distance: 7.23
}, {
  name: 'GJ 667C g',
  radius: 1.93,
  distance: 7.23
}, {
  name: 'GJ 674 b',
  radius: 3.62,
  distance: 4.54
}, {
  name: 'GJ 676A b',
  radius: 13.21,
  distance: 16.45
}, {
  name: 'GJ 676A c',
  radius: 13.37,
  distance: 16.45
}, {
  name: 'GJ 676A d',
  radius: 1.9,
  distance: 16.45
}, {
  name: 'GJ 676A e',
  radius: 3.87,
  distance: 16.45
}, {
  name: 'GJ 832 b',
  radius: 14.13,
  distance: 4.94
}, {
  name: 'GJ 849 b',
  radius: 13.97,
  distance: 9.1
}, {
  name: 'GJ 849 c',
  radius: 13.98,
  distance: 9.1
}, {
  name: 'Gl 179 b',
  radius: 14.02,
  distance: 12.3
}, {
  name: 'Gl 581 b',
  radius: 4.29,
  distance: 6.21
}, {
  name: 'Gl 581 c',
  radius: 1.94,
  distance: 6.21
}, {
  name: 'Gl 581 d',
  radius: 2.05,
  distance: 6.21
}, {
  name: 'Gl 581 e',
  radius: 1.27,
  distance: 6.21
}, {
  name: 'Gl 649 b',
  radius: 14.44,
  distance: 10.34
}, {
  name: 'Gl 649 c',
  radius: 3.49,
  distance: 10.34
}, {
  name: 'Gl 86 b',
  radius: 13.31,
  distance: 10.9
}, {
  name: 'Gliese 876 b',
  radius: 13.56,
  distance: 4.7
}, {
  name: 'Gliese 876 c',
  radius: 14.08,
  distance: 4.7
}, {
  name: 'Gliese 876 d',
  radius: 2.15,
  distance: 4.7
}, {
  name: 'Gliese 876 e',
  radius: 4.09,
  distance: 4.7
}, {
  name: 'GQ Lup b',
  radius: 20.16,
  distance: 140
}, {
  name: 'GSC 06214-00210 b',
  radius: 12.69,
  distance: 145
}, {
  name: 'HAT-P-1 b',
  radius: 14.77,
  distance: 139
}, {
  name: 'HAT-P-11 b',
  radius: 4.73,
  distance: 38
}, {
  name: 'HAT-P-12 b',
  radius: 10.69,
  distance: 142.5
}, {
  name: 'HAT-P-13 b',
  radius: 14.34,
  distance: 214
}, {
  name: 'HAT-P-13 c',
  radius: 12.76,
  distance: 214
}, {
  name: 'HAT-P-14 b',
  radius: 13.44,
  distance: 205
}, {
  name: 'HAT-P-15 b',
  radius: 12.01,
  distance: 190
}, {
  name: 'HAT-P-16 b',
  radius: 14.44,
  distance: 235
}, {
  name: 'HAT-P-17 b',
  radius: 11.31,
  distance: 90
}, {
  name: 'HAT-P-17 c',
  radius: 13.77,
  distance: 90
}, {
  name: 'HAT-P-18 b',
  radius: 11.09,
  distance: 166
}, {
  name: 'HAT-P-19 b',
  radius: 12.68,
  distance: 215
}, {
  name: 'HAT-P-2 b',
  radius: 10.65,
  distance: 118
}, {
  name: 'HAT-P-20 b',
  radius: 9.71,
  distance: 70
}, {
  name: 'HAT-P-21 b',
  radius: 11.47,
  distance: 254
}, {
  name: 'HAT-P-22 b',
  radius: 12.1,
  distance: 82
}, {
  name: 'HAT-P-23 b',
  radius: 15.32,
  distance: 393
}, {
  name: 'HAT-P-24 b',
  radius: 13.91,
  distance: 306
}, {
  name: 'HAT-P-25 b',
  radius: 13.33,
  distance: 297
}, {
  name: 'HAT-P-26 b',
  radius: 6.32,
  distance: 134
}, {
  name: 'HAT-P-27-WASP-40 b',
  radius: 11.82,
  distance: 204
}, {
  name: 'HAT-P-28 b',
  radius: 13.57,
  distance: 395
}, {
  name: 'HAT-P-29 b',
  radius: 12.4,
  distance: 322
}, {
  name: 'HAT-P-3 b',
  radius: 9.26,
  distance: 130
}, {
  name: 'HAT-P-30-WASP-51 b',
  radius: 15.01,
  distance: 193
}, {
  name: 'HAT-P-31 b',
  radius: 11.98,
  distance: 354
}, {
  name: 'HAT-P-32 b',
  radius: 22.81,
  distance: 320
}, {
  name: 'HAT-P-33 b',
  radius: 20.46,
  distance: 419
}, {
  name: 'HAT-P-34 b',
  radius: 12.4,
  distance: 257
}, {
  name: 'HAT-P-35 b',
  radius: 14.92,
  distance: 535
}, {
  name: 'HAT-P-36 b',
  radius: 14.16,
  distance: 317
}, {
  name: 'HAT-P-37 b',
  radius: 13.19,
  distance: 411
}, {
  name: 'HAT-P-38 b',
  radius: 9.24,
  distance: 249
}, {
  name: 'HAT-P-39 b',
  radius: 17.6,
  distance: 642
}, {
  name: 'HAT-P-4 b',
  radius: 14.22,
  distance: 310
}, {
  name: 'HAT-P-40 b',
  radius: 19.38,
  distance: 501
}, {
  name: 'HAT-P-41 b',
  radius: 17.12,
  distance: 311
}, {
  name: 'HAT-P-42 b',
  radius: 14.3,
  distance: 447
}, {
  name: 'HAT-P-43 b',
  radius: 14.37,
  distance: 543
}, {
  name: 'HAT-P-44 b',
  radius: 14.34,
  distance: 374
}, {
  name: 'HAT-P-44 c',
  radius: 13.65,
  distance: 374
}, {
  name: 'HAT-P-45 b',
  radius: 15.97,
  distance: 305
}, {
  name: 'HAT-P-46 b',
  radius: 14.38,
  distance: 296
}, {
  name: 'HAT-P-46 c',
  radius: 13.55,
  distance: 296
}, {
  name: 'HAT-P-5 b',
  radius: 14.02,
  distance: 340
}, {
  name: 'HAT-P-6 b',
  radius: 14.9,
  distance: 200
}, {
  name: 'HAT-P-7 b',
  radius: 15.92,
  distance: 320
}, {
  name: 'HAT-P-8 b',
  radius: 16.8,
  distance: 230
}, {
  name: 'HAT-P-9 b',
  radius: 15.68,
  distance: 480
}, {
  name: 'HATS-1 b',
  radius: 14.58,
  distance: 303
}, {
  name: 'HATS-2 b',
  radius: 13.08,
  distance: 360
}, {
  name: 'HATS-3 b',
  radius: 15.47,
  distance: 453
}, {
  name: 'HD 100655 b',
  radius: 13.69,
  distance: 122
}, {
  name: 'HD 100777 b',
  radius: 13.86,
  distance: 52.8
}, {
  name: 'HD 10180 c',
  radius: 3.85,
  distance: 39.4
}, {
  name: 'HD 10180 d',
  radius: 3.62,
  distance: 39.4
}, {
  name: 'HD 10180 e',
  radius: 5.54,
  distance: 39.4
}, {
  name: 'HD 10180 f',
  radius: 5.39,
  distance: 39.4
}, {
  name: 'HD 10180 g',
  radius: 5.06,
  distance: 39.4
}, {
  name: 'HD 10180 h',
  radius: 9.38,
  distance: 39.4
}, {
  name: 'HD 101930 b',
  radius: 11.69,
  distance: 30.49
}, {
  name: 'HD 102117 b',
  radius: 8.56,
  distance: 42
}, {
  name: 'HD 102195 b',
  radius: 14.3,
  distance: 28.98
}, {
  name: 'HD 102272 b',
  radius: 13.14,
  distance: 360
}, {
  name: 'HD 102272 c',
  radius: 13.5,
  distance: 360
}, {
  name: 'HD 102329 b',
  radius: 13.14,
  distance: 158
}, {
  name: 'HD 102365 b',
  radius: 4.29,
  distance: 9.24
}, {
  name: 'HD 102956 b',
  radius: 13.94,
  distance: 126
}, {
  name: 'HD 103197 b',
  radius: 6.25,
  distance: 49.3
}, {
  name: 'HD 103774 b',
  radius: 14.32,
  distance: 55
}, {
  name: 'HD 104067 b',
  radius: 8.95,
  distance: 20.8
}, {
  name: 'HD 104985 b',
  radius: 13.11,
  distance: 102
}, {
  name: 'HD 106252 b',
  radius: 13.03,
  distance: 37.44
}, {
  name: 'HD 106270 b',
  radius: 12.87,
  distance: 84.9
}, {
  name: 'HD 10647 b',
  radius: 13.96,
  distance: 17.3
}, {
  name: 'HD 106515A b',
  radius: 12.87,
  distance: 35.2
}, {
  name: 'HD 10697 b',
  radius: 13.11,
  distance: 32.56
}, {
  name: 'HD 107148 b',
  radius: 9.57,
  distance: 51.3
}, {
  name: 'HD 108147 b',
  radius: 10.81,
  distance: 38.57
}, {
  name: 'HD 108863 b',
  radius: 13.5,
  distance: 139
}, {
  name: 'HD 108874 b',
  radius: 13.79,
  distance: 68.5
}, {
  name: 'HD 108874 c',
  radius: 13.92,
  distance: 68.5
}, {
  name: 'HD 109246 b',
  radius: 14.05,
  distance: 65.6
}, {
  name: 'HD 109271 b',
  radius: 4.85,
  distance: 62
}, {
  name: 'HD 109271 c',
  radius: 5.87,
  distance: 62
}, {
  name: 'HD 109749 b',
  radius: 11.25,
  distance: 59
}, {
  name: 'HD 110014 b',
  radius: 12.87,
  distance: 90
}, {
  name: 'HD 111232 b',
  radius: 13.08,
  distance: 29
}, {
  name: 'HD 113337 b',
  radius: 13.4,
  distance: 36.9
}, {
  name: 'HD 113538 b',
  radius: 11.02,
  distance: 15.8
}, {
  name: 'HD 113538 c',
  radius: 14.08,
  distance: 15.8
}, {
  name: 'HD 114386 b',
  radius: 13.83,
  distance: 28
}, {
  name: 'HD 114386 c',
  radius: 13.78,
  distance: 28
}, {
  name: 'HD 114729 b',
  radius: 14.01,
  distance: 35
}, {
  name: 'HD 114762 b',
  radius: 12.87,
  distance: 39.46
}, {
  name: 'HD 114783 b',
  radius: 13.93,
  distance: 20.4
}, {
  name: 'HD 11506 b',
  radius: 13.37,
  distance: 53.82
}, {
  name: 'HD 11506 c',
  radius: 14.02,
  distance: 53.82
}, {
  name: 'HD 116029 b',
  radius: 13.59,
  distance: 123.2
}, {
  name: 'HD 117207 b',
  radius: 13.6,
  distance: 33
}, {
  name: 'HD 117618 b',
  radius: 8.73,
  distance: 38
}, {
  name: 'HD 117618 c',
  radius: 10.1,
  distance: 38
}, {
  name: 'HD 118203 b',
  radius: 13.59,
  distance: 88.6
}, {
  name: 'HD 11964 b',
  radius: 14.14,
  distance: 33.98
}, {
  name: 'HD 11964 c',
  radius: 5.54,
  distance: 33.98
}, {
  name: 'HD 11977 b',
  radius: 13.09,
  distance: 66.5
}, {
  name: 'HD 120084 b',
  radius: 13.19,
  distance: 97.7
}, {
  name: 'HD 121504 b',
  radius: 13.84,
  distance: 44.37
}, {
  name: 'HD 122430 b',
  radius: 13.34,
  distance: 135
}, {
  name: 'HD 125595 b',
  radius: 3.89,
  distance: 27.4
}, {
  name: 'HD 125612 b',
  radius: 13.43,
  distance: 52.82
}, {
  name: 'HD 125612 c',
  radius: 4.66,
  distance: 52.82
}, {
  name: 'HD 125612 d',
  radius: 13.05,
  distance: 52.82
}, {
  name: 'HD 126525 b',
  radius: 9.93,
  distance: 38.1
}, {
  name: 'HD 12661 b',
  radius: 13.55,
  distance: 37.16
}, {
  name: 'HD 12661 c',
  radius: 13.72,
  distance: 37.16
}, {
  name: 'HD 126614 b',
  radius: 14.37,
  distance: 72.4
}, {
  name: 'HD 128311 b',
  radius: 13.57,
  distance: 16.6
}, {
  name: 'HD 128311 c',
  radius: 13.4,
  distance: 16.6
}, {
  name: 'HD 129445 b',
  radius: 13.71,
  distance: 67.61
}, {
  name: 'HD 130322 b',
  radius: 13.92,
  distance: 30
}, {
  name: 'HD 131496 b',
  radius: 13.57,
  distance: 110
}, {
  name: 'HD 13189 b',
  radius: 12.77,
  distance: 185
}, {
  name: 'HD 132406 b',
  radius: 13.16,
  distance: 71
}, {
  name: 'HD 132563B b',
  radius: 13.75,
  distance: 96
}, {
  name: 'HD 134060 b',
  radius: 3.52,
  distance: 24.2
}, {
  name: 'HD 134060 c',
  radius: 7.95,
  distance: 24.2
}, {
  name: 'HD 134606 b',
  radius: 2.57,
  distance: 26.5
}, {
  name: 'HD 134606 c',
  radius: 3.69,
  distance: 26.5
}, {
  name: 'HD 134606 d',
  radius: 7.03,
  distance: 26.5
}, {
  name: 'HD 134987 b',
  radius: 13.72,
  distance: 22.2
}, {
  name: 'HD 134987 c',
  radius: 14.02,
  distance: 22.2
}, {
  name: 'HD 136352 b',
  radius: 1.92,
  distance: 14.8
}, {
  name: 'HD 136352 c',
  radius: 3.56,
  distance: 14.8
}, {
  name: 'HD 136352 d',
  radius: 3.22,
  distance: 14.8
}, {
  name: 'HD 136418 b',
  radius: 13.61,
  distance: 98.2
}, {
  name: 'HD 137388 b',
  radius: 9.9,
  distance: 38
}, {
  name: 'HD 13808 b',
  radius: 3.37,
  distance: 28.6
}, {
  name: 'HD 13808 c',
  radius: 3.57,
  distance: 28.6
}, {
  name: 'HD 13908 b',
  radius: 13.93,
  distance: 71.2
}, {
  name: 'HD 13908 c',
  radius: 13.14,
  distance: 71.2
}, {
  name: 'HD 13931 b',
  radius: 13.64,
  distance: 44.2
}, {
  name: 'HD 139357 b',
  radius: 12.92,
  distance: 121.4
}, {
  name: 'HD 141937 b',
  radius: 12.93,
  distance: 33.46
}, {
  name: 'HD 142 b',
  radius: 13.82,
  distance: 20.6
}, {
  name: 'HD 142 c',
  radius: 13.19,
  distance: 20.6
}, {
  name: 'HD 142022 A b',
  radius: 13.2,
  distance: 35.87
}, {
  name: 'HD 142245 b',
  radius: 13.64,
  distance: 109.5
}, {
  name: 'HD 142415 b',
  radius: 13.71,
  distance: 34.2
}, {
  name: 'HD 143361 b',
  radius: 13.42,
  distance: 59.35
}, {
  name: 'HD 145377 b',
  radius: 13.15,
  distance: 57.7
}, {
  name: 'HD 145457 b',
  radius: 13.45,
  distance: 126
}, {
  name: 'HD 1461 b',
  radius: 2.3,
  distance: 23.4
}, {
  name: 'HD 1461 c',
  radius: 2.03,
  distance: 23.4
}, {
  name: 'HD 147018 b',
  radius: 13.59,
  distance: 42.96
}, {
  name: 'HD 147018 c',
  radius: 13.09,
  distance: 42.96
}, {
  name: 'HD 147513 b',
  radius: 13.84,
  distance: 12.9
}, {
  name: 'HD 148156 b',
  radius: 14,
  distance: 53.05
}, {
  name: 'HD 148427 b',
  radius: 13.94,
  distance: 59.3
}, {
  name: 'HD 149026 b',
  radius: 8.04,
  distance: 78.9
}, {
  name: 'HD 149143 b',
  radius: 13.79,
  distance: 63
}, {
  name: 'HD 1502 b',
  radius: 13.42,
  distance: 159
}, {
  name: 'HD 150433 b',
  radius: 8.45,
  distance: 29.6
}, {
  name: 'HD 150706 b',
  radius: 13.48,
  distance: 27.2
}, {
  name: 'HD 152079 b',
  radius: 13.43,
  distance: 85.17
}, {
  name: 'HD 152581 b',
  radius: 13.74,
  distance: 186
}, {
  name: 'HD 153950 b',
  radius: 13.48,
  distance: 49.6
}, {
  name: 'HD 154088 b',
  radius: 2.06,
  distance: 17.8
}, {
  name: 'HD 154345 b',
  radius: 13.93,
  distance: 18.06
}, {
  name: 'HD 154672 b',
  radius: 13.21,
  distance: 65.8
}, {
  name: 'HD 154857 b',
  radius: 13.66,
  distance: 68.5
}, {
  name: 'HD 155358 b',
  radius: 14,
  distance: 43
}, {
  name: 'HD 155358 c',
  radius: 14.02,
  distance: 43
}, {
  name: 'HD 156279 b',
  radius: 12.93,
  distance: 36.6
}, {
  name: 'HD 156411 b',
  radius: 14.06,
  distance: 55.1
}, {
  name: 'HD 156668 b',
  radius: 1.72,
  distance: 24.5
}, {
  name: 'HD 157172 b',
  radius: 7,
  distance: 31.9
}, {
  name: 'HD 158038 b',
  radius: 13.66,
  distance: 103.6
}, {
  name: 'HD 159243 b',
  radius: 13.81,
  distance: 69.2
}, {
  name: 'HD 159243 c',
  radius: 13.57,
  distance: 69.2
}, {
  name: 'HD 159868 b',
  radius: 13.59,
  distance: 52.7
}, {
  name: 'HD 159868 c',
  radius: 14.07,
  distance: 52.7
}, {
  name: 'HD 16141 b',
  radius: 9.7,
  distance: 35.9
}, {
  name: 'HD 16175 b',
  radius: 13.27,
  distance: 59.8
}, {
  name: 'HD 162020 b',
  radius: 12.76,
  distance: 31.26
}, {
  name: 'HD 163607 b',
  radius: 14.05,
  distance: 69
}, {
  name: 'HD 163607 c',
  radius: 13.55,
  distance: 69
}, {
  name: 'HD 16417 b',
  radius: 5.13,
  distance: 25.5
}, {
  name: 'HD 164509 b',
  radius: 14.26,
  distance: 52
}, {
  name: 'HD 164604 b',
  radius: 13.48,
  distance: 38
}, {
  name: 'HD 164922 b',
  radius: 14.4,
  distance: 21.93
}, {
  name: 'HD 166724 b',
  radius: 13.3,
  distance: 42.3
}, {
  name: 'HD 167042 b',
  radius: 13.71,
  distance: 50
}, {
  name: 'HD 168443 b',
  radius: 13.03,
  distance: 37.38
}, {
  name: 'HD 168443 c',
  radius: 12.69,
  distance: 37.38
}, {
  name: 'HD 168746 b',
  radius: 10.07,
  distance: 43.12
}, {
  name: 'HD 1690 b',
  radius: 13.12,
  distance: 319
}, {
  name: 'HD 169830 b',
  radius: 13.45,
  distance: 36.32
}, {
  name: 'HD 169830 c',
  radius: 13.3,
  distance: 36.32
}, {
  name: 'HD 170469 b',
  radius: 14.11,
  distance: 64.97
}, {
  name: 'HD 17092 b',
  radius: 13.25,
  distance: 109
}, {
  name: 'HD 171028 b',
  radius: 13.62,
  distance: 90
}, {
  name: 'HD 171238 b',
  radius: 13.5,
  distance: 50.28
}, {
  name: 'HD 17156 b',
  radius: 12.26,
  distance: 78.24
}, {
  name: 'HD 173416 b',
  radius: 13.48,
  distance: 135
}, {
  name: 'HD 175167 b',
  radius: 13.02,
  distance: 67.02
}, {
  name: 'HD 175541 b',
  radius: 14.15,
  distance: 128
}, {
  name: 'HD 176051 b',
  radius: 13.74,
  distance: 14.99
}, {
  name: 'HD 177830 b',
  radius: 13.75,
  distance: 59
}, {
  name: 'HD 177830 c',
  radius: 7.93,
  distance: 59
}, {
  name: 'HD 178911 B b',
  radius: 13.11,
  distance: 46.73
}, {
  name: 'HD 179079 b',
  radius: 5.58,
  distance: 63.69
}, {
  name: 'HD 179949 b',
  radius: 13.95,
  distance: 27
}, {
  name: 'HD 180314 b',
  radius: 12.58,
  distance: 132
}, {
  name: 'HD 180902 b',
  radius: 13.71,
  distance: 110
}, {
  name: 'HD 181342 b',
  radius: 13.39,
  distance: 110.6
}, {
  name: 'HD 181433 b',
  radius: 2.3,
  distance: 26.15
}, {
  name: 'HD 181433 c',
  radius: 14.13,
  distance: 26.15
}, {
  name: 'HD 181433 d',
  radius: 14.21,
  distance: 26.15
}, {
  name: 'HD 181720 b',
  radius: 14.39,
  distance: 56
}, {
  name: 'HD 183263 b',
  radius: 13.35,
  distance: 53
}, {
  name: 'HD 183263 c',
  radius: 13.33,
  distance: 53
}, {
  name: 'HD 185269 b',
  radius: 13.95,
  distance: 47
}, {
  name: 'HD 187085 b',
  radius: 14.06,
  distance: 44.98
}, {
  name: 'HD 187123 b',
  radius: 14.23,
  distance: 50
}, {
  name: 'HD 187123 c',
  radius: 13.62,
  distance: 50
}, {
  name: 'HD 18742 b',
  radius: 13.48,
  distance: 135
}, {
  name: 'HD 188015 b',
  radius: 13.82,
  distance: 52.6
}, {
  name: 'HD 189567 b',
  radius: 3.32,
  distance: 17.7
}, {
  name: 'HD 189733 b',
  radius: 12.75,
  distance: 19.3
}, {
  name: 'HD 190360 b',
  radius: 13.74,
  distance: 15.89
}, {
  name: 'HD 190360 c',
  radius: 4.61,
  distance: 15.89
}, {
  name: 'HD 190647 b',
  radius: 13.64,
  distance: 54.2
}, {
  name: 'HD 190984 b',
  radius: 13.42,
  distance: 103
}, {
  name: 'HD 192263 b',
  radius: 14.07,
  distance: 19.9
}, {
  name: 'HD 192310 b',
  radius: 4.43,
  distance: 8.82
}, {
  name: 'HD 192310 c',
  radius: 5.38,
  distance: 8.82
}, {
  name: 'HD 192699 b',
  radius: 13.51,
  distance: 67
}, {
  name: 'HD 195019 b',
  radius: 13.34,
  distance: 37.36
}, {
  name: 'HD 196050 b',
  radius: 13.46,
  distance: 46.9
}, {
  name: 'HD 196067 b',
  radius: 13.01,
  distance: 44.3
}, {
  name: 'HD 196885 A b',
  radius: 13.44,
  distance: 33
}, {
  name: 'HD 197037 b',
  radius: 14.03,
  distance: 33
}, {
  name: 'HD 19994 b',
  radius: 13.69,
  distance: 22.38
}, {
  name: 'HD 20003 b',
  radius: 3.67,
  distance: 43.8
}, {
  name: 'HD 20003 c',
  radius: 3.9,
  distance: 43.8
}, {
  name: 'HD 200964 b',
  radius: 13.65,
  distance: 68.4
}, {
  name: 'HD 200964 c',
  radius: 13.97,
  distance: 68.4
}, {
  name: 'HD 202206 b',
  radius: 12.68,
  distance: 46.34
}, {
  name: 'HD 202206 c',
  radius: 13.52,
  distance: 46.34
}, {
  name: 'HD 20367 b',
  radius: 13.9,
  distance: 27
}, {
  name: 'HD 2039 b',
  radius: 13.22,
  distance: 89.8
}, {
  name: 'HD 204313 b',
  radius: 13.36,
  distance: 47.37
}, {
  name: 'HD 204313 c',
  radius: 4.48,
  distance: 47.37
}, {
  name: 'HD 204313 d',
  radius: 13.69,
  distance: 47.37
}, {
  name: 'HD 204941 b',
  radius: 10.93,
  distance: 27
}, {
  name: 'HD 205739 b',
  radius: 13.78,
  distance: 90.3
}, {
  name: 'HD 206610 b',
  radius: 13.57,
  distance: 194
}, {
  name: 'HD 20781 b',
  radius: 3.67,
  distance: 35.4
}, {
  name: 'HD 20781 c',
  radius: 4.27,
  distance: 35.4
}, {
  name: 'HD 20782 b',
  radius: 13.64,
  distance: 36.02
}, {
  name: 'HD 207832 b',
  radius: 14.13,
  distance: 54.4
}, {
  name: 'HD 207832 c',
  radius: 14,
  distance: 54.4
}, {
  name: 'HD 20794 b',
  radius: 1.44,
  distance: 6.06
}, {
  name: 'HD 20794 c',
  radius: 1.38,
  distance: 6.06
}, {
  name: 'HD 20794 d',
  radius: 1.83,
  distance: 6.06
}, {
  name: 'HD 208487 b',
  radius: 14.34,
  distance: 45
}, {
  name: 'HD 208527 b',
  radius: 12.86,
  distance: 320.2
}, {
  name: 'HD 20868 b',
  radius: 13.62,
  distance: 48.9
}, {
  name: 'HD 209458 b',
  radius: 15.46,
  distance: 47
}, {
  name: 'HD 210277 b',
  radius: 13.83,
  distance: 21.29
}, {
  name: 'HD 210702 b',
  radius: 13.64,
  distance: 56
}, {
  name: 'HD 212301 b',
  radius: 14.3,
  distance: 52.7
}, {
  name: 'HD 212771 b',
  radius: 13.55,
  distance: 131
}, {
  name: 'HD 213240 b',
  radius: 13.26,
  distance: 40.75
}, {
  name: 'HD 215152 b',
  radius: 1.45,
  distance: 21.5
}, {
  name: 'HD 215152 c',
  radius: 1.52,
  distance: 21.5
}, {
  name: 'HD 215456 b',
  radius: 6.35,
  distance: 38
}, {
  name: 'HD 215456 c',
  radius: 10.46,
  distance: 38
}, {
  name: 'HD 215497 b',
  radius: 2.1,
  distance: 44
}, {
  name: 'HD 215497 c',
  radius: 14.44,
  distance: 44
}, {
  name: 'HD 216435 b',
  radius: 13.82,
  distance: 33.3
}, {
  name: 'HD 216437 b',
  radius: 13.66,
  distance: 26.5
}, {
  name: 'HD 216770 b',
  radius: 14.12,
  distance: 38
}, {
  name: 'HD 21693 b',
  radius: 3.35,
  distance: 32.4
}, {
  name: 'HD 21693 c',
  radius: 4.95,
  distance: 32.4
}, {
  name: 'HD 217107 b',
  radius: 13.8,
  distance: 19.72
}, {
  name: 'HD 217107 c',
  radius: 13.52,
  distance: 19.72
}, {
  name: 'HD 217786 b',
  radius: 12.8,
  distance: 54.8
}, {
  name: 'HD 218566 b',
  radius: 9.57,
  distance: 29.94
}, {
  name: 'HD 219077 b',
  radius: 12.84,
  distance: 29.35
}, {
  name: 'HD 219415 b',
  radius: 13.86,
  distance: null
}, {
  name: 'HD 219828 b',
  radius: 5.01,
  distance: 81.1
}, {
  name: 'HD 220074 b',
  radius: 12.81,
  distance: 290.2
}, {
  name: 'HD 220689 b',
  radius: 13.83,
  distance: 44.6
}, {
  name: 'HD 220773 b',
  radius: 13.76,
  distance: 49
}, {
  name: 'HD 221287 b',
  radius: 13.42,
  distance: 52.9
}, {
  name: 'HD 222155 b',
  radius: 13.64,
  distance: 49.1
}, {
  name: 'HD 222582 b',
  radius: 13.02,
  distance: 42
}, {
  name: 'HD 224693 b',
  radius: 14.08,
  distance: 94
}, {
  name: 'HD 22781 b',
  radius: 12.78,
  distance: 31.79
}, {
  name: 'HD 23079 b',
  radius: 13.51,
  distance: 34.8
}, {
  name: 'HD 23127 b',
  radius: 13.74,
  distance: 89.1
}, {
  name: 'HD 231701 b',
  radius: 13.89,
  distance: 108.4
}, {
  name: 'HD 233604 b',
  radius: 13.03,
  distance: null
}, {
  name: 'HD 23596 b',
  radius: 13,
  distance: 52
}, {
  name: 'HD 240210 b',
  radius: 13.07,
  distance: 143
}, {
  name: 'HD 240237 b',
  radius: 13.19,
  distance: 1500
}, {
  name: 'HD 24040 b',
  radius: 13.31,
  distance: 46.51
}, {
  name: 'HD 25171 b',
  radius: 13.95,
  distance: 55
}, {
  name: 'HD 2638 b',
  radius: 14.26,
  distance: 53.71
}, {
  name: 'HD 27442 b',
  radius: 13.79,
  distance: 18.1
}, {
  name: 'HD 27631 b',
  radius: 13.69,
  distance: 45.5
}, {
  name: 'HD 27894 b',
  radius: 14.15,
  distance: 42.37
}, {
  name: 'HD 28185 b',
  radius: 13.15,
  distance: 39.4
}, {
  name: 'HD 28254 b',
  radius: 13.86,
  distance: 56.2
}, {
  name: 'HD 285507 b',
  radius: 13.9,
  distance: 41.3
}, {
  name: 'HD 28678 b',
  radius: 13.69,
  distance: 227
}, {
  name: 'HD 290327 b',
  radius: 13.51,
  distance: 54.9
}, {
  name: 'HD 2952 b',
  radius: 13.65,
  distance: 115.2
}, {
  name: 'HD 30177 b',
  radius: 13.02,
  distance: 55
}, {
  name: 'HD 30562 b',
  radius: 13.81,
  distance: 26.5
}, {
  name: 'HD 30856 b',
  radius: 13.66,
  distance: 118.1
}, {
  name: 'HD 31253 b',
  radius: 14.25,
  distance: 53.82
}, {
  name: 'HD 31527 b',
  radius: 3.58,
  distance: 38.6
}, {
  name: 'HD 31527 c',
  radius: 4.28,
  distance: 38.6
}, {
  name: 'HD 31527 d',
  radius: 4.38,
  distance: 38.6
}, {
  name: 'HD 32518 b',
  radius: 13.43,
  distance: 117.4
}, {
  name: 'HD 330075 b',
  radius: 14.15,
  distance: 50.2
}, {
  name: 'HD 33142 b',
  radius: 13.81,
  distance: 126
}, {
  name: 'HD 33283 b',
  radius: 14.44,
  distance: 86
}, {
  name: 'HD 33564 b',
  radius: 12.95,
  distance: 20.98
}, {
  name: 'HD 34445 b',
  radius: 14.03,
  distance: 46.5
}, {
  name: 'HD 3651 b',
  radius: 9.32,
  distance: 11
}, {
  name: 'HD 3651 c',
  radius: 6.46,
  distance: 11
}, {
  name: 'HD 37124 b',
  radius: 14.11,
  distance: 33
}, {
  name: 'HD 37124 c',
  radius: 14.12,
  distance: 33
}, {
  name: 'HD 37124 d',
  radius: 14.09,
  distance: 33
}, {
  name: 'HD 37605 b',
  radius: 13.46,
  distance: 44
}, {
  name: 'HD 37605 c',
  radius: 13.32,
  distance: 44
}, {
  name: 'HD 38283 b',
  radius: 14.43,
  distance: 37.7
}, {
  name: 'HD 38529 b',
  radius: 14.04,
  distance: 39.28
}, {
  name: 'HD 38529 c',
  radius: 12.67,
  distance: 39.28
}, {
  name: 'HD 38801 b',
  radius: 12.89,
  distance: 99.4
}, {
  name: 'HD 38858 b',
  radius: 6.18,
  distance: 15.2
}, {
  name: 'HD 39091 b',
  radius: 12.9,
  distance: 18.32
}, {
  name: 'HD 39194 b',
  radius: 1.64,
  distance: 25.9
}, {
  name: 'HD 39194 c',
  radius: 2.03,
  distance: 25.9
}, {
  name: 'HD 39194 d',
  radius: 1.9,
  distance: 25.9
}, {
  name: 'HD 40307 b',
  radius: 1.69,
  distance: 12.8
}, {
  name: 'HD 40307 c',
  radius: 2.14,
  distance: 12.8
}, {
  name: 'HD 40307 d',
  radius: 3.21,
  distance: 12.8
}, {
  name: 'HD 40307 e',
  radius: 1.7,
  distance: 12.8
}, {
  name: 'HD 40307 f',
  radius: 2.04,
  distance: 12.8
}, {
  name: 'HD 40307 g',
  radius: 2.39,
  distance: 12.8
}, {
  name: 'HD 40979 b',
  radius: 13.39,
  distance: 33.3
}, {
  name: 'HD 41004 A b',
  radius: 13.51,
  distance: 42.5
}, {
  name: 'HD 41004 B b',
  radius: 12.66,
  distance: 43.03
}, {
  name: 'HD 4113 b',
  radius: 13.72,
  distance: 44
}, {
  name: 'HD 41248 b',
  radius: 4.03,
  distance: 52.38
}, {
  name: 'HD 41248 c',
  radius: 3.3,
  distance: 52.38
}, {
  name: 'HD 4203 b',
  radius: 13.6,
  distance: 77.5
}, {
  name: 'HD 4208 b',
  radius: 14.03,
  distance: 33.9
}, {
  name: 'HD 4308 b',
  radius: 3.81,
  distance: 21.9
}, {
  name: 'HD 4313 b',
  radius: 13.55,
  distance: 137
}, {
  name: 'HD 43197 b',
  radius: 14.16,
  distance: 54.9
}, {
  name: 'HD 43691 b',
  radius: 13.52,
  distance: 93.2
}, {
  name: 'HD 44219 b',
  radius: 14.18,
  distance: 50.43
}, {
  name: 'HD 45184 b',
  radius: 3.78,
  distance: 21.9
}, {
  name: 'HD 45350 b',
  radius: 13.66,
  distance: 49
}, {
  name: 'HD 45364 b',
  radius: 8.98,
  distance: 32.6
}, {
  name: 'HD 45364 c',
  radius: 14.12,
  distance: 32.6
}, {
  name: 'HD 45652 b',
  radius: 14.27,
  distance: 36
}, {
  name: 'HD 46375 b',
  radius: 10.53,
  distance: 33.4
}, {
  name: 'HD 47186 b',
  radius: 5.24,
  distance: 37.84
}, {
  name: 'HD 47186 c',
  radius: 14.41,
  distance: 37.84
}, {
  name: 'HD 47536 b',
  radius: 13.21,
  distance: 121.36
}, {
  name: 'HD 47536 c',
  radius: 13,
  distance: 121.36
}, {
  name: 'HD 48265 b',
  radius: 13.86,
  distance: 87.4
}, {
  name: 'HD 49674 b',
  radius: 6.83,
  distance: 40.7
}, {
  name: 'HD 50499 b',
  radius: 13.68,
  distance: 47.26
}, {
  name: 'HD 50554 b',
  radius: 13.2,
  distance: 31.03
}, {
  name: 'HD 51608 b',
  radius: 3.85,
  distance: 34.8
}, {
  name: 'HD 51608 c',
  radius: 4.59,
  distance: 34.8
}, {
  name: 'HD 52265 b',
  radius: 13.9,
  distance: 28
}, {
  name: 'HD 52265 c',
  radius: 14.35,
  distance: 28
}, {
  name: 'HD 5319 b',
  radius: 13.63,
  distance: 100
}, {
  name: 'HD 5608 b',
  radius: 13.71,
  distance: 58.2
}, {
  name: 'HD 5891 b',
  radius: 13.03,
  distance: 251
}, {
  name: 'HD 59686 b',
  radius: 13.19,
  distance: 92
}, {
  name: 'HD 60532 b',
  radius: 13.41,
  distance: 25.7
}, {
  name: 'HD 60532 c',
  radius: 13.04,
  distance: 25.7
}, {
  name: 'HD 62509 b',
  radius: 13.45,
  distance: 10.34
}, {
  name: 'HD 63454 b',
  radius: 14.37,
  distance: 35.8
}, {
  name: 'HD 63765 b',
  radius: 14.13,
  distance: 32.6
}, {
  name: 'HD 6434 b',
  radius: 14.36,
  distance: 40.32
}, {
  name: 'HD 65216 b',
  radius: 13.84,
  distance: 34.3
}, {
  name: 'HD 65216 c',
  radius: 9.22,
  distance: 34.3
}, {
  name: 'HD 66141 b',
  radius: 13.07,
  distance: 80.9
}, {
  name: 'HD 66428 b',
  radius: 13.46,
  distance: 55
}, {
  name: 'HD 6718 b',
  radius: 13.72,
  distance: 55.9
}, {
  name: 'HD 68988 b',
  radius: 13.64,
  distance: 58
}, {
  name: 'HD 69830 b',
  radius: 3.4,
  distance: 12.6
}, {
  name: 'HD 69830 c',
  radius: 3.68,
  distance: 12.6
}, {
  name: 'HD 69830 d',
  radius: 4.66,
  distance: 12.6
}, {
  name: 'HD 70573 b',
  radius: 13.12,
  distance: 45.7
}, {
  name: 'HD 70642 b',
  radius: 13.61,
  distance: 28.8
}, {
  name: 'HD 7199 b',
  radius: 11.47,
  distance: 36
}, {
  name: 'HD 72659 b',
  radius: 13.41,
  distance: 49.8
}, {
  name: 'HD 73256 b',
  radius: 13.64,
  distance: 36.5
}, {
  name: 'HD 73267 b',
  radius: 13.42,
  distance: 54.91
}, {
  name: 'HD 73526 b',
  radius: 13.45,
  distance: 99
}, {
  name: 'HD 73526 c',
  radius: 13.51,
  distance: 99
}, {
  name: 'HD 73534 b',
  radius: 13.86,
  distance: 96.99
}, {
  name: 'HD 74156 b',
  radius: 13.64,
  distance: 64.56
}, {
  name: 'HD 74156 c',
  radius: 13.01,
  distance: 64.56
}, {
  name: 'HD 7449 b',
  radius: 13.88,
  distance: 39
}, {
  name: 'HD 7449 c',
  radius: 13.61,
  distance: 39
}, {
  name: 'HD 75289 b',
  radius: 14.33,
  distance: 28.94
}, {
  name: 'HD 75898 b',
  radius: 13.51,
  distance: 80.58
}, {
  name: 'HD 76700 b',
  radius: 9.24,
  distance: 59.7
}, {
  name: 'HD 77338 b',
  radius: 14.18,
  distance: 40.75
}, {
  name: 'HD 7924 b',
  radius: 2.56,
  distance: 16.8
}, {
  name: 'HD 79498 b',
  radius: 13.79,
  distance: 49
}, {
  name: 'HD 80606 b',
  radius: 10.32,
  distance: 58.4
}, {
  name: 'HD 81040 b',
  radius: 13.07,
  distance: 32.56
}, {
  name: 'HD 81688 b',
  radius: 13.48,
  distance: 88.26
}, {
  name: 'HD 82886 b',
  radius: 13.81,
  distance: 125
}, {
  name: 'HD 82943 b',
  radius: 13.23,
  distance: 27.46
}, {
  name: 'HD 82943 c',
  radius: 13.23,
  distance: 27.46
}, {
  name: 'HD 82943 d',
  radius: 14.43,
  distance: 27.46
}, {
  name: 'HD 83443 b',
  radius: 14.35,
  distance: 43.54
}, {
  name: 'HD 8535 b',
  radius: 14.1,
  distance: 52.5
}, {
  name: 'HD 85390 b',
  radius: 7.38,
  distance: 33.96
}, {
  name: 'HD 85390 c',
  radius: 10.1,
  distance: 33.96
}, {
  name: 'HD 85512 b',
  radius: 1.6,
  distance: 11.15
}, {
  name: 'HD 8574 b',
  radius: 13.59,
  distance: 44.2
}, {
  name: 'HD 86081 b',
  radius: 13.74,
  distance: 91
}, {
  name: 'HD 86226 b',
  radius: 13.74,
  distance: 42.48
}, {
  name: 'HD 86264 b',
  radius: 13.07,
  distance: 72.6
}, {
  name: 'HD 8673 b',
  radius: 12.77,
  distance: 38.25
}, {
  name: 'HD 87883 b',
  radius: 12.83,
  distance: 18.1
}, {
  name: 'HD 88133 b',
  radius: 9.83,
  distance: 74.5
}, {
  name: 'HD 89307 b',
  radius: 13.61,
  distance: 30.9
}, {
  name: 'HD 89744 b',
  radius: 13.05,
  distance: 40
}, {
  name: 'HD 89744 c',
  radius: 13.34,
  distance: 40
}, {
  name: 'HD 90156 b',
  radius: 4.61,
  distance: 39.6
}, {
  name: 'HD 92788 b',
  radius: 13.32,
  distance: 32.82
}, {
  name: 'HD 92788 c',
  radius: 13.91,
  distance: 32.82
}, {
  name: 'HD 93083 b',
  radius: 14.39,
  distance: 28.9
}, {
  name: 'HD 93385 b',
  radius: 2.42,
  distance: 42.2
}, {
  name: 'HD 93385 c',
  radius: 3.33,
  distance: 42.2
}, {
  name: 'HD 9446 b',
  radius: 14.09,
  distance: 53
}, {
  name: 'HD 9446 c',
  radius: 13.66,
  distance: 53
}, {
  name: 'HD 95086 b',
  radius: 13.19,
  distance: 90.4
}, {
  name: 'HD 95089 b',
  radius: 13.84,
  distance: 139
}, {
  name: 'HD 9578 b',
  radius: 14.08,
  distance: 57.24
}, {
  name: 'HD 96063 b',
  radius: 13.97,
  distance: 158
}, {
  name: 'HD 96127 b',
  radius: 13.31,
  distance: 540
}, {
  name: 'HD 96167 b',
  radius: 14.1,
  distance: 84
}, {
  name: 'HD 96700 b',
  radius: 2.53,
  distance: 25.6
}, {
  name: 'HD 96700 c',
  radius: 3.78,
  distance: 25.6
}, {
  name: 'HD 97658 b',
  radius: 2.34,
  distance: 21.1
}, {
  name: 'HD 98219 b',
  radius: 13.66,
  distance: 134
}, {
  name: 'HD 98649 b',
  radius: 13.02,
  distance: 40.3
}, {
  name: 'HD 99109 b',
  radius: 14.24,
  distance: 60.5
}, {
  name: 'HD 99492 b',
  radius: 6.63,
  distance: 18
}, {
  name: 'HD 99492 c',
  radius: 14.4,
  distance: 18
}, {
  name: 'HD 99706 b',
  radius: 13.77,
  distance: 129
}, {
  name: 'HIP 12961 b',
  radius: 14.41,
  distance: 23
}, {
  name: 'HIP 13044 b',
  radius: 13.82,
  distance: 701
}, {
  name: 'HIP 14810 b',
  radius: 13.32,
  distance: 52.9
}, {
  name: 'HIP 14810 c',
  radius: 13.81,
  distance: 52.9
}, {
  name: 'HIP 14810 d',
  radius: 14.18,
  distance: 52.9
}, {
  name: 'HIP 5158 b',
  radius: 13.76,
  distance: 45
}, {
  name: 'HIP 5158 c',
  radius: 12.74,
  distance: 45
}, {
  name: 'HIP 57050 b',
  radius: 11.65,
  distance: 11
}, {
  name: 'HIP 57274 b',
  radius: 3.57,
  distance: 25.92
}, {
  name: 'HIP 57274 c',
  radius: 14.34,
  distance: 25.92
}, {
  name: 'HIP 57274 d',
  radius: 14.22,
  distance: 25.92
}, {
  name: 'HIP 63242 b',
  radius: 12.89,
  distance: 135
}, {
  name: 'HIP 70849 b',
  radius: 12.96,
  distance: 24
}, {
  name: 'HIP 75458 b',
  radius: 12.97,
  distance: 31.5
}, {
  name: 'HIP 77900 b',
  radius: 12.56,
  distance: null
}, {
  name: 'HIP 78530 b',
  radius: 12.57,
  distance: 156.7
}, {
  name: 'HIP 79431 b',
  radius: 13.59,
  distance: 14.4
}, {
  name: 'HIP 91258 b',
  radius: 13.83,
  distance: 44.9
}, {
  name: 'HN Peg b',
  radius: 12.32,
  distance: 18.4
}, {
  name: 'HR 228 b',
  radius: 13.47,
  distance: null
}, {
  name: 'HR 228 c',
  radius: 13.47,
  distance: null
}, {
  name: 'HR 810 b',
  radius: 13.56,
  distance: 17.17
}, {
  name: 'HR 8799 b',
  radius: 12.32,
  distance: 39.4
}, {
  name: 'HR 8799 c',
  radius: 14.56,
  distance: 39.4
}, {
  name: 'HR 8799 d',
  radius: 13.44,
  distance: 39.4
}, {
  name: 'HR 8799 e',
  radius: 12.96,
  distance: 39.4
}, {
  name: 'HU Aqr(AB) c',
  radius: 13.08,
  distance: null
}, {
  name: 'HW Vir(AB) b',
  radius: 12.76,
  distance: 181
}, {
  name: 'kappa And b',
  radius: 12.74,
  distance: 51.6
}, {
  name: 'kappa CrB b',
  radius: 13.71,
  distance: 31.1
}, {
  name: 'KELT-1 b',
  radius: 12.5,
  distance: 263
}, {
  name: 'KELT-2A b',
  radius: 14.63,
  distance: 128.9
}, {
  name: 'KELT-3 b',
  radius: 14.93,
  distance: 178
}, {
  name: 'KELT-6 b',
  radius: 13.33,
  distance: null
}, {
  name: 'Kepler-10 b',
  radius: 1.41,
  distance: 173
}, {
  name: 'Kepler-10 c',
  radius: 2.23,
  distance: 173
}, {
  name: 'Kepler-11 b',
  radius: 1.8,
  distance: null
}, {
  name: 'Kepler-11 c',
  radius: 2.87,
  distance: null
}, {
  name: 'Kepler-11 d',
  radius: 3.12,
  distance: null
}, {
  name: 'Kepler-11 e',
  radius: 4.53,
  distance: null
}, {
  name: 'Kepler-11 f',
  radius: 2.49,
  distance: null
}, {
  name: 'Kepler-11 g',
  radius: 3.67,
  distance: null
}, {
  name: 'Kepler-12 b',
  radius: 18.98,
  distance: null
}, {
  name: 'Kepler-13 b',
  radius: 20.5,
  distance: null
}, {
  name: 'Kepler-14 b',
  radius: 12.72,
  distance: 980
}, {
  name: 'Kepler-15 b',
  radius: 10.75,
  distance: null
}, {
  name: 'Kepler-16(AB) b',
  radius: 8.44,
  distance: null
}, {
  name: 'Kepler-17 b',
  radius: 14.69,
  distance: 800
}, {
  name: 'Kepler-18 b',
  radius: 2,
  distance: null
}, {
  name: 'Kepler-18 c',
  radius: 5.48,
  distance: null
}, {
  name: 'Kepler-18 d',
  radius: 6.96,
  distance: null
}, {
  name: 'Kepler-19 b',
  radius: 2.22,
  distance: null
}, {
  name: 'Kepler-20 b',
  radius: 1.9,
  distance: 290
}, {
  name: 'Kepler-20 c',
  radius: 3.06,
  distance: 290
}, {
  name: 'Kepler-20 d',
  radius: 2.8,
  distance: 290
}, {
  name: 'Kepler-20 e',
  radius: 0.87,
  distance: 290
}, {
  name: 'Kepler-20 f',
  radius: 1.01,
  distance: 290
}, {
  name: 'Kepler-21 b',
  radius: 1.63,
  distance: 108
}, {
  name: 'Kepler-22 b',
  radius: 2.35,
  distance: 190
}, {
  name: 'Kepler-23 b',
  radius: 1.9,
  distance: null
}, {
  name: 'Kepler-23 c',
  radius: 3.25,
  distance: null
}, {
  name: 'Kepler-24 b',
  radius: 2.35,
  distance: null
}, {
  name: 'Kepler-24 c',
  radius: 2.8,
  distance: null
}, {
  name: 'Kepler-25 b',
  radius: 2.58,
  distance: null
}, {
  name: 'Kepler-25 c',
  radius: 4.48,
  distance: null
}, {
  name: 'Kepler-26 b',
  radius: 3.58,
  distance: null
}, {
  name: 'Kepler-26 c',
  radius: 3.58,
  distance: null
}, {
  name: 'Kepler-27 b',
  radius: 4.03,
  distance: null
}, {
  name: 'Kepler-27 c',
  radius: 4.93,
  distance: null
}, {
  name: 'Kepler-28 b',
  radius: 3.58,
  distance: null
}, {
  name: 'Kepler-28 c',
  radius: 3.36,
  distance: null
}, {
  name: 'Kepler-29 b',
  radius: 3.58,
  distance: null
}, {
  name: 'Kepler-29 c',
  radius: 2.91,
  distance: null
}, {
  name: 'Kepler-30 b',
  radius: 3.92,
  distance: null
}, {
  name: 'Kepler-30 c',
  radius: 12.32,
  distance: null
}, {
  name: 'Kepler-30 d',
  radius: 8.85,
  distance: null
}, {
  name: 'Kepler-31 b',
  radius: 4.26,
  distance: null
}, {
  name: 'Kepler-31 c',
  radius: 4.26,
  distance: null
}, {
  name: 'Kepler-32 b',
  radius: 4.14,
  distance: null
}, {
  name: 'Kepler-32 c',
  radius: 3.7,
  distance: null
}, {
  name: 'Kepler-33 b',
  radius: 1.79,
  distance: null
}, {
  name: 'Kepler-33 c',
  radius: 3.25,
  distance: null
}, {
  name: 'Kepler-33 d',
  radius: 5.38,
  distance: null
}, {
  name: 'Kepler-33 e',
  radius: 4.03,
  distance: null
}, {
  name: 'Kepler-33 f',
  radius: 4.48,
  distance: null
}, {
  name: 'Kepler-34(AB)  b',
  radius: 8.55,
  distance: 1499
}, {
  name: 'Kepler-35(AB) b',
  radius: 8.15,
  distance: 1645
}, {
  name: 'Kepler-36 b',
  radius: 1.48,
  distance: null
}, {
  name: 'Kepler-36 c',
  radius: 3.68,
  distance: null
}, {
  name: 'Kepler-37 b',
  radius: 0.3,
  distance: 66
}, {
  name: 'Kepler-37 c',
  radius: 0.74,
  distance: 66
}, {
  name: 'Kepler-37 d',
  radius: 1.98,
  distance: 66
}, {
  name: 'Kepler-38(AB) b',
  radius: 4.37,
  distance: null
}, {
  name: 'Kepler-39 b',
  radius: 13.66,
  distance: 1200
}, {
  name: 'Kepler-4 b',
  radius: 4,
  distance: 550
}, {
  name: 'Kepler-40 b',
  radius: 13.1,
  distance: 2700
}, {
  name: 'Kepler-41  b',
  radius: 9.42,
  distance: 730
}, {
  name: 'Kepler-42 b',
  radius: 0.78,
  distance: 38.7
}, {
  name: 'Kepler-42 c',
  radius: 0.73,
  distance: 38.7
}, {
  name: 'Kepler-42 d',
  radius: 0.57,
  distance: 38.7
}, {
  name: 'Kepler-43 b',
  radius: 13.44,
  distance: 1950
}, {
  name: 'Kepler-44 b',
  radius: 13.89,
  distance: 2250
}, {
  name: 'Kepler-45 b',
  radius: 10.75,
  distance: 333
}, {
  name: 'Kepler-46 b',
  radius: 9.09,
  distance: 857
}, {
  name: 'Kepler-46 c',
  radius: 14.38,
  distance: 857
}, {
  name: 'Kepler-47(AB) b',
  radius: 3.02,
  distance: null
}, {
  name: 'Kepler-47(AB) c',
  radius: 4.59,
  distance: null
}, {
  name: 'Kepler-48 b',
  radius: 2.02,
  distance: null
}, {
  name: 'Kepler-48 c',
  radius: 3.36,
  distance: null
}, {
  name: 'Kepler-49 b',
  radius: 2.69,
  distance: null
}, {
  name: 'Kepler-49 c',
  radius: 2.58,
  distance: null
}, {
  name: 'Kepler-5 b',
  radius: 16.03,
  distance: null
}, {
  name: 'Kepler-50 b',
  radius: 2.24,
  distance: null
}, {
  name: 'Kepler-50 c',
  radius: 2.8,
  distance: null
}, {
  name: 'Kepler-51 b',
  radius: 7.06,
  distance: null
}, {
  name: 'Kepler-51 c',
  radius: 5.71,
  distance: null
}, {
  name: 'Kepler-52 b',
  radius: 2.13,
  distance: null
}, {
  name: 'Kepler-52 c',
  radius: 1.79,
  distance: null
}, {
  name: 'Kepler-53 b',
  radius: 2.91,
  distance: null
}, {
  name: 'Kepler-53 c',
  radius: 3.14,
  distance: null
}, {
  name: 'Kepler-54 b',
  radius: 2.13,
  distance: null
}, {
  name: 'Kepler-54 c',
  radius: 1.23,
  distance: null
}, {
  name: 'Kepler-55 b',
  radius: 2.46,
  distance: null
}, {
  name: 'Kepler-55 c',
  radius: 2.24,
  distance: null
}, {
  name: 'Kepler-56 b',
  radius: 6.5,
  distance: null
}, {
  name: 'Kepler-56 c',
  radius: 9.86,
  distance: null
}, {
  name: 'Kepler-56 d',
  radius: 13.33,
  distance: null
}, {
  name: 'Kepler-57 b',
  radius: 2.24,
  distance: null
}, {
  name: 'Kepler-57 c',
  radius: 1.57,
  distance: null
}, {
  name: 'Kepler-58 b',
  radius: 2.8,
  distance: null
}, {
  name: 'Kepler-58 c',
  radius: 2.91,
  distance: null
}, {
  name: 'Kepler-59 b',
  radius: 1.1,
  distance: null
}, {
  name: 'Kepler-59 c',
  radius: 2.02,
  distance: null
}, {
  name: 'Kepler-6 b',
  radius: 14.82,
  distance: null
}, {
  name: 'Kepler-60 b',
  radius: 2.24,
  distance: null
}, {
  name: 'Kepler-60 c',
  radius: 2.46,
  distance: null
}, {
  name: 'Kepler-60 d',
  radius: 2.58,
  distance: null
}, {
  name: 'Kepler-61 b',
  radius: 2.15,
  distance: 326
}, {
  name: 'Kepler-62 b',
  radius: 1.31,
  distance: 368
}, {
  name: 'Kepler-62 c',
  radius: 0.54,
  distance: 368
}, {
  name: 'Kepler-62 d',
  radius: 1.95,
  distance: 368
}, {
  name: 'Kepler-62 e',
  radius: 1.61,
  distance: 368
}, {
  name: 'Kepler-62 f',
  radius: 1.41,
  distance: 368
}, {
  name: 'Kepler-63 b',
  radius: 6.1,
  distance: 200
}, {
  name: 'Kepler-65 b',
  radius: 1.42,
  distance: null
}, {
  name: 'Kepler-65 c',
  radius: 2.58,
  distance: null
}, {
  name: 'Kepler-65 d',
  radius: 1.51,
  distance: null
}, {
  name: 'Kepler-66 b',
  radius: 2.8,
  distance: 1107
}, {
  name: 'Kepler-67 b',
  radius: 2.91,
  distance: 1107
}, {
  name: 'Kepler-68 b',
  radius: 2.3,
  distance: 135
}, {
  name: 'Kepler-68 c',
  radius: 0.91,
  distance: 135
}, {
  name: 'Kepler-68 d',
  radius: 13.89,
  distance: 135
}, {
  name: 'Kepler-69 b',
  radius: 2.24,
  distance: null
}, {
  name: 'Kepler-69 c',
  radius: 1.71,
  distance: null
}, {
  name: 'Kepler-7 b',
  radius: 18.08,
  distance: null
}, {
  name: 'Kepler-70  b',
  radius: 0.76,
  distance: 1180
}, {
  name: 'Kepler-70 c',
  radius: 0.87,
  distance: 1180
}, {
  name: 'Kepler-71 b',
  radius: 11.71,
  distance: null
}, {
  name: 'Kepler-74 b',
  radius: 14.78,
  distance: 1330
}, {
  name: 'Kepler-75 b',
  radius: 11.54,
  distance: 1140
}, {
  name: 'Kepler-76 b',
  radius: 14,
  distance: null
}, {
  name: 'Kepler-77 b',
  radius: 10.75,
  distance: 570
}, {
  name: 'Kepler-78 b',
  radius: 1.2,
  distance: null
}, {
  name: 'Kepler-79 b',
  radius: 3.3,
  distance: null
}, {
  name: 'Kepler-79 c',
  radius: 3.73,
  distance: null
}, {
  name: 'Kepler-79 d',
  radius: 7.17,
  distance: null
}, {
  name: 'Kepler-79 e',
  radius: 3.49,
  distance: null
}, {
  name: 'Kepler-8 b',
  radius: 15.89,
  distance: 1330
}, {
  name: 'Kepler-80 b',
  radius: 2.35,
  distance: null
}, {
  name: 'Kepler-80 c',
  radius: 2.58,
  distance: null
}, {
  name: 'Kepler-80 d',
  radius: 1.4,
  distance: null
}, {
  name: 'Kepler-80 e',
  radius: 1.5,
  distance: null
}, {
  name: 'Kepler-80 f',
  radius: 1.3,
  distance: null
}, {
  name: 'Kepler-81 b',
  radius: 2.54,
  distance: null
}, {
  name: 'Kepler-81 c',
  radius: 2.45,
  distance: null
}, {
  name: 'Kepler-82 b',
  radius: 4,
  distance: null
}, {
  name: 'Kepler-82 c',
  radius: 5.3,
  distance: null
}, {
  name: 'Kepler-83 b',
  radius: 2.34,
  distance: null
}, {
  name: 'Kepler-83 c',
  radius: 1.94,
  distance: null
}, {
  name: 'Kepler-84 b',
  radius: 2.2,
  distance: null
}, {
  name: 'Kepler-84 c',
  radius: 2.4,
  distance: null
}, {
  name: 'Kepler-85 b',
  radius: 1.99,
  distance: null
}, {
  name: 'Kepler-85 c',
  radius: 2.21,
  distance: null
}, {
  name: 'Kepler-86 b',
  radius: 10.14,
  distance: null
}, {
  name: 'Kepler-87 b',
  radius: 13.55,
  distance: null
}, {
  name: 'Kepler-87 c',
  radius: 6.15,
  distance: null
}, {
  name: 'Kepler-88 b',
  radius: 4.22,
  distance: 385
}, {
  name: 'Kepler-88 c',
  radius: 14.04,
  distance: 385
}, {
  name: 'Kepler-89 b',
  radius: 1.71,
  distance: null
}, {
  name: 'Kepler-89 c',
  radius: 4.32,
  distance: null
}, {
  name: 'Kepler-89 d',
  radius: 11.2,
  distance: null
}, {
  name: 'Kepler-89 e',
  radius: 6.16,
  distance: null
}, {
  name: 'Kepler-9 b',
  radius: 9.42,
  distance: null
}, {
  name: 'Kepler-9 c',
  radius: 9.21,
  distance: null
}, {
  name: 'Kepler-9 d',
  radius: 1.65,
  distance: null
}, {
  name: 'Kepler-90 b',
  radius: 1.31,
  distance: null
}, {
  name: 'Kepler-90 c',
  radius: 1.19,
  distance: null
}, {
  name: 'Kepler-90 d',
  radius: 2.88,
  distance: null
}, {
  name: 'Kepler-90 e',
  radius: 2.67,
  distance: null
}, {
  name: 'Kepler-90 f',
  radius: 2.89,
  distance: null
}, {
  name: 'Kepler-90 g',
  radius: 8.12,
  distance: null
}, {
  name: 'Kepler-90 h',
  radius: 11.31,
  distance: null
}, {
  name: 'KIC-10255705 b',
  radius: 7.28,
  distance: null
}, {
  name: 'KIC-10905746 b',
  radius: 2.65,
  distance: null
}, {
  name: 'KIC-11152511 b',
  radius: 4.03,
  distance: null
}, {
  name: 'KIC-12351927(AB) b',
  radius: 4.37,
  distance: null
}, {
  name: 'KIC-12454613 b',
  radius: 2.69,
  distance: null
}, {
  name: 'KIC-12557548 b',
  radius: 0.85,
  distance: 470
}, {
  name: 'KIC-5010054 b',
  radius: 6.94,
  distance: null
}, {
  name: 'KIC-5094412 b',
  radius: 5.71,
  distance: null
}, {
  name: 'KIC-5522786 b',
  radius: 1.23,
  distance: null
}, {
  name: 'KIC-5732155 b',
  radius: 12.77,
  distance: null
}, {
  name: 'KIC-6185331 b',
  radius: 8.06,
  distance: null
}, {
  name: 'KIC-6372194 b',
  radius: 8.29,
  distance: null
}, {
  name: 'KIC-6436029 c',
  radius: 3.07,
  distance: null
}, {
  name: 'KIC-8852719 b',
  radius: 3.53,
  distance: null
}, {
  name: 'KIC-9662267 b',
  radius: 3.81,
  distance: null
}, {
  name: 'KIC-9704149 b',
  radius: 4.48,
  distance: null
}, {
  name: 'KOI-111 b',
  radius: 2.14,
  distance: null
}, {
  name: 'KOI-111 c',
  radius: 2.05,
  distance: null
}, {
  name: 'KOI-115 b',
  radius: 4.82,
  distance: null
}, {
  name: 'KOI-115 c',
  radius: 1.91,
  distance: null
}, {
  name: 'KOI-117 b',
  radius: 1.58,
  distance: null
}, {
  name: 'KOI-117 c',
  radius: 1.71,
  distance: null
}, {
  name: 'KOI-1203 b',
  radius: 2.9,
  distance: null
}, {
  name: 'KOI-1203 c',
  radius: 2.8,
  distance: null
}, {
  name: 'KOI-1215 b',
  radius: 2.92,
  distance: null
}, {
  name: 'KOI-1215 c',
  radius: 3.36,
  distance: null
}, {
  name: 'KOI-1236 b',
  radius: 4.31,
  distance: null
}, {
  name: 'KOI-1236 c',
  radius: 3.1,
  distance: null
}, {
  name: 'KOI-1278 b',
  radius: 2.46,
  distance: null
}, {
  name: 'KOI-1278 c',
  radius: 3.1,
  distance: null
}, {
  name: 'KOI-156 b',
  radius: 1.18,
  distance: null
}, {
  name: 'KOI-156 c',
  radius: 1.6,
  distance: null
}, {
  name: 'KOI-156 d',
  radius: 2.53,
  distance: null
}, {
  name: 'KOI-1563 b',
  radius: 3.61,
  distance: null
}, {
  name: 'KOI-1563 c',
  radius: 3.3,
  distance: null
}, {
  name: 'KOI-1576 c',
  radius: 2.8,
  distance: null
}, {
  name: 'KOI-1676 b',
  radius: 3.2,
  distance: null
}, {
  name: 'KOI-1781 b',
  radius: 1.88,
  distance: null
}, {
  name: 'KOI-1843 b',
  radius: 0.58,
  distance: null
}, {
  name: 'KOI-1873 b',
  radius: 2.31,
  distance: null
}, {
  name: 'KOI-1873 c',
  radius: 5.41,
  distance: null
}, {
  name: 'KOI-202 b',
  radius: 11.42,
  distance: null
}, {
  name: 'KOI-2025 b',
  radius: 3.1,
  distance: null
}, {
  name: 'KOI-2025 c',
  radius: 2.8,
  distance: null
}, {
  name: 'KOI-206 b',
  radius: 7.84,
  distance: null
}, {
  name: 'KOI-2672 b',
  radius: 3.47,
  distance: null
}, {
  name: 'KOI-2672 c',
  radius: 5.26,
  distance: null
}, {
  name: 'KOI-274 b',
  radius: 1.13,
  distance: null
}, {
  name: 'KOI-274 c',
  radius: 1.13,
  distance: null
}, {
  name: 'KOI-282 b',
  radius: 2.9,
  distance: null
}, {
  name: 'KOI-285 b',
  radius: 3.52,
  distance: null
}, {
  name: 'KOI-285 c',
  radius: 2.61,
  distance: null
}, {
  name: 'KOI-370 b',
  radius: 2.65,
  distance: null
}, {
  name: 'KOI-370 c',
  radius: 4.42,
  distance: null
}, {
  name: 'KOI-523 b',
  radius: 2.9,
  distance: null
}, {
  name: 'KOI-523 c',
  radius: 7.11,
  distance: null
}, {
  name: 'KOI-680 b',
  radius: 7.28,
  distance: null
}, {
  name: 'KOI-730 b',
  radius: 3.47,
  distance: null
}, {
  name: 'KOI-730 c',
  radius: 2.58,
  distance: null
}, {
  name: 'KOI-730 d',
  radius: 2.8,
  distance: null
}, {
  name: 'KOI-730 e',
  radius: 2.02,
  distance: null
}, {
  name: 'KOI-82 b',
  radius: 2.2,
  distance: null
}, {
  name: 'KOI-82 c',
  radius: 1.34,
  distance: null
}, {
  name: 'KOI-82 d',
  radius: 0.69,
  distance: null
}, {
  name: 'KOI-834 b',
  radius: 5.61,
  distance: null
}, {
  name: 'KOI-834 c',
  radius: 2,
  distance: null
}, {
  name: 'ksi Aql b',
  radius: 13.46,
  distance: 62.7
}, {
  name: 'LKCA 15 b',
  radius: 13.13,
  distance: 145
}, {
  name: 'MOA-2007-BLG-192-L b',
  radius: 1.54,
  distance: 700
}, {
  name: 'MOA-2007-BLG-400-L b',
  radius: 13.97,
  distance: 6000
}, {
  name: 'MOA-2008-BLG-310-L b',
  radius: 10.07,
  distance: 6000
}, {
  name: 'MOA-2008-BLG-379L b',
  radius: 13.17,
  distance: 3600
}, {
  name: 'MOA-2009-BLG-266L b',
  radius: 3.38,
  distance: 3040
}, {
  name: 'MOA-2009-BLG-319 b',
  radius: 8.14,
  distance: 6100
}, {
  name: 'MOA-2009-BLG-387L b',
  radius: 13.5,
  distance: 5700
}, {
  name: 'MOA-2010-BLG-328L b',
  radius: 3.42,
  distance: 810
}, {
  name: 'MOA-2010-BLG-477L b',
  radius: 13.74,
  distance: 2300
}, {
  name: 'MOA-2011-BLG-293L b',
  radius: 13.23,
  distance: 7700
}, {
  name: 'MOA-2011-BLG-322 b',
  radius: 12.96,
  distance: 7740
}, {
  name: 'MOA-bin-1 b',
  radius: 13.34,
  distance: 5100
}, {
  name: 'mu Ara b',
  radius: 13.69,
  distance: 15.3
}, {
  name: 'mu Ara c',
  radius: 3.41,
  distance: 15.3
}, {
  name: 'mu Ara d',
  radius: 14.23,
  distance: 15.3
}, {
  name: 'mu Ara e',
  radius: 13.66,
  distance: 15.3
}, {
  name: 'NGC 2423 3 b',
  radius: 12.89,
  distance: 766
}, {
  name: 'NGC 4349 No 127 b',
  radius: 12.63,
  distance: 2176
}, {
  name: 'NN Ser(AB) c',
  radius: 13.07,
  distance: 500
}, {
  name: 'NN Ser(AB) d',
  radius: 13.55,
  distance: 500
}, {
  name: 'nu Oph b',
  radius: 12.55,
  distance: 46.8
}, {
  name: 'nu Oph c',
  radius: 12.5,
  distance: 46.8
}, {
  name: 'NY Vir b',
  radius: 13.49,
  distance: null
}, {
  name: 'OGLE-05-071L b',
  radius: 13.37,
  distance: 3300
}, {
  name: 'OGLE-05-169L b',
  radius: 3.78,
  distance: 2700
}, {
  name: 'OGLE-05-390L b',
  radius: 1.94,
  distance: 6500
}, {
  name: 'OGLE-06-109L b',
  radius: 14.07,
  distance: 1510
}, {
  name: 'OGLE-06-109L c',
  radius: 11.04,
  distance: 1510
}, {
  name: 'OGLE-2007-BLG-368L b',
  radius: 5.15,
  distance: 5900
}, {
  name: 'OGLE-2009-BLG-151_MOA-2009-232 b',
  radius: 12.97,
  distance: 390
}, {
  name: 'OGLE-2011-BLG-0251 b',
  radius: 13.88,
  distance: 4090
}, {
  name: 'OGLE-2011-BLG-0420 b',
  radius: 12.88,
  distance: 1990
}, {
  name: 'OGLE-2012-BLG-0026L b',
  radius: 7.22,
  distance: 4080
}, {
  name: 'OGLE-2012-BLG-0026L c',
  radius: 14.04,
  distance: 4080
}, {
  name: 'OGLE-2012-BLG-0358L b',
  radius: 13.58,
  distance: 1760
}, {
  name: 'OGLE-2012-BLG-0406L b',
  radius: 13.41,
  distance: 4970
}, {
  name: 'OGLE-TR-10 b',
  radius: 19.26,
  distance: 1500
}, {
  name: 'OGLE-TR-111 b',
  radius: 12.06,
  distance: 1500
}, {
  name: 'OGLE-TR-113 b',
  radius: 12.43,
  distance: 1500
}, {
  name: 'OGLE-TR-132 b',
  radius: 13.78,
  distance: 1500
}, {
  name: 'OGLE-TR-182 b',
  radius: 16.46,
  distance: null
}, {
  name: 'OGLE-TR-211 b',
  radius: 14.11,
  distance: null
}, {
  name: 'OGLE-TR-56 b',
  radius: 13.44,
  distance: 1500
}, {
  name: 'OGLE2-TR-L9 b',
  radius: 18.08,
  distance: 900
}, {
  name: 'OGLE235-MOA53 b',
  radius: 13.5,
  distance: 5200
}, {
  name: 'ome Ser b',
  radius: 13.62,
  distance: 80.6
}, {
  name: 'omi CrB b',
  radius: 13.68,
  distance: 84
}, {
  name: 'omi UMa b',
  radius: 13.23,
  distance: 56.3
}, {
  name: 'Oph 11 b',
  radius: 12.6,
  distance: 145
}, {
  name: 'PH1-Kepler-64 b',
  radius: 6.19,
  distance: null
}, {
  name: 'POTS-1 b',
  radius: 10.54,
  distance: null
}, {
  name: 'Pr0201 c',
  radius: 14.14,
  distance: null
}, {
  name: 'Pr0211 b',
  radius: 13.59,
  distance: null
}, {
  name: 'PSR 1257 12 b',
  radius: 0.3,
  distance: 710
}, {
  name: 'PSR 1257 12 c',
  radius: 1.72,
  distance: 710
}, {
  name: 'PSR 1257 12 d',
  radius: 1.66,
  distance: 710
}, {
  name: 'PSR 1719-14 b',
  radius: 4.48,
  distance: 1200
}, {
  name: 'PSR B1620-26 b',
  radius: 13.51,
  distance: 3800
}, {
  name: 'Qatar-1 b',
  radius: 13.04,
  distance: null
}, {
  name: 'Qatar-2 b',
  radius: 12.81,
  distance: null
}, {
  name: 'Ross 458(AB) c',
  radius: 12.98,
  distance: 114
}, {
  name: 'ROXs 42B b',
  radius: 12.83,
  distance: 135
}, {
  name: 'RR Cae b',
  radius: 13.22,
  distance: null
}, {
  name: 'SR 12 AB c',
  radius: 12.8,
  distance: 125
}, {
  name: 'SWEEPS-04b',
  radius: 9.07,
  distance: 8500
}, {
  name: 'SWEEPS-11b',
  radius: 12.66,
  distance: 8500
}, {
  name: 'tau Boo b',
  radius: 13.14,
  distance: 15.6
}, {
  name: 'tau Gem b',
  radius: 12.55,
  distance: 98.4
}, {
  name: 'TrES-1b',
  radius: 12.31,
  distance: 157
}, {
  name: 'TrES-2b',
  radius: 13.09,
  distance: 220
}, {
  name: 'TrES-3b',
  radius: 14.62,
  distance: null
}, {
  name: 'TrES-4b',
  radius: 19.11,
  distance: 479
}, {
  name: 'TrES-5b',
  radius: 13.54,
  distance: 360
}, {
  name: 'ups And b',
  radius: 14.15,
  distance: 13.47
}, {
  name: 'ups And c',
  radius: 13.66,
  distance: 13.47
}, {
  name: 'ups And d',
  radius: 12.91,
  distance: 13.47
}, {
  name: 'ups And e',
  radius: 13.9,
  distance: 13.47
}, {
  name: 'USco1602-2401 b',
  radius: 12.22,
  distance: null
}, {
  name: 'USco1610-1913 b',
  radius: 12.56,
  distance: null
}, {
  name: 'USco1612-1800 b',
  radius: 12.46,
  distance: null
}, {
  name: 'UScoCTIO 108 b',
  radius: 12.72,
  distance: 145
}, {
  name: 'UZ For(ab) d',
  radius: 12.96,
  distance: null
}, {
  name: 'V391 Peg b',
  radius: 13.41,
  distance: 1400
}, {
  name: 'WASP-1 b',
  radius: 16.62,
  distance: null
}, {
  name: 'WASP-10 b',
  radius: 12.1,
  distance: 90
}, {
  name: 'WASP-100 b',
  radius: 18.93,
  distance: null
}, {
  name: 'WASP-101 b',
  radius: 15.79,
  distance: null
}, {
  name: 'WASP-11-HAT-P-10 b',
  radius: 11.7,
  distance: 125
}, {
  name: 'WASP-12 b',
  radius: 19.44,
  distance: 427
}, {
  name: 'WASP-13 b',
  radius: 15.29,
  distance: 156
}, {
  name: 'WASP-14 b',
  radius: 14.35,
  distance: 160
}, {
  name: 'WASP-15 b',
  radius: 15.99,
  distance: 308
}, {
  name: 'WASP-16 b',
  radius: 11.29,
  distance: null
}, {
  name: 'WASP-17 b',
  radius: 22.3,
  distance: null
}, {
  name: 'WASP-18 b',
  radius: 13.05,
  distance: 100
}, {
  name: 'WASP-19 b',
  radius: 15.62,
  distance: null
}, {
  name: 'WASP-2 b',
  radius: 12.08,
  distance: 144
}, {
  name: 'WASP-20 b',
  radius: 10.08,
  distance: null
}, {
  name: 'WASP-21 b',
  radius: 13.55,
  distance: 230
}, {
  name: 'WASP-22 b',
  radius: 12.97,
  distance: 300
}, {
  name: 'WASP-23 b',
  radius: 10.77,
  distance: null
}, {
  name: 'WASP-24 b',
  radius: 12.36,
  distance: 330
}, {
  name: 'WASP-25 b',
  radius: 14.11,
  distance: 169
}, {
  name: 'WASP-26 b',
  radius: 14.35,
  distance: 250
}, {
  name: 'WASP-28 b',
  radius: 12.54,
  distance: 334
}, {
  name: 'WASP-29 b',
  radius: 9.42,
  distance: 80
}, {
  name: 'WASP-3 b',
  radius: 16.28,
  distance: 223
}, {
  name: 'WASP-31 b',
  radius: 17.21,
  distance: 400
}, {
  name: 'WASP-32 b',
  radius: 13.22,
  distance: null
}, {
  name: 'WASP-33 b',
  radius: 16.11,
  distance: 116
}, {
  name: 'WASP-34 b',
  radius: 13.66,
  distance: 120
}, {
  name: 'WASP-35 b',
  radius: 14.78,
  distance: null
}, {
  name: 'WASP-36 b',
  radius: 14.21,
  distance: 450
}, {
  name: 'WASP-37 b',
  radius: 12.72,
  distance: 338
}, {
  name: 'WASP-38 b',
  radius: 12.08,
  distance: 110
}, {
  name: 'WASP-39 b',
  radius: 14.22,
  distance: 230
}, {
  name: 'WASP-4 b',
  radius: 15.62,
  distance: 300
}, {
  name: 'WASP-41 b',
  radius: 13.55,
  distance: 180
}, {
  name: 'WASP-42 b',
  radius: 12.1,
  distance: null
}, {
  name: 'WASP-43 b',
  radius: 11.6,
  distance: null
}, {
  name: 'WASP-44 b',
  radius: 12.77,
  distance: null
}, {
  name: 'WASP-45 b',
  radius: 12.99,
  distance: null
}, {
  name: 'WASP-46 b',
  radius: 14.67,
  distance: null
}, {
  name: 'WASP-47 b',
  radius: 12.88,
  distance: 200
}, {
  name: 'WASP-48 b',
  radius: 18.7,
  distance: null
}, {
  name: 'WASP-49 b',
  radius: 12.49,
  distance: null
}, {
  name: 'WASP-5 b',
  radius: 13.12,
  distance: 297
}, {
  name: 'WASP-50 b',
  radius: 12.75,
  distance: 230
}, {
  name: 'WASP-52 b',
  radius: 14.22,
  distance: 140
}, {
  name: 'WASP-53 b',
  radius: 13.44,
  distance: null
}, {
  name: 'WASP-54 b',
  radius: 15.68,
  distance: null
}, {
  name: 'WASP-55 b',
  radius: 14.56,
  distance: 330
}, {
  name: 'WASP-56 b',
  radius: 13.44,
  distance: null
}, {
  name: 'WASP-57 b',
  radius: 12.32,
  distance: null
}, {
  name: 'WASP-58 b',
  radius: 15.34,
  distance: 300
}, {
  name: 'WASP-59 b',
  radius: 10.08,
  distance: 125
}, {
  name: 'WASP-6 b',
  radius: 13.71,
  distance: 307
}, {
  name: 'WASP-60 b',
  radius: 10.08,
  distance: 400
}, {
  name: 'WASP-61 b',
  radius: 13.89,
  distance: 480
}, {
  name: 'WASP-62 b',
  radius: 15.57,
  distance: 160
}, {
  name: 'WASP-63 b',
  radius: 16.02,
  distance: 330
}, {
  name: 'WASP-64 b',
  radius: 7.84,
  distance: null
}, {
  name: 'WASP-65 b',
  radius: 12.45,
  distance: 310
}, {
  name: 'WASP-66 b',
  radius: 15.57,
  distance: 380
}, {
  name: 'WASP-67 b',
  radius: 15.68,
  distance: 225
}, {
  name: 'WASP-68 b',
  radius: 10.08,
  distance: null
}, {
  name: 'WASP-69 b',
  radius: 11.2,
  distance: null
}, {
  name: 'WASP-7 b',
  radius: 14.9,
  distance: 140
}, {
  name: 'WASP-70 b',
  radius: 8.96,
  distance: null
}, {
  name: 'WASP-71 b',
  radius: 16.8,
  distance: 200
}, {
  name: 'WASP-72 b',
  radius: 14.22,
  distance: null
}, {
  name: 'WASP-75 b',
  radius: 14.22,
  distance: 260
}, {
  name: 'WASP-76 b',
  radius: 20.5,
  distance: 120
}, {
  name: 'WASP-77A b',
  radius: 13.55,
  distance: null
}, {
  name: 'WASP-78 b',
  radius: 19.6,
  distance: 550
}, {
  name: 'WASP-79 b',
  radius: 19.04,
  distance: 240
}, {
  name: 'WASP-8 b',
  radius: 11.63,
  distance: 87
}, {
  name: 'WASP-80 b',
  radius: 10.66,
  distance: 60
}, {
  name: 'WASP-82 b',
  radius: 18.7,
  distance: 200
}, {
  name: 'WASP-84 b',
  radius: 10.55,
  distance: 120
}, {
  name: 'WASP-90 b',
  radius: 18.26,
  distance: 340
}, {
  name: 'WASP-95 b',
  radius: 13.55,
  distance: null
}, {
  name: 'WASP-96 b',
  radius: 13.44,
  distance: null
}, {
  name: 'WASP-97 b',
  radius: 12.66,
  distance: null
}, {
  name: 'WASP-98 b',
  radius: 12.32,
  distance: null
}, {
  name: 'WASP-99 b',
  radius: 12.32,
  distance: null
}, {
  name: 'WD 0806-661B b',
  radius: 13.01,
  distance: 19.2
}, {
  name: 'WISE 1217+16A b',
  radius: 11.2,
  distance: 10
}, {
  name: 'WISE 1711+3500 b',
  radius: 12.74,
  distance: 19
}, {
  name: 'WTS-1 b',
  radius: 16.69,
  distance: 3200
}, {
  name: 'WTS-2 b',
  radius: 14.56,
  distance: 1000
}, {
  name: 'XO-1 b',
  radius: 13.26,
  distance: 200
}, {
  name: 'XO-2 b',
  radius: 10.9,
  distance: 149
}, {
  name: 'XO-3 b',
  radius: 13.63,
  distance: 260
}, {
  name: 'XO-4 b',
  radius: 15.01,
  distance: 293
}, {
  name: 'XO-5 b',
  radius: 11.54,
  distance: 255
}];

var planets = [{
  name: 'Jupiter',
  radius: '10.97',
  distance: '0'
}, {
  name: 'Saturn',
  radius: '9.14',
  distance: '0'
}, {
  name: 'Uranus',
  radius: '3.98',
  distance: '0'
}, {
  name: 'Neptune',
  radius: '3.86',
  distance: '0'
}, {
  name: 'Earth',
  radius: '1',
  distance: '0'
}, {
  name: 'Venus',
  radius: '0.950',
  distance: '0'
}, {
  name: 'Mars',
  radius: '0.532',
  distance: '0'
}, {
  name: 'Mercury',
  radius: '0.383',
  distance: '0'
}, {
  name: 'Pluto',
  radius: '0.181',
  distance: '0'
}];

var shakespeare = [{
  id: 'Shakespeare',
  parent: null,
  size: 0
}, {
  id: 'Comedies',
  parent: 'Shakespeare',
  size: null
}, {
  id: 'Tragedies',
  parent: 'Shakespeare',
  size: null
}, {
  id: 'Histories',
  parent: 'Shakespeare',
  size: null
}, {
  id: 'As You Like It',
  parent: 'Comedies',
  size: null
}, {
  id: 'Adam',
  parent: 'As You Like It',
  size: 10
}, {
  id: 'Amiens',
  parent: 'As You Like It',
  size: 10
}, {
  id: 'Audrey',
  parent: 'As You Like It',
  size: 12
}, {
  id: 'Celia',
  parent: 'As You Like It',
  size: 108
}, {
  id: 'Charles',
  parent: 'As You Like It',
  size: 8
}, {
  id: 'Corin',
  parent: 'As You Like It',
  size: 24
}, {
  id: 'Dennis',
  parent: 'As You Like It',
  size: 2
}, {
  id: 'Duke',
  parent: 'As You Like It',
  size: 32
}, {
  id: 'Frederick',
  parent: 'As You Like It',
  size: 20
}, {
  id: 'Hymen',
  parent: 'As You Like It',
  size: 1
}, {
  id: 'Jaques (lord)',
  parent: 'As You Like It',
  size: 57
}, {
  id: 'Jaques (son)',
  parent: 'As You Like It',
  size: 2
}, {
  id: 'Le Beau',
  parent: 'As You Like It',
  size: 14
}, {
  id: 'Oliver',
  parent: 'As You Like It',
  size: 37
}, {
  id: 'Orlando',
  parent: 'As You Like It',
  size: 120
}, {
  id: 'Phebe',
  parent: 'As You Like It',
  size: 23
}, {
  id: 'Rosalind',
  parent: 'As You Like It',
  size: 201
}, {
  id: 'Silvius',
  parent: 'As You Like It',
  size: 24
}, {
  id: 'Sir Oliver Martext',
  parent: 'As You Like It',
  size: 3
}, {
  id: 'Touchstone',
  parent: 'As You Like It',
  size: 74
}, {
  id: 'William',
  parent: 'As You Like It',
  size: 11
}, {
  id: 'Comedy Of Errors',
  parent: 'Comedies',
  size: null
}, {
  id: 'Adriana',
  parent: 'Comedy Of Errors',
  size: 79
}, {
  id: 'Aegeon',
  parent: 'Comedy Of Errors',
  size: 17
}, {
  id: 'Aemilia',
  parent: 'Comedy Of Errors',
  size: 16
}, {
  id: 'Angelo',
  parent: 'Comedy Of Errors',
  size: 31
}, {
  id: 'Antipholus of Ephesus',
  parent: 'Comedy Of Errors',
  size: 76
}, {
  id: 'Antipholus of Syracuse',
  parent: 'Comedy Of Errors',
  size: 103
}, {
  id: 'Balthazar',
  parent: 'Comedy Of Errors',
  size: 5
}, {
  id: 'Courtezan',
  parent: 'Comedy Of Errors',
  size: 11
}, {
  id: 'Dromio of Ephesus',
  parent: 'Comedy Of Errors',
  size: 63
}, {
  id: 'Dromio of Syracuse',
  parent: 'Comedy Of Errors',
  size: 99
}, {
  id: 'Luce',
  parent: 'Comedy Of Errors',
  size: 7
}, {
  id: 'Luciana',
  parent: 'Comedy Of Errors',
  size: 43
}, {
  id: 'Pinch',
  parent: 'Comedy Of Errors',
  size: 6
}, {
  id: 'Solinus',
  parent: 'Comedy Of Errors',
  size: 22
}, {
  id: 'Merchant Of Venice',
  parent: 'Comedies',
  size: null
}, {
  id: 'Antonio',
  parent: 'Merchant Of Venice',
  size: 47
}, {
  id: 'Balthasar',
  parent: 'Merchant Of Venice',
  size: 1
}, {
  id: 'Bassanio',
  parent: 'Merchant Of Venice',
  size: 73
}, {
  id: 'Duke (of Venice)',
  parent: 'Merchant Of Venice',
  size: 18
}, {
  id: 'Gratiano',
  parent: 'Merchant Of Venice',
  size: 48
}, {
  id: 'Jessica',
  parent: 'Merchant Of Venice',
  size: 26
}, {
  id: 'Launcelot Gobbo',
  parent: 'Merchant Of Venice',
  size: 44
}, {
  id: 'Leonardo',
  parent: 'Merchant Of Venice',
  size: 2
}, {
  id: 'Lorenzo',
  parent: 'Merchant Of Venice',
  size: 47
}, {
  id: 'Nerissa',
  parent: 'Merchant Of Venice',
  size: 36
}, {
  id: 'Old Gobbo',
  parent: 'Merchant Of Venice',
  size: 19
}, {
  id: 'Portia',
  parent: 'Merchant Of Venice',
  size: 117
}, {
  id: 'Prince of Arragon',
  parent: 'Merchant Of Venice',
  size: 4
}, {
  id: 'Prince of Morocco',
  parent: 'Merchant Of Venice',
  size: 7
}, {
  id: 'Salanio',
  parent: 'Merchant Of Venice',
  size: 18
}, {
  id: 'Salarino',
  parent: 'Merchant Of Venice',
  size: 27
}, {
  id: 'Salerio',
  parent: 'Merchant Of Venice',
  size: 6
}, {
  id: 'Shylock',
  parent: 'Merchant Of Venice',
  size: 79
}, {
  id: 'Stephano',
  parent: 'Merchant Of Venice',
  size: 3
}, {
  id: 'Tubal',
  parent: 'Merchant Of Venice',
  size: 8
}, {
  id: "Midsummer Night's Dream",
  parent: 'Comedies',
  size: null
}, {
  id: 'Bottom',
  parent: "Midsummer Night's Dream",
  size: 59
}, {
  id: 'Cobweb',
  parent: "Midsummer Night's Dream",
  size: 4
}, {
  id: 'Demetrius',
  parent: "Midsummer Night's Dream",
  size: 48
}, {
  id: 'Egeus',
  parent: "Midsummer Night's Dream",
  size: 7
}, {
  id: 'Fairy',
  parent: "Midsummer Night's Dream",
  size: 4
}, {
  id: 'Flute',
  parent: "Midsummer Night's Dream",
  size: 18
}, {
  id: 'Helena',
  parent: "Midsummer Night's Dream",
  size: 36
}, {
  id: 'Hermia',
  parent: "Midsummer Night's Dream",
  size: 48
}, {
  id: 'Hippolyta',
  parent: "Midsummer Night's Dream",
  size: 14
}, {
  id: 'Lysander',
  parent: "Midsummer Night's Dream",
  size: 50
}, {
  id: 'Moth',
  parent: "Midsummer Night's Dream",
  size: 2
}, {
  id: 'Mustardseed',
  parent: "Midsummer Night's Dream",
  size: 5
}, {
  id: 'Oberon',
  parent: "Midsummer Night's Dream",
  size: 29
}, {
  id: 'Peaseblossom',
  parent: "Midsummer Night's Dream",
  size: 4
}, {
  id: 'Philostrate',
  parent: "Midsummer Night's Dream",
  size: 6
}, {
  id: 'Puck',
  parent: "Midsummer Night's Dream",
  size: 33
}, {
  id: 'Quince',
  parent: "Midsummer Night's Dream",
  size: 40
}, {
  id: 'Snout',
  parent: "Midsummer Night's Dream",
  size: 9
}, {
  id: 'Snug',
  parent: "Midsummer Night's Dream",
  size: 4
}, {
  id: 'Starveling',
  parent: "Midsummer Night's Dream",
  size: 7
}, {
  id: 'Theseus',
  parent: "Midsummer Night's Dream",
  size: 48
}, {
  id: 'Titania',
  parent: "Midsummer Night's Dream",
  size: 23
}, {
  id: 'Taming Of The Shrew',
  parent: 'Comedies',
  size: null
}, {
  id: 'Baptista Minola',
  parent: 'Taming Of The Shrew',
  size: 68
}, {
  id: 'Bianca',
  parent: 'Taming Of The Shrew',
  size: 29
}, {
  id: 'Biondello',
  parent: 'Taming Of The Shrew',
  size: 39
}, {
  id: 'Christopher Sly',
  parent: 'Taming Of The Shrew',
  size: 24
}, {
  id: 'Curtis',
  parent: 'Taming Of The Shrew',
  size: 20
}, {
  id: 'Gremio',
  parent: 'Taming Of The Shrew',
  size: 58
}, {
  id: 'Grumio',
  parent: 'Taming Of The Shrew',
  size: 63
}, {
  id: 'Haberdasher',
  parent: 'Taming Of The Shrew',
  size: 1
}, {
  id: 'Hortensio',
  parent: 'Taming Of The Shrew',
  size: 70
}, {
  id: 'Joseph',
  parent: 'Taming Of The Shrew',
  size: 1
}, {
  id: 'Katherina',
  parent: 'Taming Of The Shrew',
  size: 82
}, {
  id: 'Lucentio',
  parent: 'Taming Of The Shrew',
  size: 61
}, {
  id: 'Nathaniel',
  parent: 'Taming Of The Shrew',
  size: 4
}, {
  id: 'Nicholas',
  parent: 'Taming Of The Shrew',
  size: 1
}, {
  id: 'Peter',
  parent: 'Taming Of The Shrew',
  size: 2
}, {
  id: 'Petruchio',
  parent: 'Taming Of The Shrew',
  size: 158
}, {
  id: 'Philip',
  parent: 'Taming Of The Shrew',
  size: 1
}, {
  id: 'Tranio',
  parent: 'Taming Of The Shrew',
  size: 90
}, {
  id: 'Vincentio',
  parent: 'Taming Of The Shrew',
  size: 23
}, {
  id: 'The Tempest',
  parent: 'Comedies',
  size: null
}, {
  id: 'Adrian',
  parent: 'The Tempest',
  size: 9
}, {
  id: 'Alonso',
  parent: 'The Tempest',
  size: 40
}, {
  id: 'Antonio, duke of Milan',
  parent: 'The Tempest',
  size: 57
}, {
  id: 'Ariel',
  parent: 'The Tempest',
  size: 45
}, {
  id: 'Caliban',
  parent: 'The Tempest',
  size: 50
}, {
  id: 'Ceres',
  parent: 'The Tempest',
  size: 4
}, {
  id: 'Ferdinand',
  parent: 'The Tempest',
  size: 31
}, {
  id: 'Francisco',
  parent: 'The Tempest',
  size: 2
}, {
  id: 'Gonzalo',
  parent: 'The Tempest',
  size: 52
}, {
  id: 'Iris',
  parent: 'The Tempest',
  size: 4
}, {
  id: 'Juno',
  parent: 'The Tempest',
  size: 2
}, {
  id: 'Master',
  parent: 'The Tempest',
  size: 2
}, {
  id: 'Miranda',
  parent: 'The Tempest',
  size: 50
}, {
  id: 'Nymphs',
  parent: 'The Tempest',
  size: 0
}, {
  id: 'Prospero',
  parent: 'The Tempest',
  size: 114
}, {
  id: 'Reapers',
  parent: 'The Tempest',
  size: 0
}, {
  id: 'Sebastian',
  parent: 'The Tempest',
  size: 67
}, {
  id: 'Stephano (Servant to Portia)',
  parent: 'The Tempest',
  size: 60
}, {
  id: 'Trinculo',
  parent: 'The Tempest',
  size: 39
}, {
  id: 'Henry VIII',
  parent: 'Histories',
  size: null
}, {
  id: 'Anne Bullen',
  parent: 'Henry VIII',
  size: 18
}, {
  id: 'Archbishop Cranmer',
  parent: 'Henry VIII',
  size: 21
}, {
  id: 'Bishop Lincoln',
  parent: 'Henry VIII',
  size: 2
}, {
  id: 'Brandon',
  parent: 'Henry VIII',
  size: 6
}, {
  id: 'Capucius',
  parent: 'Henry VIII',
  size: 5
}, {
  id: 'Cardinal Campeius',
  parent: 'Henry VIII',
  size: 14
}, {
  id: 'Cardinal Wolsey',
  parent: 'Henry VIII',
  size: 79
}, {
  id: 'Cromwell',
  parent: 'Henry VIII',
  size: 21
}, {
  id: 'Doctor Butts',
  parent: 'Henry VIII',
  size: 4
}, {
  id: 'Duke of Buckingham',
  parent: 'Henry VIII',
  size: 26
}, {
  id: 'Duke of Norfolk',
  parent: 'Henry VIII',
  size: 48
}, {
  id: 'Duke of Suffolk',
  parent: 'Henry VIII',
  size: 30
}, {
  id: 'Earl of Surrey',
  parent: 'Henry VIII',
  size: 24
}, {
  id: 'First Secretary to Wolsey',
  parent: 'Henry VIII',
  size: 2
}, {
  id: 'Gardiner',
  parent: 'Henry VIII',
  size: 22
}, {
  id: 'Garter',
  parent: 'Henry VIII',
  size: 1
}, {
  id: 'Griffith',
  parent: 'Henry VIII',
  size: 13
}, {
  id: 'King Henry VIII',
  parent: 'Henry VIII',
  size: 81
}, {
  id: 'Lord Abergavenny',
  parent: 'Henry VIII',
  size: 5
}, {
  id: 'Lord Chamberlain',
  parent: 'Henry VIII',
  size: 38
}, {
  id: 'Lord Chancellor',
  parent: 'Henry VIII',
  size: 7
}, {
  id: 'Lord Sands',
  parent: 'Henry VIII',
  size: 17
}, {
  id: 'Old Lady',
  parent: 'Henry VIII',
  size: 14
}, {
  id: 'Patience',
  parent: 'Henry VIII',
  size: 3
}, {
  id: 'Porter (door-keeper of the Council-chamber)',
  parent: 'Henry VIII',
  size: 10
}, {
  id: 'Queen Katharine',
  parent: 'Henry VIII',
  size: 50
}, {
  id: 'Sir Anthony Denny',
  parent: 'Henry VIII',
  size: 3
}, {
  id: 'Sir Henry Guildford',
  parent: 'Henry VIII',
  size: 1
}, {
  id: 'Sir Nicholas Vaux',
  parent: 'Henry VIII',
  size: 1
}, {
  id: 'Sir Thomas Lovell',
  parent: 'Henry VIII',
  size: 21
}, {
  id: 'Surveyor to the Duke of Buckingham',
  parent: 'Henry VIII',
  size: 9
}, {
  id: 'History Of King John',
  parent: 'Histories',
  size: null
}, {
  id: 'Arthur Duke of Bretagne',
  parent: 'History Of King John',
  size: 23
}, {
  id: 'Blanch',
  parent: 'History Of King John',
  size: 9
}, {
  id: 'Cardinal Pandulph',
  parent: 'History Of King John',
  size: 23
}, {
  id: 'Chatillon',
  parent: 'History Of King John',
  size: 5
}, {
  id: 'Constance',
  parent: 'History Of King John',
  size: 36
}, {
  id: 'Essex',
  parent: 'History Of King John',
  size: 1
}, {
  id: 'Faulconbridge',
  parent: 'History Of King John',
  size: 4
}, {
  id: 'Hubert de Burgh',
  parent: 'History Of King John',
  size: 52
}, {
  id: 'James Gurney',
  parent: 'History Of King John',
  size: 1
}, {
  id: 'King John',
  parent: 'History Of King John',
  size: 95
}, {
  id: 'King Phillip',
  parent: 'History Of King John',
  size: 43
}, {
  id: 'Lady Faulconbridge',
  parent: 'History Of King John',
  size: 5
}, {
  id: 'Lewis the Dauphin',
  parent: 'History Of King John',
  size: 29
}, {
  id: 'Lord Bigot',
  parent: 'History Of King John',
  size: 6
}, {
  id: 'Lymoges duke of Austria',
  parent: 'History Of King John',
  size: 16
}, {
  id: 'Melun',
  parent: 'History Of King John',
  size: 3
}, {
  id: 'Pembroke earl of Pembroke',
  parent: 'History Of King John',
  size: 20
}, {
  id: 'Peter of Pomfret',
  parent: 'History Of King John',
  size: 1
}, {
  id: 'Philip the Bastard',
  parent: 'History Of King John',
  size: 89
}, {
  id: 'Prince Henry',
  parent: 'History Of King John',
  size: 8
}, {
  id: 'Queen Elinor',
  parent: 'History Of King John',
  size: 22
}, {
  id: 'Salisbury earl of Salisbury',
  parent: 'History Of King John',
  size: 36
}, {
  id: 'Antony And Cleopatra',
  parent: 'Tragedies',
  size: null
}, {
  id: 'Agrippa',
  parent: 'Antony And Cleopatra',
  size: 28
}, {
  id: 'Alexas',
  parent: 'Antony And Cleopatra',
  size: 15
}, {
  id: 'Antony',
  parent: 'Antony And Cleopatra',
  size: 202
}, {
  id: 'Canidius',
  parent: 'Antony And Cleopatra',
  size: 10
}, {
  id: 'Captain',
  parent: 'Antony And Cleopatra',
  size: 1
}, {
  id: 'Charmian',
  parent: 'Antony And Cleopatra',
  size: 63
}, {
  id: 'Cleopatra',
  parent: 'Antony And Cleopatra',
  size: 204
}, {
  id: 'Demetrius (Friend to Antony)',
  parent: 'Antony And Cleopatra',
  size: 2
}, {
  id: 'Dercetas',
  parent: 'Antony And Cleopatra',
  size: 5
}, {
  id: 'Diomedes',
  parent: 'Antony And Cleopatra',
  size: 7
}, {
  id: 'Dolabella',
  parent: 'Antony And Cleopatra',
  size: 23
}, {
  id: 'Domitius Enobarus',
  parent: 'Antony And Cleopatra',
  size: 113
}, {
  id: 'Egyptian',
  parent: 'Antony And Cleopatra',
  size: 2
}, {
  id: 'Eros',
  parent: 'Antony And Cleopatra',
  size: 27
}, {
  id: 'Euphronius',
  parent: 'Antony And Cleopatra',
  size: 5
}, {
  id: 'Gallus',
  parent: 'Antony And Cleopatra',
  size: 1
}, {
  id: 'Iras',
  parent: 'Antony And Cleopatra',
  size: 18
}, {
  id: 'Lepidus',
  parent: 'Antony And Cleopatra',
  size: 30
}, {
  id: 'Mardian',
  parent: 'Antony And Cleopatra',
  size: 7
}, {
  id: 'Mecaenas',
  parent: 'Antony And Cleopatra',
  size: 16
}, {
  id: 'Menas',
  parent: 'Antony And Cleopatra',
  size: 35
}, {
  id: 'Menecrates',
  parent: 'Antony And Cleopatra',
  size: 2
}, {
  id: 'Octavia',
  parent: 'Antony And Cleopatra',
  size: 13
}, {
  id: 'Octavius',
  parent: 'Antony And Cleopatra',
  size: 98
}, {
  id: 'Philo',
  parent: 'Antony And Cleopatra',
  size: 2
}, {
  id: 'Pompey',
  parent: 'Antony And Cleopatra',
  size: 41
}, {
  id: 'Proculeius',
  parent: 'Antony And Cleopatra',
  size: 10
}, {
  id: 'Scarus',
  parent: 'Antony And Cleopatra',
  size: 12
}, {
  id: 'Seleucus',
  parent: 'Antony And Cleopatra',
  size: 3
}, {
  id: 'Silius',
  parent: 'Antony And Cleopatra',
  size: 3
}, {
  id: 'Taurus',
  parent: 'Antony And Cleopatra',
  size: 1
}, {
  id: 'Thyreus',
  parent: 'Antony And Cleopatra',
  size: 12
}, {
  id: 'Varrius',
  parent: 'Antony And Cleopatra',
  size: 1
}, {
  id: 'Ventidius',
  parent: 'Antony And Cleopatra',
  size: 4
}, {
  id: 'Coriolanus',
  parent: 'Tragedies',
  size: null
}, {
  id: 'Aedile',
  parent: 'Coriolanus',
  size: 10
}, {
  id: 'Cominius',
  parent: 'Coriolanus',
  size: 67
}, {
  id: 'Coriolanus (Caius Marcius Coriolanus)',
  parent: 'Coriolanus',
  size: 189
}, {
  id: 'Junius Brutus',
  parent: 'Coriolanus',
  size: 91
}, {
  id: 'Lieutenant',
  parent: 'Coriolanus',
  size: 4
}, {
  id: 'Menenius Agrippa',
  parent: 'Coriolanus',
  size: 162
}, {
  id: 'Patrician',
  parent: 'Coriolanus',
  size: 3
}, {
  id: 'Roman',
  parent: 'Coriolanus',
  size: 10
}, {
  id: 'Sicinius Velutus',
  parent: 'Coriolanus',
  size: 117
}, {
  id: 'Titus Lartius',
  parent: 'Coriolanus',
  size: 23
}, {
  id: 'Tullus Aufidius',
  parent: 'Coriolanus',
  size: 45
}, {
  id: 'Valeria',
  parent: 'Coriolanus',
  size: 14
}, {
  id: 'Virgilia',
  parent: 'Coriolanus',
  size: 26
}, {
  id: 'Volsce',
  parent: 'Coriolanus',
  size: 9
}, {
  id: 'Volumnia',
  parent: 'Coriolanus',
  size: 57
}, {
  id: 'Young Coriolanus',
  parent: 'Coriolanus',
  size: 1
}, {
  id: 'Cymbeline',
  parent: 'Tragedies',
  size: null
}, {
  id: 'Arviragus',
  parent: 'Cymbeline',
  size: 46
}, {
  id: 'Belarius',
  parent: 'Cymbeline',
  size: 58
}, {
  id: 'Caius Lucius',
  parent: 'Cymbeline',
  size: 25
}, {
  id: 'Cloten',
  parent: 'Cymbeline',
  size: 77
}, {
  id: 'Cornelius (physician)',
  parent: 'Cymbeline',
  size: 13
}, {
  id: 'Cymbeline, King of Britain',
  parent: 'Cymbeline',
  size: 81
}, {
  id: 'Guiderius',
  parent: 'Cymbeline',
  size: 62
}, {
  id: 'Helen',
  parent: 'Cymbeline',
  size: 0
}, {
  id: 'Iachimo',
  parent: 'Cymbeline',
  size: 77
}, {
  id: 'Imogen',
  parent: 'Cymbeline',
  size: 118
}, {
  id: 'Jupiter',
  parent: 'Cymbeline',
  size: 1
}, {
  id: 'Philario',
  parent: 'Cymbeline',
  size: 14
}, {
  id: 'Pisanio',
  parent: 'Cymbeline',
  size: 58
}, {
  id: 'Posthumus Leonatus',
  parent: 'Cymbeline',
  size: 77
}, {
  id: 'Queen',
  parent: 'Cymbeline',
  size: 27
}, {
  id: 'Roman Captain',
  parent: 'Cymbeline',
  size: 4
}, {
  id: 'Sicilius Leonatus',
  parent: 'Cymbeline',
  size: 7
}, {
  id: 'The Tragedy of Hamlet, Prince of Denmark',
  parent: 'Tragedies',
  size: null
}, {
  id: 'Bernardo',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 19
}, {
  id: 'Claudius, King of Denmark',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 102
}, {
  id: 'Cornelius',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 1
}, {
  id: "Father's Ghost",
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 15
}, {
  id: 'Fortinbras',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 6
}, {
  id: 'Francisco ',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 8
}, {
  id: 'Gertrude',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 69
}, {
  id: 'Guildenstern',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 29
}, {
  id: 'Hamlet',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 358
}, {
  id: 'Horatio',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 109
}, {
  id: 'Laertes',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 62
}, {
  id: 'Lucianus',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 0
}, {
  id: 'Marcellus',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 37
}, {
  id: 'Ophelia',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 58
}, {
  id: 'Osric',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 25
}, {
  id: 'Polonius',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 86
}, {
  id: 'Reynaldo',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 13
}, {
  id: 'Rosencrantz',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 48
}, {
  id: 'Voltemand',
  parent: 'The Tragedy of Hamlet, Prince of Denmark',
  size: 1
}, {
  id: 'Julius Caesar',
  parent: 'Tragedies',
  size: null
}, {
  id: 'Antony (Marcus Antonius)',
  parent: 'Julius Caesar',
  size: 51
}, {
  id: 'Artemidorus of Cnidos',
  parent: 'Julius Caesar',
  size: 4
}, {
  id: 'Brutus (Marcus Brutus)',
  parent: 'Julius Caesar',
  size: 194
}, {
  id: 'Caesar (Julius Caesar)',
  parent: 'Julius Caesar',
  size: 42
}, {
  id: 'Calpurnia',
  parent: 'Julius Caesar',
  size: 6
}, {
  id: 'Casca',
  parent: 'Julius Caesar',
  size: 39
}, {
  id: 'Cassius',
  parent: 'Julius Caesar',
  size: 140
}, {
  id: 'Cicero',
  parent: 'Julius Caesar',
  size: 4
}, {
  id: 'Cinna',
  parent: 'Julius Caesar',
  size: 11
}, {
  id: 'Cinna the Poet',
  parent: 'Julius Caesar',
  size: 8
}, {
  id: 'Claudius',
  parent: 'Julius Caesar',
  size: 2
}, {
  id: 'Clitus',
  parent: 'Julius Caesar',
  size: 8
}, {
  id: 'Dardanius',
  parent: 'Julius Caesar',
  size: 3
}, {
  id: 'Decius Brutus',
  parent: 'Julius Caesar',
  size: 12
}, {
  id: 'Flavius',
  parent: 'Julius Caesar',
  size: 5
}, {
  id: 'Lepidus (Marcus Antonius Lepidus)',
  parent: 'Julius Caesar',
  size: 3
}, {
  id: 'Ligarius',
  parent: 'Julius Caesar',
  size: 5
}, {
  id: 'Lucilius',
  parent: 'Julius Caesar',
  size: 10
}, {
  id: 'Lucius',
  parent: 'Julius Caesar',
  size: 24
}, {
  id: 'Marullus',
  parent: 'Julius Caesar',
  size: 6
}, {
  id: 'Messala',
  parent: 'Julius Caesar',
  size: 20
}, {
  id: 'Metellus Cimber',
  parent: 'Julius Caesar',
  size: 5
}, {
  id: 'Octavius (Octavius Caesar)',
  parent: 'Julius Caesar',
  size: 19
}, {
  id: 'Pindarus',
  parent: 'Julius Caesar',
  size: 5
}, {
  id: 'Popilius (Popilius Lena)',
  parent: 'Julius Caesar',
  size: 2
}, {
  id: 'Portia (wife of Brutus)',
  parent: 'Julius Caesar',
  size: 16
}, {
  id: 'Publius',
  parent: 'Julius Caesar',
  size: 2
}, {
  id: 'Strato',
  parent: 'Julius Caesar',
  size: 4
}, {
  id: 'Tintinius',
  parent: 'Julius Caesar',
  size: 10
}, {
  id: 'Trebonius',
  parent: 'Julius Caesar',
  size: 4
}, {
  id: 'Varro',
  parent: 'Julius Caesar',
  size: 6
}, {
  id: 'Volumnius',
  parent: 'Julius Caesar',
  size: 3
}, {
  id: 'Young Cato',
  parent: 'Julius Caesar',
  size: 3
}, {
  id: 'King Lear',
  parent: 'Tragedies',
  size: null
}, {
  id: 'Cordelia',
  parent: 'King Lear',
  size: 31
}, {
  id: 'Curan',
  parent: 'King Lear',
  size: 4
}, {
  id: 'Duke of Albany',
  parent: 'King Lear',
  size: 58
}, {
  id: 'Duke of Burgundy',
  parent: 'King Lear',
  size: 5
}, {
  id: 'Duke of Cornwall',
  parent: 'King Lear',
  size: 53
}, {
  id: 'Earl of Gloucester',
  parent: 'King Lear',
  size: 118
}, {
  id: 'Earl of Kent',
  parent: 'King Lear',
  size: 127
}, {
  id: 'Edgar',
  parent: 'King Lear',
  size: 98
}, {
  id: 'Edmund',
  parent: 'King Lear',
  size: 79
}, {
  id: 'Goneril',
  parent: 'King Lear',
  size: 53
}, {
  id: 'King of France',
  parent: 'King Lear',
  size: 5
}, {
  id: 'Lear',
  parent: 'King Lear',
  size: 188
}, {
  id: 'Oswald',
  parent: 'King Lear',
  size: 38
}, {
  id: 'Regan',
  parent: 'King Lear',
  size: 73
}, {
  id: 'The Tragedy Of Macbeth',
  parent: 'Tragedies',
  size: null
}, {
  id: 'Angus',
  parent: 'The Tragedy Of Macbeth',
  size: 4
}, {
  id: 'Banquo',
  parent: 'The Tragedy Of Macbeth',
  size: 33
}, {
  id: 'Caithness',
  parent: 'The Tragedy Of Macbeth',
  size: 3
}, {
  id: 'Donalbain',
  parent: 'The Tragedy Of Macbeth',
  size: 3
}, {
  id: 'Duncan',
  parent: 'The Tragedy Of Macbeth',
  size: 18
}, {
  id: 'Fleance',
  parent: 'The Tragedy Of Macbeth',
  size: 2
}, {
  id: 'Hecate',
  parent: 'The Tragedy Of Macbeth',
  size: 2
}, {
  id: 'Lady Macbeth',
  parent: 'The Tragedy Of Macbeth',
  size: 59
}, {
  id: 'Lady Macduff',
  parent: 'The Tragedy Of Macbeth',
  size: 19
}, {
  id: 'Lennox',
  parent: 'The Tragedy Of Macbeth',
  size: 21
}, {
  id: 'Macbeth',
  parent: 'The Tragedy Of Macbeth',
  size: 146
}, {
  id: 'Macduff',
  parent: 'The Tragedy Of Macbeth',
  size: 59
}, {
  id: 'Malcolm',
  parent: 'The Tragedy Of Macbeth',
  size: 40
}, {
  id: 'Menteith',
  parent: 'The Tragedy Of Macbeth',
  size: 5
}, {
  id: 'Porter',
  parent: 'The Tragedy Of Macbeth',
  size: 4
}, {
  id: 'Ross',
  parent: 'The Tragedy Of Macbeth',
  size: 39
}, {
  id: 'Seyton',
  parent: 'The Tragedy Of Macbeth',
  size: 5
}, {
  id: 'Siward',
  parent: 'The Tragedy Of Macbeth',
  size: 11
}, {
  id: "Son (Macduff's son)",
  parent: 'The Tragedy Of Macbeth',
  size: 14
}, {
  id: 'Young Siward',
  parent: 'The Tragedy Of Macbeth',
  size: 4
}, {
  id: 'The Tragedy Of Othello',
  parent: 'Tragedies',
  size: null
}, {
  id: 'Bianca (Mistress to Cassio)',
  parent: 'The Tragedy Of Othello',
  size: 15
}, {
  id: 'Brabantio',
  parent: 'The Tragedy Of Othello',
  size: 30
}, {
  id: 'Cassio',
  parent: 'The Tragedy Of Othello',
  size: 110
}, {
  id: 'Desdemona',
  parent: 'The Tragedy Of Othello',
  size: 165
}, {
  id: 'Duke of Venice',
  parent: 'The Tragedy Of Othello',
  size: 25
}, {
  id: 'Emilia',
  parent: 'The Tragedy Of Othello',
  size: 103
}, {
  id: 'Gratiano (Brother to Brabantio)',
  parent: 'The Tragedy Of Othello',
  size: 20
}, {
  id: 'Iago',
  parent: 'The Tragedy Of Othello',
  size: 272
}, {
  id: 'Lodovico',
  parent: 'The Tragedy Of Othello',
  size: 33
}, {
  id: 'Montano',
  parent: 'The Tragedy Of Othello',
  size: 24
}, {
  id: 'Othello',
  parent: 'The Tragedy Of Othello',
  size: 274
}, {
  id: 'Roderigo',
  parent: 'The Tragedy Of Othello',
  size: 59
}, {
  id: 'Romeo And Juliet',
  parent: 'Tragedies',
  size: null
}, {
  id: 'Abraham',
  parent: 'Romeo And Juliet',
  size: 5
}, {
  id: 'Balthasar (Servant to Romeo)',
  parent: 'Romeo And Juliet',
  size: 12
}, {
  id: 'Benvolio',
  parent: 'Romeo And Juliet',
  size: 64
}, {
  id: 'Capulet',
  parent: 'Romeo And Juliet',
  size: 51
}, {
  id: 'Friar John',
  parent: 'Romeo And Juliet',
  size: 4
}, {
  id: 'Friar Laurence',
  parent: 'Romeo And Juliet',
  size: 55
}, {
  id: 'Gregory',
  parent: 'Romeo And Juliet',
  size: 15
}, {
  id: 'Juliet',
  parent: 'Romeo And Juliet',
  size: 118
}, {
  id: 'Lady Capulet',
  parent: 'Romeo And Juliet',
  size: 45
}, {
  id: 'Lady Montague',
  parent: 'Romeo And Juliet',
  size: 2
}, {
  id: 'Mercutio',
  parent: 'Romeo And Juliet',
  size: 62
}, {
  id: 'Montague',
  parent: 'Romeo And Juliet',
  size: 10
}, {
  id: 'Paris',
  parent: 'Romeo And Juliet',
  size: 23
}, {
  id: "Peter (Servant to Juliet's Nurse)",
  parent: 'Romeo And Juliet',
  size: 13
}, {
  id: 'Prince Escalus',
  parent: 'Romeo And Juliet',
  size: 16
}, {
  id: 'Romeo',
  parent: 'Romeo And Juliet',
  size: 163
}, {
  id: 'Sampson',
  parent: 'Romeo And Juliet',
  size: 20
}, {
  id: 'Tybalt',
  parent: 'Romeo And Juliet',
  size: 17
}];

function Links(_ref) {
  var _ref$links = _ref.links,
      links = _ref$links === void 0 ? [] : _ref$links,
      linkComponent = _ref.linkComponent,
      className = _ref.className;
  return /*#__PURE__*/React.createElement(React.Fragment, null, links.map(function (link, i) {
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "network-link-" + i,
      className: cx('vx-network-link', className)
    }, React.createElement(linkComponent, {
      link: link
    }));
  }));
}
Links.propTypes = {
  links: _pt.array,
  className: _pt.string
};

function DefaultNode() {
  return /*#__PURE__*/React.createElement("circle", {
    r: 15,
    fill: "#21D4FD"
  });
}

function Nodes(_ref) {
  var _ref$nodes = _ref.nodes,
      nodes = _ref$nodes === void 0 ? [] : _ref$nodes,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? DefaultNode : _ref$nodeComponent,
      className = _ref.className,
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? function (d) {
    return d && d.x || 0;
  } : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? function (d) {
    return d && d.y || 0;
  } : _ref$y;
  return /*#__PURE__*/React.createElement(React.Fragment, null, nodes.map(function (node, i) {
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "network-node-" + i,
      className: cx('vx-network-node', className),
      left: x(node),
      top: y(node)
    }, React.createElement(nodeComponent, {
      node: node
    }));
  }));
}
Nodes.propTypes = {
  nodes: _pt.array,
  className: _pt.string,
  x: _pt.func,
  y: _pt.func
};

function DefaultLink(_ref) {
  var link = _ref.link;
  return link && link.source && link.target ? /*#__PURE__*/React.createElement("line", {
    x1: link.source.x,
    y1: link.source.y,
    x2: link.target.x,
    y2: link.target.y,
    strokeWidth: 2,
    stroke: "#999",
    strokeOpacity: 0.6
  }) : null;
}

function Graph(_ref) {
  var graph = _ref.graph,
      _ref$linkComponent = _ref.linkComponent,
      linkComponent = _ref$linkComponent === void 0 ? DefaultLink : _ref$linkComponent,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? DefaultNode : _ref$nodeComponent,
      top = _ref.top,
      left = _ref.left;
  return graph ? /*#__PURE__*/React.createElement(Group$1, {
    top: top,
    left: left
  }, /*#__PURE__*/React.createElement(Links, {
    links: graph.links,
    linkComponent: linkComponent
  }), /*#__PURE__*/React.createElement(Nodes, {
    nodes: graph.nodes,
    nodeComponent: nodeComponent
  })) : null;
}
Graph.propTypes = {
  top: _pt.number,
  left: _pt.number
};

function Pattern(_ref) {
  var id = _ref.id,
      width = _ref.width,
      height = _ref.height,
      children = _ref.children;
  return /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: id,
    width: width,
    height: height,
    patternUnits: "userSpaceOnUse"
  }, children));
}
Pattern.propTypes = {
  id: _pt.string.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  children: _pt.node.isRequired
};

var PatternOrientation = {
  horizontal: 'horizontal',
  vertical: 'vertical',
  diagonal: 'diagonal'
};

function pathForOrientation(_ref) {
  var height = _ref.height,
      orientation = _ref.orientation;

  switch (orientation) {
    case PatternOrientation.vertical:
      return "M " + height / 2 + ", 0 l 0, " + height;

    case PatternOrientation.horizontal:
      return "M 0," + height / 2 + " l " + height + ",0";

    case PatternOrientation.diagonal:
      return "M 0," + height + " l " + height + "," + -height + " M " + -height / 4 + "," + height / 4 + " l " + height / 2 + "," + -height / 2 + "\n             M " + 3 / 4 * height + "," + 5 / 4 * height + " l " + height / 2 + "," + -height / 2;

    default:
      return "M " + height / 2 + ", 0 l 0, " + height;
  }
}

function PatternLines(_ref2) {
  var id = _ref2.id,
      width = _ref2.width,
      height = _ref2.height,
      stroke = _ref2.stroke,
      strokeWidth = _ref2.strokeWidth,
      strokeDasharray = _ref2.strokeDasharray,
      _ref2$strokeLinecap = _ref2.strokeLinecap,
      strokeLinecap = _ref2$strokeLinecap === void 0 ? 'square' : _ref2$strokeLinecap,
      _ref2$shapeRendering = _ref2.shapeRendering,
      shapeRendering = _ref2$shapeRendering === void 0 ? 'auto' : _ref2$shapeRendering,
      _ref2$orientation = _ref2.orientation,
      orientation = _ref2$orientation === void 0 ? ['vertical'] : _ref2$orientation,
      background = _ref2.background,
      className = _ref2.className;
  var orientations = Array.isArray(orientation) ? orientation : [orientation];
  return /*#__PURE__*/React.createElement(Pattern, {
    id: id,
    width: width,
    height: height
  }, !!background && /*#__PURE__*/React.createElement("rect", {
    className: cx('vx-pattern-line-background'),
    width: width,
    height: height,
    fill: background
  }), orientations.map(function (o, i) {
    return /*#__PURE__*/React.createElement("path", {
      key: "vx-" + id + "-line-" + o + "-" + i,
      className: cx('vx-pattern-line', className),
      d: pathForOrientation({
        orientation: o,
        height: height
      }),
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      strokeLinecap: strokeLinecap,
      shapeRendering: shapeRendering
    });
  }));
}
PatternLines.propTypes = {
  id: _pt.string.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  className: _pt.string,
  background: _pt.string,
  stroke: _pt.string,
  strokeWidth: _pt.oneOfType([_pt.number, _pt.string]),
  strokeDasharray: _pt.oneOfType([_pt.string, _pt.number]),
  strokeLinecap: _pt.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _pt.oneOfType([_pt.string, _pt.number]),
  orientation: _pt.array
};

function PatternCircles(_ref) {
  var id = _ref.id,
      width = _ref.width,
      height = _ref.height,
      _ref$radius = _ref.radius,
      radius = _ref$radius === void 0 ? 2 : _ref$radius,
      fill = _ref.fill,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      background = _ref.background,
      _ref$complement = _ref.complement,
      complement = _ref$complement === void 0 ? false : _ref$complement,
      className = _ref.className;
  var corners;

  if (complement) {
    corners = [[0, 0], [0, height], [width, 0], [width, height]];
  }

  return /*#__PURE__*/React.createElement(Pattern, {
    id: id,
    width: width,
    height: height
  }, !!background && /*#__PURE__*/React.createElement("rect", {
    width: width,
    height: height,
    fill: background
  }), /*#__PURE__*/React.createElement("circle", {
    className: cx('vx-pattern-circle', className),
    cx: width / 2,
    cy: height / 2,
    r: radius,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray
  }), corners && corners.map(function (_ref2) {
    var cornerX = _ref2[0],
        cornerY = _ref2[1];
    return /*#__PURE__*/React.createElement("circle", {
      key: id + "-complement-" + cornerX + "-" + cornerY,
      className: cx('vx-pattern-circle vx-pattern-circle-complement', className),
      cx: cornerX,
      cy: cornerY,
      r: radius,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray
    });
  }));
}
PatternCircles.propTypes = {
  id: _pt.string.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  radius: _pt.number,
  fill: _pt.string,
  className: _pt.string,
  stroke: _pt.string,
  strokeWidth: _pt.oneOfType([_pt.number, _pt.string]),
  strokeDasharray: _pt.oneOfType([_pt.number, _pt.string]),
  complement: _pt.bool,
  background: _pt.string
};

function PatternPath(_ref) {
  var id = _ref.id,
      width = _ref.width,
      height = _ref.height,
      path = _ref.path,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? 'transparent' : _ref$fill,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      _ref$strokeLinecap = _ref.strokeLinecap,
      strokeLinecap = _ref$strokeLinecap === void 0 ? 'square' : _ref$strokeLinecap,
      _ref$shapeRendering = _ref.shapeRendering,
      shapeRendering = _ref$shapeRendering === void 0 ? 'auto' : _ref$shapeRendering,
      background = _ref.background,
      className = _ref.className;
  return /*#__PURE__*/React.createElement(Pattern, {
    id: id,
    width: width,
    height: height
  }, !!background && /*#__PURE__*/React.createElement("rect", {
    width: width,
    height: height,
    fill: background
  }), /*#__PURE__*/React.createElement("path", {
    className: cx('vx-pattern-path', className),
    d: path,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    strokeLinecap: strokeLinecap,
    shapeRendering: shapeRendering
  }));
}
PatternPath.propTypes = {
  id: _pt.string.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  path: _pt.string,
  fill: _pt.string,
  className: _pt.string,
  background: _pt.string,
  stroke: _pt.string,
  strokeWidth: _pt.oneOfType([_pt.number, _pt.string]),
  strokeDasharray: _pt.oneOfType([_pt.string, _pt.number]),
  strokeLinecap: _pt.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _pt.oneOfType([_pt.string, _pt.number])
};

function PatternWaves(_ref) {
  var id = _ref.id,
      width = _ref.width,
      height = _ref.height,
      fill = _ref.fill,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      strokeLinecap = _ref.strokeLinecap,
      shapeRendering = _ref.shapeRendering,
      background = _ref.background,
      className = _ref.className;
  return /*#__PURE__*/React.createElement(PatternPath, {
    className: cx('vx-pattern-wave', className),
    path: "M 0 " + height / 2 + " c " + height / 8 + " " + -height / 4 + " , " + height * 3 / 8 + " " + -height / 4 + " , " + height / 2 + " 0\n             c " + height / 8 + " " + height / 4 + " , " + height * 3 / 8 + " " + height / 4 + " , " + height / 2 + " 0 M " + -height / 2 + " " + height / 2 + "\n             c " + height / 8 + " " + height / 4 + " , " + height * 3 / 8 + " " + height / 4 + " , " + height / 2 + " 0 M " + height + " " + height / 2 + "\n             c " + height / 8 + " " + -height / 4 + " , " + height * 3 / 8 + " " + -height / 4 + " , " + height / 2 + " 0",
    id: id,
    width: width,
    height: height,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    strokeLinecap: strokeLinecap,
    shapeRendering: shapeRendering,
    background: background
  });
}
PatternWaves.propTypes = {
  id: _pt.string.isRequired,
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  fill: _pt.string,
  className: _pt.string,
  background: _pt.string,
  stroke: _pt.string,
  strokeWidth: _pt.oneOfType([_pt.number, _pt.string]),
  strokeDasharray: _pt.oneOfType([_pt.string, _pt.number]),
  strokeLinecap: _pt.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _pt.oneOfType([_pt.string, _pt.number])
};

function PatternHexagons(_ref) {
  var id = _ref.id,
      height = _ref.height,
      fill = _ref.fill,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      strokeLinecap = _ref.strokeLinecap,
      shapeRendering = _ref.shapeRendering,
      background = _ref.background,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 3 : _ref$size;
  var sqrtSize = Math.sqrt(size);
  return /*#__PURE__*/React.createElement(PatternPath, {
    className: cx('vx-pattern-hexagon', className),
    path: "M " + height + ",0 l " + height + ",0 l " + height / 2 + "," + height * sqrtSize / 2 + " l " + -height / 2 + "," + height * sqrtSize / 2 + " l " + -height + ",0 l " + -height / 2 + "," + -height * sqrtSize / 2 + " Z M 0," + height * sqrtSize / 2 + " l " + height / 2 + ",0 M " + 3 * height + "," + height * sqrtSize / 2 + " l " + -height / 2 + ",0",
    id: id,
    width: size,
    height: sqrtSize,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    strokeLinecap: strokeLinecap,
    shapeRendering: shapeRendering,
    background: background
  });
}
PatternHexagons.propTypes = {
  id: _pt.string.isRequired,
  height: _pt.number.isRequired,
  size: _pt.number,
  fill: _pt.string,
  className: _pt.string,
  background: _pt.string,
  stroke: _pt.string,
  strokeWidth: _pt.oneOfType([_pt.number, _pt.string]),
  strokeDasharray: _pt.oneOfType([_pt.string, _pt.number]),
  strokeLinecap: _pt.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: _pt.oneOfType([_pt.string, _pt.number])
};

function _defineProperty$7(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Point = /*#__PURE__*/function () {
  function Point(_ref) {
    var _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y;

    _defineProperty$7(this, "x", 0);

    _defineProperty$7(this, "y", 0);

    this.x = x;
    this.y = y;
  }

  var _proto = Point.prototype;

  _proto.value = function value() {
    return {
      x: this.x,
      y: this.y
    };
  };

  _proto.toArray = function toArray() {
    return [this.x, this.y];
  };

  return Point;
}();

function ResponsiveSVG(_ref) {
  var children = _ref.children,
      width = _ref.width,
      height = _ref.height,
      _ref$xOrigin = _ref.xOrigin,
      xOrigin = _ref$xOrigin === void 0 ? 0 : _ref$xOrigin,
      _ref$yOrigin = _ref.yOrigin,
      yOrigin = _ref$yOrigin === void 0 ? 0 : _ref$yOrigin,
      _ref$preserveAspectRa = _ref.preserveAspectRatio,
      preserveAspectRatio = _ref$preserveAspectRa === void 0 ? 'xMinYMin meet' : _ref$preserveAspectRa,
      innerRef = _ref.innerRef;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      position: 'relative',
      width: '100%',
      verticalAlign: 'top',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    preserveAspectRatio: preserveAspectRatio,
    viewBox: xOrigin + " " + yOrigin + " " + width + " " + height,
    ref: innerRef
  }, children));
}
ResponsiveSVG.propTypes = {
  children: _pt.node,
  width: _pt.oneOfType([_pt.number, _pt.string]),
  height: _pt.oneOfType([_pt.number, _pt.string]),
  xOrigin: _pt.oneOfType([_pt.number, _pt.string]),
  yOrigin: _pt.oneOfType([_pt.number, _pt.string]),
  preserveAspectRatio: _pt.string,
  innerRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object])
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root, 'Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect$1 = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect$1;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement$1 = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect$1;
    }
    if (isSVGGraphicsElement$1(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

function _extends$T() { _extends$T = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$T.apply(this, arguments); }

function _objectWithoutPropertiesLoose$C(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized$7(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$7(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$8(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ParentSize = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$7(ParentSize, _React$Component);

  function ParentSize(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty$8(_assertThisInitialized$7(_this), "animationFrameID", void 0);

    _defineProperty$8(_assertThisInitialized$7(_this), "resizeObserver", void 0);

    _defineProperty$8(_assertThisInitialized$7(_this), "target", null);

    _defineProperty$8(_assertThisInitialized$7(_this), "resize", function (_ref) {
      var width = _ref.width,
          height = _ref.height,
          top = _ref.top,
          left = _ref.left;

      _this.setState(function () {
        return {
          width: width,
          height: height,
          top: top,
          left: left
        };
      });
    });

    _defineProperty$8(_assertThisInitialized$7(_this), "setTarget", function (ref) {
      _this.target = ref;
    });

    _this.state = {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    };
    _this.resize = debounce(_this.resize, props.debounceTime);
    _this.animationFrameID = null;
    return _this;
  }

  var _proto = ParentSize.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.resizeObserver = new index(function (entries
    /** , observer */
    ) {
      if (entries === void 0) {
        entries = [];
      }

      entries.forEach(function (entry) {
        var _entry$contentRect = entry.contentRect,
            left = _entry$contentRect.left,
            top = _entry$contentRect.top,
            width = _entry$contentRect.width,
            height = _entry$contentRect.height;
        _this2.animationFrameID = window.requestAnimationFrame(function () {
          _this2.resize({
            width: width,
            height: height,
            top: top,
            left: left
          });
        });
      });
    });
    if (this.target) this.resizeObserver.observe(this.target);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.animationFrameID) window.cancelAnimationFrame(this.animationFrameID);
    if (this.resizeObserver) this.resizeObserver.disconnect();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        debounceTime = _this$props.debounceTime,
        parentSizeStyles = _this$props.parentSizeStyles,
        restProps = _objectWithoutPropertiesLoose$C(_this$props, ["className", "children", "debounceTime", "parentSizeStyles"]);

    return /*#__PURE__*/React.createElement("div", _extends$T({
      style: parentSizeStyles,
      ref: this.setTarget,
      className: className
    }, restProps), children(_extends$T({}, this.state, {
      ref: this.target,
      resize: this.resize
    })));
  };

  return ParentSize;
}(React.Component);

_defineProperty$8(ParentSize, "propTypes", {
  className: _pt.string,
  debounceTime: _pt.number,
  children: _pt.func.isRequired
});

_defineProperty$8(ParentSize, "defaultProps", {
  debounceTime: 300,
  parentSizeStyles: {
    width: '100%',
    height: '100%'
  }
});

function _extends$U() { _extends$U = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$U.apply(this, arguments); }

function _assertThisInitialized$8(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$8(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$9(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var CONTAINER_STYLES = {
  width: '100%',
  height: '100%'
};
function withParentSize(BaseComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose$8(WrappedComponent, _React$Component);

    function WrappedComponent(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;

      _defineProperty$9(_assertThisInitialized$8(_this), "animationFrameID", void 0);

      _defineProperty$9(_assertThisInitialized$8(_this), "resizeObserver", void 0);

      _defineProperty$9(_assertThisInitialized$8(_this), "container", null);

      _defineProperty$9(_assertThisInitialized$8(_this), "debouncedResize", void 0);

      _defineProperty$9(_assertThisInitialized$8(_this), "setRef", function (ref) {
        _this.container = ref;
      });

      _defineProperty$9(_assertThisInitialized$8(_this), "resize", function (_ref) {
        var width = _ref.width,
            height = _ref.height;

        _this.setState({
          parentWidth: width,
          parentHeight: height
        });
      });

      _this.state = {
        parentWidth: undefined,
        parentHeight: undefined
      };
      _this.animationFrameID = null;
      _this.debouncedResize = debounce(_this.resize, props.debounceTime);
      return _this;
    }

    var _proto = WrappedComponent.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var _this2 = this;

      this.resizeObserver = new index(function (entries
      /** , observer */
      ) {
        entries.forEach(function (entry) {
          var _entry$contentRect = entry.contentRect,
              width = _entry$contentRect.width,
              height = _entry$contentRect.height;
          _this2.animationFrameID = window.requestAnimationFrame(function () {
            _this2.debouncedResize({
              width: width,
              height: height
            });
          });
        });
      });
      if (this.container) this.resizeObserver.observe(this.container);
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this.animationFrameID) window.cancelAnimationFrame(this.animationFrameID);
      if (this.resizeObserver) this.resizeObserver.disconnect();
    };

    _proto.render = function render() {
      var _this$state = this.state,
          parentWidth = _this$state.parentWidth,
          parentHeight = _this$state.parentHeight;
      return /*#__PURE__*/React.createElement("div", {
        style: CONTAINER_STYLES,
        ref: this.setRef
      }, parentWidth != null && parentHeight != null && /*#__PURE__*/React.createElement(BaseComponent, _extends$U({
        parentWidth: parentWidth,
        parentHeight: parentHeight
      }, this.props)));
    };

    return WrappedComponent;
  }(React.Component), _defineProperty$9(_class, "propTypes", {
    parentWidth: _pt.number,
    parentHeight: _pt.number
  }), _defineProperty$9(_class, "defaultProps", {
    debounceTime: 300
  }), _temp;
}

function _extends$V() { _extends$V = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$V.apply(this, arguments); }

function _assertThisInitialized$9(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$9(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$a(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function withScreenSize(BaseComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose$9(WrappedComponent, _React$Component);

    function WrappedComponent(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;

      _defineProperty$a(_assertThisInitialized$9(_this), "handleResize", void 0);

      _defineProperty$a(_assertThisInitialized$9(_this), "resize", function ()
      /** event */
      {
        _this.setState(function ()
        /** prevState, props */
        {
          return {
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight
          };
        });
      });

      _this.state = {
        screenWidth: undefined,
        screenHeight: undefined
      };
      _this.handleResize = debounce(_this.resize, props.windowResizeDebounceTime);
      return _this;
    }

    var _proto = WrappedComponent.prototype;

    _proto.componentDidMount = function componentDidMount() {
      window.addEventListener('resize', this.handleResize, false);
      this.resize();
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize, false);
    };

    _proto.render = function render() {
      var _this$state = this.state,
          screenWidth = _this$state.screenWidth,
          screenHeight = _this$state.screenHeight;
      if (screenWidth == null || screenHeight == null) return null;
      return /*#__PURE__*/React.createElement(BaseComponent, _extends$V({
        screenWidth: screenWidth,
        screenHeight: screenHeight
      }, this.props));
    };

    return WrappedComponent;
  }(React.Component), _defineProperty$a(_class, "propTypes", {
    screenWidth: _pt.number,
    screenHeight: _pt.number
  }), _defineProperty$a(_class, "defaultProps", {
    windowResizeDebounceTime: 300
  }), _temp;
}

function bandScale(_ref) {
  var range = _ref.range,
      rangeRound = _ref.rangeRound,
      domain = _ref.domain,
      padding = _ref.padding,
      paddingInner = _ref.paddingInner,
      paddingOuter = _ref.paddingOuter,
      align = _ref.align,
      tickFormat = _ref.tickFormat;
  var scale = scaleBand();
  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (padding) scale.padding(padding);
  if (paddingInner) scale.paddingInner(paddingInner);
  if (paddingOuter) scale.paddingOuter(paddingOuter);
  if (align) scale.align(align); // @TODO should likely get rid of these.
  // @ts-ignore

  if (tickFormat) scale.tickFormat = tickFormat; // @ts-ignore

  scale.type = 'band';
  return scale;
}

function pointScale(_ref) {
  var range = _ref.range,
      rangeRound = _ref.rangeRound,
      domain = _ref.domain,
      padding = _ref.padding,
      align = _ref.align;
  var scale = scalePoint();
  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (padding) scale.padding(padding);
  if (align) scale.align(align); // @ts-ignore

  scale.type = 'point';
  return scale;
}

function linearScale(_ref) {
  var range = _ref.range,
      rangeRound = _ref.rangeRound,
      domain = _ref.domain,
      _ref$nice = _ref.nice,
      nice = _ref$nice === void 0 ? false : _ref$nice,
      _ref$clamp = _ref.clamp,
      clamp = _ref$clamp === void 0 ? false : _ref$clamp;
  var scale = scaleLinear();
  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true); // @ts-ignore

  scale.type = 'linear';
  return scale;
}

function timeScale(_ref) {
  var range = _ref.range,
      rangeRound = _ref.rangeRound,
      domain = _ref.domain,
      _ref$nice = _ref.nice,
      nice = _ref$nice === void 0 ? false : _ref$nice,
      _ref$clamp = _ref.clamp,
      clamp = _ref$clamp === void 0 ? false : _ref$clamp;
  var scale = scaleTime();
  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true); // @ts-ignore

  scale.type = 'time';
  return scale;
}

function timeScale$1(_ref) {
  var range = _ref.range,
      rangeRound = _ref.rangeRound,
      domain = _ref.domain,
      _ref$nice = _ref.nice,
      nice = _ref$nice === void 0 ? false : _ref$nice,
      _ref$clamp = _ref.clamp,
      clamp = _ref$clamp === void 0 ? false : _ref$clamp;
  var scale = scaleUtc();
  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true); // @ts-ignore

  scale.type = 'utc';
  return scale;
}

function logScale(_ref) {
  var range = _ref.range,
      rangeRound = _ref.rangeRound,
      domain = _ref.domain,
      base = _ref.base,
      _ref$nice = _ref.nice,
      nice = _ref$nice === void 0 ? false : _ref$nice,
      _ref$clamp = _ref.clamp,
      clamp = _ref$clamp === void 0 ? false : _ref$clamp;
  var scale = scaleLog();
  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true);
  if (base) scale.base(base); // @ts-ignore

  scale.type = 'log';
  return scale;
}

function powerScale(_ref) {
  var range = _ref.range,
      rangeRound = _ref.rangeRound,
      domain = _ref.domain,
      exponent = _ref.exponent,
      _ref$nice = _ref.nice,
      nice = _ref$nice === void 0 ? false : _ref$nice,
      _ref$clamp = _ref.clamp,
      clamp = _ref$clamp === void 0 ? false : _ref$clamp;
  var scale = scalePow();
  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true);
  if (exponent) scale.exponent(exponent); // @ts-ignore

  scale.type = 'power';
  return scale;
}

function ordinalScale(_ref) {
  var range = _ref.range,
      domain = _ref.domain,
      unknown = _ref.unknown;
  var scale = scaleOrdinal();
  if (range) scale.range(range);
  if (domain) scale.domain(domain);
  if (unknown) scale.unknown(unknown); // @ts-ignore

  scale.type = 'ordinal';
  return scale;
}

function quantizeScale(_ref) {
  var range = _ref.range,
      domain = _ref.domain,
      ticks = _ref.ticks,
      tickFormat = _ref.tickFormat,
      _ref$nice = _ref.nice,
      nice = _ref$nice === void 0 ? false : _ref$nice;
  var scale = scaleQuantize();
  if (range) scale.range(range);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (ticks) scale.ticks(ticks);
  if (tickFormat) scale.tickFormat.apply(scale, tickFormat); // @ts-ignore

  scale.type = 'quantize';
  return scale;
}

function quantileScale(_ref) {
  var range = _ref.range,
      domain = _ref.domain;
  var scale = scaleQuantile();
  if (range) scale.range(range);
  if (domain) scale.domain(domain); // @ts-ignore

  scale.type = 'quantile';
  return scale;
}

// @ts-ignore no type defs for symlog
function symLogScale(_ref) {
  var range = _ref.range,
      domain = _ref.domain,
      constant = _ref.constant;
  var scale = scaleSymlog();
  if (range) scale.range(range);
  if (domain) scale.domain(domain);
  if (constant) scale.constant(constant); // @ts-ignore

  scale.type = 'symlog';
  return scale;
}

function thresholdScale(_ref) {
  var range = _ref.range,
      domain = _ref.domain;
  var scale = scaleThreshold();
  if (range) scale.range(range);
  if (domain) scale.domain(domain); // @ts-ignore

  scale.type = 'threshold';
  return scale;
}

function _extends$W() { _extends$W = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$W.apply(this, arguments); }

var has = Object.prototype.hasOwnProperty;
function updateScale(scale, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      args = _extends$W({}, _ref);

  var nextScale = scale.copy();
  Object.keys(args).forEach(function (key) {
    if (has.call(nextScale, key)) nextScale[key](args[key]);
  });
  return nextScale;
}

function _extends$X() { _extends$X = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$X.apply(this, arguments); }
function squareRootScale(scaleConfig) {
  var scale = powerScale(_extends$X({}, scaleConfig, {
    exponent: 0.5
  })); // @ts-ignore

  scale.type = 'squareRoot';
  return scale;
}

/**
 * This is a workaround for TypeScript not inferring the correct
 * method overload/signature for some d3 shape methods.
 */
function setNumberOrNumberAccessor$1(func, value) {
  if (typeof value === 'number') func(value);else func(value);
}

function _extends$Y() { _extends$Y = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$Y.apply(this, arguments); }

function _objectWithoutPropertiesLoose$D(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Arc(_ref) {
  var className = _ref.className,
      data = _ref.data,
      innerRadius = _ref.innerRadius,
      outerRadius = _ref.outerRadius,
      cornerRadius = _ref.cornerRadius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle,
      padAngle = _ref.padAngle,
      padRadius = _ref.padRadius,
      children = _ref.children,
      innerRef = _ref.innerRef,
      restProps = _objectWithoutPropertiesLoose$D(_ref, ["className", "data", "innerRadius", "outerRadius", "cornerRadius", "startAngle", "endAngle", "padAngle", "padRadius", "children", "innerRef"]);

  var arc$1 = arc();
  if (innerRadius != null) setNumberOrNumberAccessor$1(arc$1.innerRadius, innerRadius);
  if (outerRadius != null) setNumberOrNumberAccessor$1(arc$1.outerRadius, outerRadius);
  if (cornerRadius != null) setNumberOrNumberAccessor$1(arc$1.cornerRadius, cornerRadius);
  if (startAngle != null) setNumberOrNumberAccessor$1(arc$1.startAngle, startAngle);
  if (endAngle != null) setNumberOrNumberAccessor$1(arc$1.endAngle, endAngle);
  if (padAngle != null) setNumberOrNumberAccessor$1(arc$1.padAngle, padAngle);
  if (padRadius != null) setNumberOrNumberAccessor$1(arc$1.padRadius, padRadius);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: arc$1
  }));
  if (!data) return null;
  return /*#__PURE__*/React.createElement("path", _extends$Y({
    ref: innerRef,
    className: cx('vx-arc', className),
    d: arc$1(data) || ''
  }, restProps));
}
Arc.propTypes = {
  className: _pt.string,
  children: _pt.func,
  innerRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object])
};

function _extends$Z() { _extends$Z = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$Z.apply(this, arguments); }

function _objectWithoutPropertiesLoose$E(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Pie(_ref) {
  var className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      centroid = _ref.centroid,
      _ref$innerRadius = _ref.innerRadius,
      innerRadius = _ref$innerRadius === void 0 ? 0 : _ref$innerRadius,
      outerRadius = _ref.outerRadius,
      cornerRadius = _ref.cornerRadius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle,
      padAngle = _ref.padAngle,
      padRadius = _ref.padRadius,
      pieSort = _ref.pieSort,
      pieSortValues = _ref.pieSortValues,
      pieValue = _ref.pieValue,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$E(_ref, ["className", "top", "left", "data", "centroid", "innerRadius", "outerRadius", "cornerRadius", "startAngle", "endAngle", "padAngle", "padRadius", "pieSort", "pieSortValues", "pieValue", "children"]);

  var path = arc();
  if (innerRadius != null) setNumberOrNumberAccessor$1(path.innerRadius, innerRadius);
  if (outerRadius != null) setNumberOrNumberAccessor$1(path.outerRadius, outerRadius);
  if (cornerRadius != null) setNumberOrNumberAccessor$1(path.cornerRadius, cornerRadius);
  if (padRadius != null) setNumberOrNumberAccessor$1(path.padRadius, padRadius);
  var pie$1 = pie(); // ts can't distinguish between these method overloads

  if (pieSort === null) pie$1.sort(pieSort);else if (pieSort != null) pie$1.sort(pieSort);
  if (pieSortValues === null) pie$1.sortValues(pieSortValues);else if (pieSortValues != null) pie$1.sortValues(pieSortValues);
  if (pieValue != null) pie$1.value(pieValue);
  if (padAngle != null) setNumberOrNumberAccessor$1(pie$1.padAngle, padAngle);
  if (startAngle != null) setNumberOrNumberAccessor$1(pie$1.startAngle, startAngle);
  if (endAngle != null) setNumberOrNumberAccessor$1(pie$1.endAngle, endAngle);
  var arcs = pie$1(data);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    arcs: arcs,
    path: path,
    pie: pie$1
  }));
  return /*#__PURE__*/React.createElement(Group$1, {
    className: "vx-pie-arcs-group",
    top: top,
    left: left
  }, arcs.map(function (arc, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: "pie-arc-" + i
    }, /*#__PURE__*/React.createElement("path", _extends$Z({
      className: cx('vx-pie-arc', className),
      d: path(arc) || ''
    }, restProps)), centroid && centroid(path.centroid(arc), arc));
  }));
}
Pie.propTypes = {
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  data: _pt.array,
  pieSort: _pt.oneOfType([_pt.oneOf([null]), _pt.func]),
  pieSortValues: _pt.oneOfType([_pt.oneOf([null]), _pt.func]),
  centroid: _pt.func,
  children: _pt.func
};

function _extends$_() { _extends$_ = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$_.apply(this, arguments); }

function _objectWithoutPropertiesLoose$F(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Line(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? {
    x: 0,
    y: 0
  } : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? {
    x: 1,
    y: 1
  } : _ref$to,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? 'transparent' : _ref$fill,
      className = _ref.className,
      innerRef = _ref.innerRef,
      restProps = _objectWithoutPropertiesLoose$F(_ref, ["from", "to", "fill", "className", "innerRef"]);

  return /*#__PURE__*/React.createElement("line", _extends$_({
    ref: innerRef,
    className: cx('vx-line', className),
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y,
    fill: fill
  }, restProps));
}
Line.propTypes = {
  className: _pt.string,
  innerRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object]),
  fill: _pt.string,
  from: _pt.shape({
    x: _pt.number,
    y: _pt.number
  }),
  to: _pt.shape({
    x: _pt.number,
    y: _pt.number
  })
};

function _extends$$() { _extends$$ = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$$.apply(this, arguments); }

function _objectWithoutPropertiesLoose$G(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function LinePath(_ref) {
  var children = _ref.children,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      x = _ref.x,
      y = _ref.y,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? 'transparent' : _ref$fill,
      className = _ref.className,
      curve = _ref.curve,
      innerRef = _ref.innerRef,
      _ref$defined = _ref.defined,
      defined = _ref$defined === void 0 ? function () {
    return true;
  } : _ref$defined,
      restProps = _objectWithoutPropertiesLoose$G(_ref, ["children", "data", "x", "y", "fill", "className", "curve", "innerRef", "defined"]);

  var path = line();
  if (x) path.x(x);
  if (y) path.y(y);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement("path", _extends$$({
    ref: innerRef,
    className: cx('vx-linepath', className),
    d: path(data) || '',
    fill: fill
  }, restProps));
}
LinePath.propTypes = {
  data: _pt.array,
  innerRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object]),
  defined: _pt.func,
  x: _pt.func,
  y: _pt.func,
  children: _pt.func,
  fill: _pt.string,
  className: _pt.string
};

function _extends$10() { _extends$10 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$10.apply(this, arguments); }

function _objectWithoutPropertiesLoose$H(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function LineRadial(_ref) {
  var className = _ref.className,
      angle = _ref.angle,
      radius = _ref.radius,
      defined = _ref.defined,
      curve = _ref.curve,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      innerRef = _ref.innerRef,
      children = _ref.children,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? 'transparent' : _ref$fill,
      restProps = _objectWithoutPropertiesLoose$H(_ref, ["className", "angle", "radius", "defined", "curve", "data", "innerRef", "children", "fill"]);

  var path = radialLine();
  if (angle) setNumberOrNumberAccessor$1(path.angle, angle);
  if (radius) setNumberOrNumberAccessor$1(path.radius, radius);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement("path", _extends$10({
    ref: innerRef,
    className: cx('vx-line-radial', className),
    d: path(data) || '',
    fill: fill
  }, restProps));
}
LineRadial.propTypes = {
  children: _pt.func,
  angle: _pt.oneOfType([_pt.number, _pt.func]),
  radius: _pt.oneOfType([_pt.number, _pt.func])
};

function _extends$11() { _extends$11 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$11.apply(this, arguments); }

function _objectWithoutPropertiesLoose$I(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Area(_ref) {
  var children = _ref.children,
      x = _ref.x,
      x0 = _ref.x0,
      x1 = _ref.x1,
      y = _ref.y,
      y0 = _ref.y0,
      y1 = _ref.y1,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$defined = _ref.defined,
      defined = _ref$defined === void 0 ? function () {
    return true;
  } : _ref$defined,
      className = _ref.className,
      curve = _ref.curve,
      innerRef = _ref.innerRef,
      restProps = _objectWithoutPropertiesLoose$I(_ref, ["children", "x", "x0", "x1", "y", "y0", "y1", "data", "defined", "className", "curve", "innerRef"]);

  var path = area();
  if (x) setNumberOrNumberAccessor$1(path.x, x);
  if (x0) setNumberOrNumberAccessor$1(path.x0, x0);
  if (x1) setNumberOrNumberAccessor$1(path.x1, x1);
  if (y) setNumberOrNumberAccessor$1(path.y, y);
  if (y0) setNumberOrNumberAccessor$1(path.y0, y0);
  if (y1) setNumberOrNumberAccessor$1(path.y1, y1);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement("path", _extends$11({
    ref: innerRef,
    className: cx('vx-area', className),
    d: path(data) || ''
  }, restProps));
}
Area.propTypes = {
  children: _pt.func,
  className: _pt.string,
  data: _pt.array,
  defined: _pt.func,
  innerRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object]),
  x: _pt.oneOfType([_pt.func, _pt.number]),
  x0: _pt.oneOfType([_pt.func, _pt.number]),
  x1: _pt.oneOfType([_pt.func, _pt.number]),
  y: _pt.oneOfType([_pt.func, _pt.number]),
  y0: _pt.oneOfType([_pt.func, _pt.number]),
  y1: _pt.oneOfType([_pt.func, _pt.number])
};

function _extends$12() { _extends$12 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$12.apply(this, arguments); }

function _objectWithoutPropertiesLoose$J(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function AreaClosed(_ref) {
  var x = _ref.x,
      x0 = _ref.x0,
      x1 = _ref.x1,
      y = _ref.y,
      y1 = _ref.y1,
      y0 = _ref.y0,
      yScale = _ref.yScale,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$defined = _ref.defined,
      defined = _ref$defined === void 0 ? function () {
    return true;
  } : _ref$defined,
      className = _ref.className,
      curve = _ref.curve,
      innerRef = _ref.innerRef,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$J(_ref, ["x", "x0", "x1", "y", "y1", "y0", "yScale", "data", "defined", "className", "curve", "innerRef", "children"]);

  var path = area();
  if (x) setNumberOrNumberAccessor$1(path.x, x);
  if (x0) setNumberOrNumberAccessor$1(path.x0, x0);
  if (x1) setNumberOrNumberAccessor$1(path.x1, x1);

  if (y0) {
    setNumberOrNumberAccessor$1(path.y0, y0);
  } else {
    /**
     * by default set the baseline to the first element of the yRange
     * @TODO take the minimum instead?
     */
    path.y0(yScale.range()[0]);
  }

  if (y && !y1) setNumberOrNumberAccessor$1(path.y1, y);
  if (y1 && !y) setNumberOrNumberAccessor$1(path.y1, y1);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement("path", _extends$12({
    ref: innerRef,
    className: cx('vx-area-closed', className),
    d: path(data) || ''
  }, restProps));
}

var STACK_ORDERS = {
  ascending: stackOrderAscending,
  descending: stackOrderDescending,
  insideout: stackOrderInsideOut,
  none: stackOrderNone,
  reverse: stackOrderReverse
};
var STACK_ORDER_NAMES = Object.keys(STACK_ORDERS);
function stackOrder(order) {
  return order && STACK_ORDERS[order] || STACK_ORDERS.none;
}

var STACK_OFFSETS = {
  expand: stackOffsetExpand,
  diverging: stackOffsetDiverging,
  none: stackOffsetNone,
  silhouette: stackOffsetSilhouette,
  wiggle: stackOffsetWiggle
};
var STACK_OFFSET_NAMES = Object.keys(STACK_OFFSETS);
function stackOffset(offset) {
  return offset && STACK_OFFSETS[offset] || STACK_OFFSETS.none;
}

function _extends$13() { _extends$13 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$13.apply(this, arguments); }

function _objectWithoutPropertiesLoose$K(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Stack(_ref) {
  var className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      keys = _ref.keys,
      data = _ref.data,
      curve = _ref.curve,
      defined = _ref.defined,
      x = _ref.x,
      x0 = _ref.x0,
      x1 = _ref.x1,
      y0 = _ref.y0,
      y1 = _ref.y1,
      value = _ref.value,
      order = _ref.order,
      offset = _ref.offset,
      color = _ref.color,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$K(_ref, ["className", "top", "left", "keys", "data", "curve", "defined", "x", "x0", "x1", "y0", "y1", "value", "order", "offset", "color", "children"]);

  var stack$1 = stack();
  if (keys) stack$1.keys(keys);
  if (value) setNumberOrNumberAccessor$1(stack$1.value, value);
  if (order) stack$1.order(stackOrder(order));
  if (offset) stack$1.offset(stackOffset(offset));
  var path = area();
  if (x) path.x(x);
  if (x0) path.x0(x0);
  if (x1) path.x1(x1);
  if (y0) path.y0(y0);
  if (y1) path.y1(y1);
  if (curve) path.curve(curve);
  if (defined) path.defined(defined);
  var stacks = stack$1(data);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    stacks: stacks,
    path: path,
    stack: stack$1
  }));
  return /*#__PURE__*/React.createElement(Group$1, {
    top: top,
    left: left
  }, stacks.map(function (series, i) {
    return /*#__PURE__*/React.createElement("path", _extends$13({
      className: cx('vx-stack', className),
      key: "stack-" + i + "-" + (series.key || ''),
      d: path(series) || '',
      fill: color && color(series.key, i)
    }, restProps));
  }));
}
Stack.propTypes = {
  data: _pt.array.isRequired,
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  color: _pt.func,
  keys: _pt.array,
  children: _pt.func,
  x: _pt.func,
  x0: _pt.func,
  x1: _pt.func,
  y0: _pt.func,
  y1: _pt.func,
  value: _pt.oneOfType([_pt.number, _pt.func]),
  defined: _pt.func,
  order: _pt.any,
  offset: _pt.any
};

function _extends$14() { _extends$14 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$14.apply(this, arguments); }

function _objectWithoutPropertiesLoose$L(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function AreaStack(_ref) {
  var className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      keys = _ref.keys,
      data = _ref.data,
      curve = _ref.curve,
      defined = _ref.defined,
      x = _ref.x,
      x0 = _ref.x0,
      x1 = _ref.x1,
      y0 = _ref.y0,
      y1 = _ref.y1,
      value = _ref.value,
      order = _ref.order,
      offset = _ref.offset,
      color = _ref.color,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$L(_ref, ["className", "top", "left", "keys", "data", "curve", "defined", "x", "x0", "x1", "y0", "y1", "value", "order", "offset", "color", "children"]);

  return /*#__PURE__*/React.createElement(Stack, _extends$14({
    className: className,
    top: top,
    left: left,
    keys: keys,
    data: data,
    curve: curve,
    defined: defined,
    x: x,
    x0: x0,
    x1: x1,
    y0: y0,
    y1: y1,
    value: value,
    order: order,
    offset: offset,
    color: color
  }, restProps), children || function (_ref2) {
    var stacks = _ref2.stacks,
        path = _ref2.path;
    return stacks.map(function (series, i) {
      return /*#__PURE__*/React.createElement("path", _extends$14({
        className: cx('vx-area-stack', className),
        key: "area-stack-" + i + "-" + (series.key || ''),
        d: path(series) || '',
        fill: color && color(series.key, i)
      }, restProps));
    });
  });
}

function _extends$15() { _extends$15 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$15.apply(this, arguments); }

function _objectWithoutPropertiesLoose$M(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Bar(_ref) {
  var className = _ref.className,
      innerRef = _ref.innerRef,
      restProps = _objectWithoutPropertiesLoose$M(_ref, ["className", "innerRef"]);

  return /*#__PURE__*/React.createElement("rect", _extends$15({
    ref: innerRef,
    className: cx('vx-bar', className)
  }, restProps));
}
Bar.propTypes = {
  className: _pt.string,
  innerRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object])
};

function _extends$16() { _extends$16 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$16.apply(this, arguments); }

function _objectWithoutPropertiesLoose$N(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Generates bar groups as an array of objects and renders `<rect />`s for each datum grouped by `key`. A general setup might look like this:
 *
 * ```js
 * const data = [{
 *  date: date1,
 *  key1: value,
 *  key2: value,
 *  key3: value
 * }, {
 *  date: date2,
 *  key1: value,
 *  key2: value,
 *  key3: value,
 * }];
 *
 * const x0 = d => d.date;
 * const keys = [key1, key2, key3];
 *
 * const x0Scale = scaleBand({
 *  domain: data.map(x0),
 *  padding: 0.2
 * });
 * const x1Scale = scaleBand({
 *  domain: keys,
 *  padding: 0.1
 * });
 * const yScale = scaleLinear({
 *   domain: [0, Math.max(...data.map(d => Math.max(...keys.map(key => d[key]))))]
 * });
 * const color = scaleOrdinal({
 *   domain: keys,
 *   range: [blue, green, purple]
 * });
 * ```
 *
 * Example: [https://vx-demo.now.sh/bargroup](https://vx-demo.now.sh/bargroup)
 */
function BarGroupComponent(_ref) {
  var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      x0 = _ref.x0,
      x0Scale = _ref.x0Scale,
      x1Scale = _ref.x1Scale,
      yScale = _ref.yScale,
      color = _ref.color,
      keys = _ref.keys,
      height = _ref.height,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$N(_ref, ["data", "className", "top", "left", "x0", "x0Scale", "x1Scale", "yScale", "color", "keys", "height", "children"]);

  var x1Range = x1Scale.range();
  var x1Domain = x1Scale.domain();
  var barWidth = 'bandwidth' in x1Scale && typeof x1Scale.bandwidth === 'function' ? x1Scale.bandwidth() : Math.abs(x1Range[x1Range.length - 1] - x1Range[0]) / x1Domain.length;
  var barGroups = data.map(function (group, i) {
    return {
      index: i,
      x0: x0Scale(x0(group)),
      bars: keys.map(function (key, j) {
        var value = group[key];
        return {
          index: j,
          key: key,
          value: value,
          width: barWidth,
          x: x1Scale(key) || 0,
          y: yScale(value) || 0,
          color: color(key, j),
          height: height - (yScale(value) || 0)
        };
      })
    };
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(barGroups));
  return /*#__PURE__*/React.createElement(Group$1, {
    className: cx('vx-bar-group', className),
    top: top,
    left: left
  }, barGroups.map(function (barGroup) {
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "bar-group-" + barGroup.index + "-" + barGroup.x0,
      left: barGroup.x0
    }, barGroup.bars.map(function (bar) {
      return /*#__PURE__*/React.createElement(Bar, _extends$16({
        key: "bar-group-bar-" + barGroup.index + "-" + bar.index + "-" + bar.value + "-" + bar.key,
        x: bar.x,
        y: bar.y,
        width: bar.width,
        height: bar.height,
        fill: bar.color
      }, restProps));
    }));
  }));
}
BarGroupComponent.propTypes = {
  data: _pt.array.isRequired,
  x0: _pt.func.isRequired,
  color: _pt.func.isRequired,
  keys: _pt.array.isRequired,
  height: _pt.number.isRequired,
  className: _pt.string,
  top: _pt.number,
  left: _pt.number,
  children: _pt.func
};

function _extends$17() { _extends$17 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$17.apply(this, arguments); }

function _objectWithoutPropertiesLoose$O(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function BarGroupHorizontalComponent(_ref) {
  var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? function () {
    return (
      /** val */
      0
    );
  } : _ref$x,
      y0 = _ref.y0,
      y0Scale = _ref.y0Scale,
      y1Scale = _ref.y1Scale,
      xScale = _ref.xScale,
      color = _ref.color,
      keys = _ref.keys,
      width = _ref.width,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$O(_ref, ["data", "className", "top", "left", "x", "y0", "y0Scale", "y1Scale", "xScale", "color", "keys", "width", "children"]);

  var y1Range = y1Scale.range();
  var y1Domain = y1Scale.domain();
  var barHeight = 'bandwidth' in y1Scale && typeof y1Scale.bandwidth === 'function' ? y1Scale.bandwidth() : Math.abs(y1Range[y1Range.length - 1] - y1Range[0]) / y1Domain.length;
  var barGroups = data.map(function (group, i) {
    return {
      index: i,
      y0: y0Scale(y0(group)) || 0,
      bars: keys.map(function (key, j) {
        var value = group[key];
        return {
          index: j,
          key: key,
          value: value,
          height: barHeight,
          x: x(value) || 0,
          y: y1Scale(key) || 0,
          color: color(key, j),
          width: xScale(value) || 0
        };
      })
    };
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(barGroups));
  return /*#__PURE__*/React.createElement(Group$1, {
    className: cx('vx-bar-group-horizontal', className),
    top: top,
    left: left
  }, barGroups.map(function (barGroup) {
    return /*#__PURE__*/React.createElement(Group$1, {
      key: "bar-group-" + barGroup.index + "-" + barGroup.y0,
      top: barGroup.y0
    }, barGroup.bars.map(function (bar) {
      return /*#__PURE__*/React.createElement(Bar, _extends$17({
        key: "bar-group-bar-" + barGroup.index + "-" + bar.index + "-" + bar.value + "-" + bar.key,
        x: bar.x,
        y: bar.y,
        width: bar.width,
        height: bar.height,
        fill: bar.color
      }, restProps));
    }));
  }));
}
BarGroupHorizontalComponent.propTypes = {
  x: _pt.func,
  y0: _pt.func.isRequired,
  width: _pt.number.isRequired,
  children: _pt.func
};

function _extends$18() { _extends$18 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$18.apply(this, arguments); }

function _objectWithoutPropertiesLoose$P(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function BarStackComponent(_ref) {
  var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      x = _ref.x,
      _ref$y = _ref.y0,
      y0 = _ref$y === void 0 ? function (d) {
    return d && d[0];
  } : _ref$y,
      _ref$y2 = _ref.y1,
      y1 = _ref$y2 === void 0 ? function (d) {
    return d && d[1];
  } : _ref$y2,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      color = _ref.color,
      keys = _ref.keys,
      value = _ref.value,
      order = _ref.order,
      offset = _ref.offset,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$P(_ref, ["data", "className", "top", "left", "x", "y0", "y1", "xScale", "yScale", "color", "keys", "value", "order", "offset", "children"]);

  var stack$1 = stack();
  if (keys) stack$1.keys(keys);
  if (value) setNumberOrNumberAccessor$1(stack$1.value, value);
  if (order) stack$1.order(stackOrder(order));
  if (offset) stack$1.offset(stackOffset(offset));
  var stacks = stack$1(data);
  var xRange = xScale.range();
  var xDomain = xScale.domain();
  var barWidth = 'bandwidth' in xScale && typeof xScale.bandwidth === 'function' ? xScale.bandwidth() : Math.abs(xRange[xRange.length - 1] - xRange[0]) / xDomain.length;
  var barStacks = stacks.map(function (barStack, i) {
    var key = barStack.key;
    return {
      index: i,
      key: key,
      bars: barStack.map(function (bar, j) {
        var barHeight = (yScale(y0(bar)) || 0) - (yScale(y1(bar)) || 0);
        var barY = yScale(y1(bar));
        var barX = 'bandwidth' in xScale && typeof xScale.bandwidth === 'function' ? xScale(x(bar.data)) : Math.max((xScale(x(bar.data)) || 0) - barWidth / 2);
        return {
          bar: bar,
          key: key,
          index: j,
          height: barHeight,
          width: barWidth,
          x: barX || 0,
          y: barY || 0,
          color: color(barStack.key, j)
        };
      })
    };
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(barStacks));
  return /*#__PURE__*/React.createElement(Group$1, {
    className: cx('vx-bar-stack', className),
    top: top,
    left: left
  }, barStacks.map(function (barStack) {
    return barStack.bars.map(function (bar) {
      return /*#__PURE__*/React.createElement(Bar, _extends$18({
        key: "bar-stack-" + barStack.index + "-" + bar.index,
        x: bar.x,
        y: bar.y,
        height: bar.height,
        width: bar.width,
        fill: bar.color
      }, restProps));
    });
  }));
}
BarStackComponent.propTypes = {
  x: _pt.func.isRequired,
  y0: _pt.func,
  y1: _pt.func,
  color: _pt.func.isRequired,
  children: _pt.func
};

function _extends$19() { _extends$19 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$19.apply(this, arguments); }

function _objectWithoutPropertiesLoose$Q(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function BarStackHorizontal(_ref) {
  var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      y = _ref.y,
      _ref$x = _ref.x0,
      x0 = _ref$x === void 0 ? function (d) {
    return d && d[0];
  } : _ref$x,
      _ref$x2 = _ref.x1,
      x1 = _ref$x2 === void 0 ? function (d) {
    return d && d[1];
  } : _ref$x2,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      color = _ref.color,
      keys = _ref.keys,
      value = _ref.value,
      order = _ref.order,
      offset = _ref.offset,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$Q(_ref, ["data", "className", "top", "left", "y", "x0", "x1", "xScale", "yScale", "color", "keys", "value", "order", "offset", "children"]);

  var stack$1 = stack();
  if (keys) stack$1.keys(keys);
  if (value) setNumberOrNumberAccessor$1(stack$1.value, value);
  if (order) stack$1.order(stackOrder(order));
  if (offset) stack$1.offset(stackOffset(offset));
  var stacks = stack$1(data);
  var yRange = yScale.range();
  var yDomain = yScale.domain();
  var barHeight = 'bandwidth' in yScale && typeof yScale.bandwidth === 'function' ? yScale.bandwidth() : Math.abs(yRange[yRange.length - 1] - yRange[0]) / yDomain.length;
  var barStacks = stacks.map(function (barStack, i) {
    var key = barStack.key;
    return {
      index: i,
      key: key,
      bars: barStack.map(function (bar, j) {
        var barWidth = (xScale(x1(bar)) || 0) - (xScale(x0(bar)) || 0);
        var barX = xScale(x0(bar));
        var barY = 'bandwidth' in yScale && typeof yScale.bandwidth === 'function' ? yScale(y(bar.data)) : Math.max((yScale(y(bar.data)) || 0) - barWidth / 2);
        return {
          bar: bar,
          key: key,
          index: j,
          height: barHeight,
          width: barWidth,
          x: barX || 0,
          y: barY || 0,
          color: color(barStack.key, j)
        };
      })
    };
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children(barStacks));
  return /*#__PURE__*/React.createElement(Group$1, {
    className: cx('vx-bar-stack-horizontal', className),
    top: top,
    left: left
  }, barStacks.map(function (barStack) {
    return barStack.bars.map(function (bar) {
      return /*#__PURE__*/React.createElement(Bar, _extends$19({
        key: "bar-stack-" + barStack.index + "-" + bar.index,
        x: bar.x,
        y: bar.y,
        height: bar.height,
        width: bar.width,
        fill: bar.color
      }, restProps));
    });
  }));
}
BarStackHorizontal.propTypes = {
  x0: _pt.func,
  x1: _pt.func,
  y: _pt.func.isRequired
};

var degreesToRadians = function degreesToRadians(degrees) {
  return Math.PI / 180 * degrees;
};

function _extends$1a() { _extends$1a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1a.apply(this, arguments); }

function _objectWithoutPropertiesLoose$R(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathHorizontalDiagonal(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;
  return function (data) {
    var link = linkHorizontal();
    link.x(x);
    link.y(y);
    link.source(source);
    link.target(target);
    return link(data);
  };
}
function LinkHorizontalDiagonal(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      data = _ref2.data,
      innerRef = _ref2.innerRef,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? function (n) {
    return n && n.y;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? function (n) {
    return n && n.x;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (l) {
    return l && l.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (l) {
    return l && l.target;
  } : _ref2$target,
      restProps = _objectWithoutPropertiesLoose$R(_ref2, ["className", "children", "data", "innerRef", "path", "x", "y", "source", "target"]);

  var pathGen = path || pathHorizontalDiagonal({
    source: source,
    target: target,
    x: x,
    y: y
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1a({
    ref: innerRef,
    className: cx('vx-link vx-link-horizontal-diagonal', className),
    d: pathGen(data) || ''
  }, restProps));
}

function _extends$1b() { _extends$1b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1b.apply(this, arguments); }

function _objectWithoutPropertiesLoose$S(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathVerticalDiagonal(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;
  return function (data) {
    var link = linkVertical();
    link.x(x);
    link.y(y);
    link.source(source);
    link.target(target);
    return link(data);
  };
}
function LinkVerticalDiagonal(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      data = _ref2.data,
      innerRef = _ref2.innerRef,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (d) {
    return d.target;
  } : _ref2$target,
      restProps = _objectWithoutPropertiesLoose$S(_ref2, ["className", "children", "data", "innerRef", "path", "x", "y", "source", "target"]);

  var pathGen = path || pathVerticalDiagonal({
    source: source,
    target: target,
    x: x,
    y: y
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1b({
    ref: innerRef,
    className: cx('vx-link vx-link-vertical-diagonal', className),
    d: pathGen(data) || ''
  }, restProps));
}

function _extends$1c() { _extends$1c = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1c.apply(this, arguments); }

function _objectWithoutPropertiesLoose$T(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathRadialDiagonal(_ref) {
  var source = _ref.source,
      target = _ref.target,
      angle = _ref.angle,
      radius = _ref.radius;
  return function (data) {
    var link = linkRadial();
    link.angle(angle);
    link.radius(radius);
    link.source(source);
    link.target(target);
    return link(data);
  };
}
function LinkRadialDiagonal(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      data = _ref2.data,
      innerRef = _ref2.innerRef,
      path = _ref2.path,
      _ref2$angle = _ref2.angle,
      angle = _ref2$angle === void 0 ? function (n) {
    return n.x;
  } : _ref2$angle,
      _ref2$radius = _ref2.radius,
      radius = _ref2$radius === void 0 ? function (n) {
    return n.y;
  } : _ref2$radius,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (n) {
    return n.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (n) {
    return n.target;
  } : _ref2$target,
      restProps = _objectWithoutPropertiesLoose$T(_ref2, ["className", "children", "data", "innerRef", "path", "angle", "radius", "source", "target"]);

  var pathGen = path || pathRadialDiagonal({
    source: source,
    target: target,
    angle: angle,
    radius: radius
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1c({
    ref: innerRef,
    className: cx('vx-link vx-link-radial-diagonal', className),
    d: pathGen(data) || ''
  }, restProps));
}
LinkRadialDiagonal.propTypes = {
  angle: _pt.func.isRequired,
  radius: _pt.func.isRequired
};

function _extends$1d() { _extends$1d = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1d.apply(this, arguments); }

function _objectWithoutPropertiesLoose$U(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathHorizontalCurve(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;
  return function (link) {
    var sourceData = source(link);
    var targetData = target(link);
    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);
    var dx = tx - sx;
    var dy = ty - sy;
    var ix = percent * (dx + dy);
    var iy = percent * (dy - dx);
    var path$1 = path();
    path$1.moveTo(sx, sy);
    path$1.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);
    return path$1.toString();
  };
}
function LinkHorizontalCurve(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      data = _ref2.data,
      innerRef = _ref2.innerRef,
      path = _ref2.path,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === void 0 ? 0.2 : _ref2$percent,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? function (n) {
    return n && n.y;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? function (n) {
    return n && n.x;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (l) {
    return l && l.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (l) {
    return l && l.target;
  } : _ref2$target,
      restProps = _objectWithoutPropertiesLoose$U(_ref2, ["className", "children", "data", "innerRef", "path", "percent", "x", "y", "source", "target"]);

  var pathGen = path || pathHorizontalCurve({
    source: source,
    target: target,
    x: x,
    y: y,
    percent: percent
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1d({
    ref: innerRef,
    className: cx('vx-link vx-link-horizontal-curve', className),
    d: pathGen(data) || ''
  }, restProps));
}
LinkHorizontalCurve.propTypes = {
  percent: _pt.number
};

function _extends$1e() { _extends$1e = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1e.apply(this, arguments); }

function _objectWithoutPropertiesLoose$V(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathVerticalCurve(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;
  return function (link) {
    var sourceData = source(link);
    var targetData = target(link);
    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);
    var dx = tx - sx;
    var dy = ty - sy;
    var ix = percent * (dx + dy);
    var iy = percent * (dy - dx);
    var path$1 = path();
    path$1.moveTo(sx, sy);
    path$1.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);
    return path$1.toString();
  };
}
function LinkVerticalCurve(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      data = _ref2.data,
      innerRef = _ref2.innerRef,
      path = _ref2.path,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === void 0 ? 0.2 : _ref2$percent,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? function (n) {
    return n && n.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? function (n) {
    return n && n.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (l) {
    return l && l.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (l) {
    return l && l.target;
  } : _ref2$target,
      restProps = _objectWithoutPropertiesLoose$V(_ref2, ["className", "children", "data", "innerRef", "path", "percent", "x", "y", "source", "target"]);

  var pathGen = path || pathVerticalCurve({
    source: source,
    target: target,
    x: x,
    y: y,
    percent: percent
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1e({
    ref: innerRef,
    className: cx('vx-link vx-link-vertical-curve', className),
    d: pathGen(data) || ''
  }, restProps));
}
LinkVerticalCurve.propTypes = {
  percent: _pt.number
};

function _extends$1f() { _extends$1f = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1f.apply(this, arguments); }

function _objectWithoutPropertiesLoose$W(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathRadialCurve(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;
  return function (link) {
    var sourceData = source(link);
    var targetData = target(link);
    var sa = x(sourceData) - Math.PI / 2;
    var sr = y(sourceData);
    var ta = x(targetData) - Math.PI / 2;
    var tr = y(targetData);
    var sc = Math.cos(sa);
    var ss = Math.sin(sa);
    var tc = Math.cos(ta);
    var ts = Math.sin(ta);
    var sx = sr * sc;
    var sy = sr * ss;
    var tx = tr * tc;
    var ty = tr * ts;
    var dx = tx - sx;
    var dy = ty - sy;
    var ix = percent * (dx + dy);
    var iy = percent * (dy - dx);
    var path$1 = path();
    path$1.moveTo(sx, sy);
    path$1.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);
    return path$1.toString();
  };
}
function LinkRadialCurve(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      data = _ref2.data,
      innerRef = _ref2.innerRef,
      path = _ref2.path,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === void 0 ? 0.2 : _ref2$percent,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? function (n) {
    return n && n.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? function (n) {
    return n && n.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (l) {
    return l && l.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (l) {
    return l && l.target;
  } : _ref2$target,
      restProps = _objectWithoutPropertiesLoose$W(_ref2, ["className", "children", "data", "innerRef", "path", "percent", "x", "y", "source", "target"]);

  var pathGen = path || pathRadialCurve({
    source: source,
    target: target,
    x: x,
    y: y,
    percent: percent
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1f({
    ref: innerRef,
    className: cx('vx-link vx-link-radial-curve', className),
    d: pathGen(data) || ''
  }, restProps));
}
LinkRadialCurve.propTypes = {
  percent: _pt.number
};

function _extends$1g() { _extends$1g = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1g.apply(this, arguments); }

function _objectWithoutPropertiesLoose$X(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathHorizontalLine(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;
  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);
    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);
    var path$1 = path();
    path$1.moveTo(sx, sy);
    path$1.lineTo(tx, ty);
    return path$1.toString();
  };
}
function LinkHorizontalLine(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? function (d) {
    return d.y;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? function (d) {
    return d.x;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (d) {
    return d.target;
  } : _ref2$target,
      restProps = _objectWithoutPropertiesLoose$X(_ref2, ["className", "children", "innerRef", "data", "path", "x", "y", "source", "target"]);

  var pathGen = path || pathHorizontalLine({
    source: source,
    target: target,
    x: x,
    y: y
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1g({
    ref: innerRef,
    className: cx('vx-link vx-link-horizontal-line', className),
    d: pathGen(data) || ''
  }, restProps));
}

function _extends$1h() { _extends$1h = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1h.apply(this, arguments); }

function _objectWithoutPropertiesLoose$Y(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathVerticalLine(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;
  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);
    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);
    var path$1 = path();
    path$1.moveTo(sx, sy);
    path$1.lineTo(tx, ty);
    return path$1.toString();
  };
}
function LinkVerticalLine(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (d) {
    return d.target;
  } : _ref2$target,
      children = _ref2.children,
      restProps = _objectWithoutPropertiesLoose$Y(_ref2, ["className", "innerRef", "data", "path", "x", "y", "source", "target", "children"]);

  var pathGen = path || pathVerticalLine({
    source: source,
    target: target,
    x: x,
    y: y
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1h({
    ref: innerRef,
    className: cx('vx-link vx-link-vertical-line', className),
    d: pathGen(data) || ''
  }, restProps));
}

function _extends$1i() { _extends$1i = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1i.apply(this, arguments); }

function _objectWithoutPropertiesLoose$Z(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathRadialLine(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;
  return function (data) {
    var sourceData = source(data);
    var targetData = target(data);
    var sa = x(sourceData) - Math.PI / 2;
    var sr = y(sourceData);
    var ta = x(targetData) - Math.PI / 2;
    var tr = y(targetData);
    var sc = Math.cos(sa);
    var ss = Math.sin(sa);
    var tc = Math.cos(ta);
    var ts = Math.sin(ta);
    var path$1 = path();
    path$1.moveTo(sr * sc, sr * ss);
    path$1.lineTo(tr * tc, tr * ts);
    return path$1.toString();
  };
}
function LinkRadialLine(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (d) {
    return d.target;
  } : _ref2$target,
      children = _ref2.children,
      restProps = _objectWithoutPropertiesLoose$Z(_ref2, ["className", "innerRef", "data", "path", "x", "y", "source", "target", "children"]);

  var pathGen = path || pathRadialLine({
    source: source,
    target: target,
    x: x,
    y: y
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1i({
    ref: innerRef,
    className: cx('vx-link vx-link-radial-line', className),
    d: pathGen(data) || ''
  }, restProps));
}

function _extends$1j() { _extends$1j = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1j.apply(this, arguments); }

function _objectWithoutPropertiesLoose$_(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathHorizontalStep(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;
  return function (link) {
    var sourceData = source(link);
    var targetData = target(link);
    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);
    var path$1 = path();
    path$1.moveTo(sx, sy);
    path$1.lineTo(sx + (tx - sx) * percent, sy);
    path$1.lineTo(sx + (tx - sx) * percent, ty);
    path$1.lineTo(tx, ty);
    return path$1.toString();
  };
}
function LinkHorizontalStep(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === void 0 ? 0.5 : _ref2$percent,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? function (d) {
    return d.y;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? function (d) {
    return d.x;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (d) {
    return d.target;
  } : _ref2$target,
      children = _ref2.children,
      restProps = _objectWithoutPropertiesLoose$_(_ref2, ["className", "innerRef", "data", "path", "percent", "x", "y", "source", "target", "children"]);

  var pathGen = path || pathHorizontalStep({
    source: source,
    target: target,
    x: x,
    y: y,
    percent: percent
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1j({
    ref: innerRef,
    className: cx('vx-link vx-link-horizontal-step', className),
    d: pathGen(data) || ''
  }, restProps));
}
LinkHorizontalStep.propTypes = {
  percent: _pt.number
};

function _extends$1k() { _extends$1k = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1k.apply(this, arguments); }

function _objectWithoutPropertiesLoose$$(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathVerticalStep(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y,
      percent = _ref.percent;
  return function (link) {
    var sourceData = source(link);
    var targetData = target(link);
    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);
    var path$1 = path();
    path$1.moveTo(sx, sy);
    path$1.lineTo(sx, sy + (ty - sy) * percent);
    path$1.lineTo(tx, sy + (ty - sy) * percent);
    path$1.lineTo(tx, ty);
    return path$1.toString();
  };
}
function LinkVerticalStep(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$percent = _ref2.percent,
      percent = _ref2$percent === void 0 ? 0.5 : _ref2$percent,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (d) {
    return d.target;
  } : _ref2$target,
      children = _ref2.children,
      restProps = _objectWithoutPropertiesLoose$$(_ref2, ["className", "innerRef", "data", "path", "percent", "x", "y", "source", "target", "children"]);

  var pathGen = path || pathVerticalStep({
    source: source,
    target: target,
    x: x,
    y: y,
    percent: percent
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1k({
    ref: innerRef,
    className: cx('vx-link vx-link-vertical-step', className),
    d: pathGen(data) || ''
  }, restProps));
}
LinkVerticalStep.propTypes = {
  percent: _pt.number
};

function _extends$1l() { _extends$1l = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1l.apply(this, arguments); }

function _objectWithoutPropertiesLoose$10(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathRadialStep(_ref) {
  var source = _ref.source,
      target = _ref.target,
      x = _ref.x,
      y = _ref.y;
  return function (link) {
    var sourceData = source(link);
    var targetData = target(link);
    var sx = x(sourceData);
    var sy = y(sourceData);
    var tx = x(targetData);
    var ty = y(targetData);
    var sa = sx - Math.PI / 2;
    var sr = sy;
    var ta = tx - Math.PI / 2;
    var tr = ty;
    var sc = Math.cos(sa);
    var ss = Math.sin(sa);
    var tc = Math.cos(ta);
    var ts = Math.sin(ta);
    var sf = Math.abs(ta - sa) > Math.PI ? ta <= sa : ta > sa;
    return "\n      M" + sr * sc + "," + sr * ss + "\n      A" + sr + "," + sr + ",0,0," + (sf ? 1 : 0) + "," + sr * tc + "," + sr * ts + "\n      L" + tr * tc + "," + tr * ts + "\n    ";
  };
}
function LinkRadialStep(_ref2) {
  var className = _ref2.className,
      innerRef = _ref2.innerRef,
      data = _ref2.data,
      path = _ref2.path,
      _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? function (d) {
    return d.x;
  } : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? function (d) {
    return d.y;
  } : _ref2$y,
      _ref2$source = _ref2.source,
      source = _ref2$source === void 0 ? function (d) {
    return d.source;
  } : _ref2$source,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? function (d) {
    return d.target;
  } : _ref2$target,
      children = _ref2.children,
      restProps = _objectWithoutPropertiesLoose$10(_ref2, ["className", "innerRef", "data", "path", "x", "y", "source", "target", "children"]);

  var pathGen = path || pathRadialStep({
    source: source,
    target: target,
    x: x,
    y: y
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1l({
    ref: innerRef,
    className: cx('vx-link vx-link-radial-step', className),
    d: pathGen(data) || ''
  }, restProps));
}
LinkRadialStep.propTypes = {
  percent: _pt.number
};

function _extends$1m() { _extends$1m = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1m.apply(this, arguments); }

function _objectWithoutPropertiesLoose$11(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var DEFAULT_CENTER = {
  x: 0,
  y: 0
};
var getPoint = function getPoint(_ref) {
  var sides = _ref.sides,
      size = _ref.size,
      _ref$center = _ref.center,
      center = _ref$center === void 0 ? DEFAULT_CENTER : _ref$center,
      _ref$rotate = _ref.rotate,
      rotate = _ref$rotate === void 0 ? 0 : _ref$rotate,
      side = _ref.side;
  var degrees = 360 / sides * side - rotate;
  var radians = degreesToRadians(degrees);
  return {
    x: center.x + size * Math.cos(radians),
    y: center.y + size * Math.sin(radians)
  };
};
var getPoints = function getPoints(_ref2) {
  var sides = _ref2.sides,
      size = _ref2.size,
      center = _ref2.center,
      rotate = _ref2.rotate;
  return new Array(sides).fill(0).map(function (_, side) {
    return getPoint({
      sides: sides,
      size: size,
      center: center,
      rotate: rotate,
      side: side
    });
  });
};
function Polygon(_ref3) {
  var sides = _ref3.sides,
      _ref3$size = _ref3.size,
      size = _ref3$size === void 0 ? 25 : _ref3$size,
      _ref3$center = _ref3.center,
      center = _ref3$center === void 0 ? DEFAULT_CENTER : _ref3$center,
      _ref3$rotate = _ref3.rotate,
      rotate = _ref3$rotate === void 0 ? 0 : _ref3$rotate,
      className = _ref3.className,
      children = _ref3.children,
      innerRef = _ref3.innerRef,
      restProps = _objectWithoutPropertiesLoose$11(_ref3, ["sides", "size", "center", "rotate", "className", "children", "innerRef"]);

  var points = getPoints({
    sides: sides,
    size: size,
    center: center,
    rotate: rotate
  }).map(function (_ref4) {
    var x = _ref4.x,
        y = _ref4.y;
    return [x, y];
  });
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    points: points
  }));
  return /*#__PURE__*/React.createElement("polygon", _extends$1m({
    ref: innerRef,
    className: cx('vx-polygon', className),
    points: points.join(' ')
  }, restProps));
}
Polygon.propTypes = {
  sides: _pt.number.isRequired,
  size: _pt.number.isRequired,
  className: _pt.string,
  rotate: _pt.number,
  children: _pt.func,
  innerRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object]),
  center: _pt.shape({
    x: _pt.number.isRequired,
    y: _pt.number.isRequired
  })
};

function _extends$1n() { _extends$1n = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1n.apply(this, arguments); }

function _objectWithoutPropertiesLoose$12(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Circle(_ref) {
  var className = _ref.className,
      innerRef = _ref.innerRef,
      restProps = _objectWithoutPropertiesLoose$12(_ref, ["className", "innerRef"]);

  return /*#__PURE__*/React.createElement("circle", _extends$1n({
    ref: innerRef,
    className: cx('vx-circle', className)
  }, restProps));
}
Circle.propTypes = {
  className: _pt.string,
  innerRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object])
};

var MEASUREMENT_ELEMENT_ID = '__react_svg_text_measurement_id';

function getStringWidth(str, style) {
  try {
    // Calculate length of each word to be used to determine number of words per line
    var textEl = document.getElementById(MEASUREMENT_ELEMENT_ID);

    if (!textEl) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.width = '0';
      svg.style.height = '0';
      svg.style.position = 'absolute';
      svg.style.top = '-100%';
      svg.style.left = '-100%';
      textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textEl.setAttribute('id', MEASUREMENT_ELEMENT_ID);
      svg.appendChild(textEl);
      document.body.appendChild(svg);
    }

    Object.assign(textEl.style, style);
    textEl.textContent = str;
    return textEl.getComputedTextLength();
  } catch (e) {
    return null;
  }
}

var getStringWidth$1 = memoize(getStringWidth, function (str, style) {
  return str + "_" + JSON.stringify(style);
});

function _extends$1o() { _extends$1o = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1o.apply(this, arguments); }

function _objectWithoutPropertiesLoose$13(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized$a(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$a(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$b(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var SVG_STYLE = {
  overflow: 'visible'
};

function isNumber(val) {
  return typeof val === 'number';
}

var Text = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$a(Text, _React$Component);

  function Text() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty$b(_assertThisInitialized$a(_this), "state", {
      wordsByLines: []
    });

    _defineProperty$b(_assertThisInitialized$a(_this), "wordsWithWidth", []);

    _defineProperty$b(_assertThisInitialized$a(_this), "spaceWidth", 0);

    return _this;
  }

  var _proto = Text.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateWordsByLines(this.props, true);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // We calculated a new state, break out of the loop.
    if (prevState.wordsByLines !== this.state.wordsByLines) {
      return;
    }

    var needCalculate = prevProps.children !== this.props.children || prevProps.style !== this.props.style;
    this.updateWordsByLines(this.props, needCalculate);
  };

  _proto.updateWordsByLines = function updateWordsByLines(props, needCalculate) {
    if (needCalculate === void 0) {
      needCalculate = false;
    }

    // Only perform calculations if using features that require them (multiline, scaleToFit)
    if (props.width || props.scaleToFit) {
      if (needCalculate) {
        var words = props.children ? props.children.toString().split(/(?:(?!\u00A0+)\s+)/) : [];
        this.wordsWithWidth = words.map(function (word) {
          return {
            word: word,
            width: getStringWidth$1(word, props.style) || 0
          };
        });
        this.spaceWidth = getStringWidth$1("\xA0", props.style) || 0;
      }

      var wordsByLines = this.calculateWordsByLines(this.wordsWithWidth, this.spaceWidth, props.width);
      this.setState({
        wordsByLines: wordsByLines
      });
    } else {
      this.updateWordsWithoutCalculate(props);
    }
  };

  _proto.updateWordsWithoutCalculate = function updateWordsWithoutCalculate(props) {
    var words = props.children ? props.children.toString().split(/(?:(?!\u00A0+)\s+)/) : [];
    this.setState({
      wordsByLines: [{
        words: words
      }]
    });
  };

  _proto.calculateWordsByLines = function calculateWordsByLines(wordsWithWidth, spaceWidth, lineWidth) {
    var scaleToFit = this.props.scaleToFit;
    return wordsWithWidth.reduce(function (result, _ref) {
      var word = _ref.word,
          width = _ref.width;
      var currentLine = result[result.length - 1];

      if (currentLine && (lineWidth == null || scaleToFit || (currentLine.width || 0) + width + spaceWidth < lineWidth)) {
        // Word can be added to an existing line
        currentLine.words.push(word);
        currentLine.width = currentLine.width || 0;
        currentLine.width += width + spaceWidth;
      } else {
        // Add first word to line or word is too long to scaleToFit on existing line
        var newLine = {
          words: [word],
          width: width
        };
        result.push(newLine);
      }

      return result;
    }, []);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        dx = _this$props.dx,
        dy = _this$props.dy,
        textAnchor = _this$props.textAnchor,
        verticalAnchor = _this$props.verticalAnchor,
        scaleToFit = _this$props.scaleToFit,
        angle = _this$props.angle,
        lineHeight = _this$props.lineHeight,
        capHeight = _this$props.capHeight,
        innerRef = _this$props.innerRef,
        width = _this$props.width,
        textProps = _objectWithoutPropertiesLoose$13(_this$props, ["dx", "dy", "textAnchor", "verticalAnchor", "scaleToFit", "angle", "lineHeight", "capHeight", "innerRef", "width"]);

    var wordsByLines = this.state.wordsByLines;
    var x = textProps.x,
        y = textProps.y;
    var startDy;

    if (verticalAnchor === 'start') {
      startDy = "calc(" + capHeight + ")";
    } else if (verticalAnchor === 'middle') {
      startDy = "calc(" + (wordsByLines.length - 1) / 2 + " * -" + lineHeight + " + (" + capHeight + " / 2))";
    } else {
      startDy = "calc(" + (wordsByLines.length - 1) + " * -" + lineHeight + ")";
    }

    var transform;
    var transforms = [];

    if (isNumber(x) && isNumber(y) && isNumber(width) && scaleToFit && wordsByLines.length > 0) {
      var lineWidth = wordsByLines[0].width || 1;
      var sx = width / lineWidth;
      var sy = sx;
      var originX = x - sx * x;
      var originY = y - sy * y;
      transforms.push("matrix(" + sx + ", 0, 0, " + sy + ", " + originX + ", " + originY + ")");
    }

    if (angle) {
      transforms.push("rotate(" + angle + ", " + x + ", " + y + ")");
    }

    if (transforms.length > 0) {
      transform = transforms.join(' ');
    }

    return /*#__PURE__*/React.createElement("svg", {
      ref: innerRef,
      x: dx,
      y: dy,
      fontSize: textProps.fontSize,
      style: SVG_STYLE
    }, /*#__PURE__*/React.createElement("text", _extends$1o({
      transform: transform
    }, textProps, {
      textAnchor: textAnchor
    }), wordsByLines.map(function (line, index) {
      return /*#__PURE__*/React.createElement("tspan", {
        key: index,
        x: x,
        dy: index === 0 ? startDy : lineHeight
      }, line.words.join(' '));
    })));
  };

  return Text;
}(React.Component);

_defineProperty$b(Text, "propTypes", {
  className: _pt.string,
  scaleToFit: _pt.bool,
  angle: _pt.number,
  textAnchor: _pt.oneOf(['start', 'middle', 'end', 'inherit']),
  verticalAnchor: _pt.oneOf(['start', 'middle', 'end']),
  innerRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object]),
  width: _pt.number,
  children: _pt.oneOfType([_pt.string, _pt.number])
});

_defineProperty$b(Text, "defaultProps", {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  lineHeight: '1em',
  capHeight: '0.71em',
  // Magic number from d3
  scaleToFit: false,
  textAnchor: 'start',
  verticalAnchor: 'end' // default SVG behavior

});

function _extends$1p() { _extends$1p = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1p.apply(this, arguments); }
function useTooltip() {
  var _useState = useState({
    tooltipOpen: false,
    tooltipLeft: undefined,
    tooltipTop: undefined,
    tooltipData: undefined
  }),
      tooltipState = _useState[0],
      setTooltipState = _useState[1];

  var updateTooltip = function updateTooltip(_ref) {
    var tooltipOpen = _ref.tooltipOpen,
        tooltipLeft = _ref.tooltipLeft,
        tooltipTop = _ref.tooltipTop,
        tooltipData = _ref.tooltipData;
    return setTooltipState(function (prevState) {
      return _extends$1p({}, prevState, {
        tooltipOpen: tooltipOpen,
        tooltipLeft: tooltipLeft,
        tooltipTop: tooltipTop,
        tooltipData: tooltipData
      });
    });
  };

  var showTooltip = function showTooltip(_ref2) {
    var tooltipLeft = _ref2.tooltipLeft,
        tooltipTop = _ref2.tooltipTop,
        tooltipData = _ref2.tooltipData;
    return updateTooltip({
      tooltipOpen: true,
      tooltipLeft: tooltipLeft,
      tooltipTop: tooltipTop,
      tooltipData: tooltipData
    });
  };

  var hideTooltip = function hideTooltip() {
    return updateTooltip({
      tooltipOpen: false,
      tooltipLeft: undefined,
      tooltipTop: undefined,
      tooltipData: undefined
    });
  };

  return {
    tooltipOpen: tooltipState.tooltipOpen,
    tooltipLeft: tooltipState.tooltipLeft,
    tooltipTop: tooltipState.tooltipTop,
    tooltipData: tooltipState.tooltipData,
    updateTooltip: updateTooltip,
    showTooltip: showTooltip,
    hideTooltip: hideTooltip
  };
}

function _extends$1q() { _extends$1q = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1q.apply(this, arguments); }
function withTooltip(BaseComponent, containerProps, renderContainer) {
  if (containerProps === void 0) {
    containerProps = {
      style: {
        position: 'relative',
        width: 'inherit',
        height: 'inherit'
      }
    };
  }

  if (renderContainer === void 0) {
    renderContainer = function renderContainer(children, props) {
      return /*#__PURE__*/React.createElement("div", props, children);
    };
  }

  var WrappedComponent = function WrappedComponent(props) {
    var tooltipProps = useTooltip();
    return renderContainer( /*#__PURE__*/React.createElement(BaseComponent, _extends$1q({}, tooltipProps, props)), containerProps);
  };

  return WrappedComponent;
}

function _extends$1r() { _extends$1r = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1r.apply(this, arguments); }

function _objectWithoutPropertiesLoose$14(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Tooltip(_ref) {
  var className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      style = _ref.style,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$14(_ref, ["className", "top", "left", "style", "children"]);

  return /*#__PURE__*/React.createElement("div", _extends$1r({
    className: cx('vx-tooltip-portal', className),
    style: _extends$1r({
      position: 'absolute',
      backgroundColor: 'white',
      color: '#666666',
      padding: '.3rem .5rem',
      borderRadius: '3px',
      fontSize: '14px',
      boxShadow: '0 1px 2px rgba(33,33,33,0.2)',
      lineHeight: '1em',
      pointerEvents: 'none',
      top: top,
      left: left
    }, style)
  }, restProps), children);
}
Tooltip.propTypes = {
  left: _pt.number,
  top: _pt.number,
  className: _pt.string,
  children: _pt.node
};

function _extends$1s() { _extends$1s = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1s.apply(this, arguments); }

function _objectWithoutPropertiesLoose$15(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function TooltipWithBounds(_ref) {
  var _ref$left = _ref.left,
      initialLeft = _ref$left === void 0 ? 0 : _ref$left,
      _ref$top = _ref.top,
      initialTop = _ref$top === void 0 ? 0 : _ref$top,
      _ref$offsetLeft = _ref.offsetLeft,
      offsetLeft = _ref$offsetLeft === void 0 ? 10 : _ref$offsetLeft,
      _ref$offsetTop = _ref.offsetTop,
      offsetTop = _ref$offsetTop === void 0 ? 10 : _ref$offsetTop,
      rect = _ref.rect,
      parentRect = _ref.parentRect,
      getRects = _ref.getRects,
      children = _ref.children,
      style = _ref.style,
      otherProps = _objectWithoutPropertiesLoose$15(_ref, ["left", "top", "offsetLeft", "offsetTop", "rect", "parentRect", "getRects", "children", "style"]);

  var left = initialLeft;
  var top = initialTop;

  if (rect && parentRect) {
    left = offsetLeft + rect.right > parentRect.right || offsetLeft + rect.right > window.innerWidth ? left - rect.width - offsetLeft : left + offsetLeft;
    top = offsetTop + rect.bottom > parentRect.bottom || offsetTop + rect.bottom > window.innerHeight ? top - rect.height - offsetTop : top + offsetTop;
  }

  left = Math.round(left);
  top = Math.round(top);
  return /*#__PURE__*/React.createElement(Tooltip, _extends$1s({
    style: _extends$1s({
      top: 0,
      transform: "translate(" + left + "px, " + top + "px)"
    }, style)
  }, otherProps), children);
}

TooltipWithBounds.propTypes = {
  offsetLeft: _pt.number,
  offsetTop: _pt.number,
  left: _pt.number,
  top: _pt.number,
  className: _pt.string,
  children: _pt.node,
  getRects: _pt.func,
  rect: _pt.shape({
    top: _pt.number.isRequired,
    right: _pt.number.isRequired,
    bottom: _pt.number.isRequired,
    left: _pt.number.isRequired,
    width: _pt.number.isRequired,
    height: _pt.number.isRequired
  }),
  parentRect: _pt.shape({
    top: _pt.number.isRequired,
    right: _pt.number.isRequired,
    bottom: _pt.number.isRequired,
    left: _pt.number.isRequired,
    width: _pt.number.isRequired,
    height: _pt.number.isRequired
  })
};
var TooltipWithBounds$1 = withBoundingRects$1(TooltipWithBounds);

var CLIP_PADDING = 1;

/**
 * Returns a configured d3 voronoi `layout`. calling `layout(data)` returns a voronoi *diagram*.
 * Alternatively call `layout.polygons(data)`, `layout.triangles(data)`, `layout.links(data)`
 */
function getVoronoi(_ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? 0 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 0 : _ref$height,
      x = _ref.x,
      y = _ref.y;
  var voronoi$1 = voronoi();
  if (x) voronoi$1.x(x);
  if (y) voronoi$1.y(y);
  voronoi$1.extent([[-CLIP_PADDING, -CLIP_PADDING], [width + CLIP_PADDING, height + CLIP_PADDING]]);
  return voronoi$1;
}

function _extends$1t() { _extends$1t = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1t.apply(this, arguments); }

function _objectWithoutPropertiesLoose$16(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function VoronoiPolygon(_ref) {
  var polygon = _ref.polygon,
      className = _ref.className,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$16(_ref, ["polygon", "className", "children"]);

  if (!polygon) return null;
  var path = "M" + polygon.join('L') + "Z";
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path,
    polygon: polygon
  }));
  return /*#__PURE__*/React.createElement("path", _extends$1t({
    className: cx('vx-voronoi-polygon', className),
    d: path
  }, restProps));
}
VoronoiPolygon.propTypes = {
  children: _pt.func,
  className: _pt.string,
  polygon: _pt.array
};

function identityMatrix() {
  return {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0
  };
}
function createMatrix(_ref) {
  var _ref$scaleX = _ref.scaleX,
      scaleX = _ref$scaleX === void 0 ? 1 : _ref$scaleX,
      _ref$scaleY = _ref.scaleY,
      scaleY = _ref$scaleY === void 0 ? 1 : _ref$scaleY,
      _ref$translateX = _ref.translateX,
      translateX = _ref$translateX === void 0 ? 0 : _ref$translateX,
      _ref$translateY = _ref.translateY,
      translateY = _ref$translateY === void 0 ? 0 : _ref$translateY,
      _ref$skewX = _ref.skewX,
      skewX = _ref$skewX === void 0 ? 0 : _ref$skewX,
      _ref$skewY = _ref.skewY,
      skewY = _ref$skewY === void 0 ? 0 : _ref$skewY;
  return {
    scaleX: scaleX,
    scaleY: scaleY,
    translateX: translateX,
    translateY: translateY,
    skewX: skewX,
    skewY: skewY
  };
}
function inverseMatrix(_ref2) {
  var scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      translateX = _ref2.translateX,
      translateY = _ref2.translateY,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY;
  var denominator = scaleX * scaleY - skewY * skewX;
  return {
    scaleX: scaleY / denominator,
    scaleY: scaleX / denominator,
    translateX: (scaleY * translateX - skewX * translateY) / -denominator,
    translateY: (skewY * translateX - scaleX * translateY) / denominator,
    skewX: skewX / -denominator,
    skewY: skewY / -denominator
  };
}
function applyMatrixToPoint(matrix, _ref3) {
  var x = _ref3.x,
      y = _ref3.y;
  return {
    x: matrix.scaleX * x + matrix.skewX * y + matrix.translateX,
    y: matrix.skewY * x + matrix.scaleY * y + matrix.translateY
  };
}
function applyInverseMatrixToPoint(matrix, _ref4) {
  var x = _ref4.x,
      y = _ref4.y;
  return applyMatrixToPoint(inverseMatrix(matrix), {
    x: x,
    y: y
  });
}
function scaleMatrix(scaleX, maybeScaleY) {
  if (maybeScaleY === void 0) {
    maybeScaleY = undefined;
  }

  var scaleY = maybeScaleY || scaleX;
  return createMatrix({
    scaleX: scaleX,
    scaleY: scaleY
  });
}
function translateMatrix(translateX, translateY) {
  return createMatrix({
    translateX: translateX,
    translateY: translateY
  });
}
function multiplyMatrices(matrix1, matrix2) {
  return {
    scaleX: matrix1.scaleX * matrix2.scaleX + matrix1.skewX * matrix2.skewY,
    scaleY: matrix1.skewY * matrix2.skewX + matrix1.scaleY * matrix2.scaleY,
    translateX: matrix1.scaleX * matrix2.translateX + matrix1.skewX * matrix2.translateY + matrix1.translateX,
    translateY: matrix1.skewY * matrix2.translateX + matrix1.scaleY * matrix2.translateY + matrix1.translateY,
    skewX: matrix1.scaleX * matrix2.skewX + matrix1.skewX * matrix2.scaleY,
    skewY: matrix1.skewY * matrix2.scaleX + matrix1.scaleY * matrix2.skewY
  };
}
function composeMatrices() {
  for (var _len = arguments.length, matrices = new Array(_len), _key = 0; _key < _len; _key++) {
    matrices[_key] = arguments[_key];
  }

  switch (matrices.length) {
    case 0:
      throw new Error('composeMatrices() requires arguments: was called with no args');

    case 1:
      return matrices[0];

    case 2:
      return multiplyMatrices(matrices[0], matrices[1]);

    default:
      {
        var matrix1 = matrices[0],
            matrix2 = matrices[1],
            restMatrices = matrices.slice(2);
        var matrix = multiplyMatrices(matrix1, matrix2);
        return composeMatrices.apply(void 0, [matrix].concat(restMatrices));
      }
  }
}

function _extends$1u() { _extends$1u = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1u.apply(this, arguments); }

function _assertThisInitialized$b(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$b(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$c(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Zoom = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$b(Zoom, _React$Component);

  function Zoom() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty$c(_assertThisInitialized$b(_this), "containerRef", null);

    _defineProperty$c(_assertThisInitialized$b(_this), "startPoint", undefined);

    _defineProperty$c(_assertThisInitialized$b(_this), "startTranslate", undefined);

    _defineProperty$c(_assertThisInitialized$b(_this), "state", {
      initialTransformMatrix: _this.props.transformMatrix,
      transformMatrix: _this.props.transformMatrix,
      isDragging: false
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "applyToPoint", function (_ref) {
      var x = _ref.x,
          y = _ref.y;
      var transformMatrix = _this.state.transformMatrix;
      return applyMatrixToPoint(transformMatrix, {
        x: x,
        y: y
      });
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "applyInverseToPoint", function (_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      var transformMatrix = _this.state.transformMatrix;
      return applyInverseMatrixToPoint(transformMatrix, {
        x: x,
        y: y
      });
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "reset", function () {
      var initialTransformMatrix = _this.state.initialTransformMatrix;

      _this.setTransformMatrix(initialTransformMatrix);
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "scale", function (_ref3) {
      var scaleX = _ref3.scaleX,
          maybeScaleY = _ref3.scaleY,
          point = _ref3.point;
      var scaleY = maybeScaleY || scaleX;
      var transformMatrix = _this.state.transformMatrix;
      var _this$props = _this.props,
          width = _this$props.width,
          height = _this$props.height;
      var cleanPoint = point || {
        x: width / 2,
        y: height / 2
      };
      var translate = applyInverseMatrixToPoint(transformMatrix, cleanPoint);
      var nextMatrix = composeMatrices(transformMatrix, translateMatrix(translate.x, translate.y), scaleMatrix(scaleX, scaleY), translateMatrix(-translate.x, -translate.y));

      _this.setTransformMatrix(nextMatrix);
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "translate", function (_ref4) {
      var translateX = _ref4.translateX,
          translateY = _ref4.translateY;
      var transformMatrix = _this.state.transformMatrix;
      var nextMatrix = composeMatrices(transformMatrix, translateMatrix(translateX, translateY));

      _this.setTransformMatrix(nextMatrix);
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "translateTo", function (_ref5) {
      var x = _ref5.x,
          y = _ref5.y;
      var transformMatrix = _this.state.transformMatrix;
      var point = applyInverseMatrixToPoint(transformMatrix, {
        x: x,
        y: y
      });

      _this.setTranslate({
        translateX: point.x,
        translateY: point.y
      });
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "setTranslate", function (_ref6) {
      var translateX = _ref6.translateX,
          translateY = _ref6.translateY;
      var transformMatrix = _this.state.transformMatrix;

      var nextMatrix = _extends$1u({}, transformMatrix, {
        translateX: translateX,
        translateY: translateY
      });

      _this.setTransformMatrix(nextMatrix);
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "setTransformMatrix", function (transformMatrix) {
      _this.setState(function (prevState) {
        return {
          transformMatrix: _this.constrain(transformMatrix, prevState.transformMatrix)
        };
      });
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "invert", function () {
      return inverseMatrix(_this.state.transformMatrix);
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "toStringInvert", function () {
      var _this$invert = _this.invert(),
          translateX = _this$invert.translateX,
          translateY = _this$invert.translateY,
          scaleX = _this$invert.scaleX,
          scaleY = _this$invert.scaleY,
          skewX = _this$invert.skewX,
          skewY = _this$invert.skewY;

      return "matrix(" + scaleX + ", " + skewY + ", " + skewX + ", " + scaleY + ", " + translateX + ", " + translateY + ")";
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "constrain", function (transformMatrix, prevTransformMatrix) {
      if (_this.props.constrain) return _this.props.constrain(transformMatrix, prevTransformMatrix);
      var _this$props2 = _this.props,
          scaleXMin = _this$props2.scaleXMin,
          scaleXMax = _this$props2.scaleXMax,
          scaleYMin = _this$props2.scaleYMin,
          scaleYMax = _this$props2.scaleYMax;
      var scaleX = transformMatrix.scaleX,
          scaleY = transformMatrix.scaleY;
      var shouldConstrainScaleX = scaleX > scaleXMax || scaleX < scaleXMin;
      var shouldConstrainScaleY = scaleY > scaleYMax || scaleY < scaleYMin;

      if (shouldConstrainScaleX || shouldConstrainScaleY) {
        return prevTransformMatrix;
      }

      return transformMatrix;
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "dragStart", function (event) {
      var transformMatrix = _this.state.transformMatrix;
      var translateX = transformMatrix.translateX,
          translateY = transformMatrix.translateY;
      _this.startPoint = localPoint$2(event) || undefined;
      _this.startTranslate = {
        translateX: translateX,
        translateY: translateY
      };

      _this.setState({
        isDragging: true
      });
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "dragMove", function (event) {
      if (!_this.state.isDragging || !_this.startPoint || !_this.startTranslate) return;
      var currentPoint = localPoint$2(event);
      var dx = currentPoint ? -(_this.startPoint.x - currentPoint.x) : -_this.startPoint.x;
      var dy = currentPoint ? -(_this.startPoint.y - currentPoint.y) : -_this.startPoint.y;

      _this.setTranslate({
        translateX: _this.startTranslate.translateX + dx,
        translateY: _this.startTranslate.translateY + dy
      });
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "dragEnd", function () {
      _this.startPoint = undefined;
      _this.startTranslate = undefined;

      _this.setState({
        isDragging: false
      });
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "handleWheel", function (event) {
      var _this$props3 = _this.props,
          passive = _this$props3.passive,
          wheelDelta = _this$props3.wheelDelta;
      if (!passive) event.preventDefault();
      var point = localPoint$2(event) || undefined;

      var _ref7 = wheelDelta(event),
          scaleX = _ref7.scaleX,
          scaleY = _ref7.scaleY;

      _this.scale({
        scaleX: scaleX,
        scaleY: scaleY,
        point: point
      });
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "toString", function () {
      var transformMatrix = _this.state.transformMatrix;
      var translateX = transformMatrix.translateX,
          translateY = transformMatrix.translateY,
          scaleX = transformMatrix.scaleX,
          scaleY = transformMatrix.scaleY,
          skewX = transformMatrix.skewX,
          skewY = transformMatrix.skewY;
      return "matrix(" + scaleX + ", " + skewY + ", " + skewX + ", " + scaleY + ", " + translateX + ", " + translateY + ")";
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "center", function () {
      var _this$props4 = _this.props,
          width = _this$props4.width,
          height = _this$props4.height;
      var center = {
        x: width / 2,
        y: height / 2
      };

      var inverseCentroid = _this.applyInverseToPoint(center);

      _this.translate({
        translateX: inverseCentroid.x - center.x,
        translateY: inverseCentroid.y - center.y
      });
    });

    _defineProperty$c(_assertThisInitialized$b(_this), "clear", function () {
      _this.setTransformMatrix(identityMatrix());
    });

    return _this;
  }

  var _proto = Zoom.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var passive = this.props.passive;

    if (this.containerRef && !passive) {
      this.containerRef.addEventListener('wheel', this.handleWheel, {
        passive: false
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var passive = this.props.passive;

    if (this.containerRef && !passive) {
      this.containerRef.removeEventListener('wheel', this.handleWheel);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props5 = this.props,
        passive = _this$props5.passive,
        children = _this$props5.children,
        style = _this$props5.style,
        className = _this$props5.className;

    var zoom = _extends$1u({}, this.state, {
      center: this.center,
      clear: this.clear,
      scale: this.scale,
      translate: this.translate,
      translateTo: this.translateTo,
      setTranslate: this.setTranslate,
      setTransformMatrix: this.setTransformMatrix,
      reset: this.reset,
      handleWheel: this.handleWheel,
      dragEnd: this.dragEnd,
      dragMove: this.dragMove,
      dragStart: this.dragStart,
      toString: this.toString,
      invert: this.invert,
      toStringInvert: this.toStringInvert,
      applyToPoint: this.applyToPoint,
      applyInverseToPoint: this.applyInverseToPoint
    });

    if (!passive) {
      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(c) {
          _this2.containerRef = c;
        },
        style: style,
        className: className
      }, children(zoom));
    }

    return children(zoom);
  };

  return Zoom;
}(React.Component);

_defineProperty$c(Zoom, "propTypes", {
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  wheelDelta: _pt.func,
  scaleXMin: _pt.number,
  scaleXMax: _pt.number,
  scaleYMin: _pt.number,
  scaleYMax: _pt.number,
  constrain: _pt.func,
  passive: _pt.bool,
  className: _pt.string,
  children: _pt.func.isRequired
});

_defineProperty$c(Zoom, "defaultProps", {
  passive: false,
  scaleXMin: 0,
  scaleXMax: Infinity,
  scaleYMin: 0,
  scaleYMax: Infinity,
  transformMatrix: {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0
  },
  wheelDelta: function wheelDelta(event) {
    return -event.deltaY > 0 ? {
      scaleX: 1.1,
      scaleY: 1.1
    } : {
      scaleX: 0.9,
      scaleY: 0.9
    };
  },
  style: undefined,
  className: undefined
});

export { Albers, AlbersUsa, Arc, Area, AreaClosed, AreaStack, Axis, AxisBottom, AxisLeft, AxisRight, AxisTop, Bar, BarGroupComponent as BarGroup, BarGroupHorizontalComponent as BarGroupHorizontal, BarStackComponent as BarStack, BarStackHorizontal, Brush, Circle, CircleClipPath, ClipPath, Cluster, CustomProjection, DefaultLink, DefaultNode, Drag, EqualEarth, Glyph, GlyphCircle, GlyphCross, GlyphDiamond, GlyphDot, GlyphSquare, GlyphStar, GlyphTriangle, GlyphWye, GradientDarkGreen as GradientDarkgreenGreen, GradientLightgreenGreen, GradientOrangeRed, GradientPinkBlue, GradientPinkRed, GradientPurpleOrange, GradientPurpleRed, GradientPurpleTeal, GradientSteelPurple, GradientTealBlue, Graph, Graticule, Grid, GridColumns, GridRows, Group, HeatmapCircle, HeatmapRect, HierarchyDefaultLink, HierarchyDefaultNode, HierarchyDefaultRectNode, Legend, LegendItem, LegendLabel, LegendLinear, LegendOrdinal, LegendQuantile, LegendShape, LegendSize, LegendThreshold, Line, LinePath, LinePathAnnotation, LineRadial, LinearGradient, LinkHorizontalDiagonal as LinkHorizontal, LinkHorizontalCurve, LinkHorizontalLine, LinkHorizontalStep, LinkRadialDiagonal as LinkRadial, LinkRadialCurve, LinkRadialLine, LinkRadialStep, LinkVerticalDiagonal as LinkVertical, LinkVerticalCurve, LinkVerticalLine, LinkVerticalStep, Links, Marker, Mercator, NaturalEarth, Nodes, orientation as Orientation, Orthographic, Pack, ParentSize, Partition, Pattern, PatternCircles, PatternHexagons, PatternLines, PatternOrientation, PatternPath, PatternWaves, Pie, Point, Polygon, RadialGradient, RectClipPath, STACK_OFFSETS, STACK_OFFSET_NAMES, STACK_ORDERS, STACK_ORDER_NAMES, ResponsiveSVG as ScaleSVG, Stack, Text, Tooltip, TooltipWithBounds$1 as TooltipWithBounds, Tree, Treemap, VoronoiPolygon, Zoom, appleStock, applyInverseMatrixToPoint, applyMatrixToPoint, browserUsage, cityTemperature, composeMatrices, createMatrix, degreesToRadians, exoplanets, genBin, genBins, genDateValue, genPhyllotaxis, genPoints as genRandomNormalPoints, genStats, getPoint, getPoints, getStringWidth$1 as getStringWidth, groupDateValue, identityMatrix, inverseMatrix, lesMiserables, letterFrequency, localPoint$1 as localPoint, multiplyMatrices, pathHorizontalCurve, pathHorizontalDiagonal, pathHorizontalLine, pathHorizontalStep, pathRadialCurve, pathRadialDiagonal, pathRadialLine, pathRadialStep, pathVerticalCurve, pathVerticalDiagonal, pathVerticalLine, pathVerticalStep, planets, raise, bandScale as scaleBand, linearScale as scaleLinear, logScale as scaleLog, scaleMatrix, ordinalScale as scaleOrdinal, pointScale as scalePoint, powerScale as scalePower, quantileScale as scaleQuantile, quantizeScale as scaleQuantize, squareRootScale as scaleSqrt, symLogScale as scaleSymlog, thresholdScale as scaleThreshold, timeScale as scaleTime, timeScale$1 as scaleUtc, shakespeare, stackOffset, stackOrder, localPoint as touchPoint, translateMatrix, updateScale, useTooltip, getVoronoi as voronoi, withBoundingRects, withParentSize, withScreenSize, withTooltip };

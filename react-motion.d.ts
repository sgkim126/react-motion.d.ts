// Type definitions for react-motion v0.4.2
// Project: https://github.com/chenglou/react-motion/
// Definitions by: Seulgi Kim <https://github.com/sgkim126>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


declare module __ReactMotionTypes {
  import React = __React;

  export interface SpringHelperConfig {
    stiffness?: number;
    damping?: number;
    precision?: number;
  }
  export interface OpaqueConfig {
    val: number;
    stiffness: number;
    damping: number;
    precision: number;
  }
  export interface Style {
    [key: string]: number | OpaqueConfig;
  }
  export interface PlainStyle {
    [key: string]: number;
  }
  export interface Velocity {
    [key: string]: number;
  }

  export interface MotionProps {
    defaultStyle?: PlainStyle;
    style?: Style;
    children?: (interpolatedStyle: PlainStyle) => React.ReactElement<any>;
  }

  export interface StaggeredProps {
    defaultStyles?: Array<PlainStyle>;
    styles?: (previousInterpolatedStyles?: Array<PlainStyle>) => Array<Style>;
    children?: (interpolatedStyles: Array<PlainStyle>) => React.ReactElement<any>;
  }

  export interface TransitionStyle {
    key: string;
    data?: any;
    style: Style;
  }
  export interface TransitionPlainStyle {
    key: string;
    data?: any;
    style: PlainStyle;
  }
  export type WillEnter = (styleThatEntered: TransitionStyle) => PlainStyle;
  export type WillLeave = (styleThatLeft: TransitionStyle) => Style;

  export interface TransitionProps {
    defaultStyles?: Array<TransitionPlainStyle>;
    styles?: Array<TransitionStyle> | ((previousInterpolatedStyles?: Array<TransitionPlainStyle>) => Array<TransitionStyle>);
    children?: (interpolatedStyles: Array<TransitionPlainStyle>) => React.ReactElement<any>;
    willEnter?: WillEnter;
    willLeave?: WillLeave;
  }
}

declare module "react-motion/Motion" {
  import React = __React;
  import PlainStyle = __ReactMotionTypes.PlainStyle;
  import Velocity = __ReactMotionTypes.Velocity;
  import Style = __ReactMotionTypes.Style;
  import MotionProps = __ReactMotionTypes.MotionProps;

  interface MotionState {
    currentStyle: PlainStyle;
    currentVelocity: Velocity;
    lastIdealStyle: PlainStyle;
    lastIdealVelocity: Velocity;
  }

  export default class Motion extends React.Component<MotionProps, MotionState> {
    wasAnimating: boolean;
    animationID: number;
    prevTime: number;
    accumulatedTime: number;
    unreadPropStyle: Style;
    clearUnreadPropStyle(destStyle: Style): void;
    startAnimationIfNecessary(): void;
  }
}

declare module "react-motion/StaggeredMotion" {
  import React = __React;
  import PlainStyle = __ReactMotionTypes.PlainStyle;
  import Velocity = __ReactMotionTypes.Velocity;
  import Style = __ReactMotionTypes.Style;
  import StaggeredProps = __ReactMotionTypes.StaggeredProps;

  interface StaggeredMotionState {
    currentStyles: Array<PlainStyle>;
    currentVelocities: Array<Velocity>;
    lastIdealStyles: Array<PlainStyle>;
    lastIdealVelocities: Array<Velocity>;
  }

  export default class StaggeredMotion extends React.Component<StaggeredProps, StaggeredMotionState> {
    animationID: number;
    prevTime: number;
    accumulatedTime: number;

    unreadPropStyles: Array<Style>;
    clearUnreadPropStyle(unreadPropStyles: Array<Style>): void;

    startAnimationIfNecessary(): void;
  }
}

declare module "react-motion/TransitionMotion" {
  import React = __React;
  import PlainStyle = __ReactMotionTypes.PlainStyle;
  import Velocity = __ReactMotionTypes.Velocity;
  import Style = __ReactMotionTypes.Style;
  import TransitionProps = __ReactMotionTypes.TransitionProps;
  import TransitionStyle = __ReactMotionTypes.TransitionStyle;
  import WillEnter = __ReactMotionTypes.WillEnter;
  import WillLeave = __ReactMotionTypes.WillLeave;

  interface TransitionMotionState {
    currentStyles: Array<PlainStyle>;
    currentVelocities: Array<Velocity>;
    lastIdealStyles: Array<PlainStyle>;
    lastIdealVelocities: Array<Velocity>;
    mergedPropsStyles: Array<TransitionStyle>;
  }

  export default class TransitionMotion extends React.Component<TransitionProps, TransitionMotionState> {
    getDefaultProps(): {willEnter: WillEnter, willLeave: WillLeave};

    animationID: number;
    prevTime: number;
    accumulatedTime: number;
    unreadPropStyles: Array<TransitionStyle>;
    clearUnreadPropStyle(unreadPropStyles: Array<TransitionStyle>): void;

    startAnimationIfNecessary(): void;
  }
}

declare module "react-motion/Types" {
  export = __ReactMotionTypes;
}

declare module "react-motion/spring" {
  import OpaqueConfig = __ReactMotionTypes.OpaqueConfig;
  import SpringHelperConfig = __ReactMotionTypes.SpringHelperConfig;

  export default function spring(val: number, config?: SpringHelperConfig): OpaqueConfig;
}

declare module "react-motion/presets" {
  interface IPresets {
    noWobble: { stiffness: number, damping: number };
    gentle: { stiffness: number, damping: number };
    wobbly: { stiffness: number, damping: number };
    stiff: { stiffness: number, damping: number };
  }
  const presets: IPresets;

  export default presets;
}

declare module "react-motion" {
  import Motion from 'react-motion/Motion';
  import StaggeredMotion from 'react-motion/StaggeredMotion';
  import TransitionMotion from 'react-motion/TransitionMotion';
  import spring from 'react-motion/spring';
  import presets from 'react-motion/presets';

  export { Motion as Motion };
  export { StaggeredMotion as StaggeredMotion };
  export { TransitionMotion as TransitionMotion };
  export { spring as spring };
  export { presets as presets };
}

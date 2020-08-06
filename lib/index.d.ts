import * as React from 'react';
interface IProps {
    visibleItems?: any;
    isInfinite?: any;
    images: string[];
    delay?: number;
}
interface IState {
    images: string[];
    currentPosition: number;
    interval: any;
    visibleItems: number;
    isInfinite: any;
    totalItems: number;
}
declare class ImageSlider extends React.Component<IProps, IState> {
    static defaultProps: {
        visibleItems: number;
        isInfinite: boolean;
        delay: number;
    };
    state: IState;
    componentWillUpdate(nextProps: any, nextState: any): void;
    scrollLeft: () => void;
    scrollRight: () => void;
    setVisibleItems: (currentVisibleItems: number) => void;
    sliderStyle: (classname: any) => {
        transform: string;
    };
    isOpaque: (key: number) => boolean;
    animate: () => false | undefined;
    clearAnimate: () => void;
    updatePosition: (nextPosition: number) => number;
    skipScrollIfNonInfinite: (visibleItems: number, currentPosition: number, nextPosition: number) => number | undefined;
    scrollIfInfinite: (visibleItems: number, currentPosition: number, nextPosition: number) => number | undefined;
    scrollToBeginningIfEnd: (visibleItems: number, currentPosition: number, nextPosition: number) => 0 | undefined;
    skipScrollIfEnd: (visibleItems: number, currentPosition: number, nextPosition: number) => number | undefined;
    render(): JSX.Element;
}
export default ImageSlider;
//# sourceMappingURL=index.d.ts.map
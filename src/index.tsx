import * as React from 'react';
import './image-slider.css';

interface IProps {
    visibleItems: number;
    isInfinite: any;
    images: string[];
    delay: number;
}

interface IState {
    images: string[],
    currentPosition: number,
    interval: any,
    visibleItems: number,
    isInfinite: any,
    totalItems: number,
}

class ImageSlider extends React.Component<IProps, IState> {

    public static defaultProps = {
        visibleItems: 3,
        isInfinite: true,
        delay: 5000,
    }

    state: IState = {
        images: [],
        currentPosition: 0,
        interval: null,
        visibleItems: this.props.visibleItems,
        isInfinite: this.props.isInfinite,
        totalItems: this.props.images.length
    };

    componentWillUpdate(nextProps: any, nextState: any) {
        if (this.state.currentPosition !== nextState.currentPosition) {
            this.animate();
        }
    }

    scrollLeft = () => {
        const currentPosition = this.updatePosition(this.state.currentPosition - 1);
        this.setState({ currentPosition });
    }

    scrollRight = () => {
        const currentPosition = this.updatePosition(this.state.currentPosition + 1);
        this.setState({ currentPosition });
    }

    setVisibleItems = (currentVisibleItems: any) => {
        const container = document.querySelector('.rsc-slider') as HTMLElement;
        const visibleItems = (container && container.offsetWidth < 720) ? 1 : currentVisibleItems;
        this.setState({ visibleItems });
    }

    sliderStyle = (classname: any) => {
        const items = document.querySelector(classname);
        const itemWidth = items ? items.offsetWidth : 0;
        const shift = itemWidth * this.state.currentPosition;
        return { transform: `translateX(-${shift}px)` };
    }

    isOpaque = (key: any) => {
        const nextPosition = this.props.visibleItems + this.state.currentPosition;
        const opaque = this.props.images.slice(this.state.currentPosition, nextPosition);
        return opaque.indexOf(this.props.images[key]) !== -1;
    }

    animate = () => {
        if (this.state.interval) {
            window.clearInterval(this.state.interval);
        }
        if (!this.props.delay) {
            return false;
        }
        const interval = window.setInterval(this.scrollRight, this.props.delay);
        this.setState({ interval });
    }

    clearAnimate = () => {
        if (this.state.interval) {
            clearInterval(this.state.interval);
            this.setState({ interval: null });
        }
    }

    updatePosition = (nextPosition: any) => {
        const { visibleItems, currentPosition } = this.state;
        console.log(visibleItems, currentPosition, nextPosition);
        const skipScrollIfEnd = this.skipScrollIfEnd(visibleItems, currentPosition, nextPosition);
        const skipScrollIfNonInfinite = this.skipScrollIfNonInfinite(visibleItems, currentPosition, nextPosition);
        const scrollIfInfinite = this.scrollIfInfinite(visibleItems, currentPosition, nextPosition);
        const scrollToBeginningIfEnd = this.scrollToBeginningIfEnd(visibleItems, currentPosition, nextPosition);
        if (skipScrollIfEnd !== undefined) {
            return skipScrollIfEnd;
        }
        if (skipScrollIfNonInfinite !== undefined) {
            return skipScrollIfNonInfinite;
        }
        if (scrollIfInfinite !== undefined) {
            return scrollIfInfinite;
        }
        if (scrollToBeginningIfEnd !== undefined) {
            return scrollToBeginningIfEnd;
        }
        return nextPosition;
    }

    skipScrollIfNonInfinite = (visibleItems: any, currentPosition: any, nextPosition: any) => {

        if (!this.state.isInfinite && nextPosition < 0) {
            return currentPosition;
        }
    }

    scrollIfInfinite = (visibleItems: any, currentPosition: any, nextPosition: any) => {

        if (this.state.isInfinite && nextPosition < 0) {
            return nextPosition + visibleItems;
        }
    }

    scrollToBeginningIfEnd = (visibleItems: any, currentPosition: any, nextPosition: any) => {

        if (nextPosition + visibleItems > this.state.totalItems) {
            return 0;
        }
    }

    skipScrollIfEnd = (visibleItems: any, currentPosition: any, nextPosition: any) => {

        if (!this.state.isInfinite && nextPosition + visibleItems > this.state.totalItems) {
            return currentPosition;
        }
        if (!this.state.isInfinite && nextPosition < 0) {
            return currentPosition;
        }
    }

    render() {
        const sliderStyle = this.sliderStyle('.rsc-slider-item');
        const imgWidth = 100 / this.state.visibleItems;

        const images = this.props.images.map((item, key) => ({
            itemClass: this.isOpaque(key) ? 'rsc-slider-item' : 'rsc-slider-item rsc-slider-item_transparent',
            src: <div key={key}><img src={item} /></div>

        }));

        return (
            <div className="rsc-container">
                <div className="rsc-slider" style={sliderStyle}>
                    {images.map((item, key) =>
                        <div className={item.itemClass} key={key} style={{ 'flex': `0 0 ${imgWidth}%` }}>
                            <div className="rsc-slider-item-img">{item.src}</div>
                        </div>
                    )}
                </div>
                {images.length > this.state.visibleItems ?
                    <div>
                        <div className="rsc-navigation rsc-navigation_left rsc-arrow_left" onClick={this.scrollLeft}></div>
                        <div className="rsc-navigation rsc-navigation_right rsc-arrow_right" onClick={this.scrollRight}></div>
                    </div>
                    : null}
            </div>
        );
    }
}


export default ImageSlider;
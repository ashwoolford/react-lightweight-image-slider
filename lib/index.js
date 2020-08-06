"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
require("./image-slider.css");
var ImageSlider = /** @class */ (function (_super) {
    __extends(ImageSlider, _super);
    function ImageSlider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            images: [],
            currentPosition: 0,
            interval: null,
            visibleItems: _this.props.visibleItems,
            isInfinite: _this.props.isInfinite,
            totalItems: _this.props.images.length
        };
        _this.scrollLeft = function () {
            var currentPosition = _this.updatePosition(_this.state.currentPosition - 1);
            _this.setState({ currentPosition: currentPosition });
        };
        _this.scrollRight = function () {
            var currentPosition = _this.updatePosition(_this.state.currentPosition + 1);
            _this.setState({ currentPosition: currentPosition });
        };
        _this.setVisibleItems = function (currentVisibleItems) {
            var container = document.querySelector('.rsc-slider');
            var visibleItems = (container && container.offsetWidth < 720) ? 1 : currentVisibleItems;
            _this.setState({ visibleItems: visibleItems });
        };
        _this.sliderStyle = function (classname) {
            var items = document.querySelector(classname);
            var itemWidth = items ? items.offsetWidth : 0;
            var shift = itemWidth * _this.state.currentPosition;
            return { transform: "translateX(-" + shift + "px)" };
        };
        _this.isOpaque = function (key) {
            var nextPosition = _this.props.visibleItems + _this.state.currentPosition;
            var opaque = _this.props.images.slice(_this.state.currentPosition, nextPosition);
            return opaque.indexOf(_this.props.images[key]) !== -1;
        };
        _this.animate = function () {
            if (_this.state.interval) {
                window.clearInterval(_this.state.interval);
            }
            if (!_this.props.delay) {
                return false;
            }
            var interval = window.setInterval(_this.scrollRight, _this.props.delay);
            _this.setState({ interval: interval });
        };
        _this.clearAnimate = function () {
            if (_this.state.interval) {
                clearInterval(_this.state.interval);
                _this.setState({ interval: null });
            }
        };
        _this.updatePosition = function (nextPosition) {
            var _a = _this.state, visibleItems = _a.visibleItems, currentPosition = _a.currentPosition;
            console.log(visibleItems, currentPosition, nextPosition);
            var skipScrollIfEnd = _this.skipScrollIfEnd(visibleItems, currentPosition, nextPosition);
            var skipScrollIfNonInfinite = _this.skipScrollIfNonInfinite(visibleItems, currentPosition, nextPosition);
            var scrollIfInfinite = _this.scrollIfInfinite(visibleItems, currentPosition, nextPosition);
            var scrollToBeginningIfEnd = _this.scrollToBeginningIfEnd(visibleItems, currentPosition, nextPosition);
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
        };
        _this.skipScrollIfNonInfinite = function (visibleItems, currentPosition, nextPosition) {
            if (!_this.state.isInfinite && nextPosition < 0) {
                return currentPosition;
            }
        };
        _this.scrollIfInfinite = function (visibleItems, currentPosition, nextPosition) {
            if (_this.state.isInfinite && nextPosition < 0) {
                return nextPosition + visibleItems;
            }
        };
        _this.scrollToBeginningIfEnd = function (visibleItems, currentPosition, nextPosition) {
            if (nextPosition + visibleItems > _this.state.totalItems) {
                return 0;
            }
        };
        _this.skipScrollIfEnd = function (visibleItems, currentPosition, nextPosition) {
            if (!_this.state.isInfinite && nextPosition + visibleItems > _this.state.totalItems) {
                return currentPosition;
            }
            if (!_this.state.isInfinite && nextPosition < 0) {
                return currentPosition;
            }
        };
        return _this;
    }
    ImageSlider.prototype.componentWillUpdate = function (nextProps, nextState) {
        if (this.state.currentPosition !== nextState.currentPosition) {
            this.animate();
        }
    };
    ImageSlider.prototype.render = function () {
        var _this = this;
        var sliderStyle = this.sliderStyle('.rsc-slider-item');
        var imgWidth = 100 / this.state.visibleItems;
        var images = this.props.images.map(function (item, key) { return ({
            itemClass: _this.isOpaque(key) ? 'rsc-slider-item' : 'rsc-slider-item rsc-slider-item_transparent',
            src: React.createElement("div", { key: key },
                React.createElement("img", { src: item }))
        }); });
        return (React.createElement("div", { className: "rsc-container" },
            React.createElement("div", { className: "rsc-slider", style: sliderStyle }, images.map(function (item, key) {
                return React.createElement("div", { className: item.itemClass, key: key, style: { 'flex': "0 0 " + imgWidth + "%" } },
                    React.createElement("div", { className: "rsc-slider-item-img" }, item.src));
            })),
            images.length > this.state.visibleItems ?
                React.createElement("div", null,
                    React.createElement("div", { className: "rsc-navigation rsc-navigation_left rsc-arrow_left", onClick: this.scrollLeft }),
                    React.createElement("div", { className: "rsc-navigation rsc-navigation_right rsc-arrow_right", onClick: this.scrollRight }))
                : null));
    };
    ImageSlider.defaultProps = {
        visibleItems: 3,
        isInfinite: true,
        delay: 5000,
    };
    return ImageSlider;
}(React.Component));
exports.default = ImageSlider;
//# sourceMappingURL=index.js.map
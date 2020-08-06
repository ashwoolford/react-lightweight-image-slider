![npm type definitions](https://img.shields.io/npm/types/typescript.svg?label=lang)

# Lightweight Image Slider

A Simple and lightweight image slider in react.

## Demo
![](https://media.giphy.com/media/kgag7OBu7HitKNKO0S/giphy.gif)<br />
[![Edit q8wl1joow9](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mystifying-pare-yx4fm)

## Installation


```
> yarn add react-lightweight-image-slider
> npm i react-lightweight-image-slider
```

## Usage

```typescript
import React from 'react';
import ImageSlider from "react-lightweight-image-slider";

function App() {

  const images = [
    'https://picsum.photos/id/1/900/900',
    'https://picsum.photos/id/2/900/900',
    'https://picsum.photos/id/3/900/900',
    'https://picsum.photos/id/4/900/900',
    'https://picsum.photos/id/5/900/900',
    'https://picsum.photos/id/6/900/900',
    'https://picsum.photos/id/7/900/900',
    'https://picsum.photos/id/8/900/900',
    'https://picsum.photos/id/9/900/900',
  ];


  return (
    <div>
      <ImageSlider
        images={images}
      />
    </div>
  );
}

```

# Wide Containers

`Wide Containers` is a library for easy handling of containers in React. It includes components using flexbox that help
organize
interface elements on a page. In this library, you will find containers with various alignment and positioning options,
as well as convenient ways to style and customize them.

### Installation

To install the library, use npm or yarn:

```bash
npm install wide-containers
```

```bash
yarn add wide-containers
```

### Components

`Wide Containers` provides various types of containers that can be used to organize your content. All components use
flexbox for
flexibility and ease of configuration.

#### Container

Унаследован от MuiBox и улучшен

```tsx
import {Container} from 'wide-containers'; 
```
- `sx`: Styling using the theme system (e.g., backgroundColor, margin, etc.).
- `cls`: A class for additional styling.
- `scroll`: Scroll settings (x-auto, y-scroll, etc.).
- `pos`: Positioning (absolute, relative, etc.).
- `color`, `bg`: Text and background color.
- `w`, `h`, `maxW`, `maxH`, `min...`: width, height, maxWidth, ...
- `rounded`: Border radius for corners (0-6).
- `cursorPointer`, `wrap`, `grow`

The components below are inherited from it: 

#### FC (Flex Column)

A component for arranging elements in a column (display: flex, flexDirection: column).

```tsx
import {FC} from 'wide-containers';

<FC>
    <div>Element 1</div>
    <div>Element 2</div>
</FC>
```

#### FR (Flex Row)

flex, flexDirection: row

```tsx
import {FR} from 'wide-containers';

<FR>
    <div>Element 1</div>
    <div>Element 2</div>
</FR>
```

#### FCCC (Flex Column Center Center)

```tsx
import {FCCC} from 'wide-containers';

<FCCC>
    <div>Element 1</div>
    <div>Element 2</div>
</FCCC>
```

#### FCB (Flex Column Between)

```tsx
import {FCB} from 'wide-containers';

<FCB>
    <div>Element 1</div>
    <div>Element 2</div>
</FCB>
```

#### FCA (Flex Column Around)

```tsx
import {FCA} from 'wide-containers';

<FCA>
    <div>Element 1</div>
    <div>Element 2</div>
</FCA>
```

```tsx
<FC sx={{backgroundColor: 'lightblue'}} pos="relative" scroll="y-auto"
    wrap grow cursorPointer rounded={3} w={'50%'}>
    <div>Content</div>
</FC>
```

### and etc...

<br>

### Notes

- **Compatibility with MUI**: The library uses MUI for styling, which allows you to flexibly customize visual
  components.
- **Type support**: All components and props are typed with TypeScript.

## Conclusion

`Wide Containers` is a convenient and flexible library that allows you to easily organize containers in React interfaces
using
flexbox. With the variety of components, you can easily create layouts with the desired alignment and styling!

🚀 **Good luck with your development!** 🚀

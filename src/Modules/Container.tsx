import React, {CSSProperties, ElementType, forwardRef, ReactNode} from 'react';
import {Box, BoxProps, SxProps, Theme} from '@mui/material';

// 1) Расширяем BoxProps, но переопределяем поле component.
// 2) Так MUI не будет ругаться на несовместимость типов.
export interface ContainerProps extends Omit<BoxProps, 'component'> {
    children?: ReactNode;
    cls?: string;
    scroll?: 'x-auto' | 'x-scroll' | 'x-hidden' | 'y-auto' | 'y-scroll' | 'y-hidden' | 'auto' | 'scroll' | 'hidden';
    pos?: 'absolute' | 'relative' | 'sticky' | 'static' | 'fixed';
    color?: string;
    bg?: string;
    rounded?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

    // Важно: расширяем тип, чтобы принимать и React.ElementType (более общий вариант),
    // и "строку" для таких случаев, как 'div', 'main', 'header' и т. д.
    component?: ElementType | string;

    pEvents?: boolean;
    w?: BoxProps['width'];
    h?: BoxProps['height'];
    lh?: BoxProps['lineHeight'];
    g?: BoxProps['gap'];
    maxW?: BoxProps['maxWidth'];
    minW?: BoxProps['minWidth'];
    maxH?: BoxProps['maxHeight'];
    minH?: BoxProps['minHeight'];
    cursorPointer?: boolean;
    wrap?: boolean;
    grow?: boolean;
}

const Container = forwardRef<any, ContainerProps>((
    {
        children,
        sx = {},
        cls,
        scroll,
        pos,
        color,
        bg,
        rounded,
        pEvents,
        w,
        h,
        lh,
        g,
        maxW,
        minW,
        maxH,
        minH,
        cursorPointer,
        wrap,
        grow,
        ...props
    }, ref) => {
    // Обработчик стилей прокрутки
    const scrollStyles = (_theme: Theme): SxProps<Theme> => ({
        overflowX: scroll?.startsWith('x-')
            ? (scroll.split('-')[1] as CSSProperties['overflowX'])
            : undefined,
        overflowY: scroll?.startsWith('y-')
            ? (scroll.split('-')[1] as CSSProperties['overflowY'])
            : undefined,
        overflow: !scroll?.includes('-')
            ? (scroll as CSSProperties['overflow'])
            : undefined,
    });

    // Обработчик позиционирования
    const positionStyle = (_theme: Theme): SxProps<Theme> => (
        pos ? {position: pos as CSSProperties['position']} : {}
    );

    // Обработчик цвета и событий указателя
    const colorStyles = (_theme: Theme): SxProps<Theme> => ({
        color: color,
        backgroundColor: bg,
        pointerEvents: pEvents === undefined
            ? 'unset'
            : !pEvents ? 'none' : 'all',
    });

    // Обработчик радиуса границы
    const borderRadiusStyles = (_theme: Theme): SxProps<Theme> => {
        const borderRadiusMap: Record<number, string> = {
            0: '0rem',
            1: '0.25rem',
            2: '0.375rem',
            3: '0.5rem',
            4: '1rem',
            5: '2rem',
            6: '50%',
        };
        return {
            borderRadius: rounded !== undefined
                ? borderRadiusMap[rounded]
                : undefined,
        };
    };

    // Собираем сокращённые пропсы в объект для Box
    const additionalBoxProps: Partial<BoxProps> = {
        width: w,
        height: h,
        lineHeight: lh,
        gap: g,
        maxWidth: maxW,
        minWidth: minW,
        maxHeight: maxH,
        minHeight: minH,
    };

    return (
        //@ts-ignore
        <Box
            ref={ref}
            {...additionalBoxProps}
            sx={(theme) => {
                const baseSx = typeof sx === 'function' ? sx(theme) : sx;
                return {
                    ...(baseSx as any),
                    ...scrollStyles(theme),
                    ...positionStyle(theme),
                    ...colorStyles(theme),
                    ...borderRadiusStyles(theme),
                    ...(cursorPointer ? {cursor: 'pointer'} : {}),
                    ...(wrap ? {flexWrap: 'wrap'} : {}),
                    ...(grow ? {flexGrow: 1} : {}),
                };
            }}
            className={`${cls ?? ''} ${scroll ? 'no-scrollbar' : ''}`}
            {...props}
        >
            {children}
        </Box>
    );
});

Container.displayName = 'Container';

export default Container;

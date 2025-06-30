import React, {CSSProperties, ElementType, forwardRef, ReactNode} from 'react';
import {Box, BoxProps, SxProps, Theme} from '@mui/material';

export interface ContainerProps extends Omit<BoxProps, 'component'> {
    children?: ReactNode;
    cls?: string;
    scroll?: 'x-auto' | 'x-scroll' | 'x-hidden' | 'y-auto' | 'y-scroll' | 'y-hidden' | 'auto' | 'scroll' | 'hidden';
    pos?: 'absolute' | 'relative' | 'sticky' | 'static' | 'fixed';
    color?: string;
    bg?: string;
    rounded?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    opacity?: number;                   // 0 – 100, controls transparency
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
        opacity,
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

    const positionStyle = (_theme: Theme): SxProps<Theme> => (
        pos ? {position: pos as CSSProperties['position']} : {}
    );

    const colorStyles = (_theme: Theme): SxProps<Theme> => ({
        color,
        ...(bg ? { background: bg } : {}),
        pointerEvents: pEvents === undefined
            ? 'unset'
            : !pEvents ? 'none' : 'all',
    });

    const borderRadiusStyles = (_theme: Theme): SxProps<Theme> => {
        if (rounded === undefined) return {};                     // <-- не мешаем sx.borderRadius
        const borderRadiusMap: Record<number, string> = {
            0: '0rem',
            1: '0.25rem',
            2: '0.375rem',
            3: '0.5rem',
            4: '1rem',
            5: '2rem',
            6: '50%',
        };
        return {borderRadius: borderRadiusMap[rounded]};
    };

    const opacityStyles = (_theme: Theme): SxProps<Theme> => (
        opacity !== undefined
            ? {opacity: Math.min(Math.max(opacity, 0), 100) / 100} // clamp 0-100 → 0-1
            : {}
    );

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
        // @ts-ignore
        <Box
            {...props}
            {...additionalBoxProps}
            ref={ref}
            className={`${cls ?? ''} ${scroll ? 'no-scrollbar' : ''}`}
            sx={(theme) => {
                const baseSx = typeof sx === 'function' ? sx(theme) : sx;
                return {
                    ...(baseSx as any),
                    ...scrollStyles(theme),
                    ...positionStyle(theme),
                    ...colorStyles(theme),
                    ...borderRadiusStyles(theme),
                    ...opacityStyles(theme),
                    ...(cursorPointer ? {cursor: 'pointer'} : {}),
                    ...(wrap ? {flexWrap: 'wrap'} : {}),
                    ...(grow ? {flexGrow: 1} : {}),
                };
            }}
        >
            {children}
        </Box>
    );
});

Container.displayName = 'Container';

export default Container;

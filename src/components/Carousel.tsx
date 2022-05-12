import {ReactNode, useState} from 'react';
import {Button, IconButton, Stack} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
    items: ReactNode[];
    height?: number | string;
}

export default function Carousel(props: Props) {
    const [current, setCurrent] = useState<number>(0);

    const handleLeft = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    const handleRight = () => {
        if (current < props.items.length - 1) {
            setCurrent(current + 1);
        }
    };

    return (
        <>
            <Stack
                width={'100%'}
                direction={'row'}
                height={props.height || undefined}
            >
                <IconButton onClick={handleLeft} disabled={current === 0}>
                    <ArrowBackIosIcon/>
                </IconButton>
                <SwipeableViews index={current}>
                    {props.items.map((item, index) => (
                        <Stack key={index}>{item}</Stack>
                    ))}
                </SwipeableViews>
                <IconButton onClick={handleRight} disabled={current === props.items.length - 1}>
                    <ArrowForwardIosIcon/>
                </IconButton>
            </Stack>
        </>
    );
}

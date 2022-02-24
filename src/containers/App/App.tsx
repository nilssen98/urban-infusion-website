import {Button, Typography} from "@mui/material";
import {useState} from "react";

export default function App() {
    const [count, setCount] = useState<number>(0);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <Typography margin={2} variant={'h5'}>
                Count: {count}
            </Typography>
            <Button
                onClick={() => setCount((count) => count + 1)}
                variant={'outlined'}
                color={'secondary'}
            >
                Click me!
            </Button>
        </div>
    )
}

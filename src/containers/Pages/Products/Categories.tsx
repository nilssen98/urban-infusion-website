import {Box, Divider, List, ListItemButton, ListSubheader} from "@mui/material";

const categories = {
    'teas': [
        'black tea',
        'green tea',
        'white tea'
    ],
    'accessories': [
        'cups'
    ]
}

export default function Categories() {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '75vh',
                }}
            >
                <List sx={{width: 150}}>
                    {
                        Object.entries(categories).map(([category, subcategories]) => (
                            <>
                                <ListSubheader>{category}</ListSubheader>
                                {
                                    subcategories.map(subcategory => (
                                        <ListItemButton>{subcategory}</ListItemButton>
                                    ))
                                }
                            </>
                        ))
                    }
                </List>
                <Divider orientation={'vertical'}/>
            </Box>
        </>
    )
}

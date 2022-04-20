import {Tab, Tabs, TabsProps, Typography} from '@mui/material';
import {ReactElement} from 'react';

interface Props {
    tabsProps?: TabsProps;
    tabs?: string[];
    currentTab: number;
    onChange: (newValue: any) => void;
}

export default function TabNavigation(props: Props) {
    return (
        <>
            <Tabs
                {...props.tabsProps}
                value={props.currentTab}
                onChange={(event, newValue) => props.onChange(newValue)}
            >
                {
                    props.tabs?.map((tab, index) => (
                        <Tab
                            key={tab + index}
                            label={tab}
                        />
                    ))
                }
            </Tabs>
        </>
    );
}

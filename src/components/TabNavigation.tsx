import {Tab, Tabs, TabsProps, Typography} from '@mui/material';
import {ReactElement} from 'react';

export interface TabProps {
    name: string;
    icon?: ReactElement;
}

interface Props {
    tabsProps?: TabsProps;
    tabs?: TabProps[];
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
                            key={tab.name + index}
                            label={tab.name}
                            iconPosition={'start'}
                            icon={tab.icon}
                        />
                    ))
                }
            </Tabs>
        </>
    );
}

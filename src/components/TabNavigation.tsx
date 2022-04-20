import {Tab, Tabs, TabsProps} from "@mui/material";
import {ReactElement} from "react";

interface TabProps {
    name: string,
    icon?: ReactElement,
}

interface Props {
    tabsProps: TabsProps,
    tabs?: TabProps[],
    currentTab: number,
    onChange: () => void;
}

export default function TabNavigation(props: Props) {
    return (
        <>
            <Tabs
                {...props.tabsProps}
                value={props.currentTab}
                onChange={props.onChange}
            >
                {
                    props.tabs?.map(tab => (
                        <Tab
                            label={tab.name}
                            icon={tab.icon}
                        />
                    ))
                }
            </Tabs>
        </>
    )
}
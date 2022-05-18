import {UserDto} from '../../../api/urbaninfusion/dto/user-dto';
import {Button, Stack, TextField} from '@mui/material';
import SectionCard, {SectionCardItem} from '../../SectionCard';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React from 'react';

export default function ProfileSection(props?: UserDto) {
    return (
        <>
            <Stack spacing={4}>
                <SectionCard header={'Personal information'}>
                    <SectionCardItem>
                        <TextField
                            value={props?.username || ''}
                            onChange={() => {
                            }}
                            label={'Username'}
                            disabled
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField label={'Password'}/>
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField label={'Email'} value={props?.email || ''}/>
                    </SectionCardItem>
                    <SectionCardItem sx={{alignItems: 'start'}}>
                        <Button startIcon={<SaveOutlinedIcon/>} variant={'contained'}>Save changes</Button>
                    </SectionCardItem>
                </SectionCard>
                <SectionCard header={'Contact information'}>
                    <SectionCardItem>
                        <TextField label={'City'} value={props?.city || ''}/>
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField label={'Zipcode'} value={props?.zipcode || ''}/>
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField label={'Address'} value={props?.address || ''}/>
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField label={'Phone number'} value={props?.phone_number || ''}/>
                    </SectionCardItem>
                    <SectionCardItem sx={{alignItems: 'start'}}>
                        <Button startIcon={<SaveOutlinedIcon/>} variant={'contained'}>Save changes</Button>
                    </SectionCardItem>
                </SectionCard>
            </Stack>
        </>
    );
}

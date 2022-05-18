import {UserDto} from '../../../api/urbaninfusion/dto/user-dto';
import {Button, Stack, TextField} from '@mui/material';
import SectionCard, {SectionCardItem} from '../../SectionCard';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React, {useState} from 'react';

type Props = {
    onUpdate: (data: Partial<UserDto>) => void;
} & UserDto;

export default function ProfileSection(props: Props) {
    const [personalInfo, setPersonalInfo] = useState<Partial<UserDto>>({
        username: props?.username,
        email: props?.email,
    });

    const [contactInfo, setContactInfo] = useState<Partial<UserDto>>({
        city: props?.city,
        zipcode: props?.zipcode,
        address: props?.address,
        phone_number: props?.phone_number,
    });

    const updatePersonalInfo = (data: Partial<UserDto>) => {
        setPersonalInfo({...personalInfo, ...data});
    };

    const updateContactInfo = (data: Partial<UserDto>) => {
        setContactInfo({...personalInfo, ...data});
    };

    return (
        <>
            <Stack spacing={4}>
                <SectionCard header={'Personal information'}>
                    <SectionCardItem>
                        <TextField
                            value={personalInfo.username}
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
                        <TextField
                            label={'Email'}
                            value={personalInfo.email}
                            onChange={(event) => updatePersonalInfo({email: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem sx={{alignItems: 'start'}}>
                        <Button
                            startIcon={<SaveOutlinedIcon/>}
                            variant={'contained'}
                            onClick={() => props.onUpdate(personalInfo)}
                        >
                            Save changes
                        </Button>
                    </SectionCardItem>
                </SectionCard>
                <SectionCard header={'Contact information'}>
                    <SectionCardItem>
                        <TextField
                            label={'City'}
                            value={contactInfo.city}
                            onChange={(event) => updateContactInfo({city: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField
                            label={'Zipcode'}
                            value={contactInfo.zipcode}
                            onChange={(event) => updateContactInfo({zipcode: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField
                            label={'Address'}
                            value={contactInfo.address}
                            onChange={(event) => updateContactInfo({address: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField
                            label={'Phone number'}
                            value={contactInfo.phone_number}
                            onChange={(event) => updateContactInfo({phone_number: event.target.value})}
                        />
                    </SectionCardItem>
                    <SectionCardItem sx={{alignItems: 'start'}}>
                        <Button
                            startIcon={<SaveOutlinedIcon/>}
                            variant={'contained'}
                            onClick={() => props.onUpdate(contactInfo)}
                        >
                            Save changes
                        </Button>
                    </SectionCardItem>
                </SectionCard>
            </Stack>
        </>
    );
}

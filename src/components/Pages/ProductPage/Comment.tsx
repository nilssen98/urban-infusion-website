import {Stack, Typography} from '@mui/material';

interface Props {
    id?: number;
    username?: string;
    text?: string;
    lastUpdated?: string;
    created?: string;
}

export default function Comment(props: Props) {
    return (
      <>
          <Stack direction={'column'} minHeight={200} width={'100%'} gap={10} sx={{border: '1px solid grey'}}>
              <Typography>This is a single comment!</Typography>
              <Typography>{`Username: ${props.username}`}</Typography>
              <Typography>{`Text: ${props.text}`}</Typography>
              <Typography>{`Last updated: ${props.lastUpdated}`}</Typography>
              <Typography>{`Created: ${props.created}`}</Typography>
          </Stack>
      </>
    );
}

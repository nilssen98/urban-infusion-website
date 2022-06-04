import Page from '../../components/Wrappers/Page';
import Section from '../../components/Wrappers/Section';
import {userSlice} from '../../state/slices/user';
import {connect} from 'react-redux';
import {ReactElement, useEffect} from 'react';
import {RootState} from '../../state/store';
import {useNavigate} from 'react-router-dom';

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.user.jwt !== undefined,
    };
};

const mapDispatchToProps = {
    toggleTheme: userSlice.actions.toggleTheme,
    setJwtToken: userSlice.actions.setJwtToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
    children?: ReactElement;
};

function Checkout(props: Props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.isAuthenticated) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <Page>
                <Section>

                </Section>
            </Page>
        </>
    );
}

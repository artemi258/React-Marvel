import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner';
import Sceleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data) => {

    switch (process) {
        case 'waiting':
            return <Sceleton/>;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;
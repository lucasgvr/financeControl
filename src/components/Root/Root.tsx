import { Outlet } from 'react-router-dom'

import Header from 'components/Header/Header'

const Root: React.FC = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Root
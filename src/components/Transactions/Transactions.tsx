import { Link } from 'react-router-dom'

const Transactions: React.FC =  () => {
    return (
        <>
            <Link to='/dashboard'>
                <button type="button" >
                        Dashboard
                </button>
            </Link>
            <p>Transaction</p>
        </>
    )
}

export default Transactions
import { useMediaQuery } from '@mui/material'
import logo from '../images/logo.png'
import Nav from './Nav';

type Props = {}

const Header = (props: Props) => {
    const md = useMediaQuery('(min-width:768px)');

    return (
        <nav className='bg-gradient-to-t from-yellow-100 to-yellow-400 border-b-2 border-gray-200'>
            <div className='flex justify-center items-center max-w-screen-2xl m-auto' >
                <img src={logo} alt='logo' className='h-32 md:h-64' ></img>
                {md ? null :
                    <Nav />
                }
            </div>
        </nav>
    )
}

export default Header
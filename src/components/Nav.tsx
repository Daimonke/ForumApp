import React, { useState } from 'react'
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

type Li = {
    open: boolean,
    active: number | null
}

const Nav = () => {
    const navigate = useNavigate();

    const [listItem, setListItem] = useState<Li>({
        open: false,
        active: 0
    })

    const links = [
        {
            name: 'Home',
            path: '/'
        },
        {
            divider: true
        },
        {
            name: 'Login',
            path: '/login'
        },
        {
            name: 'Register',
            path: '/register'
        }
    ];

    const handleClick = (path: string, index: number) => {
        setListItem({
            open: false,
            active: index
        })
        navigate(path);
        console.log(listItem)
    }
    return (
        <>
            <IconButton color='inherit' onClick={() => setListItem({ ...listItem, open: true })} size='large' sx={{ position: 'absolute', height: 'fit-content', right: 10 }}>
                <MenuIcon fontSize='large' />
            </IconButton>

            <Drawer
                anchor='right'
                open={listItem.open}
                onClose={() => setListItem({ ...listItem, open: false })}
            >
                <List sx={{ minWidth: 150 }}>
                    {links.map((link, index) => (
                        link.divider ? <Divider key={index} className='bg-gray-400' /> :
                            <ListItem key={index} disablePadding onClick={() => handleClick(link.path!, index)} className={
                                listItem.active === index ? 'bg-gray-200' : ''
                            }>
                                <ListItemButton>
                                    <ListItemText sx={{ textAlign: 'center' }} primary={link.name} />
                                </ListItemButton>
                            </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    )
}

export default Nav
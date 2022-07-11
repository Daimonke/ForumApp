import React, { createContext, useState } from 'react'

type Props = {
    children: React.ReactNode
}

type Ctx = {
    user: {
        id: number,
    } | null,
    setUser: (user: Ctx['user']) => void
}

const initialValue: Ctx = {
    user: null,
    setUser: (user) => { },
}

const context = createContext(initialValue)

const Context = ({ children }: Props) => {
    const [user, setUser] = useState(initialValue.user)
    return (
        <context.Provider value={{ user, setUser }}>
            {children}
        </context.Provider>
    )
}

export default Context
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-cyan-950 text-white py-2'>
        <div className="logo">
           <h3 className='text-2xl hover:cursor-pointer font-bold underline'>Stork</h3>
        </div>
        <div className="links">
            <ul className="flex gap-5  text-2xl">
                <li className="home hover:cursor-pointer p-1.5 rounded-2xl hover:bg-slate-500/40 transition-all duration-200">Home</li>
                <li className="todo hover:cursor-pointer p-1.5 rounded-2xl hover:bg-slate-500/40 transition-all duration-200">Todos</li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar

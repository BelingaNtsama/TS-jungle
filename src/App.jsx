import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Moon, Sun, Heart } from 'lucide-react'
import { toast, Toaster } from 'sonner'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    toast.success(`Theme changed to ${theme === 'light' ? 'dark' : 'light'}`)
  }

  const buttonClasses = clsx(
    'btn',
    'gap-2',
    {
      'btn-primary': theme === 'light',
      'btn-secondary': theme === 'dark'
    }
  )

  return (
    <div data-theme={theme} className="min-h-screen p-8 bg-base-100">
      <Toaster position="top-right" richColors />
      
      <div className="navbar bg-base-200 rounded-box mb-8">
        <div className="flex-1">
          <button className="btn btn-ghost text-xl">DaisyUI Demo</button>
        </div>
        <div className="flex-none">
          <button className="btn btn-circle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-96 bg-base-200 shadow-xl mx-auto"
      >
        <div className="card-body">
          <h2 className="card-title">Awesome Libraries!</h2>
          <p>Using DaisyUI, Framer Motion, Lucide React, and more...</p>
          
          <div className="flex gap-2 mt-4">
            <button 
              className={twMerge(buttonClasses, 'btn-primary')}
              onClick={() => toast.success('Liked!')}
            >
              <Heart />
              Like
            </button>
            
            <button 
              className={twMerge(buttonClasses, 'btn-secondary')}
              onClick={() => toast.info('Opening GitHub...')}
            >
              <Github />
              GitHub
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default App

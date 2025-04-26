import { AuthProvider } from './context/AuthContext'
import AppRouter from './routes/AppRouter'
import { Toaster } from 'sonner'
function App() {
  return (
    <AuthProvider>
      <Toaster richColors/>
      <AppRouter/>
    </AuthProvider>
  )
}

export default App

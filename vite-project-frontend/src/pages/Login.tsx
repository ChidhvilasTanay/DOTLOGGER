import CustomizedInput from '../components/SharedComponents/CustomizedInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    try {
      toast.loading("Signing in...", { id: "login" })
      await auth?.login(email, password)
      navigate("/")
      toast.success("Successfully signed in", { id: "login" })
    } catch {
      toast.error("Failed to sign in", { id: "login" })
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-sm bg-card border-border shadow-2xl rounded-2xl">
        <CardHeader className="pb-2 pt-8 px-8">
          <CardTitle className="text-center text-2xl font-bold text-foreground tracking-tight">
            Welcome back
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm mt-1">Sign in to your account</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button type="submit" variant="default" className="w-full mt-2 font-semibold tracking-wide">
              Continue →
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login

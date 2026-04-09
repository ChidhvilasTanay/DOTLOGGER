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
      <Card className="w-full max-w-sm bg-card border-border shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-xl font-semibold text-foreground">
            Sign in
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button type="submit" className="w-full mt-2">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login

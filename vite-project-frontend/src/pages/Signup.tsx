import CustomizedInput from '../components/SharedComponents/CustomizedInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Signup = () => {
  const auth = useAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    try {
      toast.loading("Creating account...", { id: "signup" })
      await auth?.signup(name, email, password)
      toast.success("Account created successfully", { id: "signup" })
    } catch {
      toast.error("Failed to sign up", { id: "signup" })
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-sm bg-card border-border shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-xl font-semibold text-foreground">
            Create account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button type="submit" className="w-full mt-2">
              Create account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup

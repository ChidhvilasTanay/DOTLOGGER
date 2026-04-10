import CustomizedInput from '../components/SharedComponents/CustomizedInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { useState } from "react"

const Signup = () => {
  const auth = useAuth()

  const [emailError, setEmailError] = useState<string | undefined>(undefined)

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
    } catch (error:any){
      setEmailError(error.message)
      toast.error("Failed to sign up", { id: "signup" })
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-sm bg-card border-border shadow-2xl rounded-2xl">
        <CardHeader className="pb-2 pt-8 px-8">
          <CardTitle className="text-center text-2xl font-bold text-foreground tracking-tight">
            Create account
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm mt-1">Sign up to get started</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" error={emailError} onChange={()=>{setEmailError(undefined)}}/>
            <CustomizedInput type="password" name="password" label="Password" />
            <Button type="submit" variant="default" className="w-full mt-2 font-semibold tracking-wide">
              Create account →
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signup

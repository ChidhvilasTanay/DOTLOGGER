import { useAuth } from "../context/AuthContext"
import TypewriterComponent from "typewriter-effect"

const Home = () => {
  const auth = useAuth()
  const fName = auth?.user?.name.split(" ")[0]
  const homestring = fName
    ? `Hey ${fName}! How are you doing?`
    : 'Hey there! Login to continue...'

  const date = new Date()
  const formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="flex flex-1 items-center justify-center h-[80vh]">
      <div className="text-foreground font-light text-5xl md:text-7xl text-center leading-tight px-4">
        <TypewriterComponent
          options={{
            strings: [homestring, formattedDate],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </div>
  )
}

export default Home

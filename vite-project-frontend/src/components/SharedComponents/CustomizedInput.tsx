import { Input } from "@/components/ui/input"

type Props = {
  name: string;
  type: string;
  label: string;
  error?: string;
  onChange?: () => void;
}

const CustomizedInput = ({ name, type, label, error, onChange }: Props) => {
  return (
    <div className="auth-input flex flex-col gap-1.5 w-full">
      <label htmlFor={name} className="text-muted-foreground text-sm">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        className="bg-muted border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring w-full [&:-webkit-autofill]:bg-muted [&:-webkit-autofill]:text-foreground [&:-webkit-autofill_selected]:bg-muted"
        style={{ colorScheme: "dark", fontFamily: "'Share Tech Mono', monospace" }}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default CustomizedInput

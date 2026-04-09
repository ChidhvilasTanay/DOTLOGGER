import { Input } from "@/components/ui/input"

type Props = {
  name: string;
  type: string;
  label: string;
}

const CustomizedInput = ({ name, type, label }: Props) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={name} className="text-muted-foreground text-sm">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        className="bg-muted border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring w-80"
      />
    </div>
  )
}

export default CustomizedInput

import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Button } from './button';
import { Input } from './input';

export const InputPassword = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>((props, ref) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleToggle = () => setVisiblePassword((prevState) => !prevState);

  return (
    <div className="relative w-full">
      <Input {...props} ref={ref} type={visiblePassword ? 'text' : 'password'} />

      <Button
        type="button"
        variant="ghost"
        className="absolute size-[19px] opacity-80 top-5 right-3 p-[1px] rounded-full -translate-y-[50%]"
        onClick={handleToggle}
      >
        {visiblePassword && <EyeIcon className="text-black/70 size-full" />}
        {!visiblePassword && <EyeClosedIcon className="text-black/70 size-full" />}
      </Button>
    </div>
  );
});

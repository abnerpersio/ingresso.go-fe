import { zodResolver } from '@hookform/resolvers/zod';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  email: z.string({ message: t('form.required_message') }).email(t('form.invalid_email')),
  name: z.string({ message: t('form.required_message') }).min(1, t('form.required_message')),
  password: z
    .string({ message: t('form.required_message') })
    .trim()
    .min(8, t('form.password_min_length'))
    .regex(/\w{1,}/i, t('form.password_required_letters'))
    .regex(/\d{1,}/i, t('form.password_required_numbers')),
});

type FormValues = z.infer<typeof schema>;

export default function SignUpPage() {
  const form = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit((_formValues) => {
    toast.info('Estamos trabalhando nessa funcionalidade...');
  });

  return <div className="flex flex-col gap-6">Sign up</div>;
}

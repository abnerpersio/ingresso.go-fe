import { ROUTES } from '@/app/constants/routes';
import { useAuth } from '@/app/hooks/use-auth';
import { cn } from '@/app/lib/utils/styles';
import { GoogleIcon } from '@/ui/components/icons/google';
import { Button } from '@/ui/components/shared/button';
import { FormError, FormLabel, FormProvider } from '@/ui/components/shared/form';
import { Input } from '@/ui/components/shared/input';
import { InputPassword } from '@/ui/components/shared/input-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  email: z.string({ required_error: t('form.required_message') }).email(t('form.invalid_email')),
  password: z
    .string({ message: t('form.required_message'), required_error: t('form.required_message') })
    .trim()
    .min(1, t('form.required_message')),
});

type FormValues = z.infer<typeof schema>;

export default function SignInPage() {
  const { signIn, signInWithGoogle } = useAuth();

  const form = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formValues) => {
    try {
      await signIn(formValues.email, formValues.password);
    } catch {
      toast.error('Login inválido, verifique as credenciais');
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="sr-only">{t('generic.project.name')}</span>

          <h1 className="text-xl font-bold">{t('generic.project.name')}</h1>

          <div className="text-center text-sm">
            {t('pages.sign_in.dont_have_account')}{' '}
            <Link to={ROUTES.auth.signUp} className="underline underline-offset-4">
              {t('pages.sign_in.sign_up')}
            </Link>
          </div>
        </div>

        <FormProvider {...form}>
          <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <FormLabel htmlFor="email">{t('pages.sign_in.email')}</FormLabel>
              <Input
                type="email"
                placeholder="email@gmail.com"
                autoComplete="username"
                {...form.register('email')}
              />

              <FormError message={form.formState.errors.email?.message} />
            </div>

            <div className="grid gap-2">
              <FormLabel htmlFor="email">{t('pages.sign_in.password')}</FormLabel>

              <InputPassword
                id="password"
                placeholder="*******"
                autoComplete="current-password"
                {...form.register('password')}
              />

              <FormError message={form.formState.errors.password?.message} />
            </div>

            <Button type="submit" className="w-full" isLoading={form.formState.isSubmitting}>
              {t('pages.sign_in.actions.login')}
            </Button>
          </form>
        </FormProvider>

        <div
          className={cn(
            'relative text-center text-sm',
            'after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border',
          )}
        >
          <span className="relative z-10 bg-background px-2 text-muted-foreground">{t('generic.or')}</span>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={signInWithGoogle}
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          <GoogleIcon className="size-4" />
          {t('pages.sign_in.actions.google')}
        </Button>
      </div>
    </div>
  );
}

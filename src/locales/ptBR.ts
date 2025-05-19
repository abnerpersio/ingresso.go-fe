export default {
  generic: {
    project: {
      name: 'ingresso.go',
    },
    or: 'ou',
  },
  sidebar: {},
  form: {
    required_message: 'Campo obrigatório',
    invalid_email: 'Email inválido',
    password_min_length: 'A senha deve conter 8 caracteres',
    password_required_letters: 'A senha deve conter letras',
    password_required_numbers: 'A senha deve conter números',
  },
  errors: {
    invalid_google_auth: 'Erro ao fazer o login com o Google.',
  },
  routes: {},
  pages: {
    sign_in: {
      dont_have_account: 'Não tem uma conta?',
      sign_up: 'Cadastre-se',
      email: 'Email',
      password: 'Senha',
      actions: {
        login: 'Entrar',
        google: 'Continuar com Google',
      },
    },
  },
  accessibility: {
    scan_qrcode: 'Escaneie o QR Code para conectar ao whatsapp',
  },
};

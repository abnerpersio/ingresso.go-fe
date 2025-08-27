export default {
  generic: {
    project: {
      name: 'ingresso.go',
    },
    or: 'ou',
    logout: 'Sair',
    user_greeting: 'Olá, {{name}}',
  },
  sidebar: {},
  form: {
    required_message: 'Campo obrigatório',
    invalid_email: 'Email inválido',
    password_min_length: 'A senha deve conter 8 caracteres',
    password_required_letters: 'A senha deve conter letras',
    password_required_numbers: 'A senha deve conter números',
  },
  errors: { invalid_google_auth: 'Erro ao fazer o login com o Google.' },
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
    home: {
      subtitle: 'Escolha o filme perfeito para hoje',
      movies_section: {
        title: 'Filmes em cartaz',
        subtitle: 'Descubra os lançamentos e sucessos do cinema',
      },
      empty_state: {
        title: 'Nenhum filme encontrado',
        message: 'Não há filmes disponíveis no momento. Tente novamente mais tarde.',
      },
    },
    movie_details: {
      back: 'Voltar',
      back_to_home: 'Voltar ao início',
      watch_trailer: 'Assistir Trailer',
      duration: '2h 15min',
      not_found: {
        title: 'Filme não encontrado',
        message: 'O filme que você está procurando não existe.',
      },
      sessions: {
        title: 'Sessões Disponíveis',
        seats: 'lugares',
        no_sessions: 'Nenhuma sessão disponível para este filme.',
      },
      purchase: {
        title: 'Confirmar Compra',
        date: 'Data:',
        time: 'Horário:',
        theater: 'Sala:',
        format: 'Formato:',
        total: 'Total:',
        buy_ticket: 'Comprar Ingresso',
        cancel: 'Cancelar',
        success_message: 'Ingresso comprado para {{movie}} - {{time}}',
      },
    },
  },
  accessibility: {},
} as const;

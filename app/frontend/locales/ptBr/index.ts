export default {
  product_name: 'Gerenciador de carteira',
  dark_mode: 'modo escuro',
  light_mode: 'modo claro',
  currency_type: 'R$',
  category: {
    new: 'Nova categoria',
    edit: 'Editar',
    destroy: 'Excluir',
    title: 'Categorias',
    no_category: 'Nenhuma categoria encontrada',
    name: 'Nome',
    hint: 'Exemplo de cor: deep orange ou #FF8C00',
    placeholder: 'Nome da cor em inglês ou código hexadecimal',
    color: 'Cor',
    errors: {
      default: 'Ocorreu um erro.',
      noNameAndColor: 'Por favor, preencha o nome e a cor.',
      noName: 'Por favor, preencha o nome.',
      noColor: 'Por favor, preencha a cor.',
      invalidHex: 'Por favor, insira um código hexadecimal válido.'
    }
  },
  expense: {
    new: 'Nova despesa',
    edit: 'Editar',
    destroy: 'Excluir',
    title: 'Despesas',
    no_expense: 'Nenhuma despesa encontrada',
    name: 'Nome',
    amount: 'Quantia',
    select_category: 'Selecionar categoria',
    errors: {
      default: 'Ocorreu um erro.',
      noNameColorAndCategory: 'Por favor, preencha o nome, quantia e escolha uma categoria.',
      noName: 'Por favor, preencha o nome.',
      noAmount: 'Por favor, preencha a quantia.', 
      noCategory: 'Por favor, escolha uma categoria.', 
    }
  },
  dialog: {
    cancel: 'Cancelar',
    ok: 'Ok'
  }
};

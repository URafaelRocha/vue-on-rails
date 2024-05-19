export default {
  product_name: 'Wallet Manager',
  dark_mode: 'dark mode',
  light_mode: 'light mode',
  currency_type: '$',
  category: {
    new: 'New category',
    edit: 'Edit',
    destroy: 'Remove',
    title: 'Categories',
    no_category: 'No category found',
    name: 'Name',
    hint: 'example of color: deep orange or #FF8C00',
    placeholder: 'Color name or hex code',
    color: 'Color',
    errors: {
      default: 'An error has occurred.',
      noNameAndColor: 'Please fill in the name and color.',
      noName: 'Please fill in the name.',
      noColor: 'Please fill in the color.',
      invalidHex: 'Please enter a valid hexadecimal color.'
    }
  },
  expense: {
    new: 'New expense',
    edit: 'Edit',
    destroy: 'Remove',
    title: 'Expenses',
    no_expense: 'No expense found',
    name: 'Name',
    amount: 'Amount',
    select_category: 'Select category',
    errors: {
      default: 'An error has occurred.',
      noNameColorAndCategory: 'Please fill in the name, amount and choose an category.',
      noName: 'Please fill in the name.',
      noAmount: 'Please fill in the amount.', 
      noCategory: 'Please choose an category.', 
    }
  },
  dialog: {
    cancel: 'Cancel',
    ok: 'Ok'
  }
};

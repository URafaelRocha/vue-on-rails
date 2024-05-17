export interface IResource {
  name: string;
  uri: string;
  icon: string;
  isSelected: boolean
}

export interface ICategory {
  id: number;
  name: string;
  color: string;
}

export interface IExpenses {
  name: string;
  amount: number;
  category_id: number;
}

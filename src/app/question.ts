export interface Question<T> {
    id: number;
    category: string;
    title: string;
    options:  {
      key: string,
      value: string,
      is_true: boolean,
    }[];
  }
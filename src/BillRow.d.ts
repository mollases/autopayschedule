export type BillRow = {
  amount: string;
  company: string;
  notes: string;
  cancellable: string | boolean;
  'cost per year': string;
  frequency: number;
  source: string;
  when: string;
};
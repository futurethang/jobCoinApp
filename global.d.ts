interface Transaction {
  amount: string;
  timestamp: string;
  toAddress: string;
}
interface UserData {
  balance: number;
  transactions: Transaction[];
}

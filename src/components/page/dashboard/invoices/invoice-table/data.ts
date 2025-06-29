export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return payments;
}

const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "a1b2c3d4",
    amount: 200,
    status: "success",
    email: "john.doe@example.com",
  },
  {
    id: "e5f6g7h8",
    amount: 75,
    status: "failed",
    email: "jane.smith@example.com",
  },
  {
    id: "i9j0k1l2",
    amount: 150,
    status: "pending",
    email: "alice@example.com",
  },
  {
    id: "m3n4o5p6",
    amount: 300,
    status: "processing",
    email: "bob@example.com",
  },
  {
    id: "q7r8s9t0",
    amount: 50,
    status: "success",
    email: "carol@example.com",
  },
  {
    id: "u1v2w3x4",
    amount: 400,
    status: "failed",
    email: "dave@example.com",
  },
  {
    id: "y5z6a7b8",
    amount: 220,
    status: "pending",
    email: "eve@example.com",
  },
  {
    id: "c9d0e1f2",
    amount: 180,
    status: "processing",
    email: "frank@example.com",
  },
  {
    id: "g3h4i5j6",
    amount: 90,
    status: "success",
    email: "grace@example.com",
  },
  {
    id: "k7l8m9n0",
    amount: 60,
    status: "failed",
    email: "heidi@example.com",
  },
  {
    id: "o1p2q3r4",
    amount: 275,
    status: "pending",
    email: "ivan@example.com",
  },
  {
    id: "s5t6u7v8",
    amount: 320,
    status: "processing",
    email: "judy@example.com",
  },
  {
    id: "w9x0y1z2",
    amount: 130,
    status: "success",
    email: "mallory@example.com",
  },
  {
    id: "a3b4c5d6",
    amount: 210,
    status: "failed",
    email: "oscar@example.com",
  },
  {
    id: "e7f8g9h0",
    amount: 170,
    status: "pending",
    email: "peggy@example.com",
  },
  {
    id: "i1j2k3l4",
    amount: 140,
    status: "processing",
    email: "trent@example.com",
  },
  {
    id: "m5n6o7p8",
    amount: 310,
    status: "success",
    email: "victor@example.com",
  },
  {
    id: "q9r0s1t2",
    amount: 85,
    status: "failed",
    email: "walter@example.com",
  },
  {
    id: "u3v4w5x6",
    amount: 195,
    status: "pending",
    email: "zara@example.com",
  },
];

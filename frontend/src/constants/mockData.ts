// Los datos simulados del dashboard

// lista de 6 caracoles
export const SNAILS = [
  { id: 1, name: "Turbo" },
  { id: 2, name: "Rayo" },
  { id: 3, name: "Chispa" },
  { id: 4, name: "Relámpago" },
  { id: 5, name: "Tornado" },
  { id: 6, name: "Brisa" },
] as const;

// Victorias de cada caracol
export const SNAIL_VICTORIES = [
  { snailId: 1, wins: 4 },
  { snailId: 2, wins: 1 },
  { snailId: 3, wins: 3 },
  { snailId: 4, wins: 2 },
  { snailId: 5, wins: 1 },
  { snailId: 6, wins: 1 },
];

// apuestass ganadas y perdidas
export const BETS_SUMMARY = {
  won: 8,
  lost: 4,
};
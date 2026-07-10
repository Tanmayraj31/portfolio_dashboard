const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("en-IN", {
  style: "percent",
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "N/A";
  }

  return currencyFormatter.format(value);
}

export function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "N/A";
  }

  return numberFormatter.format(value);
}

export function formatPercent(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "N/A";
  }

  return percentFormatter.format(value);
}

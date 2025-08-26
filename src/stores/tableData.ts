const tableData = Array.from({ length: 100 }, (_, i) => {
  const idx = i + 1;
  return {
    Name: `Test ${idx}`,
    Directory: `/dir${idx}`,
    Interval: `${600 + (idx % 4) * 300} Sec`,
    Quota: `${100 + idx * 5}GB`,
    Owner: [
      "Alice",
      "Bob",
      "Charlie",
      "David",
      "Eve",
      "Frank",
      "Grace",
      "Hannah",
      "Ian",
      "Jane",
      "Kyle",
      "Laura",
      "Mike",
      "Nina",
      "Oscar",
      "Paul",
      "Quinn",
      "Rachel",
      "Steve",
      "Tina",
    ][i % 20],
    Events: ["Add", "Change", "Delete", "Add, Change"][i % 4],
    "Last Run": `${((idx % 28) + 1).toString().padStart(2, "0")}/08/2025, ${(
      8 +
      (idx % 12)
    )
      .toString()
      .padStart(2, "0")}:00:00`,
    Recursive: idx % 2 === 0 ? "true" : "false",
    Tags: `tag${idx}`,
    "Trading Partner": ["REST", "SOAP", "FTP"][i % 3],
  };
});

export default tableData;

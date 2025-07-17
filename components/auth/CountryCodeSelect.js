"use client";

import { useEffect, useState } from "react";

export default function CountryCodeSelect({ value, onChange }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,idd"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        const sorted = data
          .map((c) => ({
            name: c.name.common,
            code: c.idd?.root ? c.idd.root + (c.idd.suffixes?.[0] || "") : null,
          }))
          .filter((c) => c.code)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(sorted);
      } catch (err) {
        console.error("Error fetching country codes:", err.message);
      }
    }

    fetchCountries();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded border border-gray-600 bg-gray-800 text-white"
      aria-label="Select country code"
    >
      <option value="">Select country code</option>
      {countries.map(({ name, code }) => (
        <option key={`${name}-${code}`} value={code}>
          {name} ({code})
        </option>
      ))}
    </select>
  );
}

"use client";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import React from "react";

export default function SearchForm() {
  const [search, setSearch] = useState("");
  return (
    <div>
      {" "}
      <Input
        label="Plant"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Link href={`/search/${search}`}>
        <Button color="primary" variant="solid">
          Search
        </Button>
      </Link>
    </div>
  );
}

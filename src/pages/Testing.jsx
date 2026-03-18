import fuzzysort from "fuzzysort";
import { useState } from "react";
import { Form } from "react-bootstrap";

export default function Testing() {
  const mystuff = [{ file: "Apple.cpp" }, { file: "Banana.cpp" }];
  const results = fuzzysort.go("a", mystuff, { key: "file" });
  const [search, setSearch] = useState("");

  return (
    <>
      {results[0].obj.file}
      <Form.Control
        type="text"
        value={search}
        placeholder="etner a thing"
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}

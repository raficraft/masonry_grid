import React, { useState, useEffect } from "react";

export default function useUnsplash(url) {
  const API_CLIENTID = process.env.NEXT_PUBLIC_API_CLIENTID;
  const API_URL = `${url}&client_id=${API_CLIENTID}`;

  const [unsplash, setUnsplash] = useState([]);
  const [importImg, setImportImg] = useState([]);

  useEffect(() => {
    function fetchData() {
      const url = `${API_URL}`;
      const res = fetch(url)
        .then((response) => response.json())
        .then((result) => {
          setUnsplash(result);
        });
    }

    fetchData();
  }, []);

  return [unsplash];
}

import React, { useState, useEffect } from "react";

export default function useGetimage(directory) {
  const [loading, setLoading] = useState(true);
  const [filesInfo, setFilesInfo] = useState([]);

  useEffect(() => {
    if (directory && directory !== null) {
      const fetchData = async () => {
        const callApi = async () => {
          const bodyRequest = {
            dir: directory,
          };

          const res = await fetch("/api", {
            method: "POST",
            body: JSON.stringify(bodyRequest),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          const filesArray = [];

          try {
            const allFiles = await res.json();
            console.log("CHECK : ", allFiles);
            for (const f of allFiles) {
              const i = await import(`/public/${directory}${f}`);

              filesArray.push(i.default);
            }
            setLoading(false);
            return filesArray;
          } catch (error) {
            console.log(error);
          }
        };
        const result = await callApi();
        setFilesInfo(result);
      };

      fetchData();
    }
  }, []);

  return [filesInfo, loading];
}

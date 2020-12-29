import { useState, useEffect } from "react";

const useFetch = (callback) => {
  const [loading, setLoading] = useState(false);

  const fetchInitialData = async () => {
    setLoading(true);
    const initialData = [];
    callback(initialData);
    setLoading(false);
  };

  useEffect(()=>fetchInitialData(), []);

  return loading;
};

export default useFetch;

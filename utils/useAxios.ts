import axios, { Method } from "axios";
import { useState, useRef, useEffect } from "react";

export const useAxios = <T>(
  url: string,
  method: Method,
  opts: {
    payload?: any;
    disabled?: boolean;
  }
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const fetchRequest = async () => {
    let response;
    try {
      setLoading(true);
      response = await axios.request({
        data: opts.payload,
        signal: controllerRef.current.signal,
        method,
        url,
      });
      setData(response.data);
      setError("");
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    } finally {
      setLoading(false);
      setLoaded(true);
      return response?.data;
    }
  };

  useEffect(() => {
    if (!opts.disabled) {
      fetchRequest();
    }
  }, []);

  return { cancel, data, error, loaded, refetch: fetchRequest, loading };
};

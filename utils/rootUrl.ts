import {useEffect, useState} from 'react';

const useRootUrl = () => {
  const [rootUrl, setRootUrl] = useState('');

  useEffect(() => {
    setRootUrl(window.location.pathname);
  }, [])

  return rootUrl;
}

export default useRootUrl;

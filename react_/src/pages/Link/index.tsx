import { Column } from '@/components/flex';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Link = () => {
  const location = useLocation();
  const [url, setUrl] = useState('');
  
  useEffect(() => {
    window.log('当前第三方外链', location);
    const urlSearch = new URLSearchParams(location.search);
    const thirdUrl = urlSearch.get('url');
    
    if (thirdUrl) {
      setUrl(thirdUrl);
    }
  }, [location]);
  
  return (
    <Column>
      <div>第三方页面内容</div>
      <iframe
        style={{ width: '100%', height: '100%' }}
        frameBorder='0'
        scrolling='no'
        src={url}
      ></iframe>
    </Column>
  );
};

export default Link;

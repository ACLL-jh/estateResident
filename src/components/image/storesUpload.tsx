import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState ,useEffect} from 'react';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('暂不支持除jpeg、png以外的图片格式');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不可超过2M');
  }
  return isJpgOrPng && isLt2M;
};

const StoresUpload = (props:any) => {  
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [url,seuUrl] = useState<string>()
  useEffect(()=>{
    console.log(props.img);
    
    if (props.img) {
      seuUrl('http://estate.eshareedu.cn/estate/upload/'+props.img)
    }
  },[props.img])
  const handleChange: UploadProps['onChange'] = (
      
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(info.file.response.data);
        seuUrl(url)
      });
    }
  };
  const uploadButton = (
    <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
  );

  return (
    <Upload
      name="file"
      headers={{
        Authorization: sessionStorage.getItem('token') || '',
      }}
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="http://estate.eshareedu.cn/estate/api/upload/add"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {url ? (
        <img src={url} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default StoresUpload;

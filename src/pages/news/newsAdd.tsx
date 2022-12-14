import { Button, Modal, Form, Input } from 'antd';
import { newadd, newstypeList, listac } from '../../apis/news/news';
import { imgadd } from '../../apis/upload/upload';
import type { DatePickerProps, TimePickerProps } from 'antd';
import { DatePicker, Select, TimePicker, Radio } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios'
import StoresUpload from '../../components/image/storesUpload';
import '../../assets/css/repairs/repairs.css'
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { useNavigate } from 'react-router';
import Routers from '../../router';
import { useSearchParams } from "react-router-dom"
import moment from 'moment';
// From表单时间选择器
const { Option } = Select;
type PickerType = 'time';
const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: TimePickerProps['onChange'] | DatePickerProps['onChange'];
}) => {
  if (type === 'time') return <TimePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};

// 函数表达式
const NewsAdd = (porps: any) => {  
  const [params] = useSearchParams()
  const [froms] = Form.useForm();
  const route = useNavigate()
  const [img, setimg] = useState('');
  const [rado,setrado] =useState<string>('')
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  // JS 语法
  // 编辑器内容
  const [html, setHtml] = useState('');
  // 模拟 ajax 请求，异步设置 html
  const [imageUrl, seuImageUrl] = useState<any>('');
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    autoFocus: false,
    MENU_CONF: {
      uploadImage: {
        // 单个文件的最大体积限制，默认为 2M  
        maxFileSize: 4 * 1024 * 1024, // 4M
        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,
        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5 秒
        // 用户自定义上传图片
        customUpload(file: any, insertFn: any) {
          imgadd(file).then((res: any) => {
            insertFn(process.env.REACT_APP_BASE_IMAGE + res.data);
          })

        }
      }
    }
  };
  const lista = async () => {
    const res: any = await listac({ id: params.get("id") });
    setHtml(res.data.content)
    setimg(res.data.picture)
    console.log(res.data);
    setrado(res.data.state)
    froms.setFieldsValue(res.data)
  };
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();

      setEditor(null);
    };
  }, [editor]);
  useEffect(() => {
    lista()
  }, []);
  // 、、、、、、、、、、、、、、、、、、、、、、、、、、、、
  useEffect(() => {
    storeservicesList();
  }, [porps.def]);
  let arr = [];
  // 确定添加
  const [id, seuId] = useState<number>(0);
  // 取消
  const handleOn = () => {
    route('/news')
  }
  // 添加
  const handleOk = async () => {
    arr = froms.getFieldsValue();
    arr.addtime = moment().format('YYYY-MM-DD HH:mm:ss')
    arr.picture = imageUrl
    arr.content = html
    console.log(arr);
    const res: any = await newadd(arr);
    if (res.errCode === 10000) {
      route('/news')
    }
  };

  // 表单
  const [from, setfrom] = useState<any>([]);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // 表单连级选择器
  const onChange = (value: any) => {
    console.log(value);
  };
  // 表单时间选择器
  const [type, setType] = useState<PickerType>('time');
  // 搜索选择器
  const [handName, seuhandName] = useState<any>('');
  const handleChange = (value: any) => {
    seuhandName(value);
    setHtml(value)
    console.log(value);
  };
  let [optionps, setoptionps] = useState([]);
  // 子组件传值

  const getImageUrl: any = (imageUrl: any) => {
    console.log(imageUrl);
    
    seuImageUrl(imageUrl);
  };
  const [imgUrl, seuimgUrl] = useState<any>('');
  const geturlImage: any = (urlImage: any) => {
    seuimgUrl(urlImage);
  };
  // 搜索选择器
  const storeservicesList = async () => {
    const res = await newstypeList({});
    setoptionps(res.data.list);
  };
  // 时间
  const [aa, seuAa] = useState<any>();
  const picker = (val: any, aa: any) => {
    seuAa(aa);
    console.log(aa);
  };
  const [bb, seuBb] = useState<any>();
  const pickerps = (val: any, bb: any) => {
    seuBb(aa);
    console.log(bb);
  };
  return (
    <>
      <div className="Modal" style={{ display: 'flex', marginTop: '20px' }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={froms}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入内容!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="公告内容"
            name="content"
            rules={[{ required: true, message: '请输入内容!' }]}
          >
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
              <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
              />
              <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editor => console.log(setHtml(editor.getHtml()))
                }
                mode="default"
                style={{ height: '400px', overflowY: 'hidden' }}
              />
            </div>
          </Form.Item>
          <Form.Item
            label="公告图片"
            name="picture"
            rules={[{ required: true, message: '请选择图片!' }]}
          >
            <StoresUpload getImageUrl={getImageUrl} img={img}></StoresUpload>
          </Form.Item>
          <Form.Item name="state" label="状态" rules={[{ required: true, message: '请勾选当前状态' }]}>
            <Radio.Group>
              <Radio value="1"  >开启</Radio>
              <Radio value="0" >关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="类型"
            name="type"
            rules={[{ required: true, message: '请选择类型!' }]}
          >
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              options={optionps.map((item: any) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
          <Button type="primary" style={{ marginLeft: '500px' }} onClick={handleOk} danger>
            确定
          </Button>
          <Button style={{ marginLeft: '20px' }} onClick={handleOn} >
            取消
          </Button>
        </Form>
      </div>
    </>
  );
};
export default NewsAdd;

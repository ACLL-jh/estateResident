import { get, post } from '../../utils/requerst';

const imgadd=(file:any)=>{
  const FormData = require("form-data");
  let data = new FormData();
  data.append("file", file);
  return post('upload/add',data,{headers:{'Content-Type':"multipart/form-data"}})  
}

export {
  imgadd
};

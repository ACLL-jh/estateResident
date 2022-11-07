import { get, post } from '../../utils/requerst';
//投诉列表
const QuestionsList = (data: any) => {
  return get('/questions/list', data);
};
//type类型列表
const QuestiontypeList = (params: any) => {
  return get('/questiontype/list', params);
};
//state状态列表
const QuestionstateList = (params: any) => {
  return get('/questionstate/list', params);
};
//批量删除
const QuestionsDeleteall = (data: any) => {
  return post('/questions/deleteall', data);
};
//单条数据删除
const QuestionsDelete = (params: any) => {
  return get('/questions/delete', params);
};
export {
  QuestionsList,
  QuestiontypeList,
  QuestionstateList,
  QuestionsDeleteall,
  QuestionsDelete,
};

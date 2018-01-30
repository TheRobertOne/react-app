/**
 * 通知
 * 
 * 
 */
import { notification } from 'antd';

const message = {
  success: notice('success', '成功'),
  info: notice('info', '信息'),
  warning: notice('warning', '警告'),
  error: notice('error', '错误'),
}

function notice(type, msg) {
  let fn = notification[type];
  return (des) => {
    fn({
      description: des,
      placement:'bottomRight'
    });
  }
};

export default message;
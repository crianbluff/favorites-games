import { format } from 'timeago.js';

const helpersTimeAgo:any = {};

helpersTimeAgo.timeago = (timestamp:any) => {
  return format(timestamp);
};

export default helpersTimeAgo;
import React from 'react';
import moment from 'moment';
import { Comment, Avatar, Rate, Tooltip } from 'antd';

const avatar = require('../../service_default_avatar_182956.png');

const CustomerCmt = (props) => (
  <Comment
    author={<p>{props.author}</p>}
    avatar={<Avatar src={avatar} alt={props.author} />}
    content={
      <span>
        <Rate
          disabled
          defaultValue={props.rate}
          style={{ marginBottom: '10px' }}
        />
        {props.sentimentStar ? `- Sentiment: ${props.sentimentStar}` : ''}
        {' - '}
        <a target="_blank" rel="noopener noreferrer" href={props.url}>
          Xem chi tiết
        </a>
      </span>
    }
    datetime={
      <Tooltip title={moment(props.date).format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment(props.date).fromNow()}</span>
      </Tooltip>
    }
    children={<p>{props.content}</p>}
    style={{ marginBottom: '30px' }}
  />
);

export default CustomerCmt;

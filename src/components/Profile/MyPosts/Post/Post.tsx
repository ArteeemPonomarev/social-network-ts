import React from 'react';
import style from './Post.module.css';
import logo from '../../../../logos/download.jpg';

type MessageType = {
    message: string
    likecount: number
    id: number
}

const Post: React.FC<MessageType> = (props) => {
    return (
            <div className={style.item}>
                <img src={logo} alt="avatarka"/>
                <div>{props.message}</div>
                <div>
                    <span>like: {props.likecount}</span>
                </div>
            </div>     
    )
};

export default Post;
import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <div>
                My Posts
            </div>
            <div className={style.posts}>
                <Post message="Hi, how are you?" likecount={5}/>
                <Post message="It's my first post" likecount={10}/>
            </div>
        </div>
    )
};

export default MyPosts;
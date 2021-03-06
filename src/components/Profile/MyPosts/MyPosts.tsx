import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import {PostsContentType} from '../../../redux/state';

type MyPostsPropsType = {
    posts: Array<PostsContentType>
}

const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likecount={p.likesCount} id={p.id}/>)

    return (
            <div className={style.postsBlock}>
                My Posts
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
                <div className={style.posts}>
                   {postsElements}
                </div>
            </div>
    )
};

export default MyPosts;
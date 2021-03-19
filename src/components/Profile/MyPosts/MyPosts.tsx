import React, {ChangeEvent} from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import {ActionsTypes} from '../../../redux/redux-store';
import {addPostAC, onPostCahngeAC, PostsContentType} from '../../../redux/profile-reducer';

type MyPostsPropsType = {
    posts: Array<PostsContentType>
    newPostValue: string
    addPostContainer: () => void
    onPostChangeContainer: (text: string) => void
};


const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likecount={p.likesCount} id={p.id}/>);

    const addPost = () => {
        props.addPostContainer();
    };

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onPostChangeContainer(e.currentTarget.value);
    };
    return (
        <div className={style.postsBlock}>
            My Posts
            <div>
                <textarea onChange={onPostChange} value={props.newPostValue}></textarea>
            </div>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;
import React, {ChangeEvent} from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import {ActionsTypes, PostsContentType} from '../../../redux/state';

type MyPostsPropsType = {
    posts: Array<PostsContentType>
    // addPost: () => void
    newPostValue: string
    // onChangePostValue: (newText: string) => void
    dispatch: (action: ActionsTypes) => void
}

const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likecount={p.likesCount} id={p.id}/>);

    const addPost = () => {
        props.dispatch({type: 'ADD-POST'});
    };


    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newValue: e.currentTarget.value});
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
import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import {PostsContentType} from '../../../redux/state';

type MyPostsPropsType = {
    posts: Array<PostsContentType>
    addPost: (postText: string) => void
    newPostValue: string
    onChangePostValue: (newText: string) => void
}

const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likecount={p.likesCount} id={p.id}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
        let text = newPostElement.current?.value;
        if (text) {
            props.addPost(text);
        }
    }

    const onPostChange = (e: any) => {
        props.onChangePostValue(e.currentTarget.value)
    }
    return (
        <div className={style.postsBlock}>
            My Posts
            <div>
                <textarea onChange={onPostChange} value={props.newPostValue} ref={newPostElement}></textarea>
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
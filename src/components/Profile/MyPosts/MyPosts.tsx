import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import {MyPostsPropsType} from './MyPostsContainer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLength, required} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';

type AddPostFormDataType = {
    newPostText: string
}

const maxLength10 = maxLength(10);

const AddPostForm: React.FC<InjectedFormProps<AddPostFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name={"newPostText"}
                    validate={[required, maxLength10]}
                    placeholder={"Type your post..."}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm<AddPostFormDataType>({
    form: 'addPostForm'
})(AddPostForm)

const MyPosts = (props: MyPostsPropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likecount={p.likesCount} id={p.id} key={p.id}/>);

    const addPost = (values: AddPostFormDataType) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={style.postsBlock}>
            My Posts
            <AddPostFormRedux onSubmit={addPost}/>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;
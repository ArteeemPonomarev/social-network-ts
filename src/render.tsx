import {addDialogMessage, addPost, onChangePostValue, onNewDialogMessageChange, RootStateType} from './redux/state';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

export let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state}
                 addPost={addPost}
                 addDialogMessage={addDialogMessage}
                 onNewDialogMessageChange={onNewDialogMessageChange}
                 onChangePostValue={onChangePostValue}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
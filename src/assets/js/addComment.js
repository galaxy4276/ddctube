import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');
const deleteBtn = document.getElementById('jsCommentDelBtn');

const deleteComment = (comment) => {
    const span = document.querySelector('span');
    const li = document.querySelector('li');
    li.removeChild(span);
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};


const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};


const addComment = (comment) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);
    increaseNumber();
}


const sendComment = async (comment) => {    
    const videoId = window.location.href.split('/videos/')[1];
    console.log(videoId);
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: 'POST',
        data: {
            comment,
        },
    });
    if (response.status === 200) {
        addComment(comment);
    }
};


const handleSubmit = (e) => {
    e.preventDefault();
    const commentInput = addCommentForm.querySelector('input');
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = '';
};


const init = () => {
    addCommentForm.addEventListener('submit', handleSubmit);
    deleteBtn.addEventListener('click', deleteComment);
};


if (addCommentForm) {
    init();
}
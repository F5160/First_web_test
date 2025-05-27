// 用户清单
let account_img = [
  {name: '默认用户', url: 'File/img/theme_contents/commentSection/profilePicture/default.webp'}, 
  {name: '草履虫', url: 'File/img/theme_contents/commentSection/profilePicture/paramecium.jpg'}, 
  {name: 'bananaMace', url: 'File/img/theme_contents/commentSection/profilePicture/shenZhouPad.jpg'}
];


const account_img_Element = document.querySelector('.account_img');
const account_list_Element = document.querySelector('.account_list');
const comment_input_Element = document.querySelector('.comment-input');
const char_count_Element = document.querySelector('.char-count');
const button_Element = document.querySelector('.submit-btn');

// 原回复按钮相关
const reply_button_Element = document.querySelector('.reply-btn');
const reply_submit_button_Element = document.querySelector('.submit-btn_reply');
const replies_list_input_Element = document.querySelector('.replies_list_input');

const limit_count_warning_Element = document.querySelector('.limit_count_warning');
const null_warning_Element = document.querySelector('.null_warning');
const comments_list_Element = document.querySelector('.comments-list');
const comments_account_img_Element = document.querySelector('.comments_account_img');
const comments_account_Element =document.querySelector('.comments_account');
const comments_comment_Element =document.querySelector('.comments_comment');
const comments_commentTime_Element = document.querySelector('.comments_commentTime');

// 切换用户时同步切换头像
account_list_Element.addEventListener('change', () => {
  const select_value = account_list_Element.value;
  const select_account = account_img.find((account) => account.name === select_value);
  if(select_account) {
    account_img_Element.src = select_account.url;
    console.log(select_account);
    console.log('↑ from select_account');
  }
});

// 字符数量相关
const input_max_length = 200;
char_count_Element.textContent = `${comment_input_Element.value.length}/${input_max_length}字`;

// 文本域输入监听
comment_input_Element.addEventListener('input', () => {
  char_count_Element.textContent = `${comment_input_Element.value.length}/${input_max_length}字`;
  is_limit();
});

// 搭建未完成提示
comment_input_Element.addEventListener('click', () => {
  alert(`请注意: 评论系统尚在搭建中, 您在此处的评论不会保存, 也不会上传至任何位置`);
});

// 字数是否超过上限
function is_limit() {
  if(comment_input_Element.value.length>input_max_length) {
    limit_count_warning_Element.style.display = 'block';
    char_count_Element.style.color = '#ff1212';
  }else {
    limit_count_warning_Element.style.display = 'none';
    char_count_Element.style.color = '#aaa';
  }
};
is_limit();

// 存储评论的数组
let comments = [];
// 发布评论方法
function sub_comment() {
  const newComment = {
      account: account_list_Element.value,
      comment: comment_input_Element.value,
      time: getCurrentTime()
    };
    comments.push(newComment);
    // 最新发布时间的评论排最前
    // 这里是对comments内部进行排序, *相当于编辑 (25/01/16 20:53 来自自己)
    comments.sort((a, b) => new Date(b.time) - new Date(a.time));
    updateCommentsList();

    comment_input_Element.value = '';
    char_count_Element.textContent = `${comment_input_Element.value.length}/${input_max_length}字`;
};
  
// 发布按钮点击监听
button_Element.addEventListener('click', () => {
  if(comment_input_Element.value.trim() === ''){
    null_warning();
  }else {
    sub_comment();
  }
});
  
// 文本域添加键盘监听
comment_input_Element.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault(); // 阻止默认行为(换行)
    if(comment_input_Element.value.trim() === ''){
      null_warning();
    }else {
      sub_comment();
    }
  }
});

// 更新评论列表的显示
// 这里是在comments内部进行排序之后再将评论区的显示进行排序, *相当于渲染 (25/01/16 20:57 来自自己)
function updateCommentsList() {
  // 清空现有评论列表
  comments_list_Element.innerHTML = '';
  // 排序后的数组重新生成评论列表
  comments.forEach((comment) => {
    // 评论(评论列表中的一条评论整体)
    const commentItem = document.createElement('div');
    commentItem.className = 'comments-list_in';

    // 头像(左半部分)
    const accountImg = document.createElement('img');
    accountImg.className = 'comments_account_img';
    const selectedAccount = account_img.find((account) => account.name === comment.account);
    if (selectedAccount) {
      accountImg.src = selectedAccount.url;
      console.log(selectedAccount);
      console.log('↑ from update_list');
    }

    // 文字(右半部分)
    const commentText = document.createElement('div');
    commentText.className = 'comments_text';

    // 用户昵称
    const accountName = document.createElement('div');
    accountName.className = 'comments_account';
    accountName.textContent = comment.account;
    // 用户评论内容
    const commentContent = document.createElement('div');
    commentContent.className = 'comments_comment';
    commentContent.textContent = comment.comment;
    // 其他信息
    const commentOther = document.createElement('div');
    commentOther.className = 'comments_other';
    // 用户评论时间
    const commentTime = document.createElement('div');
    commentTime.className = 'comments_commentTime';
    commentTime.textContent = comment.time;
    // 回复按钮
    const replyBtn = document.createElement('button');
    replyBtn.className = 'reply-btn';
    replyBtn.textContent = '回复';
    // 回复列表
    const repliesListInput = document.createElement('div');
    repliesListInput.className = 'replies_list_input';
    repliesListInput.style.display = 'none';
    
    // 添加回复输入框, 回复按钮和回复列表
    const replyInput = document.createElement('textarea');
    replyInput.className = 'comment-input_reply';
    replyInput.placeholder = '回复...';

    const replySubmitBtn = document.createElement('button');
    replySubmitBtn.className = 'submit-btn_reply';
    replySubmitBtn.textContent = '发布';

    const replyListIn = document.createElement('div');
    replyListIn.className = 'reply_list_in';

    repliesListInput.appendChild(replyInput);
    repliesListInput.appendChild(replySubmitBtn);

    commentOther.appendChild(commentTime);
    commentOther.appendChild(replyBtn);

    commentText.appendChild(accountName);
    commentText.appendChild(commentContent);
    commentText.appendChild(commentOther);
    commentText.appendChild(repliesListInput);
    commentText.appendChild(replyListIn);

    commentItem.appendChild(accountImg);
    commentItem.appendChild(commentText);

    comments_list_Element.appendChild(commentItem);

    // 添加回复按钮点击事件
    // 原按钮_未完 (25/05/26 23:48 来自自己)
    reply_button_Element.addEventListener('click', () => {
      console.log(1);
      if (replies_list_input_Element.style.display === 'none' || replies_list_input_Element.style.display === '') {
        replies_list_input_Element.style.display = 'flex';
      } else {
        replies_list_input_Element.style.display = 'none';
      }
    });
    // 生成的按钮
    replyBtn.addEventListener('click', () => {
      if (repliesListInput.style.display === 'none' || repliesListInput.style.display === '') {
        repliesListInput.style.display = 'flex';
      } else {
        repliesListInput.style.display = 'none';
      }
    });

    // 监听回复提交按钮点击事件
    // 原按钮_未完 (25/05/26 23:48 来自自己)
    reply_submit_button_Element.addEventListener('click', () => {
      console.log(1);
      if (replyInput.value.trim() === '') {
        null_warning();
      } else {
        addReply(commentItem, replyInput.value);
        replyInput.value = '';
      }
    });
    // 生成的按钮
    replySubmitBtn.addEventListener('click', () => {
      if (replyInput.value.trim() === '') {
        null_warning();
      } else {
        addReply(commentItem, replyInput.value);
        replyInput.value = '';
      }
    });
  });

  comments_list_Element.style.display = 'block';
}

// 添加回复功能
function addReply(commentItem, replyText) {
  const replyItem = document.createElement('div');
  replyItem.className = 'reply-item';

  const replyAccountImg = document.createElement('img');
  replyAccountImg.className = 'comments_account_img_reply';
  replyAccountImg.src = account_img_Element.src;

  const replyTextDiv = document.createElement('div');
  replyTextDiv.className = 'comments_text_reply';

  const replyAccountName = document.createElement('div');
  replyAccountName.className = 'comments_account_reply';
  replyAccountName.textContent = account_list_Element.value;

  const replyContent = document.createElement('div');
  replyContent.className = 'comments_comment_reply';
  replyContent.textContent = replyText;

  const replyOther = document.createElement('div');
  replyOther.className = 'comments_other_reply';

  const replyTime = document.createElement('div');
  replyTime.className = 'comments_commentTime_reply';
  replyTime.textContent = getCurrentTime();

  const replyListInIn = document.createElement('div');
  replyListInIn.className = 'reply_list_in_in';

  replyTextDiv.appendChild(replyAccountName);
  replyTextDiv.appendChild(replyContent);
  replyTextDiv.appendChild(replyOther);

  replyOther.appendChild(replyTime)

  replyListInIn.appendChild(replyAccountImg);
  replyListInIn.appendChild(replyTextDiv);

  replyItem.appendChild(replyListInIn);

  commentItem.querySelector('.reply_list_in').appendChild(replyItem);
}

// 未输入提示 0.5秒
function null_warning() {
  null_warning_Element.style.display = 'block';
  setTimeout(() => {
    null_warning_Element.style.display = 'none';
  }, 500);
};

// 获取当前精准到秒的时间 (不知道JS有没有内置的函数 25/01/16 01:32 来自自己)
// (Date()就是, 不过返回的是内置的时间格式, 还需要自己取出后重新排列 25/01/16 19:11 来自自己)
function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
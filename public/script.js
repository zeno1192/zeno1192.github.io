// 投稿を取得して表示する関数
async function fetchPosts() {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'posts';
        postDiv.innerHTML = `<div>${post.content}</div><div class="timestamp">${new Date(post.createdAt).toLocaleString()}</div>`;
        postsContainer.appendChild(postDiv);
    });
}

// 投稿をサーバーに送信する関数
async function submitPost() {
    const content = document.getElementById('postContent').value;
    if (!content.trim()) {
        alert("投稿内容を入力してください");
        return;
    }
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });
    if (response.ok) {
        document.getElementById('postContent').value = '';  // フォームをリセット
        fetchPosts();  // 新しい投稿を取得して表示
    }
}

// ページロード時に投稿を取得して表示
window.onload = fetchPosts;
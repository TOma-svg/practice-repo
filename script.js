const textarea = document.getElementById('memo');
const countAll = document.getElementById('count-all');
const countNoSpace = document.getElementById('count-no-space');
const countLines = document.getElementById('count-lines');
const toast = document.getElementById('toast');
let toastTimeout;

// 保存されたテキストを読み込む
textarea.value = localStorage.getItem('quickMemoApp_text') || '';
updateStats();

// 入力時のイベント（自動保存とカウント更新）
textarea.addEventListener('input', () => {
    localStorage.setItem('quickMemoApp_text', textarea.value);
    updateStats();
});

// 統計情報の更新処理
function updateStats() {
    const text = textarea.value;
    // 全体の文字数（改行は除く）
    countAll.textContent = text.replace(/\n/g, '').length;
    // 空白（全角半角）と改行を除いた文字数
    countNoSpace.textContent = text.replace(/[\s\n ]/g, '').length;
    // 行数（テキストが空の場合は0）
    countLines.textContent = text === '' ? 0 : text.split('\n').length;
}

// クリア処理
function clearText() {
    if (textarea.value !== '' && confirm('テキストをすべて消去しますか？')) {
        textarea.value = '';
        localStorage.removeItem('quickMemoApp_text');
        updateStats();
        textarea.focus();
    }
}

// コピー処理
function copyText() {
    if (textarea.value === '') return;
    
    navigator.clipboard.writeText(textarea.value).then(() => {
        // トースト通知の表示
        toast.style.display = 'block';
        toast.style.animation = 'none';
        toast.offsetHeight; // リフローを強制してアニメーションをリセット
        toast.style.animation = 'fadeInOut 2s ease-in-out forwards';
        
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    }).catch(err => {
        alert('コピーに失敗しました。');
    });
}
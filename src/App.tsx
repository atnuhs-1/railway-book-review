import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!email.includes('@')) {
      setEmailError('有効なメールアドレスを入力してください。');
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError('パスワードは8文字以上である必要があります。');
      isValid = false;
    }

    if (isValid) {
      console.log('フォームが送信されました');
      // ここで実際のログイン処理を行う
    }
  };

  return (
    <form onSubmit={validateForm} noValidate>
      <h2>ログイン</h2>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <span className="error">{emailError}</span>}
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <span className="error">{passwordError}</span>}
      </div>
      <button type="submit">ログイン</button>
    </form>
  );
}

export default App;
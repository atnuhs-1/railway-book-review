import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../src/App'

describe('Login Form', () => {
  it('renders login form with all elements', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /ログイン/i })).toBeInTheDocument()

    const emailInput = screen.getByLabelText(/メールアドレス/i)
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')

    const passwordInput = screen.getByLabelText(/パスワード/i)
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')

    expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument()
  })

  // it('displays error messages for invalid inputs', async () => {
  //   render(<App />)

  //   const emailInput = screen.getByLabelText(/メールアドレス/i)
  //   const passwordInput = screen.getByLabelText(/パスワード/i)
  //   const submitButton = screen.getByRole('button', { name: /ログイン/i })

  //   fireEvent.change(emailInput, { target: { value: 'invalidemail' } })
  //   fireEvent.change(passwordInput, { target: { value: 'short' } })
  //   fireEvent.click(submitButton)

  //   expect(await screen.findByText('有効なメールアドレスを入力してください。')).toBeInTheDocument()
  //   expect(await screen.findByText('パスワードは8文字以上である必要があります。')).toBeInTheDocument()
  // })

  // it('does not display error messages for valid inputs', async () => {
  //   render(<App />)

  //   const emailInput = screen.getByLabelText(/メールアドレス/i)
  //   const passwordInput = screen.getByLabelText(/パスワード/i)
  //   const submitButton = screen.getByRole('button', { name: /ログイン/i })

  //   fireEvent.change(emailInput, { target: { value: 'valid@email.com' } })
  //   fireEvent.change(passwordInput, { target: { value: 'validpassword' } })
  //   fireEvent.click(submitButton)

  //   expect(screen.queryByText('有効なメールアドレスを入力してください。')).not.toBeInTheDocument()
  //   expect(screen.queryByText('パスワードは8文字以上である必要があります。')).not.toBeInTheDocument()
  // })
})
---
name: fe-testing-qa
description: >-
  Use this skill when writing unit tests with Vitest/Jest and React Testing Library, configuring mocks with MSW, or creating E2E test suites with Playwright.
---

# Frontend Testing & Quality Assurance Standards

Follow these testing methodologies to ensure high reliability and regression-free UI code:

## 1. Unit & Component Testing (React Testing Library + Vitest)
- **Test User Behavior, Not Implementation Details**:
  - Favor queries that mimic user interaction: `screen.getByRole()`, `screen.getByLabelText()`, `screen.getByText()`.
  - Avoid `data-testid` unless testing dynamic SVG elements or complex canvas nodes.
- **User Event Library**:
  - Always use `@testing-library/user-event` over `fireEvent` for realistic event triggering (typing, focus, clicking):
    ```typescript
    import { render, screen } from '@testing-library/react';
    import userEvent from '@testing-library/user-event';
    import { LoginForm } from './LoginForm';

    test('submits valid login credentials', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      render(<LoginForm onSubmit={onSubmit} />);

      await user.type(screen.getByLabelText(/email/i), 'user@example.com');
      await user.type(screen.getByLabelText(/password/i), 'password123');
      await user.click(screen.getByRole('button', { name: /đăng nhập/i }));

      expect(onSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123',
      });
    });
    ```
- **Async Assertions**: Always use `findBy*` queries or `waitFor()` when asserting asynchronous state updates.

## 2. API & Network Mocking
- Mock network requests at the network layer using MSW (Mock Service Worker) instead of mocking React hooks or `fetch`/`axios` modules directly.
- Ensure test isolation by resetting handlers in `afterEach(() => server.resetHandlers())`.

## 3. End-to-End Testing (Playwright)
- Write resilient selectors in Playwright using accessibility locators: `page.getByRole()`, `page.getByLabel()`.
- Group critical user journeys (Auth flow, Checkout flow, CRUD operations).
- Ensure all tests run with clean database state / isolated sessions.

import { render, screen } from '@testing-library/react';
import App from './App';

// Smoke test: the app mounts and renders the nav brand wordmark. (Replaces the
// stale Create React App boilerplate test, which asserted a "learn react" link
// this site never had.)
test('renders the Product Lab brand wordmark', () => {
  render(<App />);
  // The nav brand wordmark subtitle is unique to the header.
  const brand = screen.getByText(/at Harvard College/i);
  expect(brand).toBeInTheDocument();
});

# Contributing to TextileLab Pro

We love your input! We want to make contributing to TextileLab Pro as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid using `any` type
- Use proper error handling with try/catch

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

async function getUser(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('User not found');
    return response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Bad
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Implement error boundaries where necessary

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn btn-primary"
    >
      {label}
    </button>
  );
}

// Bad
export function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### CSS/Tailwind

- Use Tailwind's utility classes
- Create custom components for repeated patterns
- Follow mobile-first approach
- Use CSS variables for theming

```typescript
// Good
<div className="flex flex-col md:flex-row items-center gap-4">
  <div className="w-full md:w-1/2 p-4 bg-card rounded-lg shadow-sm">
    {/* Content */}
  </div>
</div>

// Bad
<div style={{ display: 'flex', gap: '16px' }}>
  <div style={{ width: '50%', padding: '16px' }}>
    {/* Content */}
  </div>
</div>
```

## Testing Guidelines

- Write unit tests for utility functions
- Write integration tests for complex components
- Use React Testing Library for component tests
- Aim for good test coverage

```typescript
// Good
describe('Button', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Documentation

- Document all public APIs
- Write clear component documentation
- Include examples in documentation
- Keep README up to date

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Pull Request Process

1. Update the README.md with details of changes to the interface
2. Update the CHANGELOG.md with details of changes
3. The PR may be merged once you have the sign-off of two other developers

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issue tracker](https://github.com/yourusername/textile-lab-pro/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/textile-lab-pro/issues/new).

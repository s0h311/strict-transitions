# Strict Transitions

## Idea

This project enforces strict state transitions in state managers by validating actions against predefined transition
rules. It ensures that only allowed actions can be dispatched based on the current state, preventing illegal state
transitions.

## Decisions

- Strict Transitions approach inspired by state machines, where each state has a set of allowed transitions to other
  states.
- The project provides multiple implementations for different state managers to show that the Strict Transitions
  approach could be used with different configurations and libraries.
- Using Objects for defining the transition map to ensure readability, maintainability and testability.
- Built as plugins in order to be easily integrated with different state managers.
- The project is built with TypeScript to provide type safety and better developer experience.

## Development

### Pre-requisites

- Node >=20
- pnpm >= 9.12

### Installation

```bash
pnpm install
```

### Running Tests

```bash
pnpm test
```
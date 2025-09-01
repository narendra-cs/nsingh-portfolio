# Makefile for portfolio project

# Lint and fix linting issues
lint:
	npm run lint

lint-fix:
	npm run lint -- --fix

# Format code and check types
format:
	npm run format

type-check:
	npm run type-check

format-check: format type-check

# Run tests
test:
	npm test

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage

# Development server
dev:
	npm run dev

# Clean build artifacts
clean:
	npm run clean

# Clean everything including node_modules
clean-all:
	npm run clean:all

# Install dependencies
install:
	npm install

# Rebuild from scratch
rebuild: clean install build

# Build for production
build: clean
	npm run build

# Default target
.DEFAULT_GOAL := help

# Help command
help:
	@echo "Available commands:"
	@echo "  make lint         - Run linter"
	@echo "  make lint-fix     - Fix linting issues"
	@echo "  make format       - Format code"
	@echo "  make type-check   - Run TypeScript type checking"
	@echo "  make format-check - Format code and check types"
	@echo "  make test         - Run tests"
	@echo "  make test-watch   - Run tests in watch mode"
	@echo "  make test-coverage- Run tests with coverage"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make help         - Show this help message"
# API Documentation

This directory contains **simulated API documentation** for educational purposes.

## ⚠️ Important Notice

**These APIs do not actually exist.** This application is 100% client-side with no backend server. The API documentation is provided to demonstrate:

- How to document REST APIs using OpenAPI/Swagger
- Proper API design patterns
- Request/response schemas
- Authentication flows
- Error handling conventions

## 📖 Viewing the Documentation

### Option 1: Swagger UI (Recommended)

Use the online Swagger Editor to view the interactive documentation:

1. Open https://editor.swagger.io/
2. Go to **File → Import File**
3. Upload `openapi.yaml` from this directory
4. Explore endpoints, schemas, and try example requests

### Option 2: Redoc

For a cleaner read-only view:

1. Install Redoc CLI: `pnpm add -D @redocly/cli`
2. Run: `pnpm dlx @redocly/cli preview-docs docs/api/openapi.yaml`
3. Open http://localhost:8080

### Option 3: VS Code Extension

Install the **OpenAPI (Swagger) Editor** extension:

1. Install extension: `42Crunch.vscode-openapi`
2. Open `openapi.yaml` in VS Code
3. Right-click → **OpenAPI: Preview**

## 📋 API Overview

The documented endpoints cover:

### Products
- `GET /products` - List all products
- `GET /products/{productId}` - Get single product

### Shopping Cart
- `GET /cart` - Get current cart
- `POST /cart/items` - Add item to cart
- `DELETE /cart/items/{productId}` - Remove item from cart

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

## 🔑 Authentication

All cart operations require JWT authentication:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📚 OpenAPI Specification

This documentation follows **OpenAPI 3.0.3** specification:

- **Tags**: Organize endpoints by feature
- **Components**: Reusable schemas for request/response bodies
- **Security Schemes**: JWT Bearer authentication
- **Examples**: Real-world request/response samples
- **Descriptions**: Detailed endpoint and parameter documentation

## 🎯 Educational Value

This documentation teaches:

1. **API Design**: RESTful patterns, resource naming
2. **Documentation as Code**: YAML-based, version-controlled
3. **Schema Definition**: Strong typing with JSON Schema
4. **Security**: Authentication requirements clearly marked
5. **Error Handling**: Consistent error response format

## 🔗 Related Documentation

- Component docs: Run `pnpm run storybook`
- Code docs: See JSDoc comments in source files
- Project README: `/README.md`

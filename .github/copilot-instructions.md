# GitHub Copilot Instructions

## Code Style Guidelines

### Language Rules

- **ALWAYS write comments in English**
- **ALWAYS name variables, functions, and classes in English**
- **ALWAYS use English for error messages and logging**

### Examples

✅ **Correct:**
```typescript
// Fetch user data from the database
const userId = "user_123";
const userData = await fetchUser(userId);
```

❌ **Incorrect:**
```typescript
// Obtener datos del usuario de la base de datos
const idUsuario = "user_123";
const datosUsuario = await obtenerUsuario(idUsuario);
```

### Rationale

- Maintains consistency across the codebase
- Improves collaboration with international developers
- Makes code more maintainable and searchable
- Aligns with industry standards and best practices

# Code Smells Analysis

## Metodología
- Fecha: 2026-07-24
- Scope: src/features/
- Criterios: Martin Fowler (Refactoring book) + React antipatterns
- Herramientas: Inspección manual + ESLint/SonarJS

## 🚨 Code Smells Identificados

### 1. Magic Numbers - Severidad: 🔴 ALTA
**Ubicación:** `src/features/product-catalog/components/ProductCard.tsx:16-17` y `src/features/shopping-cart/components/CartSummary.tsx:10-11`

**Código:**
```typescript
// ProductCard.tsx
if (qty >= 5) {
  return product.price * qty * 0.1
}

// CartSummary.tsx
if (subtotal >= 100) {
  discount = subtotal * 0.15
}
```

**Problema:** Uso de valores numéricos hardcodeados (`5`, `0.1`, `100`, `0.15`) sin identificadores constantes o explicativos que aclaren su significado en el dominio de negocio.
**Impacto:** Dificulta la mantenibilidad y la auditabilidad. Si la política de descuentos cambia (ej. de 15% a 20% o el umbral de $100 a $150), los desarrolladores deben buscar y modificar números literales en múltiples componentes sin garantía de consistencia.
**Refactor sugerido:** Extraer los números a constantes de dominio nombradas en un archivo centralizado (ej. `@shared/constants/businessRules.ts`):
```typescript
export const BULK_DISCOUNT_MIN_QTY = 5;
export const BULK_DISCOUNT_RATE = 0.10;
export const SUMMARY_DISCOUNT_THRESHOLD = 100;
export const SUMMARY_DISCOUNT_RATE = 0.15;
```

---

### 2. Primitive Obsession & Formateo Duplicado - Severidad: 🟡 MEDIA
**Ubicación:** `src/features/product-catalog/components/ProductCard.tsx:11` y `src/features/shopping-cart/components/CartItem.tsx:18`

**Código:**
```typescript
// ProductCard.tsx
const formattedPrice = `$${product.price.toFixed(2)}`

// CartItem.tsx
const itemPrice = `$${item.price.toFixed(2)}`
```

**Problema:** Formateo manual repetido de precios utilizando cadenas de plantillas primitivas en lugar de reutilizar la función de utilidad formateadora centralizada (`formatPrice`).
**Impacto:** Duplicación de lógica de presentación. Si se requiere cambiar el símbolo monetario o la configuración regional (i18n), habrá que actualizar cada string hardcodeado en los componentes. Además, en `ProductCard.tsx` convive un import sin usar de `formatPrice`.
**Refactor sugerido:** Eliminar las construcciones manuales de string y usar de forma consistente la utilidad centralizada:
```typescript
<span>{formatPrice(product.price)}</span>
```

---

### 3. Dead Code (Código Muerto) - Severidad: 🔴 ALTA
**Ubicación:** `src/features/product-catalog/components/ProductCard.tsx:15` y `src/features/shopping-cart/components/CartItem.tsx:11`

**Código:**
```typescript
// ProductCard.tsx:15
const calculateBulkDiscount = (qty: number) => { ... }

// CartItem.tsx:11
const validateQuantity = (qty: number) => { ... }
```

**Problema:** Declaración de funciones locales que nunca son invocadas ni expuestas en el retorno del componente o en eventos del JSX.
**Impacto:** Confusión cognitiva para futuros desarrolladores (aumenta el ruido visual), acumulación de deuda técnica y degradación en el análisis estático.
**Refactor sugerido:** Eliminar las funciones no utilizadas o, si representan lógica de negocio reutilizable, extraerlas a utilidades compartidas probadas unitariamente.

---

### 4. Duplicate Code (Lógica de Validación Duplicada) - Severidad: 🟡 MEDIA
**Ubicación:** `src/features/shopping-cart/components/CartItem.tsx:11-15`

**Código:**
```typescript
const validateQuantity = (qty: number) => {
  if (qty < 1) return 'Quantity must be at least 1'
  if (qty > 99) return 'Quantity cannot exceed 99'
  return ''
}
```

**Problema:** Lógica de validación de rangos de cantidad hardcodeada localmente en componentes individuales.
**Impacto:** Riesgo de inconsistencia si otros componentes de la aplicación aplican reglas diferentes.
**Refactor sugerido:** Mover las reglas de validación de cantidad a un módulo compartido `@shared/utils/validation.ts` usando constantes de límites.

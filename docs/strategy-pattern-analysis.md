# Strategy Pattern Analysis

## Metodología
- Fecha: 2026-07-24
- Scope: `src/shared/strategies/`
- Patrón de Diseño: Strategy Pattern + Factory Method
- Herramientas: Inspección de código + Vitest (`DiscountStrategy.test.ts`)

---

## 🧪 Resultado de Pruebas Automatizadas
Se ejecutó la suite de pruebas unitarias correspondiente al módulo de estrategias (`pnpm test DiscountStrategy`):

```text
 RUN  v3.2.4 P:/Documents/dev/master_desarrollo_ia/6.2 Testing/ai-course-entrega-alumnos/shopping-cart

 ✓ src/shared/strategies/DiscountStrategy.test.ts (10 tests) 7ms

 Test Files  1 passed (1)
      Tests  10 passed (10)
```

---

## 🔍 Análisis Técnico del Patrón

### 1. Interfaz de la Estrategia (`DiscountStrategy`)
Ubicación: `src/shared/strategies/DiscountStrategy.ts`

Define el contrato formal que debe implementar cualquier algoritmo de cálculo de descuento dentro del sistema:

```typescript
export interface DiscountStrategy {
  calculate(subtotal: number): number
  getDescription(): string
}
```

* **`calculate(subtotal: number): number`**: Realiza el cálculo del descuento a restar sobre el subtotal proporcionado.
* **`getDescription(): string`**: Devuelve una representación textual clara del descuento aplicado para la UI o logs.

---

### 2. Implementaciones Concretas de Estrategia

* **`NoDiscountStrategy`**:
  * Implementación del patrón Null Object.
  * Devuelve siempre `0` en `calculate()` y la descripción `"No discount applied"`.
  * Evita la necesidad de verificar `null` o `undefined` en el cliente.

* **`OrderDiscountStrategy`**:
  * Recibe en su constructor los parámetros `threshold` (umbral) y `percentage` (porcentaje).
  * Evalúa si el subtotal supera el umbral antes de aplicar el porcentaje de descuento.
  * Formatea dinámicamente la descripción detallando el porcentaje y el mínimo de compra.

---

### 3. El Contexto (`DiscountCalculator`)
Ubicación: `src/shared/strategies/DiscountCalculator.ts`

Actúa como el cliente/contexto que utiliza la interfaz `DiscountStrategy`:

* **Delegación:** No contiene lógica condicional interna (`switch` o `if/else`) para calcular el descuento; delega directamente en `this.strategy.calculate(subtotal)`.
* **Intercambiabilidad:** Permite cambiar la estrategia en tiempo de ejecución mediante `setStrategy(strategy)`.
* **Factory Method Integrado:** Proporciona el método estático `DiscountCalculator.getStrategyForOrder(subtotal)` para seleccionar automáticamente la estrategia adecuada según el subtotal de la compra.

---

### 4. Cumplimiento del Principio Open/Closed (OCP)

1. **Abierto para Extensión:** Si el negocio requiere una nueva estrategia (ej. `SeasonalDiscountStrategy` o `VIPMemberStrategy`), simplemente se crea una nueva clase que implemente `DiscountStrategy`.
2. **Cerrado para Modificación:** No es necesario modificar ninguna clase existente ni alterar las pruebas previas, eliminando el riesgo de introducir regresiones.

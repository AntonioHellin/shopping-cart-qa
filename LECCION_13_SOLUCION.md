# 📊 Lección 13: Estrategia de Testing vs. Observabilidad - Solución de Ejercicios

Este documento contiene las soluciones detalladas para los dos ejercicios de estrategia de arquitectura y toma de decisiones basadas en ROI.

---

## 🏛️ Ejercicio 1: Framework de las 4 Preguntas (`applyPromoCode`)

### Contexto de la Función
* **Nombre:** `applyPromoCode(code: string, cartTotal: number): number`
* **Propósito:** Aplica códigos promocionales (% descuento) en el flujo de checkout.
* **Dominio:** E-commerce / Procesamiento de Pagos y Carrito.

### 📋 Análisis Framework 4 Preguntas

| # | Pregunta | Respuesta | Razón / Justificación |
|---|---|---|---|
| 1 | **¿Conoces el comportamiento esperado?** | **SÍ** | La lógica de cupones de descuento sigue reglas matemáticas y de negocio bien definidas (validar código, aplicar % sobre `cartTotal` o descuento fijo). |
| 2 | **¿El costo de fallar es alto?** | **SÍ** | Afecta directamente el dinero y el revenue del checkout. Un fallo puede otorgar 100% de descuento no autorizado o impedir cobros válidos. |
| 3 | **¿El requisito es estable?** | **SÍ** | Aunque los cupones cambien dinámicamente, la lógica central de cálculo del algoritmo es madura y estable en el tiempo. |
| 4 | **¿Es simulable en tests?** | **SÍ** | Es una función pura determinista con entradas numéricas/string conocidas y retorno determinista sin efectos secundarios impredecibles. |

### 🎯 Decisión de Arquitectura
* **Conteo de SÍ:** **[4/4]**
* **Estrategia:** **TESTEAR** (Tier CORE / 100% Cobertura)
* **Justificación:** Al obtener 4/4 "SÍ", la función califica como código de riesgo financiero crítico (**CORE Tier**). El costo de fallo es alto y el comportamiento es 100% determinista. Por lo tanto, la estrategia principal debe ser testing unitario exhaustivo previo a producción.

### 🧪 Especificación de Tests Requeridos
1. **Tests Unitarios Principales:**
   * Aplicación correcta de porcentaje (ej: 10% sobre $100 -> $10 descuento).
   * Retorno de 0 ante código inexistente o inválido.
2. **Edge Cases:**
   * Importes cero o negativos (`cartTotal <= 0`).
   * Normalización de minúsculas/mayúsculas en el cupón (`'SAVE10'` vs `'save10'`).
   * Cupones con espacios en blanco o strings vacíos.

---

## 📊 Ejercicio 2: Cálculo de ROI para Features Experimentales ("Quick Reorder")

### Escenario
* **Feature:** Funcionalidad experimental *"Quick Reorder"* (reordenar rápido).
* **Adopción Real Descubierta:** **5%** de la base de usuarios.

---

### 🧮 Cálculo Comparativo de ROI

#### Opción A: Testing Primero (TDD / Test Exhaustivos desde el Día 1)
* **Esfuerzo / Costo:** **150 min** (5 edge cases × 30 min/test)
* **Beneficio Capturado:** **10 min** (Protección de código aprovechada solo por el 5% de usuarios activos)
* **Cálculo ROI:**
  $$\text{ROI} = \frac{\text{Beneficio} - \text{Costo}}{\text{Costo}} = \frac{10 - 150}{150} = -93.3\%$$
* **Conclusión:** **NO valió la pena.** Se desperdiciaron 140 minutos de ingeniería en una feature que el 95% de los usuarios no utiliza.

---

#### Opción B: Observability Primero (Analytics + Error Tracking)
* **Esfuerzo / Costo:** **10 min** (Setup de eventos de tracking + monitoreo de errores)
* **Beneficio Capturado:** **150 min** (Ahorro directo de tiempo al no escribir tests para una feature no adoptada)
* **Cálculo ROI:**
  $$\text{ROI} = \frac{\text{Beneficio} - \text{Costo}}{\text{Costo}} = \frac{150 - 10}{10} = +1400\%$$
* **Conclusión:** **SÍ valió la pena.** Con una inversión mínima de 10 minutos se obtuvo el dato real de uso y se decidió no malgastar 150 minutos de desarrollo.

---

### ⚖️ Análisis Comparativo y Regla Extraída

* **Diferencia de ROI:** La **Opción B ahorra 140 minutos netos** (+1400% ROI vs -93.3% ROI).
* **Decisión Óptima:** **Opción B (Observability Primero)** para features con incertidumbre de producto.
* **Regla Extraída:**
  * **Adopción Incierta / Experimental (< 20% uso):** Usar **Observability Primero** para validar la hipótesis con mínimo esfuerzo.
  * **Adopción Validada / Core de Negocio (> 50% uso o dinero involucrado):** Usar **Testing Exhaustivo** para blindar la estabilidad del código.

/**
 * SecurityChecklist Component
 *
 * Displays OWASP Top 10 security implementation status
 * Educational component to demonstrate security best practices
 */

export function SecurityChecklist() {
  const DOCS_LOCATION = 'See slides for details'
  const STATUS_IMPLEMENTED = 'implemented'
  const STATUS_DOCUMENTED = 'documented'
  const STATUS_NOT_APPLICABLE = 'not-applicable'

  const securityItems = [
    {
      id: 'A01',
      name: 'Access Control',
      status: STATUS_IMPLEMENTED,
      description: 'Role-based authorization with requireRole()',
      location: 'src/infrastructure/auth.ts',
    },
    {
      id: 'A02',
      name: 'Cryptographic Failures',
      status: STATUS_DOCUMENTED,
      description: 'Production: bcrypt hashing, HTTPS enforcement',
      location: DOCS_LOCATION,
    },
    {
      id: 'A03',
      name: 'Injection (XSS)',
      status: STATUS_IMPLEMENTED,
      description: 'DOMPurify sanitization + React escaping',
      location: 'src/features/product-catalog/components/ProductCard.tsx',
    },
    {
      id: 'A04',
      name: 'Insecure Design',
      status: STATUS_DOCUMENTED,
      description: 'Production: Rate limiting, account lockout',
      location: DOCS_LOCATION,
    },
    {
      id: 'A05',
      name: 'Security Misconfiguration',
      status: STATUS_IMPLEMENTED,
      description: 'Environment validation with Zod',
      location: 'src/infrastructure/env.ts',
    },
    {
      id: 'A06',
      name: 'Vulnerable Components',
      status: STATUS_IMPLEMENTED,
      description: 'npm audit in CI/CD pipeline',
      location: '.github/workflows/metrics.yml',
    },
    {
      id: 'A07',
      name: 'Auth Failures',
      status: STATUS_IMPLEMENTED,
      description: 'Strong password validation, token expiration',
      location: 'src/shared/utils/validatePassword.ts',
    },
    {
      id: 'A08',
      name: 'Software Integrity',
      status: STATUS_DOCUMENTED,
      description: 'Production: JWT signing with secrets',
      location: DOCS_LOCATION,
    },
    {
      id: 'A09',
      name: 'Logging & Monitoring',
      status: STATUS_IMPLEMENTED,
      description: 'Sentry error tracking + breadcrumbs',
      location: 'src/infrastructure/sentry.ts',
    },
    {
      id: 'A10',
      name: 'SSRF',
      status: STATUS_NOT_APPLICABLE,
      description: 'Frontend-only app (no server-side requests)',
      location: 'N/A',
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case STATUS_IMPLEMENTED:
        return 'bg-green-100 text-green-800 border-green-300'
      case STATUS_DOCUMENTED:
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case STATUS_NOT_APPLICABLE:
        return 'bg-gray-100 text-gray-600 border-gray-300'
      default:
        return 'bg-red-100 text-red-800 border-red-300'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case STATUS_IMPLEMENTED:
        return '✓ Implemented'
      case STATUS_DOCUMENTED:
        return '📚 Documented'
      case STATUS_NOT_APPLICABLE:
        return '－ N/A'
      default:
        return '⚠ Missing'
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          🛡️ OWASP Top 10 Security Checklist
        </h3>
        <p className="text-sm text-gray-600">
          Security best practices implementation status (OWASP Top 10 2021)
        </p>
      </div>

      <div className="space-y-3">
        {securityItems.map(item => (
          <div
            key={item.id}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0 w-12 text-center">
              <span className="text-lg font-bold text-indigo-600">{item.id}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-sm font-semibold text-gray-900">{item.name}</h4>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded border ${getStatusBadge(item.status)}`}
                >
                  {getStatusLabel(item.status)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">{item.description}</p>

              {item.location !== 'N/A' && (
                <p className="text-xs text-gray-500 font-mono">{item.location}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <p className="text-sm text-indigo-900">
          <span className="font-semibold">📖 Educational Note:</span> This is a frontend-only demo.
          Production apps require backend security measures (rate limiting, HTTPS, bcrypt hashing, etc.)
        </p>
      </div>
    </div>
  )
}

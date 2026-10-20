export default function LoadErrorNote({ children }) {
  return (
    <p className="status-note status-note-error" role="alert">
      {children || 'Non riusciamo a caricare i contenuti. Riprova tra poco.'}
    </p>
  )
}

import usePageMeta from '../lib/usePageMeta.js'

// Draft policy. Every value wrapped in MissingTag must come from the
// owner, see docs/owner-intake.md, section 5. Nothing here is invented.
function MissingTag({ children }) {
  return <span className="legal-missing">[{children}]</span>
}

export default function Privacy() {
  usePageMeta({
    title: 'Informativa sulla privacy',
    description:
      'Informativa sulla privacy del sito elfabakery.it ai sensi del GDPR. Come vengono trattati i dati personali di chi visita il sito.',
    path: '/privacy-policy'
  })

  return (
    <div className="container page-intro">
      <h1>Informativa sulla privacy</h1>
      <p>
        Questa informativa spiega come vengono trattati i dati personali di chi
        visita il sito elfabakery.it, secondo gli articoli 13 e 14 del
        Regolamento UE 2016/679 (GDPR).
      </p>

      <p className="status-note status-note-error legal-warning">
        Bozza da completare prima della pubblicazione: i dati societari del
        titolare e il provider di hosting vanno inseriti dal titolare del
        negozio.
      </p>

      <div className="legal-body">
        <h2>Chi tratta i dati</h2>
        <p>
          Titolare del trattamento: <MissingTag>ragione sociale, forma
          giuridica, numero di P. IVA e indirizzo della sede</MissingTag>.
          Per contattare il titolare puoi usare i recapiti della pagina
          Contatti.
        </p>

        <h2>Quali dati raccogliamo</h2>
        <ul>
          <li>
            Dati di navigazione: il sito è servito da un provider di hosting{' '}
            <MissingTag>nome del provider</MissingTag>, che registra i dati
            tecnici usuali, come indirizzo IP, data, ora e pagina richiesta.
          </li>
          <li>
            Dati di contatto: se chiami o scrivi ai recapiti del negozio,
            gestiamo i dati che ci mandi, come nome, recapito e contenuto del
            messaggio.
          </li>
          <li>
            Il sito non ha moduli di registrazione e non raccoglie dati per
            profilare i visitatori.
          </li>
        </ul>

        <h2>A cosa servono</h2>
        <p>
          I dati servono a far funzionare il sito, a rispondere a chi chiede
          informazioni e ad adempiere agli obblighi di legge.
        </p>

        <h2>Base giuridica</h2>
        <p>
          Il trattamento si basa sulla richiesta dell’interessato quando ci
          contatti, sul legittimo interesse a mantenere il sito attivo e sugli
          obblighi previsti dalla legge.
        </p>

        <h2>Quanto li conserviamo</h2>
        <p>
          I messaggi di contatto sono conservati solo per il tempo necessario a
          rispondere. <MissingTag>tempi di conservazione previsti</MissingTag>
        </p>

        <h2>Condivisione e vendita</h2>
        <p>
          Non vendiamo dati personali. Possono trattarli i fornitori tecnici
          del titolare, come il provider di hosting, che agiscono per suo
          conto. <MissingTag>fornitori coinvolti</MissingTag>
        </p>

        <h2>I tuoi diritti</h2>
        <p>
          Puoi chiedere accesso, rettifica, cancellazione, limitazione,
          opposizione e portabilità dei dati scrivendo al titolare. Hai inoltre
          diritto di reclamare al Garante per la protezione dei dati personali
          su garanteprivacy.it.
        </p>

        <h2>Aggiornamenti</h2>
        <p>
          Questa informativa può essere aggiornata quando cambiano il sito o la
          normativa. Ultimo aggiornamento: ottobre 2026.
        </p>
      </div>
    </div>
  )
}

import usePageMeta from '../lib/usePageMeta.js'

// Draft policy. The analytics tools are chosen in Session 6, and the
// cookie banner decision depends on that choice, see docs/owner-intake.md.
export default function Cookies() {
  usePageMeta({
    title: 'Cookie policy',
    description:
      'Cookie policy del sito elfabakery.it: cookie tecnici, link ai siti terzi e strumenti di analisi.',
    path: '/cookie-policy'
  })

  return (
    <div className="container page-intro">
      <h1>Cookie policy</h1>
      <p>
        Questa pagina spiega quali cookie usa il sito elfabakery.it e come
        puoi gestirli dal tuo browser.
      </p>

      <p className="status-note status-note-error legal-warning">
        Bozza da completare: la scelta degli strumenti di analisi e i dettagli
        del provider di hosting arrivano nelle prossime sessioni.
      </p>

      <div className="legal-body">
        <h2>Cosa sono i cookie</h2>
        <p>
          I cookie sono piccoli file che un sito salva sul tuo dispositivo per
          ricordare informazioni sulla visita. Possono essere tecnici, necessari
          al funzionamento, oppure di profilazione, usati per tracciare le
          preferenze.
        </p>

        <h2>Cookie tecnici di questo sito</h2>
        <p>
          Il sito elfabakery.it in questo momento non salva cookie propri di
          profilazione e non usa cookie pubblicitari. Le pagine si aprono e si
          navigano senza alcun consenso.
        </p>

        <h2>Siti terzi</h2>
        <p>
          Quando apri i link a Google Maps, Instagram e Facebook esci dal sito
          e sei soggetto alle condizioni di quei siti, comprese le loro cookie
          policy.
        </p>

        <h2>Strumenti di analisi</h2>
        <p>
          Nessuno strumento di analisi è attivo oggi. Se ne verrà attivato uno,
          questa pagina verrà aggiornata e, se serve, verrà mostrato un banner
          per raccogliere il tuo consenso prima dell’attivazione.
        </p>

        <h2>Come gestire i cookie dal browser</h2>
        <p>
          Puoi vedere, bloccare o eliminare i cookie dalle impostazioni del
          tuo browser, nella sezione privacy. Il percorso cambia in base al
          browser che usi: Chrome, Firefox, Safari ed Edge hanno tutti una
          sezione dedicata ai cookie. Se blocchi tutti i cookie, alcune
          funzioni del sito potrebbero non funzionare.
        </p>

        <h2>Contatti</h2>
        <p>
          Per domande su questa pagina puoi usare i recapiti della pagina
          Contatti.
        </p>
      </div>
    </div>
  )
}

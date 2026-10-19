# Menu and price research

Collected 2026-10-19 during Session 2. Everything below comes from a public listing published by the shop itself. Nothing here is guessed.

These numbers are research only. They are not in db/seed.sql. Every price stays NULL in the seed until the owner confirms the in-shop price.

## Sources

| Source | URL | What it gives | Reliability |
| --- | --- | --- | --- |
| Glovo store page | https://glovoapp.com/it/it/milano/stores/elfa-bakery-mil | Full menu with prices, 8 categories | Good, but it is a delivery listing. Delivery prices can be higher than in-shop prices. |
| Qromo digital catalog | https://elfabakerymenu.qromo.it/ | In-shop catalog, category names only | Currently returns "Unavailable". Category names were captured during Session 0. |
| Sluurpy | https://www.sluurpy.it/milano/ristorante/10301158/elfa-bakery | Opening hours, price band | Third party, updated 12/01/2026 |
| Shop Facebook posts | via findglocal.com mirror | Hours changes, new products | Shop's own wording, dates given per item |
| Reviews | Tripadvisor, Restaurant Guru, exa.ai library | Dish names, no prices | Good for names, useless for prices |

## Glovo prices, exact as listed

Italian names and descriptions are verbatim from the listing. Amounts use the Glovo format.

### Pizze classiche

| Item | Price | Description on Glovo |
| --- | --- | --- |
| Quattro stagioni | 12,00 euro | Cotto funghi carciofi olive nere |
| Capricciosa | 12,00 euro | Pizza capricciosa |
| Valtellina | 12,00 euro | Bresaola rucola grana |
| Pizza Kebab | 12,00 euro | Pizza kebab completa |
| Quattro formaggi | 10,00 euro | Mozzarella e formaggi misti |
| Funghi | 10,00 euro | Pizza funghi misti |
| Napoli | 10,00 euro | Pomodoro, mozzarella, acciughe |
| Tonno e cipolla | 10,00 euro | Pizza tonno cipolla origani |
| Diavola | 10,00 euro | Pomodoro, mozzarella, salame piccante |
| Romana | 10,00 euro | Acciughe capperi olive |
| Prosciutto funghi | 10,00 euro | Pomodoro, mozzarella, prosciutto e funghi |
| Vegetariana | 10,00 euro | Pomodoro, mozzarella, verdure miste |
| Wurstel e patatine | 10,00 euro | Wustel e patatine |
| Bismark | 10,00 euro | Cotto e uovo |
| Porcini scamorza | 10,00 euro | no description listed |
| Prosciutto crudo | 8,00 euro | Pizza con crudo |
| Margherita | 7,00 euro | Pomodoro e mozzarella |
| Marinara | 6,00 euro | Pizza Marinara |

Note: two fetches of the page rendered slightly different subsets. Porcini scamorza and Prosciutto crudo each appeared in one render, both appeared together in a third. Treat the full 18 as the working list and confirm against the counter.

### Pizza al trancio

| Item | Price | Description on Glovo |
| --- | --- | --- |
| Pizza al trancio wurstel e patatine | 7,00 euro | Wurstel e patatine calda e appena sfornata |
| Pizza al trancio salame piccante | 7,00 euro | Salame piccante al trancio calda e appena sfornata |
| Pizza al trancio margherita | 6,00 euro | Margherita al trancio calda e appena sfornata |

### Menu kebab and Falafel

| Item | Price | Description on Glovo |
| --- | --- | --- |
| Menu piatto kebab | 15,00 euro | Piatto con bibita |
| Menu piadina kebab | 13,00 euro | Piadina e patatine e bibita |
| Menu panino kebab | 12,50 euro | Panino e patatine e bibita |
| Menu panino falafel | 12,00 euro | Panino falafel con bibita e patatine |
| Menu piatto falafel | 15,00 euro | Piatto falafel e bibita |
| Menu piadina falafel | 13,00 euro | Piadina falafel con bibita e patatine |

### Kebab and Falfel

The category is spelled "Kebab&Falfel" on Glovo. Corrected to Kebab e Falafel on the site.

| Item | Price | Description on Glovo |
| --- | --- | --- |
| Piatto kebab | 12,00 euro | Piatto kebab di pollo |
| Piadina | 9,00 euro | Piadina kebab |
| Panino | 8,00 euro | Panino kebab |
| Piadina falafel vegana | 8,00 euro | Piadina falafel di ceci |
| Panino hot dog | 8,00 euro | Panino ketchup e maionese |
| Panino falafel vegano | 7,00 euro | Piadina falafel di ceci |

Two data problems on Glovo to fix on our side: the hot dog sits in the kebab category, and the vegan panino repeats the piadina description. Both were moved to the right place in db/seed.sql.

### Gastronomia

| Item | Price | Description on Glovo |
| --- | --- | --- |
| Panzerotti fritti | 5,00 euro | Ripieno di pomodoro e mozzarella |
| Porzione di patatine | 4,00 euro | Patatine fritte |
| Arancini | not shown | Rendered as "Arancini cotto, Cotto e mozzarella" in one fetch and "Arancini, Ragù di manzo" in another |

### Bevande

| Item | Price |
| --- | --- |
| Coca-Cola bottiglie 1.5 l | 5,00 euro |
| Coca-Cola bottiglia | 4,00 euro |
| Red bull | 4,00 euro |
| Estathè limone | 4,00 euro |
| Estathé Pesca | 4,00 euro |
| Coca-Cola lattina | 3,00 euro |
| Coca-Cola Zero lattina | 3,00 euro |
| Pepsi lattina | 3,00 euro |
| Chinotto lattina | 3,00 euro |
| Lemon soda lattina | 3,00 euro |
| Fanta lattina | 3,00 euro |
| Sprite lattina | 3,00 euro |
| Acqua naturale | 2,00 euro |
| Acqua frizzante | 2,00 euro |

### Pasticceria

| Item | Price | Description on Glovo |
| --- | --- | --- |
| Chocolate fudge cake | 8,00 euro | Fetta torta al cioccolato |
| Mini doughnut 3 pz | 6,00 euro | Ripieni di marmellata fragole o cioccolato |
| Strudel di mela | 4,50 euro | Strudel di mela, marmellata mela cannella mandorle uvetta |
| Doughnut grande | 4,00 euro | Doughnut |
| Muffins duomo | 4,00 euro | Muffin cioccolato |
| Muffins san babila red velvet | 4,00 euro | no description listed |
| Torta ricotta e gocce di cioccolato | not shown | Frolla ricotta |
| Sbrodolone crema | not shown | Sbrodolone |
| Mela senza grassi | not shown | Tortina mela senza grassi tipo muffin |

### Best sellers strip

Glovo also shows a "I più venduti" row with Piadina 9,00 euro, Wurstel e patatine 10,00 euro, and Menu piadina kebab 13,00 euro. It is a curated row, not a real category, so it is not seeded.

## Categories that exist but have no item names yet

From the Qromo in-shop catalog, captured during Session 0:

- Bagels: only one dish is named anywhere, the salmon, cheese and egg bagel.
- Salads: no dish names found in any source. Category is seeded empty.
- Sandwiches and piadinas: the catalog notes piadinas cost 1 euro extra. No base piadina name found. Category is seeded with sandwiches only.
- First and second courses: only lasagna and omelette are named in reviews.
- Side dishes: no dish names found. Category is seeded empty.

## Items from the shop's own posts

These come from the shop's Facebook wording, so they are safe to use, but they are news posts, not a menu list. Confirm before treating them as permanent menu lines.

- Arrosticini di Pecora Abruzzesi DOC, posted 08/07/2026, cooked to order, available H24.
- Crostatine artigianali, posted 14/06/2026, made daily.
- Panino Sfogliato, announced September 2025.
- New Illy Art Collection cup, posted 05/07/2026.

## Hours research

Conflicting, needs the owner.

- Shop posts say "Sempre aperti" and "Aperti H24" repeatedly through 2026.
- Summer 2026: reduced hours 06:00 to 21:00, with a post saying H24 would resume on 01/09/2026.
- Post of 30/08/2026 says the shop reopens on 31/08/2026 from 06:00 to 22:00. That contradicts the H24 resumption on the same date.
- Sluurpy: Monday to Saturday 24 hours, Sunday 00:00 to 15:00.
- Session 0 captured a source saying Sunday 06:00 to 14:30.

Sunday and the current winter schedule are both open questions.

## Other findings worth keeping

- Restaurant Guru says "No delivery", which is stale. The shop is live on Glovo.
- Coordinates: two sources disagree slightly, 45.461527, 9.1502783 and 45.461474, 9.150403. Pick one in Session 6 when the map block is built.
- Price band per person: 1 to 10 euro, consistent across sources.
- Review exa.ai library dated 2025-11-24 names the salmon cheese egg bagel and a latte macchiato. A 2025-08-17 review names a pistachio coffee.
- Sluurpy lists a "Menu del giorno" with kebab, focaccia liscia al trancio, virgin mojito, iced pistachio latte, and a "Pizza Fla doppia mozzarella e bordo a sorpresa". None of these have prices. Worth asking about.

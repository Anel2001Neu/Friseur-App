# Salonzeit / Friseur-App

Eine responsive erste Website für die Suche nach Friseursalons und die Buchung bei einem bestimmten oder einem beliebigen geeigneten Mitarbeiter.

## Lokal starten

Voraussetzung: Node.js 22.12+ oder 24 und npm.

```bash
npm ci
npm run dev
```

Der Entwicklungsserver läuft auf Port 5173. Für diese Cloud-Umgebung liegt die Arbeitskopie unter `/workspace/Friseur-App`.

```bash
npm test       # 10 Tests der Verfügbarkeits- und Buchungsregeln
npm run build # Produktionsdateien unter dist/
```

Für den Browser-Smoke-Test muss der Entwicklungsserver laufen. Der Test verwendet ein neues Browserprofil und verändert ausschließlich dessen lokale Beispieldaten:

```bash
npm run test:e2e
```

Chromium wird in der Cloud unter `/usr/bin/chromium` verwendet. An anderen Orten kann `CHROMIUM_PATH` gesetzt werden, die Zieladresse lässt sich über `BASE_URL` anpassen. Die Screenshots des Tests liegen unter `/tmp/salonzeit-*.png`.

## Ausprobieren

- Unter **Salons entdecken** nach „Berlin“, „Hamburg“, „10115“ oder „Atelier“ suchen.
- Einen Salon öffnen und einen Mitarbeiter oder **Keine Präferenz** auswählen.
- Den Kalender ansehen, Leistungen kombinieren und einen freien Termin wählen. Eine Änderung der Leistungen entfernt die bisherige Zeitauswahl und berechnet freie Startzeiten neu.
- Die Bestätigung nennt den tatsächlich zugeordneten Mitarbeiter, Leistungen, Dauer und Preis.
- Unter **Meine Termine** Buchungen ansehen und stornieren. Eine Stornierung gibt den Zeitraum frei.
- Über das runde Profil-Symbol oben rechts das Demo-Kundenprofil bearbeiten.
- Unter **Für Salons** den Kalender nach Datum und Mitarbeiter filtern, Mitarbeiter hinzufügen, einen neuen Salon anlegen sowie Adresse, Öffnungszeiten, Preise und Behandlungsdauer bearbeiten.

Sonntags sind die Demo-Salons geschlossen. Die Verfügbarkeit berücksichtigt die Öffnungszeiten, feste Beispielpausen, feste Beispieltermine, Mitarbeiterfähigkeiten und aktive Buchungen. Für die komplette Behandlung muss ein einzelner Mitarbeiter verfügbar sein; Teilzeiträume mehrerer Mitarbeiter werden nicht zusammengefügt. Bestehende Buchungen behalten ihre ursprünglichen Leistungen, Preise und Dauer, auch wenn die Preisliste danach geändert wird.

## Stand und Grenzen

Dies ist ein **Frontend-Prototyp mit lokalen Demodaten**, keine produktive Buchungsplattform. Alle Salons, Kunden, Bewertungen und Teammitglieder sind erfunden; die Bilder sind lokale Illustrationen. Die Bewertungen sind Beispielanzeigen, keine echten Bewertungen.

- Es gibt noch keine echte Registrierung, Anmeldung, Rechteverwaltung oder separate Mitarbeiterkonten.
- Daten liegen im `localStorage` dieses Browsers unter `salonzeit-demo-v1`. Andere Nutzer und Geräte teilen diese Daten nicht. Browserdaten zu löschen setzt die Demo zurück.
- Die Bestätigung prüft den zuletzt gespeicherten Stand erneut. Gleichzeitige Schreibvorgänge mehrerer Tabs sind aber nicht atomar. Produktive Doppelbuchungssicherheit benötigt serverseitige Transaktionen.
- Keine echten Zahlungen, E-Mails, Standortermittlung oder Entfernungsberechnung. Die Suche filtert Namen, Orte, Adressen und Postleitzahlen der hinterlegten Salons.
- Öffnungszeiten gelten für alle Mitarbeiter. Individuelle Arbeitszeiten und Abwesenheiten sind noch nicht editierbar.
- Die Website verwendet keine externen Bilder, Schriftarten oder API-Schlüssel.

Nächster Entwicklungsschritt: Backend mit Datenbank, sicherer Anmeldung, Rollen und Trennung der Salondaten; anschließend serverseitig abgesicherte Buchungen und echte Mitarbeiterverfügbarkeiten.

## Testversion auf GitHub Pages

Der Workflow `.github/workflows/pages.yml` prüft bei Änderungen an `main` die Buchungsregeln und erstellt den Produktionsbuild. Er veröffentlicht ausschließlich die gebauten Website-Dateien auf GitHub Pages.

Einmalig im Repository unter **Settings → Pages → Build and deployment → Source** die Option **GitHub Actions** auswählen. Anschließend unter **Actions → Publish Salonzeit → Run workflow** den Workflow auf `main` starten, falls der erste Lauf vor der Aktivierung fehlgeschlagen ist. GitHub zeigt die tatsächliche Website-Adresse nach erfolgreicher Veröffentlichung unter Pages und beim Deployment an.

Die Testversion bleibt eine lokale Browserdemo; die Veröffentlichung ergänzt keine echten Konten oder gemeinsame Datenbank. Bei privaten Repositorys hängt die Verfügbarkeit von Pages vom GitHub-Tarif ab.

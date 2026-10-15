# Kosten-TB-Kopa

**KV-Assistent Tiefbau** – ein einziges, offline lauffähiges HTML-Tool zur Erstellung von Kostenvoranschlägen für Tiefbauarbeiten (Netzbau / FTTH) nach Swisscom-Standard.

## Datei

- `KV_Assistent_Tiefbau.html` – das komplette Tool. Keine Installation, kein Server, keine Internetverbindung nötig: einfach im Browser öffnen (Doppelklick oder „Datei öffnen“).

## Funktionsumfang

- Mehrsprachig: Deutsch, Französisch, Italienisch, Englisch
- Berechnung von Aushub, Rohranlagen, Schächten, Querungen, Belägen und Oberflächen nach NPK/LV-Logik
- Automatische Zuordnung der passenden NPK-Positionen und Preise aus dem hinterlegten LV (TB-Kopa 2026)
- Deterministische Rahmen/Deckel-Auswahl für Schächte (abgeleitet aus Einbauort × Format × Sockel, keine fehlerhaften Kombinationen möglich)
- Transparenter Rechenweg zu jeder Position (Formel direkt sichtbar, auch im Excel-Export)
- Baustelleneinrichtung als einfacher Prozentsatz, mit Detailpositionen optional über die freie Positionssuche
- Zusammenfassung nach NPK-Kapiteln
- Druckbare einseitige Kostenzusammenfassung
- Excel-Export (.xlsx) der vollständigen Kostenberechnung

## Nutzung

1. `KV_Assistent_Tiefbau.html` herunterladen bzw. aus diesem Repo öffnen
2. Im Browser (Chrome, Edge, Firefox) öffnen
3. Projektdaten eingeben – alle Berechnungen und Preiszuordnungen erfolgen automatisch im Browser, es werden keine Daten irgendwohin übertragen

## Herkunft

Preisgrundlage: Swisscom LV „TB Kopa 2026 mit Preisen_DE“, validiert anhand eines realen Devis sowie der VSE-Branchenempfehlung 1103d (Grabenbreiten). Autor: Alessandro Cortese.

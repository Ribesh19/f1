# Data source

| | |
|---|---|
| Source | [F1DB — Open Source Formula 1 Database](https://github.com/f1db/f1db) |
| Version | v2026.20.0 (CSV release) |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Coverage | Every World Championship race, 1950 to 2025 |

Data © F1DB contributors, used under CC BY 4.0. It has been trimmed and reshaped for teaching.

## What changed from the source

- Six small tables: `results`, `races`, `drivers`, `constructors`, `circuits`, `seasons`.
- Only drivers who started a race are kept. Sprint races are left out.
- Retirement reasons are grouped into `Accident`, `Mechanical` and `Other`.

## Good to know

- In the 1950s two drivers could share one car, so a few early races have two winners.
- The Indianapolis 500 counted as a championship round from 1950 to 1960.
- The constructors' championship began in 1958.

## Photographs

From Wikimedia Commons. Each was cropped and darkened.
Any file here that contains one of these photos (backgrounds, report files, screenshots) is shared under that photo's CC BY-SA licence.

| Used on | Photo | Author | Licence |
|---|---|---|---|
| Story page; Gallery, Paddock | [Yuki Tsunoda in qualifying for the 2022 British Grand Prix](https://commons.wikimedia.org/wiki/File%3AYuki_Tsunoda_in_qualifying_for_the_2022_British_Grand_Prix.jpg) | Timfilbert | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Drivers page | [Fale F1 Monza 2004 73](https://commons.wikimedia.org/wiki/File%3AFale_F1_Monza_2004_73.jpg) | Fabio Alessandro Locati | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| About page | [Jean Alesi - Ferrari 412T2 at the 1995 British Grand Prix, Silverstone (49830898232)](https://commons.wikimedia.org/wiki/File%3AJean_Alesi_-_Ferrari_412T2_at_the_1995_British_Grand_Prix%2C_Silverstone_%2849830898232%29.jpg) | Martin Lee from London, UK | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) |
| Gallery, Night Race | [1 singapore f1 night race 2012 city skyline](https://commons.wikimedia.org/wiki/File%3A1_singapore_f1_night_race_2012_city_skyline.jpg) | chensiyuan | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Gallery, Poster | [FIA F1 Austria 2023 Nr. 18 (2)](https://commons.wikimedia.org/wiki/File%3AFIA_F1_Austria_2023_Nr._18_%282%29.jpg) | Lukas Raich | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |

## Using the CSV files yourself

Column names in `data/` differ slightly from the report (for example `Status` is shown as `Result`). Rename them if you paste in `guides/measures.dax`.

This is an unofficial teaching pack. It is not associated with Formula 1, the FIA or any team.

import { CityData } from "./types";
import { betimData } from "./betim";
import { beloHorizonteData } from "./belo-horizonte";
import { contagemData } from "./contagem";
import { novaLimaData } from "./nova-lima";
import { vilaDaSerraData } from "./vila-da-serra";
import { pampulhaData } from "./pampulha";

export const citiesData: Record<string, CityData> = {
  "betim": betimData,
  "belo-horizonte": beloHorizonteData,
  "contagem": contagemData,
  "nova-lima": novaLimaData,
  "vila-da-serra": vilaDaSerraData,
  "pampulha": pampulhaData
};

import { CityData } from "./types";
import { betimData } from "./betim";
import { beloHorizonteData } from "./belo-horizonte";
import { contagemData } from "./contagem";
import { novaLimaData } from "./nova-lima";

export const citiesData: Record<string, CityData> = {
  "betim": betimData,
  "belo-horizonte": beloHorizonteData,
  "contagem": contagemData,
  "nova-lima": novaLimaData
};

import { Procedure } from "../types";
import { cirurgiaMinimamenteInvasiva } from "./procedures/cirurgia-minimamente-invasiva";
import {
    endoscopiaDeColuna,
    artroplastiaCervical,
    tratamentoEscoliose,
    tratamentoTumoresColuna,
    artrodese,
    microcirurgia,
    infiltracoesBloqueios,
    rizotomiaRadiofrequencia
} from "./procedures/";


export const allProcedures: Procedure[] = [
    cirurgiaMinimamenteInvasiva,
    endoscopiaDeColuna,
    artroplastiaCervical,
    tratamentoEscoliose,
    tratamentoTumoresColuna,
    artrodese,
    /*microcirurgia,*/
    infiltracoesBloqueios,
    rizotomiaRadiofrequencia,
];

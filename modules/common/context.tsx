import dayjs from 'dayjs';
import {Consumer, Context, createContext, useContext} from 'react';
import {Data, PairResponse, Tokens} from './types';

type Astro = {
  pairs: PairResponse[] | null;
  lockdropConfig: any | null;
  tokens: Tokens | null;
  data: Data | null;
  phase1StartDate: dayjs.Dayjs | null;
  phase1EndDate: dayjs.Dayjs | null;
  phase2StartDate: dayjs.Dayjs | null;
  phase2EndDate: dayjs.Dayjs | null;
};

export const AstroAppContext: Context<Astro> = createContext<Astro>({
  lockdropConfig: null,
  pairs: null,
  tokens: null,
  data: null,
  phase1StartDate: null,
  phase1EndDate: null,
  phase2StartDate: null,
  phase2EndDate: null,
});

export function useAstroApp(): Astro {
  return useContext(AstroAppContext);
}

export const AstroAppConsumer: Consumer<Astro> = AstroAppContext.Consumer;

/* =============================================================
   FP&A · FONTE ÚNICA DOS NÚMEROS
   -------------------------------------------------------------
   Todo número que aparece nas seções de FP&A nasce aqui. Só as
   FOLHAS (sub-contas) carregam valor digitado; total, margem,
   EBITDA, variação e impacto saem de função.

   Consequência prática: DRE e ponte de resultado leem o MESMO
   período e não têm como divergir. Se um número muda, muda nos
   dois lugares — não existe segunda cópia para esquecer.
   ============================================================= */

/** Folha do plano de contas: o único lugar com valor digitado. */
export type Leaf = { id: string; label: string; real: number; plan: number };

/** Bloco do resultado a que uma conta pertence. */
export type Bloco = 'receita' | 'custo' | 'despesa';

export type Period = {
  id: string;
  pill: string;
  label: string;
  status: string;
  receita: Leaf[];
  custos: Leaf[];
  despesas: Leaf[];
};

/* Dados de exemplo · operação de plataforma/educação em IA.
   Valores em BRL, sem centavos (fechamento contábil arredondado). */
export const PERIODOS: Period[] = [
  {
    id: 'mai-2026',
    pill: 'Mai 2026',
    label: 'Maio 2026',
    status: 'fechado',
    receita: [
      { id: 'rec-mentoria', label: 'Planos da plataforma · assinaturas', real: 1_334_000, plan: 1_318_000 },
      { id: 'rec-comunidade', label: 'Comunidade e plataforma', real: 342_600, plan: 371_000 },
      { id: 'rec-conf', label: 'Leaders AI Conference', real: 296_000, plan: 305_000 },
      { id: 'rec-impl', label: 'Implementação e squads', real: 151_300, plan: 149_000 },
    ],
    custos: [
      { id: 'cus-mentores', label: 'Mentores e facilitadores', real: 446_500, plan: 438_000 },
      { id: 'cus-infra', label: 'Infraestrutura e modelos de IA', real: 130_800, plan: 121_000 },
      { id: 'cus-gateway', label: 'Gateway e parcelamento', real: 97_400, plan: 98_600 },
      { id: 'cus-conteudo', label: 'Produção de conteúdo', real: 60_200, plan: 64_000 },
    ],
    despesas: [
      { id: 'des-mkt', label: 'Marketing e aquisição', real: 524_700, plan: 512_000 },
      { id: 'des-time', label: 'Time comercial e operação', real: 466_900, plan: 474_000 },
      { id: 'des-tools', label: 'Ferramentas e software', real: 69_300, plan: 66_500 },
      { id: 'des-estrutura', label: 'Estrutura e administrativo', real: 95_100, plan: 98_000 },
    ],
  },
  {
    id: 'jun-2026',
    pill: 'Jun 2026',
    label: 'Junho 2026',
    status: 'fechado',
    receita: [
      { id: 'rec-mentoria', label: 'Planos da plataforma · assinaturas', real: 1_412_000, plan: 1_365_000 },
      { id: 'rec-comunidade', label: 'Comunidade e plataforma', real: 351_800, plan: 378_000 },
      { id: 'rec-conf', label: 'Leaders AI Conference', real: 455_000, plan: 474_000 },
      { id: 'rec-impl', label: 'Implementação e squads', real: 187_600, plan: 158_000 },
    ],
    custos: [
      { id: 'cus-mentores', label: 'Mentores e facilitadores', real: 452_000, plan: 441_000 },
      { id: 'cus-infra', label: 'Infraestrutura e modelos de IA', real: 141_900, plan: 124_000 },
      { id: 'cus-gateway', label: 'Gateway e parcelamento', real: 108_300, plan: 106_900 },
      { id: 'cus-conteudo', label: 'Produção de conteúdo', real: 59_400, plan: 64_000 },
    ],
    despesas: [
      { id: 'des-mkt', label: 'Marketing e aquisição', real: 566_000, plan: 519_000 },
      { id: 'des-time', label: 'Time comercial e operação', real: 471_200, plan: 482_000 },
      { id: 'des-tools', label: 'Ferramentas e software', real: 72_600, plan: 67_000 },
      { id: 'des-estrutura', label: 'Estrutura e administrativo', real: 93_800, plan: 99_500 },
    ],
  },
  {
    id: 'tri2-2026',
    pill: '2º tri 2026',
    label: '2º trimestre 2026',
    status: 'fechado',
    receita: [
      { id: 'rec-mentoria', label: 'Planos da plataforma · assinaturas', real: 4_047_000, plan: 3_973_000 },
      { id: 'rec-comunidade', label: 'Comunidade e plataforma', real: 1_033_300, plan: 1_115_000 },
      { id: 'rec-conf', label: 'Leaders AI Conference', real: 1_013_000, plan: 1_050_000 },
      { id: 'rec-impl', label: 'Implementação e squads', real: 478_300, plan: 448_000 },
    ],
    custos: [
      { id: 'cus-mentores', label: 'Mentores e facilitadores', real: 1_339_500, plan: 1_315_000 },
      { id: 'cus-infra', label: 'Infraestrutura e modelos de IA', real: 397_300, plan: 363_000 },
      { id: 'cus-gateway', label: 'Gateway e parcelamento', real: 299_800, plan: 300_800 },
      { id: 'cus-conteudo', label: 'Produção de conteúdo', real: 177_400, plan: 190_000 },
    ],
    despesas: [
      { id: 'des-mkt', label: 'Marketing e aquisição', real: 1_589_000, plan: 1_528_000 },
      { id: 'des-time', label: 'Time comercial e operação', real: 1_400_600, plan: 1_424_000 },
      { id: 'des-tools', label: 'Ferramentas e software', real: 208_700, plan: 197_500 },
      { id: 'des-estrutura', label: 'Estrutura e administrativo', real: 283_300, plan: 295_000 },
    ],
  },
];

/** Soma as folhas de um bloco em realizado ou orçado. */
export const somaBloco = (ls: Leaf[], k: 'real' | 'plan'): number =>
  ls.reduce((acc, l) => acc + l[k], 0);

/** Período por id · cai no fechamento de junho se o id não existir. */
export const acharPeriodo = (id: string): Period =>
  PERIODOS.find((p) => p.id === id) ?? PERIODOS[1];

/** Totais de um período · tudo calculado, nada digitado. */
export type PeriodoDerivado = {
  receitaReal: number;
  receitaPlan: number;
  custosReal: number;
  custosPlan: number;
  margemReal: number;
  margemPlan: number;
  despesasReal: number;
  despesasPlan: number;
  ebitdaReal: number;
  ebitdaPlan: number;
};

/**
 * receita − custos diretos = margem bruta
 * margem bruta − despesas  = EBITDA
 */
export function derivarPeriodo(p: Period): PeriodoDerivado {
  const receitaReal = somaBloco(p.receita, 'real');
  const receitaPlan = somaBloco(p.receita, 'plan');
  const custosReal = somaBloco(p.custos, 'real');
  const custosPlan = somaBloco(p.custos, 'plan');
  const despesasReal = somaBloco(p.despesas, 'real');
  const despesasPlan = somaBloco(p.despesas, 'plan');

  const margemReal = receitaReal - custosReal;
  const margemPlan = receitaPlan - custosPlan;

  return {
    receitaReal,
    receitaPlan,
    custosReal,
    custosPlan,
    margemReal,
    margemPlan,
    despesasReal,
    despesasPlan,
    ebitdaReal: margemReal - despesasReal,
    ebitdaPlan: margemPlan - despesasPlan,
  };
}

/**
 * Variação de uma conta já com o SINAL DO IMPACTO NO EBITDA:
 * · receita  → impacto = real − plan   (vender mais ajuda)
 * · custo/despesa → impacto = −(real − plan)  (gastar mais atrapalha)
 */
export type ImpactoConta = {
  id: string;
  label: string;
  bloco: Bloco;
  /** rótulo editorial do bloco, para uso em texto corrido */
  blocoLabel: string;
  real: number;
  plan: number;
  /** real − plan, sem inversão · é o que a contabilidade registra */
  delta: number;
  /** efeito da conta sobre o EBITDA · Σ dos impactos = EBITDA real − EBITDA orçado */
  impacto: number;
  /** desvio percentual sobre o orçado, em fração */
  desvio: number;
};

const BLOCO_LABEL: Record<Bloco, string> = {
  receita: 'Receita',
  custo: 'Custo direto',
  despesa: 'Despesa operacional',
};

const contasDoBloco = (ls: Leaf[], bloco: Bloco): ImpactoConta[] =>
  ls.map((l) => {
    const delta = l.real - l.plan;
    return {
      id: l.id,
      label: l.label,
      bloco,
      blocoLabel: BLOCO_LABEL[bloco],
      real: l.real,
      plan: l.plan,
      delta,
      impacto: bloco === 'receita' ? delta : -delta,
      desvio: delta / l.plan,
    };
  });

/** Todas as contas do período com o impacto no EBITDA, na ordem do DRE. */
export const impactosDoPeriodo = (p: Period): ImpactoConta[] => [
  ...contasDoBloco(p.receita, 'receita'),
  ...contasDoBloco(p.custos, 'custo'),
  ...contasDoBloco(p.despesas, 'despesa'),
];

/** Impacto agregado de um bloco · mesma convenção de sinal das contas. */
export const impactoDoBloco = (contas: ImpactoConta[], bloco: Bloco): number =>
  contas.filter((c) => c.bloco === bloco).reduce((t, c) => t + c.impacto, 0);

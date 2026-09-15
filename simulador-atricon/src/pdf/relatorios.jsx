import { Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';
import { Fragment } from 'react';

Font.registerHyphenationCallback((word) => [word]);

export const MARCA = 'Group Gestor';

const STATUS = {
  atende: { label: 'Atende', color: '#157347' },
  parcial: { label: 'Parcial', color: '#9a6700' },
  nao_atende: { label: 'Não atende', color: '#b42318' },
};

const TIPO_CORES = {
  Essencial: { bg: '#dc3545', color: '#ffffff' },
  Obrigatória: { bg: '#ffc107', color: '#212529' },
  Recomendada: { bg: '#0dcaf0', color: '#212529' },
};

const KPI_CORES = {
  Essencial: '#dc3545',
  Obrigatória: '#9a6700',
  Recomendada: '#087990',
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 24,
    fontFamily: 'Helvetica',
    fontSize: 8,
    color: '#1a1a1a',
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: '#1e3a5f',
  },
  logo: {
    width: 90,
    marginBottom: 6,
  },
  entity: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a5f',
    textAlign: 'center',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 8,
    color: '#5c6773',
    textAlign: 'center',
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 6,
  },
  metaItem: {
    fontSize: 7.5,
    color: '#334155',
    marginHorizontal: 6,
    marginBottom: 2,
  },
  metaLabel: {
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  kpiRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d5dbe3',
    marginBottom: 16,
  },
  kpi: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 3,
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
    borderRightWidth: 1,
    borderRightColor: '#d5dbe3',
  },
  kpiLast: {
    borderRightWidth: 0,
  },
  kpiLabel: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  kpiValue: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a5f',
  },
  disclaimer: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    marginTop: 4,
    marginBottom: 22,
    textAlign: 'center',
  },
  table: {
    marginBottom: 0,
  },
  groupGap: {
    height: 16,
  },
  tableHead: {
    borderWidth: 1,
    borderColor: '#d5dbe3',
    borderBottomWidth: 0,
  },
  groupHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eef2f7',
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  groupTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a5f',
    flex: 1,
    paddingRight: 8,
  },
  groupPct: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a5f',
  },
  colHead: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderTopColor: '#d5dbe3',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  colHeadText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#475569',
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#d5dbe3',
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
  },
  colId: { width: '8%', textAlign: 'center', fontFamily: 'Helvetica-Bold', color: '#334155' },
  colNome: { width: '60%', paddingRight: 6 },
  colTipo: { width: '16%', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  colStatus: { width: '16%', textAlign: 'center', fontFamily: 'Helvetica-Bold' },
  badgeTipo: {
    paddingVertical: 1.5,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  badgeTipoText: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
  },
  colEntidade: { width: '52%', fontFamily: 'Helvetica-Bold', paddingRight: 6 },
  colOperador: { width: '18%', textAlign: 'center' },
  colSelo: { width: '18%', textAlign: 'center', fontFamily: 'Helvetica-Bold' },
  colNota: { width: '12%', textAlign: 'center', fontFamily: 'Helvetica-Bold' },
  empty: {
    textAlign: 'center',
    color: '#64748b',
    padding: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 12,
    left: 24,
    right: 24,
  },
  footerLine: {
    borderTopWidth: 1,
    borderTopColor: '#d5dbe3',
    marginBottom: 5,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 7.5,
    color: '#64748b',
  },
});

function BadgeTipo({ tipo }) {
  const cores = TIPO_CORES[tipo] || { bg: '#e9ecef', color: '#495057' };
  return (
    <View style={[styles.colTipo, { paddingTop: 1 }]}>
      <View style={[styles.badgeTipo, { backgroundColor: cores.bg }]}>
        <Text style={[styles.badgeTipoText, { color: cores.color }]}>{tipo}</Text>
      </View>
    </View>
  );
}

function Meta({ label, value }) {
  return (
    <Text style={styles.metaItem}>
      <Text style={styles.metaLabel}>{label}: </Text>
      {value}
    </Text>
  );
}

function Cabecalho({ logo, titulo, subtitulo }) {
  const logoValida = typeof logo === 'string' && logo.startsWith('data:image');
  return (
    <View style={styles.header} wrap={false}>
      {logoValida ? <Image src={logo} style={styles.logo} /> : null}
      <Text style={styles.entity}>{titulo}</Text>
      <Text style={styles.subtitle}>{subtitulo}</Text>
    </View>
  );
}

function Rodape({ emitidoEm }) {
  return (
    <View style={styles.footer} fixed>
      <View style={styles.footerLine} />
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Emissão: {emitidoEm}</Text>
        <Text
          style={styles.footerText}
          render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`}
        />
      </View>
    </View>
  );
}

export function RelatorioEntidadeDocument({ entidade, estatisticas, grupos, filtroLabel, emitidoEm }) {
  const kpis = [
    { label: 'Selo projetado', value: entidade.selo || '—' },
    { label: 'Aderência', value: `${entidade.perc ?? 0}%` },
    { label: 'Essencial', value: estatisticas ? `${estatisticas.percEssencial}%` : '—', color: KPI_CORES.Essencial },
    { label: 'Obrigatória', value: estatisticas ? `${estatisticas.percObrigatoria}%` : '—', color: KPI_CORES.Obrigatória },
    { label: 'Recomendada', value: estatisticas ? `${estatisticas.percRecomendada}%` : '—', color: KPI_CORES.Recomendada },
  ];

  return (
    <Document title={`${entidade.nome} — Simulação PNTP`} author={MARCA}>
      <Page size="A4" style={styles.page}>
        <Cabecalho
          logo={entidade.logo || null}
          titulo={entidade.nome}
          subtitulo="Relatório de simulação · PNTP Atricon 2026"
        />

        <View style={styles.meta}>
          <Meta label="Avaliador" value={entidade.operador || '—'} />
          <Meta label="Controlador" value={entidade.controlador || 'Não informado'} />
          <Meta label="Escopo" value={filtroLabel} />
        </View>

        <View style={styles.kpiRow}>
          {kpis.map((kpi, i) => (
            <View key={kpi.label} style={i === kpis.length - 1 ? [styles.kpi, styles.kpiLast] : styles.kpi}>
              <Text style={[styles.kpiLabel, kpi.color ? { color: kpi.color } : null]}>{kpi.label}</Text>
              <Text style={[styles.kpiValue, kpi.color ? { color: kpi.color } : null]}>{kpi.value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.disclaimer}>
          Simulação com variação de até ±0,5% em relação ao sistema oficial da Atricon, por arredondamento.
        </Text>

        {grupos.map((grupo) => (
          <Fragment key={grupo.titulo}>
            <View style={styles.tableHead} wrap={false} minPresenceAhead={32}>
              <View style={styles.groupHead}>
                <Text style={styles.groupTitle}>{grupo.titulo}</Text>
                <Text style={styles.groupPct}>{grupo.perc}%</Text>
              </View>
              <View style={styles.colHead}>
                <Text style={[styles.colHeadText, styles.colId]}>ID</Text>
                <Text style={[styles.colHeadText, styles.colNome]}>Critério</Text>
                <Text style={[styles.colHeadText, styles.colTipo]}>Tipo</Text>
                <Text style={[styles.colHeadText, styles.colStatus]}>Status</Text>
              </View>
            </View>
            {grupo.itens.map((item) => {
              const st = STATUS[item.status] || STATUS.nao_atende;
              return (
                <View key={item.id} style={styles.row} wrap={false}>
                  <Text style={styles.colId}>{item.id}</Text>
                  <Text style={styles.colNome}>{item.nome}</Text>
                  <BadgeTipo tipo={item.tipo} />
                  <Text style={[styles.colStatus, { color: st.color }]}>{st.label}</Text>
                </View>
              );
            })}
            <View style={styles.groupGap} wrap={false} />
          </Fragment>
        ))}

        <Rodape emitidoEm={emitidoEm} />
      </Page>
    </Document>
  );
}

export function RelatorioAgrupadoDocument({ entidades, filtrosTexto, emitidoEm }) {
  return (
    <Document title="Relatório de agrupamento — PNTP Atricon" author={MARCA}>
      <Page size="A4" style={styles.page}>
        <Cabecalho
          logo={null}
          titulo="Relatório de agrupamento"
          subtitulo="PNTP Atricon 2026 · Simulador de Transparência"
        />

        <View style={styles.meta}>
          <Meta label="Filtros" value={filtrosTexto} />
          <Meta label="Registros" value={String(entidades.length)} />
        </View>

        <View wrap={false}>
          <View style={styles.tableHead}>
            <View style={styles.colHead}>
              <Text style={[styles.colHeadText, styles.colEntidade]}>Entidade</Text>
              <Text style={[styles.colHeadText, styles.colOperador]}>Operador</Text>
              <Text style={[styles.colHeadText, styles.colSelo]}>Selo</Text>
              <Text style={[styles.colHeadText, styles.colNota]}>Nota</Text>
            </View>
          </View>
        </View>
          {entidades.length === 0 ? (
            <Text style={styles.empty}>Nenhum registro encontrado.</Text>
          ) : (
            entidades.map((ent) => (
              <View key={ent.id} style={styles.row} wrap={false}>
                <Text style={styles.colEntidade}>{ent.nome}</Text>
                <Text style={styles.colOperador}>{ent.operador}</Text>
                <Text style={styles.colSelo}>{ent.selo}</Text>
                <Text style={styles.colNota}>{ent.perc}%</Text>
              </View>
            ))
          )}

        <Rodape emitidoEm={emitidoEm} />
      </Page>
    </Document>
  );
}

import { pdf } from '@react-pdf/renderer';

export function nomeArquivoPdf(prefixo, nome) {
  const limpo = (nome || 'relatorio')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 60);
  return `${prefixo}_${limpo}_${new Date().toISOString().slice(0, 10)}.pdf`;
}

export async function baixarPdf(documento, nomeArquivo) {
  const blob = await pdf(documento).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

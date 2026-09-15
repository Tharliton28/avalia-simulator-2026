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

async function gerarBlobPdf(documento) {
  return pdf(documento).toBlob();
}

export async function baixarPdf(documento, nomeArquivo) {
  const blob = await gerarBlobPdf(documento);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function visualizarPdf(documento) {
  const blob = await gerarBlobPdf(documento);
  const url = URL.createObjectURL(blob);
  const novaAba = window.open(url, '_blank', 'noopener,noreferrer');
  if (!novaAba) {
    URL.revokeObjectURL(url);
    throw new Error('popup_blocked');
  }
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

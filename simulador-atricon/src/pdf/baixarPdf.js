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

function abrirJanelaPreview() {
  const novaAba = window.open('', '_blank');
  if (!novaAba) return null;

  novaAba.document.open();
  novaAba.document.write(
    '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Gerando PDF...</title></head>' +
    '<body style="margin:0;font-family:Helvetica,Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;color:#334155;">' +
    '<p>Gerando PDF, aguarde...</p></body></html>'
  );
  novaAba.document.close();
  return novaAba;
}

export async function visualizarPdf(documento) {
  const novaAba = abrirJanelaPreview();
  if (!novaAba) {
    throw new Error('popup_blocked');
  }

  try {
    const blob = await gerarBlobPdf(documento);
    const url = URL.createObjectURL(blob);
    novaAba.location.href = url;
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (error) {
    novaAba.close();
    throw error;
  }
}

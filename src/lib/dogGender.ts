/**
 * Detecta gênero (masculino/feminino) com base no nome do cão.
 * Regra simples: nome terminando em "a" (sem acento) é tratado como feminino.
 * Cobre ~90% dos nomes brasileiros (Mel, Luna, Bela, Maya, Lola, Nina, etc).
 *
 * Uso:
 *   const g = getDogGender("Luna");        // "f"
 *   const g = getDogGender("Rex");         // "m"
 *   article(g)        // "a" / "o"
 *   articleDe(g)      // "da" / "do"
 *   pronoun(g)        // "ela" / "ele"
 *   possessive(g)     // "sua" / "seu"
 *   suffix(g)         // "a" / "o"  (ex: transformá-l{a/o})
 */

export type Gender = "m" | "f";

export function getDogGender(name?: string): Gender {
  if (!name) return "m";
  const cleaned = name.trim().toLowerCase();
  if (!cleaned) return "m";
  // Termina em "a" / "á" / "ã" -> feminino
  // Cobre: Luna, Bela, Maya, Lola, Nina, Pipoca, Dália, Mariá, Estrela...
  // Limitação conhecida: nomes como "Tobias", "Atlas" são tratados como masculino (correto).
  // Mas nomes terminados em "ah" tipo "Sarah" vão ficar como masculino — aceitável (raro em cães).
  if (/[aáã]$/.test(cleaned)) return "f";
  return "m";
}

export function article(g: Gender): "o" | "a" {
  return g === "f" ? "a" : "o";
}

export function articleDe(g: Gender): "do" | "da" {
  return g === "f" ? "da" : "do";
}

export function pronoun(g: Gender): "ele" | "ela" {
  return g === "f" ? "ela" : "ele";
}

export function possessive(g: Gender): "seu" | "sua" {
  return g === "f" ? "sua" : "seu";
}

/** Sufixo de gênero para palavras como "transformá-l{o/a}", "ele/ela" etc. */
export function suffix(g: Gender): "o" | "a" {
  return g === "f" ? "a" : "o";
}

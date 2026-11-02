import { SECTORS } from '../../../lib/sectors';
import { useLang } from '../../../lib/LanguageContext';

/**
 * The six sector pages as Home cards: registry image, icon, link and hover
 * preview, with the card copy from sectorPages.<key>.card.
 */
export function useSectors() {
  const { t } = useLang();
  return SECTORS.map((s) => {
    const card = t(`sectorPages.${s.key}.card`);
    return {
      key: s.key,
      link: s.path,
      image: s.card,
      icon: s.icon,
      title: t(`sectorPages.${s.key}.name`),
      tag: card.tag,
      outcomes: [card.o1, card.o2, card.o3],
      explore: t('industries.explore'),
      preview: s.preview || null,
    };
  });
}

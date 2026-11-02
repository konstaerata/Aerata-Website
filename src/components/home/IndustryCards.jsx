// @ts-nocheck
import React from 'react';
import { useReducedMotion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import { useLang } from '../../lib/LanguageContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSectors } from './sectors/useSectors';
import SectorGlide from './sectors/SectorGlide';
import SectorDeck from './sectors/SectorDeck';

/**
 * Home sectors. Desktops with a pointer get the pinned gliding strips (all
 * five sectors visible, scroll glides between them); phones, tablets and
 * reduced-motion visitors get the stacked card deck.
 */
export default function IndustryCards() {
  const reduce = useReducedMotion();
  const isWide = useMediaQuery('(min-width: 1024px) and (min-height: 680px) and (hover: hover) and (pointer: fine)');
  const { t } = useLang();
  const sectors = useSectors();

  const heading = (
    <SectionHeading
      label={t('industries.label')}
      title={t('industries.title')}
      description={t('industries.description')}
      align="left"
      light
    />
  );

  // Desktop: a compact heading (title left, description right) that pins
  // together with the strips, so there's no empty band above them.
  const compactHeading = (
    <div className="grid grid-cols-12 gap-x-12 items-end">
      <div className="col-span-6">
        <SectionHeading label={t('industries.label')} title={t('industries.title')} align="left" light spacing="mb-0" />
      </div>
      <p className="col-span-6 text-base lg:text-lg text-steelBlue leading-relaxed font-light">{t('industries.description')}</p>
    </div>
  );

  // #sectors is the target of the "previous projects" links (each sector lists its projects).
  return (
    <div id="sectors" >
      {isWide && !reduce
        ? <SectorGlide sectors={sectors} heading={compactHeading} />
        : <SectorDeck sectors={sectors} heading={heading} />}
    </div>
  );
}

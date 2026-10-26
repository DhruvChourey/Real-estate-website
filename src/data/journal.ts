import type { JournalArticle } from '../types';

export const journalArticles: JournalArticle[] = [
  {
    id: 'journal-1',
    slug: 'the-architecture-of-quiet-living',
    title: 'The Architecture of Quiet Living',
    subtitle: 'Why intentional negative space and reduced material noise represent the ultimate contemporary luxury.',
    category: 'Architecture',
    author: {
      name: 'Elena Rostova',
      role: 'Editorial Director, Aurel Journal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    publishedDate: 'Autumn / Winter 2024',
    readTime: '6 min read',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    excerpt: 'In an era defined by sensory overstimulation, true residential luxury is no longer measured by decorative excess. It is defined by acoustic stillness, deliberate proportions, and the restorative power of empty space.',
    content: [
      {
        type: 'paragraph',
        value: 'There is a profound distinction between an opulent room and an architectural room. Opulence seeks to impress through accumulation—gilt moldings, exotic veneers competing for attention, and an anxiety of the vacuum. Architectural space, by contrast, possesses the quiet confidence to leave things unsaid.',
      },
      {
        type: 'quote',
        value: 'Luxury is not the presence of everything you can afford; it is the deliberate absence of anything that does not serve peace.',
      },
      {
        type: 'heading',
        value: 'The Psychology of the Unadorned Wall',
      },
      {
        type: 'paragraph',
        value: 'When John Pawson or Vincent Van Duysen articulates a residential plane in unpainted lime plaster or raw travertine, the wall ceases to be a backdrop. It becomes a responsive screen upon which the shifting angles of the afternoon sun trace their ephemeral paths.',
      },
      {
        type: 'image',
        value: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
        caption: 'Monolithic surfaces eliminate visual friction, allowing the eye to rest and mind to decompress.',
      },
      {
        type: 'heading',
        value: 'Acoustic Mass and the Weight of Silence',
      },
      {
        type: 'paragraph',
        value: 'Quiet living is also literal. The residences we represent prioritize heavy structural masonry, decoupled acoustic sub-floors, and multi-laminated acoustic glazing. To step inside from the roaring traffic of London’s Belgravia or Mumbai’s arterial roads into an absolute decibel drop of 45dB is a tangible physical release.',
      },
      {
        type: 'callout',
        value: 'When choosing a residence, test not just what you see with the lights on, but what you feel when you stand in the center of the salon in absolute silence at dusk.',
      },
      {
        type: 'paragraph',
        value: 'As international buyers seek residences that nurture longevity and mental clarity, architecture that honors quietude will remain the most coveted asset in the global portfolio.',
      },
    ],
  },
  {
    id: 'journal-2',
    slug: 'when-light-becomes-the-material',
    title: 'When Light Becomes the Material',
    subtitle: 'How contemporary European architects treat diurnal illumination not as an ornament, but as primary structural matter.',
    category: 'Perspectives',
    author: {
      name: 'Marcello Vane',
      role: 'Architectural Historian & Advisor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    publishedDate: 'Late Autumn 2024',
    readTime: '7 min read',
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=85',
    excerpt: 'Natural illumination is the only material that transforms continuously throughout every minute of the day without decaying.',
    content: [
      {
        type: 'paragraph',
        value: 'Le Corbusier famously declared architecture to be the learned game, correct and magnificent, of forms assembled in the light. In the greatest 21st-century residences, light is no longer merely admitted through punched window openings; it is carved, reflected, and choreographed.',
      },
      {
        type: 'heading',
        value: 'The Geometry of the Morning Shadow',
      },
      {
        type: 'paragraph',
        value: 'Consider the treatment of eastern light in coastal villas. Rather than exposing a bedroom to harsh unmitigated glare, architects employ deep cantilevered concrete overhangs and pivoting cedar brise-soleil. The morning ray is softened into a striated pattern of warmth across the oak floor.',
      },
      {
        type: 'quote',
        value: 'A room that looks identical at noon and at 6 PM is an architectural failure.',
      },
      {
        type: 'paragraph',
        value: 'Light gives stone its texture. A slab of Roman Navona travertine viewed in flat diffuse lighting looks unremarkable; illuminated from an oblique ceiling clerestory, every mineral fissure and subtle honey variation comes alive.',
      },
    ],
  },
  {
    id: 'journal-3',
    slug: 'the-lasting-appeal-of-raw-travertine',
    title: 'The Lasting Appeal of Raw Travertine and Cast Bronze',
    subtitle: 'Investigating why tactile geological materials outlive fleeting synthetic design trends.',
    category: 'Materials',
    author: {
      name: 'Claire Beauchamp',
      role: 'Senior Materials Curator',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    publishedDate: 'Summer / Autumn 2024',
    readTime: '5 min read',
    heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    excerpt: 'Why the world’s most discerning architects return repeatedly to materials that accept the touch of human hands and improve with the passage of centuries.',
    content: [
      {
        type: 'paragraph',
        value: 'In our advisory work, we encounter properties fitted with glossy polished surfaces that looked striking in computer renderings five years ago, but today feel sterile and scratched. Contrast this with unpolished, honed Roman travertine or sand-cast gunmetal bronze.',
      },
      {
        type: 'heading',
        value: 'The Value of Honest Aging',
      },
      {
        type: 'paragraph',
        value: 'Materials that possess geological memory understand how to age with dignity. A bronze door pull doesn’t deteriorate with use; the oil from human skin polishes the contact points to a warm golden sheen while the recesses deepen into rich dark chocolate undertones.',
      },
      {
        type: 'quote',
        value: 'We do not build for the day of completion; we build for how the residence will breathe in fifty years.',
      },
    ],
  },
  {
    id: 'journal-4',
    slug: 'a-different-perspective-on-city-living',
    title: 'A Different Perspective on City Living',
    subtitle: 'The rise of introverted urban architecture: finding absolute sanctuary in the heart of global capitals.',
    category: 'Perspectives',
    author: {
      name: 'Elena Rostova',
      role: 'Editorial Director, Aurel Journal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    publishedDate: 'Spring / Summer 2024',
    readTime: '8 min read',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    excerpt: 'How modern master architects are borrowing from roman domus and Japanese courtyard typologies to create secluded vertical oases in dense metropolitan centers.',
    content: [
      {
        type: 'paragraph',
        value: 'For decades, urban prestige was signaled by looking outward: glass boxes hovering above traffic, boasting about how much of the skyline could be taken in at once. But an increasing cohort of ultra-high-net-worth principals is gravitating toward an introverted paradigm.',
      },
      {
        type: 'heading',
        value: 'The Internal Courtyard as Spiritual Hearth',
      },
      {
        type: 'paragraph',
        value: 'Borrowing from ancient Roman villas and Kyoto townhouses (machiya), these modern homes wrap themselves around private verdant atriums, rainwater reflecting pools, or skyward-facing courtyards open only to the clouds.',
      },
      {
        type: 'quote',
        value: 'In the city, privacy is not about hiding; it is about reclaiming sovereignty over one’s sensory horizon.',
      },
    ],
  },
];

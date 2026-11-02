import { useEffect, useState, useRef } from 'react';

function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  return (
    <div ref={ref} className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-cream-100 text-[#1D1D1D] font-sans antialiased selection:bg-amber-200 selection:text-black min-h-screen">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4" data-purpose="site-navigation">
        <nav className="w-full max-w-5xl bg-noir/95 backdrop-blur-md text-white rounded-full px-5 py-3 flex items-center justify-between shadow-2xl border border-white/10 transition-all duration-300">
          <a className="font-serif text-2xl tracking-wide font-normal hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full px-2" href="#">
            Plome
          </a>

          <ul className="hidden md:flex items-center gap-9 text-xs tracking-wider uppercase font-light text-neutral-300">
            <li><a className="hover:text-white transition-colors duration-200 py-2" href="#perfumes">Perfumes</a></li>
            <li><a className="hover:text-white transition-colors duration-200 py-2" href="#brands">Brands</a></li>
            <li><a className="hover:text-white transition-colors duration-200 py-2" href="#editorial">Review</a></li>
            <li><a className="hover:text-white transition-colors duration-200 py-2" href="#guides">Guides</a></li>
          </ul>

          <div className="flex items-center gap-3 text-neutral-200">
            <button aria-label="Search" className="hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
            </button>
            <button aria-label="Wishlist" className="hover:text-white transition-colors p-2 rounded-full hidden sm:block focus:outline-none focus:ring-2 focus:ring-amber-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
            </button>
            <button aria-label="Cart" className="hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.19-.578-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu" 
              aria-expanded={isMobileMenuOpen} 
              className="md:hidden hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="absolute top-20 left-4 right-4 bg-noir rounded-2xl p-6 shadow-2xl border border-white/10 md:hidden flex flex-col gap-4 text-sm tracking-wider uppercase font-light text-neutral-300 animate-fade-in-up">
            <a href="#perfumes" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-white border-b border-white/10">Perfumes</a>
            <a href="#brands" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-white border-b border-white/10">Brands</a>
            <a href="#editorial" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-white border-b border-white/10">Review</a>
            <a href="#guides" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-white">Guides</a>
          </div>
        )}
      </header>

      <main id="main-content">
        <section className="relative pt-36 pb-20 md:pt-40 md:pb-28 overflow-hidden" data-purpose="hero-banner">
          <div className="absolute inset-0 halo-glow pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 relative">
            <Reveal className="max-w-4xl mx-auto border-t border-x border-[#ded8c9] rounded-t-[280px] pt-14 pb-4 px-4 text-center relative">
              <p className="font-serif italic text-base md:text-lg text-neutral-600 mb-2">Your Scent Speak</p>
              <h1 className="font-serif font-luxury-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#141414] leading-[1.08] max-w-2xl mx-auto">
                A Fragrance that Captivates
              </h1>
              
              <div className="relative mt-10 mx-auto w-full max-w-md sm:max-w-lg aspect-[4/5] rounded-[36px] overflow-hidden shadow-2xl bg-stone-900 border border-amber-900/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-72 h-72 rounded-full bg-stone-200/20 blur-xl"></div>
                  <div className="relative z-20 w-48 sm:w-56 h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-amber-700/80 via-amber-950 to-stone-950 p-1 border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-8 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-500 rounded-t-sm -mt-6 border-b border-black"></div>
                    <div className="w-8 h-4 bg-amber-200/50 mb-4"></div>
                    <div className="w-28 py-3 px-2 border border-amber-300/40 bg-black/40 backdrop-blur-sm rounded">
                      <span className="text-[10px] tracking-[0.25em] text-amber-200 uppercase font-sans">RUYHE</span>
                      <p className="text-[7px] tracking-widest text-amber-100/60 uppercase">EAU DE PARFUM</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 inset-x-0 z-20 text-center text-amber-100/80 text-xs tracking-widest uppercase">Signature Essence</div>
              </div>
            </Reveal>

            <aside aria-label="Hero left feature" className="hidden lg:flex flex-col gap-6 absolute left-6 top-36 w-60 z-30">
              <Reveal>
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-full bg-[#EF4444] text-white flex items-center justify-center shadow-md">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </div>
                  <p className="font-serif text-sm leading-snug text-neutral-700">Explore the enchanting fragrances as if they were works of art.</p>
                </div>
              </Reveal>
              <Reveal className="relative bg-white rounded-2xl shadow-sm border border-stone-200/70 overflow-hidden pt-3 text-center">
                <div className="h-36 bg-gradient-to-b from-[#2a1d17] to-[#120b08] rounded-xl mx-3 flex items-center justify-center">
                  <div className="w-16 h-24 rounded-lg bg-gradient-to-t from-amber-600 to-amber-300 shadow-md border border-amber-200/40"></div>
                </div>
                <div className="bg-white px-3 pt-3 pb-7 rounded-b-full">
                  <h4 className="font-serif text-sm font-semibold text-neutral-900">Scandal</h4>
                  <p className="text-[10px] text-neutral-600 font-sans">Concentrated Perfume</p>
                </div>
                <button aria-label="View Scandal details" className="absolute -bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-[#141414] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-amber-400">
                  <span className="text-xs">→</span>
                </button>
              </Reveal>
            </aside>

            <aside aria-label="Hero right feature" className="hidden lg:flex flex-col gap-6 absolute right-6 top-28 w-60 z-30">
              <Reveal className="relative bg-white rounded-t-full rounded-b-2xl shadow-sm border border-stone-200/70 p-3 text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#141414] text-white flex items-center justify-center text-xs">→</div>
                <div className="pt-6 pb-2">
                  <h4 className="font-serif text-sm font-semibold text-neutral-900">Scandal</h4>
                  <p className="text-[10px] text-neutral-600 uppercase tracking-wider font-sans">Potent Perfume</p>
                </div>
                <div className="h-32 rounded-xl bg-gradient-to-tr from-amber-950 via-amber-800 to-stone-900 flex items-center justify-center overflow-hidden">
                  <div className="w-14 h-22 rounded bg-amber-500/80 shadow border border-amber-300"></div>
                </div>
              </Reveal>
              <Reveal className="space-y-4 pt-2">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-sm" aria-hidden="true">✿</div>
                <blockquote className="font-serif italic text-sm text-neutral-700 leading-snug">"Show someone they're amazing with our enticing Scandal fragrance."</blockquote>
                <a className="inline-flex items-center gap-3 font-serif text-sm font-medium text-neutral-900 group" href="#shop">
                  <span>Shop Now</span>
                  <span className="w-7 h-7 rounded-full bg-amberAccent-400 group-hover:bg-amberAccent-500 text-black flex items-center justify-center transition-colors">→</span>
                </a>
              </Reveal>
            </aside>
          </div>
        </section>

        <section className="py-14 border-t border-[#EAE6D8]" data-purpose="partner-brands" id="brands">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-4xl text-[#181818] mb-8 font-luxury-display">Your Desired Brand</h2>
              <div className="flex items-center justify-center gap-3 overflow-x-auto no-scrollbar py-2" role="list" aria-label="Brand list">
                {['Lino', 'Percue', 'Criss', 'Xocis'].map((brand, i) => (
                  <div key={i} role="listitem" className="shrink-0 px-6 py-3 rounded-2xl border border-stone-300/80 bg-[#FAF9F5] shadow-xs flex items-center gap-2 hover:border-neutral-500 transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-amber-400">
                    <span className={`font-serif italic text-base ${i === 3 ? 'font-sans text-xs tracking-wider uppercase font-medium not-italic' : ''}`}>{brand}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16 md:py-24" data-purpose="gender-collections">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-5xl text-[#181818] font-luxury-display leading-tight">Aromas for<br className="hidden sm:inline"/> Kings &amp; Queens</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {['Men', 'Women'].map((gender, i) => (
                <Reveal key={gender} className={`relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-gradient-to-br ${i === 0 ? 'from-[#402219] via-[#1a110f] to-black' : 'from-[#2f180f] via-[#1c0f0a] to-[#0c0807]'} border border-amber-900/20 shadow-xl group`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-transparent opacity-70"></div>
                  <div className={`absolute right-6 sm:right-12 bottom-0 ${i === 0 ? 'w-52 sm:w-60 h-64 sm:h-72 rounded-full bg-gradient-to-t from-red-950 via-amber-600 to-amber-300' : 'w-44 sm:w-52 h-68 sm:h-76 rounded-2xl bg-gradient-to-t from-amber-900 via-amber-500 to-amber-200'} p-2 shadow-2xl flex items-start justify-center`}>
                    <div className={`w-16 h-10 bg-amber-200 rounded-t-md -mt-8 border border-amber-400 ${i === 1 ? 'w-12 h-14 rounded-t border-amber-300' : ''}`}></div>
                  </div>
                  <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-serif italic text-lg text-amber-200/90 leading-tight">For</p>
                        <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide">{gender}</h3>
                      </div>
                      <a className="bg-white/90 hover:bg-white text-neutral-900 rounded-full px-4 py-1.5 text-xs font-sans font-medium flex items-center gap-2 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-400" href={`#${gender.toLowerCase()}`}>
                        <span>Shop Now</span><span className="text-sm" aria-hidden="true">→</span>
                      </a>
                    </div>
                    <div><p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">{i === 0 ? 'Woody • Spiced • Noble' : 'Floral • Oriental • Velvet'}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24" data-purpose="seasonal-promotions">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="bg-white rounded-[36px] p-8 sm:p-12 lg:p-16 border border-stone-200/70 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
                <h2 className="font-serif font-luxury-display text-3xl sm:text-5xl text-neutral-900 max-w-md leading-tight">Get 15% Off In Seasonal Product</h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-dashed border-stone-300 flex items-center justify-center text-stone-400" aria-hidden="true">✺</div>
                  <div className="w-20 h-10 rounded-full bg-blue-900/10 border border-blue-900/20 flex items-center justify-center overflow-hidden">
                    <span className="text-[9px] uppercase tracking-wider text-blue-900 font-medium">SAUVAGE</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6">
                  <div className="aspect-[4/5] rounded-3xl bg-gradient-to-t from-stone-950 via-amber-950 to-stone-900 border border-amber-900/30 overflow-hidden flex items-center justify-center p-8 shadow-inner">
                    <div className="w-48 h-64 rounded-xl bg-gradient-to-t from-amber-600 via-amber-400 to-amber-200 border-2 border-amber-300 shadow-2xl flex flex-col items-center justify-start pt-4">
                      <div className="w-20 h-10 bg-amber-100 rounded border border-amber-400 -mt-12 shadow"></div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <h3 className="font-serif font-luxury-display text-3xl sm:text-4xl text-neutral-900 leading-tight">Unveil Your Signature Scent</h3>
                    <p className="font-sans text-sm text-neutral-600 mt-2 font-medium tracking-wide">Item # 65823</p>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-neutral-700 max-w-md">Why are they unboxed? Sometimes boxes can be damaged in transit or in less than perfect condition. We then price these items cheaper than the boxed versions, and we pass the savings to you.</p>
                  <div className="pt-4 flex items-center gap-4">
                    <span className="font-serif text-sm font-medium text-neutral-900">Buy Now</span>
                    <a aria-label="Buy seasonal item" className="w-10 h-10 rounded-full bg-amberAccent-400 hover:bg-amberAccent-500 text-black flex items-center justify-center shadow transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400" href="#buy">
                      <span className="text-sm font-bold" aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="pt-16 pb-12 border-t border-[#EAE6D8] bg-cream-100" data-purpose="site-footer">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-10 items-start mb-20">
            <div className="md:col-span-2 space-y-3">
              <h4 className="font-serif text-sm font-semibold text-neutral-900">Company</h4>
              <ul className="space-y-2 text-sm text-neutral-600 font-sans">
                <li><a className="hover:text-black transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-black transition-colors" href="#">Contact</a></li>
              </ul>
            </div>
            <div className="md:col-span-2 space-y-3">
              <h4 className="font-serif text-sm font-semibold text-neutral-900">Resource</h4>
              <ul className="space-y-2 text-sm text-neutral-600 font-sans">
                <li><a className="hover:text-black transition-colors" href="#">Blog</a></li>
                <li><a className="hover:text-black transition-colors" href="#">Legal</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-4 space-y-6">
              <div className="space-y-3">
                <h4 className="font-serif text-sm font-semibold text-neutral-900">Address</h4>
                <address className="font-sans text-sm text-neutral-600 leading-relaxed not-italic">
                  475 Cherry Dr. Troy, Michigan 48083 United States<br/>
                  <a href="tel:+12488233200" className="hover:text-black transition-colors">(248) 823-3200</a>
                </address>
              </div>
            </div>
          </div>
          <div className="border-t border-[#E8E4D5] pt-12 overflow-hidden select-none">
            <h2 className="font-serif font-luxury-display text-[12vw] leading-none text-[#CFCCC2]/70 text-center tracking-tight" aria-hidden="true">Get in touch</h2>
          </div>
        </div>
      </footer>
    </div>
  );
}

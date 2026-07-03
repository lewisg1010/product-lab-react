import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen((location) => {
      // If the destination has a hash (e.g. /getinvolved#faqs), scroll to that
      // element instead of the top. The target may not be in the DOM until the
      // new page renders, so retry briefly before giving up.
      if (location.hash) {
        const id = location.hash.slice(1);
        let tries = 0;
        const tryScroll = () => {
          const el = document.getElementById(id);
          if (el) {
            // For the FAQ section, stop with the FAQ sitting below the fixed
            // navbar PLUS an extra gap, so there's comfortable whitespace above
            // the "SUPPORT / Frequently asked questions" heading on entry
            // (rather than tucking it right under the navbar).
            const nav = document.getElementById('nav');
            if (id === 'faqs') {
              const navH = nav ? nav.getBoundingClientRect().height : 0;
              // Small positive gap: enough whitespace above the FAQ heading, but
              // not so much that its top divider scrolls up under the navbar.
              const FAQ_TOP_GAP = 24;
              const top = el.getBoundingClientRect().top + window.pageYOffset - navH - FAQ_TOP_GAP;
              window.scrollTo({ top, behavior: 'smooth' });
            } else {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else if (tries++ < 10) {
            setTimeout(tryScroll, 50);
          }
        };
        tryScroll();
        return;
      }
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return (null);
}

export default withRouter(ScrollToTop);
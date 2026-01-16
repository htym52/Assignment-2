import { c as createComponent, m as maybeRenderHead, r as renderTemplate } from './astro/server_PeQ7Dn8M.mjs';
import 'piccolore';
import 'clsx';

const $$Nav = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="header"> <nav> <div class="navbar"> <ul> <li><a href="/">HOME</a></li> <li><a href="/signin">SIGN IN</a></li> <li><a href="/register">REGISTER</a></li> <li><a href="/dashboard">BLOGS</a></li> </ul> </div> </nav> </section>`;
}, "D:/Documents/Griffith College/web frameworks/Assignment 2/src/components/nav.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="footer"> <p>Mythili - 3173713</p> <a href="/">Mythili</a> </footer>`;
}, "D:/Documents/Griffith College/web frameworks/Assignment 2/src/components/footer.astro", void 0);

export { $$Nav as $, $$Footer as a };

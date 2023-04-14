import { createApp } from "/node_modules/.vite/deps/vue.js?v=9f7a8c03";
import "/src/style/style.css?t=1681390354897";
import "/src/style/font.scss";
import "/src/style/app.scss";
import "/node_modules/.vite/deps/@arco-design_web-vue_es_message_style_css__js.js?v=9f7a8c03";
import App from "/src/App.vue";
import { setupRouter } from "/src/router/index.ts?t=1681390354897";
import { setupStore } from "/src/store/index.ts";
const app = createApp(App);
const bootstrap = () => {
  setupRouter(app);
  setupStore(app);
  app.mount("#app");
};
bootstrap();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQXBwIH0gZnJvbSAndnVlJ1xuaW1wb3J0ICcuL3N0eWxlL3N0eWxlLmNzcydcbmltcG9ydCAnLi9zdHlsZS9mb250LnNjc3MnXG5pbXBvcnQgJy4vc3R5bGUvYXBwLnNjc3MnXG5pbXBvcnQgJ0BhcmNvLWRlc2lnbi93ZWItdnVlL2VzL21lc3NhZ2Uvc3R5bGUvY3NzLmpzJ1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC52dWUnXG5cbmltcG9ydCB7IHNldHVwUm91dGVyIH0gZnJvbSAnQC9yb3V0ZXInXG5pbXBvcnQgeyBzZXR1cFN0b3JlIH0gZnJvbSAnQC9zdG9yZSdcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAYXJjby1kZXNpZ24vd2ViLXZ1ZSdcbmNvbnN0IGFwcCA9IGNyZWF0ZUFwcChBcHApXG5cbmNvbnN0IGJvb3RzdHJhcCA9ICgpID0+IHtcbiAgICBzZXR1cFJvdXRlcihhcHApXG4gICAgc2V0dXBTdG9yZShhcHApXG5cblxuICAgIGFwcC5tb3VudCgnI2FwcCcpXG59XG5ib290c3RyYXAoKVxuIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLGlCQUFpQjtBQUMxQixPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTyxTQUFTO0FBRWhCLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsa0JBQWtCO0FBRTNCLE1BQU0sTUFBTSxVQUFVLEdBQUc7QUFFekIsTUFBTSxZQUFZLE1BQU07QUFDcEIsY0FBWSxHQUFHO0FBQ2YsYUFBVyxHQUFHO0FBR2QsTUFBSSxNQUFNLE1BQU07QUFDcEI7QUFDQSxVQUFVOyIsIm5hbWVzIjpbXX0=
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from "unplugin-vue-components/vite";
import { VantResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from "vite-plugin-compression";
import {ViteImageOptimizer} from "vite-plugin-image-optimizer";
import VitePluginPrerender from "vite-plugin-prerender";
import { createHtmlPlugin } from 'vite-plugin-html'
export default defineConfig({
    build: {
        cssCodeSplit: false, // 禁用 CSS 代码拆分,将整个项目中的所有 CSS 将被提取到一个 CSS 文件中
        minify: 'terser', // 混淆器，terser构建后文件体积更小 ,esbuild  默认
        assetsInlineLimit: 4096,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('vant')) {
                            return 'vendor_vant'; // vant 单独拆包
                        }
                        if (id.includes('vue')) {
                            return 'vendor_vue';  // vue 相关库单独拆包
                        }
                        if (id.includes('pinia')) {
                            return 'vendor_pinia'; // pinia 单独拆包
                        }
                        // 其他常用库也可以单独拆包
                        return 'vendor_misc'; // 其他 node_modules 库拆分为 misc 包
                    }
                },
                // chunkFileNames: 'assets/js/[name]-[hash].js',
                // entryFileNames: 'assets/js/[name]-[hash].js',
                // assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            }
        },
        terserOptions: {
            compress: {
                drop_console: true, // 去除 console
                drop_debugger: true, // 去除 debugger
                toplevel: true
            }
        }
    },
    server: {
        hmr: true,
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/adc': {
                target: 'http://192.168.1.77:8095/', // 凡是遇到 /api 路径的请求，都映射到 target 属性
                changeOrigin: true,
            },
            '/resource': {
                target: 'https://www.earthcoin.vip',
                changeOrigin: true,
            }
        }
    },
    plugins: [
        vue(),
        AutoImport({
            dts: true,
            imports: ['vue', 'vue-router'],
            eslintrc: {
                enabled: true
            }
        }),
        Components({
            dts: "src/typings/components.d.ts",
            resolvers: [VantResolver()]
        }),
        VitePluginPrerender({
            staticDir: path.resolve(__dirname, 'dist'), // 输出静态文件的目录
            routes: ['/home'], // 需要预渲染的路由路径
            renderAfterDocumentEvent: 'rendered', // 等待页面加载完成后进行渲染
            inject: {
                // 注入数据到每个页面的 HTML 模板
                title: 'Elephant Eco'
            }
        }),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
        }),
        ViteImageOptimizer({
            mozjpeg: {
                quality: 70,
            },
            optipng: {
                optimizationLevel: 3,
            },
            pngquant: {
                quality: [0.65, 0.90],
            },
            gifsicle: {
                optimizationLevel: 3,
            },
            svgo: {
                plugins: [{ removeViewBox: false }],
            },
            webp: {
                quality: 75,
            },
            include: /\.(png|jpe?g|gif|webp|svg)$/i,
            exclude: /node_modules/,
        }),
        createHtmlPlugin({
            inject: {
                data: {} // 这里先不注入固定内容，下面插件动态注入 preload 标签
            }
        }),
        // 自定义插件：自动注入 CSS preload 标签到 HTML <head>
        {
            name: 'inject-css-preload',
            apply: 'build',
            enforce: 'post',
            generateBundle(_, bundle) {
                // 找出唯一的 CSS 文件
                const cssFile = Object.values(bundle).find(
                  f => f.type === 'asset' && f.fileName.endsWith('.css')
                )
                if (!cssFile) return

                // 给每个 html 文件注入 preload 标签
                for (const file of Object.values(bundle)) {
                    if (file.type === 'asset' && file.fileName.endsWith('.html')) {
                        const preloadTag = `<link rel="preload" href="/${cssFile.fileName}" as="style">`
                        file.source = file.source.replace(
                          /(<head[^>]*>)/i,
                          `$1\n  ${preloadTag}`
                        )
                    }
                }
            }
        }
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, 'src')
        },
    },
    optimizeDeps: {
        include: ['vue', 'vue-router', 'vant'] // 优化依赖，提升启动速度
    }
})

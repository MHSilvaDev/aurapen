# Aura Pen | Landing Page Interativa

Uma landing page conceitual e altamente interativa desenvolvida para demonstrar técnicas avançadas de Front-End, com foco em animações de alta performance, manipulação de DOM e experiências imersivas de UI/UX.

## 🎯 Sobre o Projeto

O "Aura Pen" é um projeto de portfólio focado na intersecção entre design minimalista e engenharia de software no front-end. O objetivo principal foi criar uma experiência de rolagem (scroll) cinematográfica, fugindo do layout estático tradicional e explorando a renderização gráfica via Canvas combinada com bibliotecas de animação modernas.

## 🚀 Tecnologias Utilizadas

*   **HTML5 & CSS3:** Estruturação semântica e estilização avançada (variáveis CSS, máscaras radiais, blend modes).
*   **JavaScript (ES6+):** Lógica de animação, manipulação de eventos e pré-carregamento de assets.
*   **Tailwind CSS:** Utilizado para prototipação ágil de utilitários e layout responsivo.
*   **GSAP (GreenSock) & ScrollTrigger:** Motor principal para animações on-scroll complexas, timelines e controle de opacidade/transformação.
*   **Lenis:** Implementação de "Smooth Scroll" matemático para garantir fluidez nas animações independentemente do sistema operacional do usuário.
*   **SplitType:** Fragmentação de textos (letras e palavras) para criar efeitos de revelação tipográfica precisos.

## ✨ Features Técnicas Destacadas

1.  **Canvas Image Sequence Scrubbing:** Renderização de uma sequência de dezenas de quadros de vídeo frame a frame dentro de um elemento `<canvas>`, perfeitamente sincronizado com a rolagem do usuário através do GSAP ScrollTrigger.
2.  **Micro-interações de Iluminação (Flashlight Effect):** Uso de JavaScript para rastrear as coordenadas do mouse (`clientX` / `clientY`) e atualizar variáveis CSS nativas na GPU, criando um efeito de luz radial dinâmico sobre os cards ("Engenharia de Vanguarda").
3.  **Sistema de Pré-carregamento (Preloader):** Lógica customizada para segurar a exibição da página e a execução das animações de entrada até que todos os frames pesados do `<canvas>` estejam totalmente cacheados no navegador, evitando saltos visuais.
4.  **Animações Padrão "Entrance" e "Reveal":** Criação de um sistema visual coeso onde elementos surgem na tela (fades, translados de eixo Y e fragmentação de texto) sem comprometer a thread principal, utilizando transformações aceleradas por hardware.

## ⚙️ Como rodar localmente

Devido ao uso da API do Canvas para carregar imagens locais, rodar este projeto apenas abrindo o arquivo `index.html` no navegador pode causar erros de **CORS**. Siga os passos:

1. Clone este repositório:
   ```bash
   git clone [https://github.com/SEU-USUARIO/aura-pen.git](https://github.com/SEU-USUARIO/aura-pen.git)
